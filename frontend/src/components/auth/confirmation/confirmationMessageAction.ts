"use server";

import { axiosInstance } from "@/lib/axiosInstance";

export async function resendAction(registrationAccessToken: string): Promise<{ success: boolean; message?: string }> {
  try {

    const response = await axiosInstance.post('/api/auth/resend-confirmation',
      {},
      {
        headers: {
          Authorization: `Bearer ${registrationAccessToken}`,
        },
      }
    );

    if (response.status === 200) {
      return { success: true };
    } else {
      return { success: false, message: "Failed to resend email." };
    }
  } catch (error) {
    console.error('Error resending email:', error);
    return { success: false, message: "An error occurred." };
  }
};
