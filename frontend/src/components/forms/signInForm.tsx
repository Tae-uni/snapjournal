"use client"

import Link from "next/link"
import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter, useSearchParams } from "next/navigation"
import { z } from "zod";

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
    .string().min(6, { message: 'Password must be at least 8 characters long.' })
    .max(30),
});

export function SignInForm() {
  const [data, setData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  // const [identifier, setIdentifier] = useState('');
  // const [password, setPassword] = useState('');
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
        redirect: false,
      });
      if (signInResponse && !signInResponse?.ok) {
        setErrors({
          strapiError: signInResponse.error ? signInResponse.error : 'Something went wrong.',
        });
        setLoading(false);
      } else {
        router.push(callbackUrl);
        router.refresh();
      }
    }

    // try {
    //   const result = await signIn('credentials', {
    //     redirect: false,
    //     identifier,
    //     password,
    //   })

    //   if (result?.error) {
    //     setError(result.error)
    //   } else {
    //     router.push('/')
    //   }
    // } catch (error) {
    //   setError('Failed to sign in')
    // }
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 bg-gray-50 rounded-lg">
        <form onSubmit={handleSubmit} method="post">
          <Card>
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
                {errors?.identifier ? (
                  <div>
                    {errors.identifier[0]}
                  </div>
                ) : null}
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
                {errors?.password ? (
                  <div>
                    {errors.password[0]}
                  </div>
                ) : null}
              </div>
            </CardContent>
            <CardFooter className="flex flex-col">
              <Button 
                type="submit"
                className="w-full"
                disabled={loading}
                aria-disabled={loading}
              >
                Sign In
              </Button>
            </CardFooter>
            {errors.password || errors.identifier ? (
              <div>
                Something went wrong. Please check your data.
              </div>
            ) : null}
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