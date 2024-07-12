import { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";
import { StrapiUserT } from "../strapi/User";

declare module 'next-auth' {
  interface Session {
    strapiToken?: string;
    provider?: 'credentials';
    user: User;
  }

  interface User extends DefaultSession['user'] {
    strapiUserId?: number;
    strapiToken?: string;
    blocked?: boolean;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    strapiUserId?: number;
    blocked?: boolean;
    strapiToken?: string;
    provider?: 'credentials';
  }
}