"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PasswordResetExpired() {
  const [request, setRequest] = useState(false);
  const [signIn, setSignIn] = useState(false);

  const handleRequestClick = () => {
    setRequest(true);
  };

  const handleSignInClick = () => {
    setSignIn(true);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8">
        <Card className="max-w-md w-full p-6">
          <Image src="/images/warning.png" alt="Expired" width={500} height={300} className="mb-3" />
          <CardHeader className="space-y-1 text-center">
            <CardTitle>Link Expired</CardTitle>
            <CardDescription>
              The link you used is no longer valid.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-center">
            The password reset link is no longer valid. Please request a new link to reset your password.
          </CardContent>
          <CardFooter className="flex flex-col space-y-2 mt-2 w-full">
            <Button asChild variant="default" onClick={handleRequestClick} disabled={request} className="w-full">
              <Link href="/password/request-reset">
                {request ? "Loading..." : "Request New Link"}
              </Link>
            </Button>
            <Button asChild variant="secondary" onClick={handleSignInClick} disabled={signIn} className="w-full">
              <Link href="/signin">
                {signIn ? "Loading..." : "Back to Sign In"}
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div >
  );
}