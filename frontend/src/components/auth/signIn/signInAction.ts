"use server";

import axiosInstance from "@/lib/axiosInstance";

export default async function signInAction(identifier: string, password: string) {
  try {
    const response = await axiosInstance.post('/api/auth/local', {
      identifier,
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
        name: data.user.username,
        email: data.user.email,
        id: data.user.id.toString(),
        strapiUserId: data.user.id,
        blocked: data.user.blocked,
        strapiToken: data.jwt,
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