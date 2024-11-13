"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { resendAction } from './confirmationMessageAction';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

interface TokenPayLoad {
  exp: number;
  userId: string;
}

export default function ConfirmationMessage() {
  const [emailSent, setEmailSent] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const registrationAccessToken = sessionStorage.getItem("regAccessToken");

    if (!registrationAccessToken) {
      console.error("Please try register again.");
      router.push('/confirmation/error');
      return;
    }

    try {
      if (registrationAccessToken) {
        const decoded = jwtDecode<TokenPayLoad>(registrationAccessToken);
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
          console.error("Token has expired. Redirecting to error page.");
          sessionStorage.removeItem("regAccessToken");
          router.push('/confirmation/error');
        }
      }
    } catch (error) {
      console.error("Invalid token.")
      router.push('confirmation/error');
    }
  }, [router]);

  const resendEmail = async () => {
    const registrationAccessToken = sessionStorage.getItem("regAccessToken");

    if (!registrationAccessToken) {
      console.error();
      router.push('confirmation/error');
      return;
    }

    try {
      if (registrationAccessToken) {
        const decoded = jwtDecode<TokenPayLoad>(registrationAccessToken);
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
          console.error("Token has expired. Redirecting to error page.");
          sessionStorage.removeItem("regAccessToken");
          router.push('/confirmation/error');
        }
      }
    } catch (error) {
      console.error("Invalid token.")
      router.push('confirmation/error');
    }

    try {
      const result = await resendAction(registrationAccessToken);
      if (result.success) {
        setEmailSent(true);
      } else {
        console.error('Error resending...')
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8">
        <Card className="max-w-md w-full p-6">
          <Image src="/images/email.png" alt="Email" width={500} height={300} className='mb-3' />
          <CardHeader>
            <CardTitle>Confirm Your Email</CardTitle>
          </CardHeader>
          <CardContent>
            We&apos;ve sent a confirmation link to your email. Please check your inbox and verify your account.
          </CardContent>
          <CardFooter className="flex flex-col space-y-2 mt-5">
            <Button
              onClick={resendEmail}
              disabled={emailSent}
              className={`${emailSent ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} w-full py-1 text-white`}
            >
              {emailSent ? 'Email Sent' : 'Resend Email'}
            </Button>
            <div className='text-gray-500 text-xs text-center'>
              Didn&apos;t receive the email? Please check your spam folder or click below to resend.
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}