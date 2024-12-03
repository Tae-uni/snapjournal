import axios from 'axios';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';


export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
    }),
    CredentialsProvider({
      name: 'email and password',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const response = await axios.post(`${process.env.NEXT_PUBLIC_EXPRESS_URL}/api/auth/signin`, {
            email: credentials.email,
            password: credentials.password,
          }, {
            headers: {
              'Content-type': 'application/json',
            },
          });

          const data = response.data

          if (response.status !== 200 || data.token) {
            // return error to signIn callback
            throw new Error('Invalid login credentials');
          }

          // Success
          return {
            id: data.user.id,
            name: data.user.username,
            email: data.user.email,
            token: data.token,
            blocked: data.user.blocked,
          };
        } catch (error) {
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      if (
        account &&
        account.provider === 'google' &&
        profile && 'email_verified' in profile
      ) {
        if (!profile.email_verified) return false;
      }
      return true;
    },

    async jwt({ token, account, user }) {
      console.log('jwt callback', {
        token,
        user,
      });

      // Credential SignIn
      if (account?.provider === 'credentials' && user) {
        token.accessToken = user.token;
        token.userId = user.id;
        token.blocked = user.blocked;
      }

      // Google account
      if (account?.provider === 'google' && account.access_token) {
        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_EXPRESS_URL}/api/auth/google`,
            { access_token: account.access_token },
            { headers: { 'Content-Type': 'application/json' } }
          );

          const data = response.data;

          if (response.status == 200) {
            token.accessToken = data.token;
            token.userId = data.user.id;
            token.blocked = data.user.blocked;
          }
        } catch (error) {
          console.error('Error fetching Strapi JWT token:', error);
        }
      }
      return token;
    },

    async session({ token, session }) {
      console.log('session callback', {
        token,
        session,
      });

      session.accessToken = token.accessToken;
      session.provider = token.provider;
      session.userId = token.userId;
      session.blocked = token.blocked;

      return session;
    },
  },
  session: {
    strategy: 'jwt',
  },
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
  secret: process.env.NEXTAUTH_SECRET,
};
