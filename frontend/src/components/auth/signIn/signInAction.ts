"use server";

import { axiosInstance } from "@/lib/axiosInstance";

export default async function signInAction(email: string, password: string) {
  try {
    const response = await axiosInstance.post('/api/auth/signin', {
      email,
      password,
      redirect: false,
    });

    if (response.status !== 200) {
      throw new Error(response.statusText || 'Unknown error');
    }

    const data = response.data;
    
    return {
      ok: true,
      data: {
        id: data.user.id,
        name: data.user.username,
        email: data.user.email,
        token: data.token,
        blocked: data.user.blocked,
      }
    };
    // ('credentials', {
    //   identifier,
    //   password,
    //   redirect: false,  // Prevent to redirecting to /auth/error
    //   axios: axiosInstance,
    // });
  } catch (error) {
    console.error('Error during sign-in:', error);

    let errorMessage = 'An unknown error occurred';

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return { ok: false, error: errorMessage };
  }
}