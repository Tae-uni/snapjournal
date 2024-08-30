"use server";

import { ResetPasswordFormStateT } from "./ResetPassword";
import { resetPasswordSchema } from "@/components/utils/validationSchemas";

import axiosInstance from "@/lib/axiosInstance";

export default async function resetPasswordAction(
  prevState: ResetPasswordFormStateT,
  formData: FormData
): Promise<ResetPasswordFormStateT> {
  
  console.log('resetPasswordAction called');

  const validatedFields = resetPasswordSchema.safeParse({
    password: formData.get('password'),
    token: formData.get('token'),
  });
  
  if (!validatedFields.success) {
    console.log('Validation failed:', validatedFields.error.flatten().fieldErrors);

    return {
      error: true,
      message: 'Please verify your data.',
      inputErrors: validatedFields.error.flatten().fieldErrors,
      // code: prevState.code,
    };
  }
  
  const { password, token } = validatedFields.data;

  console.log('Token:', prevState.code);
  console.log('Password:', password);

  try {
    console.log('Sending request to server...');
    const strapiResponse = await axiosInstance.post(`/api/auth/local/reset-password`,
      {
        newPassword: password,
        token: token,
      },
    );

    console.log('Server response:', strapiResponse);

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