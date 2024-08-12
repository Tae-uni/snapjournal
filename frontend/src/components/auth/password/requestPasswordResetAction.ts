'use server';

import axios from 'axios';
import { z } from 'zod';

import { RequestPasswordResetFormStateT } from './RequestPasswordReset';

const formSchema = z.object({
  email: z.string().email('Enter a valid email.').trim(),
});

export default async function requestPasswordResetAction(
  prevState: RequestPasswordResetFormStateT,
  formData: FormData
): Promise<RequestPasswordResetFormStateT> {
  const validatedFields = formSchema.safeParse({
    email: formData.get('email'),
  });

  if (!validatedFields.success) {
    return {
      ...prevState,
      error: true,
      message: 'Please verify your data.',
      inputErrors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { email } =  validatedFields.data;

  try {
    const strapiResponse = await axios.post(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/local/forgot-password`,
      { email },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (strapiResponse.status !== 200) {
      return {
        ...prevState,
        error: true,
        message: strapiResponse.statusText,
      };
    }

    return {
      ...prevState,
      error: false,
      message: 'Success',
    };
  } catch (error: any) {
    return {
      ...prevState,
      error: true,
      message: error.response?.data?.error?.message || error.message,
    };
  }
}