"use server";

import axiosInstance from "@/lib/axiosInstance";
import axios from "axios";
import { cookies } from "next/headers";

export const resendConfirmationEmail = async () => {
  try {
    // if (typeof window !== 'undefined') {
    //   throw new Error("This function should be executed only on the server.");
    // }

    // const jwtToken = cookies().get("jwt")?.value;
    // console.log('JWT Token:', jwtToken);

    // if (!jwtToken) {
    //   console.error('JWT token not found in cookies.');
    //   return false;
    // }

    const response = await axiosInstance.post('/api/auth/local/resend-confirmation',
      {},
      {
        // headers: {
        //   Authorization: `Bearer ${jwtToken}`,
        // },
        withCredentials: true, // HTTP-Only Cookie
      }
    );

    return response.status === 200;
  } catch (error) {
    console.error('Error resending email:', error);
    return false;
  }
};
