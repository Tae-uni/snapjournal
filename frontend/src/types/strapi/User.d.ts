export type ExpressUserT = {
  id: string;
  username: string;
  email: string;
  blocked: boolean;
  provider: 'local' | 'google';
};

export type ExpressLoginResponseT = {
  jwt: string;
  user: StrapiUserT;
};