"use server";

import axios from "axios";

import { axiosInstance } from "@/lib/axiosInstance";
import { formSchema } from "@/components/utils/validationSchemas";

import { SignUpFormStateT } from "./SignUpForm";

interface ErrorResponseData {
  code?: string;
  message?: string;
}

export default async function signUpAction(
  prevState: SignUpFormStateT,
  formData: FormData
): Promise<SignUpFormStateT> {
  // Validate form data using zod schema
  const validatedFields = formSchema.safeParse({
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      error: true,
      inputErrors: validatedFields.error.flatten().fieldErrors,
      message: 'Please verify your data',
    };
  }

  const { username, email, password } = validatedFields.data;

  try {
    // Send sign-up request to Strapi API
    const response = await axiosInstance.post(
      '/api/auth/register',
      {
        username, email, password
      });

    console.log('Response Status:', response.status);
    console.log('Response Data:', response.data);

    if (response.status === 201) {
      const { registrationAccessToken } = response.data;
      // if (registrationAccessToken) {
      //   sessionStorage.setItem('accessToken', registrationAccessToken);
      //   console.log('Access token stored in session storage: ', registrationAccessToken);
      // }

      return {
        error: false, message: 'Success!', registrationAccessToken,
      };
    }
    return { error: true, message: 'Error during registration process' };

  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const responseData = error.response.data as ErrorResponseData; // Type assertion
      const errorCode = responseData.code;

      if (errorCode) {
        switch (errorCode) {
          case "EMAIL_EXIST":
            return { error: true, message: 'An account with this email already exists.' };
          case "REGISTRATION_ERROR":
            return { error: true, message: 'Registration failed. Please try again later.' };
          default:
            return { error: true, message: 'An unknown error occurred. Please try again later.' };
        }
      }
    }
    return {
      error: true,
      message: (error as Error).message || 'An unknown error occurred.',
    }
  }
};