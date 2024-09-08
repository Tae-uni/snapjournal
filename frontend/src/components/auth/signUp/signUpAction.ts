"use server";

import { AxiosResponse, AxiosError } from "axios";

import axiosInstance from "@/lib/axiosInstance";

import { formSchema } from "@/components/utils/validationSchemas";

import { SignUpFormStateT } from "./SignUpForm";

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
    console.log('Request URL:', `${axiosInstance.defaults.baseURL}/api/auth/local/registers`);

    // Send sign-up request to Strapi API
    const strapiResponse = await axiosInstance.post(
      `/api/auth/local/registers`,
      { username, email, password },
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true, // Important to allow cookies to be set
      }
    );

    console.log('Strapi Response Status:', strapiResponse.status);
    console.log('Strapi Response Data:', strapiResponse.data);

    if (strapiResponse.headers['set-cookie']) {
      console.log('Session cookie set successfully.');
      return { error: false, message: 'Success!'};
    } else {
      throw new Error ('Session cookie not set');
    }

  } catch (error) {
    console.error('Axios Error:', error);
    return handleAxiosError(error as AxiosError);
  }
};

// Handle Strapi response and extract error messages
function handleStrapiResponse(response: AxiosResponse): SignUpFormStateT | null {
  if (response.status !== 200) {
    return extractErrorMessage(response.data);
  }
  return null;
}

// Handle Axios errors and extract error messages
function handleAxiosError(error: AxiosError): SignUpFormStateT {
  if (error.response) {
    return extractErrorMessage(error.response.data);
  }
  return {
    error: true,
    message: error.message,
  };
}

function extractErrorMessage(data: any): SignUpFormStateT {
  const result = {
    error: true,
    message: '',
  };

  if (data && data.error) {
    const errorMessage = data.error.message;
    if (errorMessage.includes('email')) {
      result.message = 'Email already exists.';
    } else if (errorMessage.includes('username')) {
      result.message = 'Username already exists.';
    } else {
      result.message = errorMessage;
    }
  } else {
    result.message = 'An unknown error occurred.';
  }

  return result;
}