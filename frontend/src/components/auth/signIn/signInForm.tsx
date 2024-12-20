"use client"

import { z } from "zod";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components//ui/input"
import { Button } from "@/components//ui/button"
import { FacebookSignInButton, GoogleSignInButton } from "@/components/ui/SNSbuttons";

import 'react-toastify/dist/ReactToastify.css';

const initialState = {
  email: '',
  password: '',
};

const formSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z
    .string().min(6, { message: 'at least 6 characters long.' })
    .max(30, { message: ''}),
});

export function SignInForm() {
  const [data, setData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
    // setErrors({ ...errors, [e.target]})
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Form validation
    const validatedFields = formSchema.safeParse(data);
    if (!validatedFields.success) {
      const fieldErrors = validatedFields.error.formErrors.fieldErrors;
      setErrors({
        email: fieldErrors.email?.[0],
        password: fieldErrors.password?.[0],
        serverError: undefined,
      });
      setLoading(false);
      return;
    }

    // Call NextAuth signIn
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (result?.error) {
      toast.error(result.error, {
        position: "top-center",
        autoClose: 6000,
      });
      setErrors({ serverError: result.error });
      // console.log("Error1:", result?.error);
      // console.log("Error:", setErrors);
    } else {
      router.push("/dashboard");
    }
    setLoading(false);
  }

  return (
    <div className="flex items-center justify-center min-h-screen">
      <ToastContainer />
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
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={data.email}
                  required
                  onChange={handleChange}
                  className={`p-2 border rounded-md w-full ${errors.email ? "border-red-400" : "border-gray-200"
                    }`}
                />
                {errors?.email && (
                  <div className="text-red-500 text-sm min-h-[20px]" aria-live="polite">
                    {errors.email}
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
                  className={`p-2 border rounded-md w-full ${errors.password ? "border-red-400" : "border-gray-200"
                    }`}
                />
                {errors?.password && (
                  <div className="text-red-500 text-sm min-h-[20px]" aria-live="polite">
                    {errors.password}
                  </div>
                )}
              </div>
              {/* {errors.serverError && (
                <div className="text-center text-red-500 text-sm">
                  {errors.serverError}
                </div>
              )} */}
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
              {/* <Button
                className="bg-white border border-zinc-300 rounded-md w-full text-zinc-700 hover:bg-gray-100"
                onClick={() => signIn('google', { callbackUrl: callbackUrl })}
              >
                <span className="text-red-600 mr-2">G</span>Sign in with Google
              </Button> */}
              <GoogleSignInButton />
              {/* <Button
                className="bg-blue-500 border border-zinc-300 rounded-md w-full text-white hover:bg-blue-300"
                onClick={() => signIn('facebook', { callbackUrl:
                  callbackUrl})}
              >
                Sign in with Facebook
              </Button> */}
              <FacebookSignInButton />
              <Link className="underline ml-2 text-xs mt-1.5 text-center" href="/password/request-reset">
                Forgot password?
              </Link>
            </CardFooter>
          </Card>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?
            <Link className="underline ml-2" href="/signup">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}