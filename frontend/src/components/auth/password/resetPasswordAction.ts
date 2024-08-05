'use server';

import { z } from "zod";
import axios from "axios";

import { ResetPasswordFormStateT } from "./ResetPassword";

const formSchema = z.object({
  password: z.string().min(6).max(30).trim(),
  token: z.string(),
});

export default async function resetPasswordAction(
  prevState: ResetPasswordFormStateT,
  formData: FormData
): Promise<ResetPasswordFormStateT> {
  const validatedFields = formSchema.safeParse({
    password: formData.get('password'),
    token: formData.get('token'),
  });
  
  if (!validatedFields.success) {
    return {
      error: true,
      message: 'Please verify your data.',
      inputErrors: validatedFields.error.flatten().fieldErrors,
      code: prevState.code,
    };
  }
  const { password, token } = validatedFields.data;

  console.log('Token:', prevState.code); 
  console.log('Password:', password);

  try {
    console.log('Sending request to server...');
    const strapiResponse = await axios.post(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/local/reset-password`,
      {
        password,
        code: token,
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