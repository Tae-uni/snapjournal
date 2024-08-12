'use client';

import { useFormState, useFormStatus } from "react-dom";

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

const initialState: RequestPasswordResetFormStateT = {
  error: false,
  message: "",
};

function SubmitBtn() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending} aria-disabled={pending}>
      Send Reset Link
    </Button>
  )
}

export default function ForgotPassword() {
  const [state, formAction] = useFormState<RequestPasswordResetFormStateT, FormData>(requestPasswordResetAction, initialState);

  if (!state.error && state.message === 'Success') {
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
        <form action={formAction}>
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
              {state.error && state?.inputErrors?.email ? (
                <div className="text-red-500" aria-live="polite">
                  {state.inputErrors.email[0]}
                </div>
              ) : null}
              <SubmitBtn />
              {state.error && state.message ? (
                <div className="text-red-500" aria-live="polite">
                  {state.message}
                </div>
              ) : null}
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  )
}