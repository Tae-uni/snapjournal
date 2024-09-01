"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function SuccessMessage() {
  const [signIn, setSignIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setSignIn(false);
  }, []);

  const handleSignInClick = () => {
    setSignIn(true);
    router.push('/signin');
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8">
        <Card className="max-w-md w-full p-6">
          <Image src="/images/email_verified.png" alt="Verified" width={500} height={300} className="mb-3" />
          <CardHeader className="space-y-1 text-center">
            <CardTitle>Welcome!</CardTitle>
            <CardDescription>Your email has been successfully verified.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-center">
            You can now log in to your account and start exploring all the features we offer.
          </CardContent>
          <CardFooter>
            <Button className="w-full" onClick={handleSignInClick} disabled={signIn}>
              Go to Sign In
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}