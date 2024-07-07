"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function SignUpForm() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 bg-gray-50 rounded-lg">
        <form>
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
                <Input type="text" id="username" name="username" placeholder="username" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input type="email" id="email" name="email" placeholder="example@test.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input type="password" id="password" name="password" placeholder="password" />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Sign Up</Button>
            </CardFooter>
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