"use server";

import axiosInstance from "@/lib/axiosInstance";

export const resendConfirmationEmail = async () => {
  try {
    const response = await axiosInstance.post(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/local/resend-confirmation`,
      {},
      // { withCredentials: true }
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
