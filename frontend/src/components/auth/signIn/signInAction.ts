"use server";

import { axiosInstance } from "@/lib/axiosInstance";

export default async function signInAction(email: string, password: string) {
  try {
    const response = await axiosInstance.post('/api/auth/signin', {
      email,
      password,
      // redirect: false,
    });

    if (response.status !== 200) {
      throw new Error(response.statusText || 'Unknown error');
    }

    const data = response.data;

    return {
      ok: true,
      email: data.user.email,
      token: data.token,
    };
  } catch (error) {
    console.error('Error during sign-in:', error);

    let errorMessage = 'An unknown error occurred';

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return { ok: false, error: errorMessage };
  }
}