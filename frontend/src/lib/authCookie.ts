import { cookies } from "next/headers"

export const getCookie = (cookieName: string): string | undefined => {
  return cookies().get(cookieName)?.value;
};