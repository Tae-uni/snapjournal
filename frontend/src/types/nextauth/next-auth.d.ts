import { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module 'next-auth' {
  interface Session {
    accessToken?: string;
    provider?: 'credentials' | 'google';
    userId?: string;
    blocked?: boolean
  }

  interface User extends DefaultSession['user'] {
    userId?: string;
    token?: string;
    blocked?: boolean;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    userId?: string;
    blocked?: boolean;
    accessToken?: string;
    provider?: 'credentials' | 'google';
  }
}