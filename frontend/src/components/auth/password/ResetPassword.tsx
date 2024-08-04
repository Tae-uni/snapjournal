'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { useFormState, useFormStatus } from "react-dom";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { formSchema } from "@/components/utils/validationSchemas";

import resetPasswordAction from "./resetPasswordAction";

type Props = {
  code: string | undefined;
};

type InputErrorsT = {
  password?: string[];
  passwordConfirmation?: string[];
};

export type ResetPasswordFormStateT = {
  error: boolean;
  message?: string;
  inputErrors?: InputErrorsT;
  code?: string;
};

export default function ResetPassword({ code }: Props) {
  const initialState: ResetPasswordFormStateT = {
    error: false,
    code: code || '',
  };
  const [state, formAction] = useFormState<ResetPasswordFormStateT, FormData>(
    resetPasswordAction,
    initialState
  );

  const { pending } = useFormStatus();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [inputErrors, setInputErrors] = useState<InputErrorsT>({});

  useEffect(() => {
    setPasswordMismatch(password !== confirmPassword);
  }, [password, confirmPassword]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.delete('confirm-password');

    const validateFields = formSchema.safeParse({
      password: formData.get('password'),
    });

    if (!validateFields.success) {
      setInputErrors(validateFields.error.flatten().fieldErrors);
      return;
    }

    setInputErrors({});
    const response = await formAction(formData) as ResetPasswordFormStateT | undefined;
    if (response && response.error && response.inputErrors) {
      setInputErrors(response.inputErrors);
    }
  };

  // if (!code) return <p>Error, please use the link we mailed you.</p>

  if (!state.error && 'message' in state && state.message === 'Success') {
    return (
      <div>
        <h2>Password was reset</h2>
        <p>
          Your password was reset. You can now{' '}
          <Link href='/signin' className="underline">
            sign in
          </Link>{' '}
          with your new password.
        </p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8">
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-3xl font-bold">
                Reset your password
              </CardTitle>
              <CardDescription>
                To reset your password, enter your new password, confirm it by entering it again and then click send.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="password">
                  Password *
                </Label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={inputErrors.password ? "border-red-500" : ""}
                />
                {inputErrors.password && (
                  <div className="text-red-500 text-sm min-h-[20px]" aria-live="polite">
                    {inputErrors.password[0]}
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="passwordConfirmation">
                  Confirm your password *
                </Label>
                <Input
                  type="password"
                  id="confirm-password"
                  name="confirm-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={passwordMismatch ? "border-red-500" : ""}
                />
                {passwordMismatch && confirmPassword !== "" && (
                  <div className="text-red-500 text-sm min-h-[20px]" aria-live="polite">
                    Passwords do not match
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                className="w-full"
                disabled={pending || passwordMismatch}
                aria-disabled={pending || passwordMismatch}
              >
                Submit
              </Button>
            </CardFooter>
            {state.error && state.message ? (
              <div className="text-red-500" aria-live="polite">
                Error: {state.message}
              </div>
            ) : null}
          </Card>
        </form>
      </div >
    </div >
  );
}