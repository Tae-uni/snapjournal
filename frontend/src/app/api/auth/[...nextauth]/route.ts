import axios from 'axios';
import { CredentialsProvider } from 'next-auth/providers/credentials';
import NextAuth from 'next-auth';

const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        try {
          const res = await axios.post(`${process.env.STRAPI_API_URL}/auth/local`, {
            identifier: credentials.email,
            password: credentials.password,
          });

          const user = res.data.user;
          if (user) {
            return user;
          } else {
            return null;
          }
        } catch (error) {
          return null;
        }
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    jwt: true,
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  pages: {
    signIn: '/auth/login',
    signOut: 'auth/logout',
    error: '/auth/error',
    verifyRequest: '/auth/verify-request',
    newUser: null,
  },
};

export { authOptions as GET, authOptions as POST };