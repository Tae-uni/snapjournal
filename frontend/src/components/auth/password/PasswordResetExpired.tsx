"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PasswordResetExpired() {
  const [isPending, setIsPending] = useState(false);

  const handleButtonClick = () => {
    setIsPending(true);
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
          <CardFooter className="flex flex-col space-y-2 mt-2">
            <Link href="/password/requestreset" passHref>
              <Button onClick={handleButtonClick} className="w-full" disabled={isPending}>
                {isPending ? "Requesting..." : "Request New Link"}
              </Button>
            </Link>
            <Link href="/signin" passHref>
              <Button className="w-full" onClick={handleButtonClick} disabled={isPending}>
                {isPending ? "Redirecting..." : "Back to Sign In"}
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}