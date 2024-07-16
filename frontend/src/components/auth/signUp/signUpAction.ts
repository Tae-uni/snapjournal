"use server";

import axios from "axios";
import { z } from "zod";
import { redirect } from "next/navigation";
import { SignUpFormStateT } from "./signUpForm";

const formSchema = z.object({
  username: z.string()
    .min(2, { message: "Min 2 characters" })
    .max(30, { message: "Max 30 characters" }).trim(),
  email: z.string()
    .email('Enter a valid email.').trim(),
  password: z.string()
    .min(6, { message: "Min 6 characters" })
    .regex(/[A-Za-z]/, { message: "Password must contain a letter" })
    .regex(/[0-9]/, { message: 'Password must contain a number.' })
    .max(30, { message: "Max 30 characters" }).trim(),
});

export default async function signUpAction(
  prevState: SignUpFormStateT,
  formData: FormData
) {
  const formDataWithoutConfirmPassword = new FormData();
  formDataWithoutConfirmPassword.append("username", formData.get("username") as string);
  formDataWithoutConfirmPassword.append("email", formData.get("email") as string);
  formDataWithoutConfirmPassword.append("password", formData.get("password") as string);

  const validatedFields = formSchema.safeParse({
    username: formDataWithoutConfirmPassword.get('username'),
    email: formDataWithoutConfirmPassword.get('email'),
    password: formDataWithoutConfirmPassword.get('password'),
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
    const strapiResponse = await axios.post(
      process.env.NEXT_PUBLIC_STRAPI_URL + `/api/auth/local/register`,
      {
        username,
        email,
        password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    // handle strapi error
    if (strapiResponse.status !== 200) {
      const response = {
        error: true,
        message: '',
      };

      // check if response is JSON-able
      if (strapiResponse.data && strapiResponse.data.error) {
        const errorMessage = strapiResponse.data.error.message;
        if (errorMessage.includes('email')) {
          response.message = 'Email already exists.';
        } else if (errorMessage.includes('username')) {
          response.message = 'Username already exists.';
        } else {
          response.message = errorMessage;
        }
      } else {
        response.message = strapiResponse.statusText;
      }
      return response;
    }
  } catch (error: any) {
    // network error or something
    const response = {
      error: true,
      message: '',
    };
    if (axios.isAxiosError(error)) {
      if (error.response) {
        const contentType = error.response.headers['content-type'];
        if (contentType && contentType.includes('application/json')) {
          if (error.response.data.error.message.includes('email')) {
            response.message = 'Email already exists.';
          } else if (error.response.data.error.message.includes('username')) {
            response.message = 'Username already exists.';
          } else {
            response.message = error.response.data.error.message;
          }
        } else {
          response.message = error.response.statusText;
        }
      } else {
        response.message = error.message;
      }
    } else {
      response.message = error.message;
    }
    return response;
  }

  redirect('/confirmation/message');
}