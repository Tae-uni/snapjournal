"use server";

import axiosInstance from "@/lib/axiosInstance";

export const resendConfirmationEmail = async (token: string) => {
  try {
    const response = await axiosInstance.post(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/local/resend-confirmation`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200) {
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error resending email:', error);
    return false;
  }
};
