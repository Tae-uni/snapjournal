"use client"

import Link from "next/link";
import { useEffect, useState } from "react";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useFormState, useFormStatus } from "react-dom";
import signUpAction from "./signUpAction";

// We need to think every return value of the server action(initialState)
// In this project(signUpAction): only returns when there's an error such as Strapi or catch error. In case of success, it won't return but redirect.

type InputErrorsT = {
  username?: string[];
  email?: string[];
  password?: string[];
};

type SignUpFormInitialStateT = {
  error: false;
};

type SignUpFormErrorStateT = {
  error: true;
  message: string;
  inputErrors?: InputErrorsT;
};

export type SignUpFormStateT = SignUpFormInitialStateT | SignUpFormErrorStateT;

const initialState: SignUpFormInitialStateT = {
  error: false,
};

export default function SignUpForm() {
  const [state, formAction] = useFormState<SignUpFormStateT, FormData>(
    signUpAction,
    initialState,
  );

  const { pending } = useFormStatus();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  useEffect(() => {
    setPasswordMismatch(password !== confirmPassword);
  }, [password, confirmPassword]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8">
        <form action={formAction}>
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-3xl font-bold">Sign Up</CardTitle>
              <CardDescription>
                Enter your details to create a new account!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="username"
                  required
                />
                {state.error && state?.inputErrors?.username ? (
                  <div className="text-red-500 text-sm min-h-[20px]" aria-live="polite">
                    {state.inputErrors.username[0]}
                  </div>
                ) : null}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="example@test.com"
                />
                {state.error && state?.inputErrors?.email ? (
                  <div className="text-red-500 text-sm min-h-[20px]" aria-live="polite">
                    {state.inputErrors.email[0]}
                  </div>
                ) : null}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {state.error && state?.inputErrors?.password ? (
                  <div className="text-red-500 text-sm min-h-[20px]" aria-live="polite">
                    {state.inputErrors.password[0]}
                  </div>
                ) : null}
              </div>
              {/* <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  type="password"
                  id="confirm-password"
                  name="confirm-password"
                  placeholder="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {passwordMismatch && confirmPassword !== "" && (
                  <div className="text-red-500 text-sm min-h-[20px]" aria-live="polite">
                    Passwords do not match
                  </div>
                )}
              </div> */}
            </CardContent>
            <CardFooter>
              <Button
                type="submit"
                className="w-full"
                // disabled={pending || passwordMismatch}
                // aria-disabled={pending || passwordMismatch}
              >
                Sign Up
              </Button>
            </CardFooter>
            {state.error && state.message ? (
              <div className="pb-5 text-red-500 text-center text-sm min-h-[20px]" aria-live="polite">
                {state.message}
              </div>
            ) : null}
          </Card>
          <div className="mt-4 text-center text-sm">
            Have an account?
            <Link className="underline ml-2" href="/signin">
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}