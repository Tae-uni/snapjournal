"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function PasswordResetExpired() {
  const [isButton, setIsButton] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsButton(false)
  }, []);

  const handleClick = (path: string) => {
    setIsButton(true);
    router.push(path);
  }

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
            <Button variant="default" onClick={() => handleClick('/password/request-reset')} disabled={isButton} className="w-full">
              Request New Link
            </Button>
            <Button variant="secondary" onClick={() => handleClick('/signin')} disabled={isButton} className="w-full">
              Back to Sign In
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div >
  );
}