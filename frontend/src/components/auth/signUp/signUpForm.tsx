"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { formSchema } from "@/components/utils/validationSchemas";

import signUpAction from "./signUpAction";

interface TokenPayload {
  exp: number;
  userId: string;
}

type InputErrorsT = {
  username?: string[];
  email?: string[];
  password?: string[];
};

export type SignUpFormStateT = {
  error: boolean;
  message: string;
  inputErrors?: InputErrorsT;
  registrationAccessToken?: string;
};

export default function SignUpForm() {
  const [formState, setFormState] = useState<SignUpFormStateT>({
    error: false,
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [inputErrors, setInputErrors] = useState<InputErrorsT>({});

  const router = useRouter();

  useEffect(() => {
    setPasswordMismatch(password !== confirmPassword);
  }, [password, confirmPassword]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    // Remove confirm-password before sending to server
    formData.delete('confirm-password');

    // Validate form data
    const validateFields = formSchema.safeParse({
      username: formData.get('username'),
      email: formData.get('email'),
      password: formData.get('password'),
    });

    if (!validateFields.success) {
      setInputErrors(validateFields.error.flatten().fieldErrors);
      setIsSubmitting(false);
      return;
    }

    setInputErrors({}); // Clear previous errors

    try {
      const result = await signUpAction(formState, formData);
      setFormState(result);

      if (!result.error && result.registrationAccessToken) {
        sessionStorage.setItem("regAccessToken", result.registrationAccessToken);
        // Check token validity before redirecting.
        if (isTokenValid(result.registrationAccessToken)) {
          router.push('/confirmation/message');
        } else {
          // If the token is invalid, remove it from session with error.
          setFormState({ error: true, message: "Token expired. Please request a new verification email. " });
          sessionStorage.removeItem("regAccessToken");
        }
      }
    } catch (error) {
      setFormState({
        error: true,
        message: 'An unexpected error occurred. Please try again.',
        inputErrors: {},
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Check token validity
  const isTokenValid = (token: string) => {
    try {
      const decoded = jwtDecode<TokenPayload>(token);
      const currentTime = Date.now() / 1000;
      return decoded.exp > currentTime;
    } catch (error) {
      return false;
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8">
        <form onSubmit={handleSubmit}>
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
                  placeholder="Enter your username"
                  required
                  className={inputErrors.username ? "border-red-500" : ""}
                />
                {inputErrors.username && (
                  <div className="text-red-500 text-sm min-h-[20px]" aria-live="polite">
                    {inputErrors.username[0]}
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email address"
                  className={inputErrors.email ? "border-red-500" : ""}
                />
                {inputErrors.email && (
                  <div className="text-red-500 text-sm min-h-[20px]" aria-live="polite">
                    {inputErrors.email[0]}
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password (min 6 characters)"
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
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  type="password"
                  id="confirm-password"
                  name="confirm-password"
                  placeholder="Confirm your password"
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
                Sign Up
              </Button>
            </CardFooter>
            {formState.error && formState.message ? (
              <div className="pb-5 text-red-500 text-center text-sm min-h-[20px]" aria-live="polite">
                {formState.message}
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