import axios from 'axios';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { axiosInstance } from '@/lib/axiosInstance';

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
          throw new Error('Email and password are required.')
        }

        try {
          const response = await axiosInstance.post(`/api/auth/signin`, {
            email: credentials.email,
            password: credentials.password,
          }, {
            headers: {
              'Content-type': 'application/json',
            },
          });

          if (response.status !== 200) {
            // return error to signIn callback
            throw new Error(response.data.error || 'Invalid login credentials');
          }

          const data = response.data
          console.log("Response from Express:", data);

          // Success
          return {
            id: data.user.id,
            name: data.user.username,
            // blocked: data.user.blocked,
          };
        } catch (error) {
          // console.error('Authorize error:', error);
          if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data?.msg || "Invalid login credentials";
            throw new Error(errorMessage);
          }
          
          throw new Error("An unexpected error occurred");
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
        // token.accessToken = user.token;
        token.userId = user.id;
        // token.username = user.username;
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

      // session.accessToken = token.accessToken;
      session.provider = token.provider;
      session.userId = token.userId;
      // session.blocked = token.blocked;

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
