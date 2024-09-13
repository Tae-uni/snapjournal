"use server";

import axiosInstance from "@/lib/axiosInstance";

export const resendConfirmationEmail = async () => {
  try {
    const response = await axiosInstance.post('/api/auth/local/resend-confirmation',
      {},
      {
        withCredentials: true, // HTTP-Only Cookie
      }
    );
    return response.status === 200;
  } catch (error) {
    console.error('Error resending email:', error);
    return false;
  }
};
