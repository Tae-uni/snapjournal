import axios from 'axios';
import NextAuth, { AuthOptions, NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { NextRequest, NextResponse } from 'next/server';

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        try {
          const res = await axios.post(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/local`, {
            identifier: credentials?.email,
            password: credentials?.password,
          });

          const user = res.data.user;
          if (user) {
            return { id: user.id, email: user.email, jwt: res.data.jwt };
          } else {
            return null;
          }
        } catch (error) {
          console.error('Error during sign-in:', error);
          return null;
        }
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
    verifyRequest: '/api/auth/verify-request',
    newUser: undefined,
  },
  callbacks: {
    async jwt({ token, user }: { token: any, user: any }) {
      if (user) {
        token.jwt = user.jwt;
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }: { session: any, token: any }) {
      session.user = { id: token.id, email: token.email };
      session.jwt = token.jwt;
      return session;
    }
  }
};

export const GET = async (req: NextRequest) => {
  return NextAuth(authOptions)(req, NextResponse.next());
};

export const POST = async (req: NextRequest) => {
  return NextAuth(authOptions)(req, NextResponse.next());
};