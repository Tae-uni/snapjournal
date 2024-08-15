"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { resetPasswordSchema } from "@/components/utils/validationSchemas";

import resetPasswordAction from "./resetPasswordAction";

type InputErrorsT = {
  password?: string[];
  confirmPassword?: string[];
};

export type ResetPasswordFormStateT = {
  error: boolean;
  message?: string;
  inputErrors?: InputErrorsT;
  code?: string;
};

export default function ResetPassword() {
  const searchParams = useSearchParams();
  const code = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [inputErrors, setInputErrors] = useState<InputErrorsT>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formState, setFormState] = useState<ResetPasswordFormStateT>({
    error: false,
    message: "",
    code: code || "",
  });

  useEffect(() => {
    setPasswordMismatch(password !== confirmPassword);
  }, [password, confirmPassword]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    formData.delete('confirm-password');

    if (code) {
      formData.append('token', code);
    }

    const validateFields = resetPasswordSchema.safeParse({
      password: formData.get('password'),
      token: formData.get('token'),
    });

    if (!validateFields.success) {
      setInputErrors(validateFields.error.flatten().fieldErrors);
      setIsSubmitting(false);
      return;
    }

    setInputErrors({});
    try {
      const result = await resetPasswordAction(formState, formData);
      setFormState(result);
      if (result.error && result.inputErrors) {
        setInputErrors(result.inputErrors);
      }
    } catch (error) {
      setFormState({
        error: true,
        message: 'An unexpected error occurred. Please try again.',
        inputErrors: {},
        code: code || "",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!code) return <p>Error, please use the link we mailed you.</p>

  if (!formState.error && formState.message === 'Success') {
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
                <Label htmlFor="confirm-password">
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
                disabled={isSubmitting || passwordMismatch}
                aria-disabled={isSubmitting || passwordMismatch}
              >
                Reset
              </Button>
            </CardFooter>
            {formState.error && formState.message ? (
              <div className="text-red-500" aria-live="polite">
                Error: {formState.message}
              </div>
            ) : null}
          </Card>
        </form>
      </div>
    </div>
  );
}