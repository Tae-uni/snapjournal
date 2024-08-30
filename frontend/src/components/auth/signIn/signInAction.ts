"use server";

import axiosInstance from "@/lib/axiosInstance";
import { signIn } from "next-auth/react";

export default async function signInAction(identifier: string, password: string) {
  try {
    const response = await signIn('credentials', {
      identifier,
      password,
      redirect: false,  // Prevent to redirecting to /auth/error
      axios: axiosInstance,
    });

    return response;
  } catch (error) {
    console.error('Error during sign-in:', error);

    let errorMessage = 'An unknown error occurred';

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return { ok: false, error: errorMessage };
  }
}