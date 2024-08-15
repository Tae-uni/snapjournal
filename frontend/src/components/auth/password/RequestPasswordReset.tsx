"use client";

import { useState } from "react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import requestPasswordResetAction from "./requestPasswordResetAction";

export type RequestPasswordResetFormStateT = {
  error: boolean;
  message: string;
  inputErrors?: { email?: string[] };
}

export default function ForgotPassword() {

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formState, setFormState] = useState<RequestPasswordResetFormStateT>({
    error: false,
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const result = await requestPasswordResetAction(formState, formData);
    setFormState(result);
    setIsSubmitting(false);
  };

  if (!formState.error && formState.message === 'Success') {
    return (
      <div>
        <h2>Check your email</h2>
        <p>
          We sent you an email with a link. Open this link to reset your password.
        </p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8">
        <form onSubmit={handleSubmit}>
          <Card className="max-x-md w-full p-6">
            <CardHeader className="space-y-1">
              <CardTitle className="text-3xl font-bold">
                Forgot Password
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <CardDescription className="text-m mb-4">
                Enter your account email here and we will send you a link to reset your password.
              </CardDescription>
              <Label htmlFor="email">
                Email *
              </Label>
              <Input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email address"
                required
              />
              {formState.error && formState?.inputErrors?.email ? (
                <div className="text-red-500" aria-live="polite">
                  {formState.inputErrors.email[0]}
                </div>
              ) : null}
              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
                aria-disabled={isSubmitting}
              >
                Send Reset Link
              </Button>
              {formState.error && formState.message ? (
                <div className="text-red-500" aria-live="polite">
                  {formState.message}
                </div>
              ) : null}
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  )
}