import axios from 'axios';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { StrapiErrorT } from '@/types/strapi/StrapiError';
import { StrapiLoginResponseT } from '@/types/strapi/User';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'email and password',
      credentials: {
        identifier: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, req) {
        if (!credentials || !credentials.identifier || !credentials.password) {
          return null;
        }
        try {
          const strapiResponse = await axios.post(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/local`, {
            identifier: credentials.identifier,
            password: credentials.password,
          }, {
            headers: {
              'Content-type': 'application/json',
            },
          });

          if (strapiResponse.status !== 200) {
            // return error to signIn callback
            const contentType = strapiResponse.headers['content-type'];
            if (contentType && contentType.includes('application/json')) {
              const data: StrapiErrorT = await strapiResponse.data;
              throw new Error(data.error.message);
            } else {
              throw new Error(strapiResponse.statusText);
            }
          }

          // Success
          const data: StrapiLoginResponseT = await strapiResponse.data;
          return {
            name: data.user.username,
            email: data.user.email,
            id: data.user.id.toString(), // Originally, the user id is 'number'
            strapiUserId: data.user.id,
            blocked: data.user.blocked,
            strapiToken: data.jwt,
          };

        } catch (error) {
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (
        account &&
        account.provider === 'google' &&
        profile && 'email_verified' in profile
      ) {
        if (!profile.email_verified) return false;
      }
      return true;
    },

    async jwt({ token, trigger, account, user, session }) {
      console.log('jwt callback', {
        token,
        trigger,
        account,
        user,
        session,
      });

      if (account) {
        if (account.provider === 'credentials') {
          token.strapiToken = user.strapiToken;
          token.strapiUserId = user.strapiUserId;
          token.provider = account.provider;
          token.blocked = user.blocked;
        }
      }
      return token;
    },
    async session({ token, session }) {
      console.log('session callback', {
        token,
        session,
      });

      session.strapiToken = token.strapiToken;
      session.provider = token.provider;
      session.user.strapiUserId = token.strapiUserId;
      session.user.blocked = token.blocked;

      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  pages: {
    signIn: '/auth/signin',
    // signOut: '/auth/signout',
    error: '/authError',
    // verifyRequest: '/api/auth/verify-request',
    // newUser: undefined,
  },
};
