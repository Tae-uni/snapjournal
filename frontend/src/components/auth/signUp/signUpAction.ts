"use server";

import axios from "axios";
import { redirect } from "next/navigation";
import { z } from "zod";
import { SignUpFormStateT } from "./signUpForm";

const formSchema = z.object({
  username: z.string()
    .min(2, { message: "Min 2 characters" })
    .max(30, { message: "Max 30 characters" }).trim(),
  email: z.string()
    .email('Enter a valid email.').trim(),
  password: z.string()
    .min(6)
    .regex(/[A-Za-z]/, { message: "Password must contain a letter" })
    .regex(/[0-9]/, { message: 'Password must contain a number.' })
    .max(30, { message: "Max 30 characters" }).trim(),
});

export default async function signUpAction(
  prevState: SignUpFormStateT,
  formData: FormData
) {
  const validatedFields = formSchema.safeParse({
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      error: true,
      fieldErrors: validatedFields.error.flatten().fieldErrors,
      message: 'Please verify your data',
    };
  }

  const { username, email, password } = validatedFields.data;

  try {
    const strapiResponse = await axios.post(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/local/register`,
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

      // check if response in Json-able and basically, axios returns the json
      if (strapiResponse.data && strapiResponse.data.error) {
        response.message = strapiResponse.statusText;
      }
      return response;
    }
  } catch (err) {
    const error = err as any;
    // network error or sth
    return {
      error: true,
      message: axios.isAxiosError(error) && error.response ? error.response.data.message : error.message,
    };
  }

  redirect('/confirmation/message');
}