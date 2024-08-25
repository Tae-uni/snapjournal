"use client"

import { z } from "zod";
import Link from "next/link"
import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components//ui/input"
import { Button } from "@/components//ui/button"

type FormErrorT = {
  identifier?: undefined | string[];
  password?: undefined | string[];
  strapiError?: string;
};

const initialState = {
  identifier: '',
  password: '',
};

const formSchema = z.object({
  identifier: z.string().min(2).max(30),
  password: z
    .string().min(6, { message: 'at least 6 characters long.' })
    .max(30),
});

export function SignInForm() {
  const [data, setData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrorT>({});
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const router = useRouter();

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const validatedFields = formSchema.safeParse(data);

    if (!validatedFields.success) {
      setErrors(validatedFields.error.formErrors.fieldErrors);
      setLoading(false);
    } else {
      // if validatedFields...
      const signInResponse = await signIn('credentials', {
        identifier: data.identifier,
        password: data.password,
        redirect: false,  // Prevent to redirecting to /auth/error
      });
      if (signInResponse && !signInResponse?.ok) {
        setErrors({
          strapiError: 'Invalid ID or Password',
        });
        setLoading(false);
      } else {
        // handle success
        router.push(callbackUrl);
        router.refresh();
      }
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8">
        <form onSubmit={handleSubmit} method="post">
          <Card className="min-h-[450px]">
            <CardHeader className="space-y-1">
              <CardTitle className="text-3xl font-bold">Sign In</CardTitle>
              <CardDescription className="space-y-4">
                Enter your details to sign in to your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="identifier">Email</Label>
                <Input
                  id="identifier"
                  name="identifier"
                  type="email"
                  placeholder="Put the email"
                  value={data.identifier}
                  required
                  onChange={handleChange}
                />
                {errors?.identifier && (
                  <div className="text-red-500 text-sm min-h-[20px]" aria-live="polite">
                    {errors.identifier[0]}
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Put the password"
                  required
                  value={data.password}
                  onChange={handleChange}
                />
                {errors?.password && (
                  <div className="text-red-500 text-sm min-h-[20px]" aria-live="polite">
                    {errors.password[0]}
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col">
              <Button
                type="submit"
                className="w-full mb-1"
                disabled={loading}
                aria-disabled={loading}
              >
                Sign In
              </Button>
              {errors.password || errors.identifier ? (
                <p className="mt-4 text-center text-red-500 text-sm">
                  Please check your data.
                </p>
              ) : null}
              {errors.strapiError ? (
                <p className="mt-4 text-center text-red-500 text-sm">
                  {errors.strapiError}
                </p>
              ) : null}
              <Button
                className="bg-white border border-zinc-300 rounded-md w-full text-zinc-700 hover:bg-gray-100"
                onClick={() => signIn('google', { callbackUrl: callbackUrl })}
              >
                <span className="text-red-600 mr-2">G</span>Sign in with Google
              </Button>
              <Link className="underline ml-2" href="/password/request-reset">
                Forgot password?
              </Link>
            </CardFooter>
          </Card>
          <div className="mt-4 text-center text-sm">
            Don't have an account?
            <Link className="underline ml-2" href="/signup">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}