"use client"

import Link from "next/link"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components//ui/input"
import { Button } from "@/components//ui/button"

export function SignInForm() {

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 bg-gray-50 rounded-lg">
        <form>
          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-3xl font-bold">Sign In</CardTitle>
              <CardDescription className="space-y-4">
                Enter your details to sign in to your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="identifier" name="identifier" type="email" placeholder="Put the email" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" placeholder="Put the password" />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col">
              <Button className="w-full">Sign In</Button>
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