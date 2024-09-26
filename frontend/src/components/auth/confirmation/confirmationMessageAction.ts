"use server";

import { getCookie } from "@/lib/authCookie";
import { axiosInstance } from "@/lib/axiosInstance";
import { cookies } from "next/headers";

export async function resendAction() {
  try {

    const jwtToken = cookies().get('auth')?.value
    // console.log('JWT Token:', jwtToken);

    if (!jwtToken) {
      console.error('JWT token not found in cookies.');
      return false;
    }

    console.log('Token get:', jwtToken);

    const response = await axiosInstance.post('/api/auth/local/resend-confirmation',
      {},
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        withCredentials: true, // HTTP-Only Cookie
      }
    );

    return response.status === 200;
  } catch (error) {
    console.error('Error resending email:', error);
    return false;
  }
};
