'use server';

import { z } from "zod";
import axios from "axios";

import { ResetPasswordFormStateT } from "./ResetPassword";

const formSchema = z.object({
  password: z.string().min(6).max(30).trim(),
  passwordConfirmation: z.string().min(6).max(30).trim(),
});

export default async function resetPasswordAction(
  prevState: ResetPasswordFormStateT,
  formData: FormData
) {
  const validatedFields = formSchema.safeParse({
    password: formData.get('password'),
    passwordConfirmation: formData.get('passwordConfirmation'),
  });
  if (!validatedFields.success) {
    return {
      error: true,
      message: 'Please verify your data.',
      inputErrors: validatedFields.error.flatten().fieldErrors,
      code: prevState.code,
    };
  }
  const { password, passwordConfirmation } = validatedFields.data;

  console.log('Token:', prevState.code); 
  console.log('Password:', password);
  console.log('Password Confirmation:', passwordConfirmation);

  try {
    const strapiResponse = await axios.post(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/local/reset-password`,
      {
        password,
        passwordConfirmation,
        code: prevState.code,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    // handle strapi error
    if (strapiResponse.status !== 200) {
      return {
        error: true,
        message: strapiResponse.statusText,
        code: prevState.code,
      };
    }

    // success
    return {
      error: false,
      message: 'Success',
    };
  } catch (error: any) {
    return {
      error: true,
      message: 'message' in error ? error.message : error.statusText,
      code: prevState.code,
    };
  }
}