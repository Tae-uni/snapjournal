"use server";

import axiosInstance from "@/lib/axiosInstance";
import axios from "axios";

export const resendConfirmationEmail = async () => {
  try {
    const response = await axios.post('http://localhost:8000/api/auth/local/resend-confirmation',
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
