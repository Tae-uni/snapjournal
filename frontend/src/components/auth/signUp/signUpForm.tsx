"use client"

import Link from "next/link";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

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

export function SignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const router = useRouter();

  const [state, formAction] = useFormState<SignUpFormStateT, FormData>(
    signUpAction,
    initialState,
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setPasswordMismatch(true);
      return;
    }

    setPasswordMismatch(false);

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/local/register`, {
        username, email, password,
      });

      if (response.data.user) {
        const result = await signIn('credentials', {
          email,
          password,
          redirect: false,
        });

        if (result?.ok) {
          router.push('/');
        } else {
          setError('Failed to sign in after registration');
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(`Failed to sign up: ${error.response?.data.message}`);
        console.error('Sign up error:', error.response?.data);
      } else {
        setError('Failed to sign up');
        console.error('Sign up error:', error);
      }
    }
  };

  const { pending } = useFormStatus();

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 bg-gray-50 rounded-lg">
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
                />
                {state.error && state?.inputErrors?.password ? (
                  <div className="text-red-500 text-sm min-h-[20px]" aria-live="polite">
                    {state.inputErrors.password[0]}
                  </div>
                ) : null}
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input type="password" id="confirm-password" name="confirm-password" placeholder="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full" disabled={pending} aria-disabled={pending}>Sign Up</Button>
            </CardFooter>
          </Card>
          <div className="mt-4 text-center text-sm">
            Have an account?
            <Link className="underline ml-2" href="/signin">
              Sign In
            </Link>
          </div>
          {passwordMismatch && <p className="mt-4 text-center text-red-500">Passwords do not match</p>}
          {error && <p className="mt-4 text-center text-red-500">{error}</p>}
        </form>
      </div>
    </div>
  );
}