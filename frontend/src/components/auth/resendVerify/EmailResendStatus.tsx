"use client";
// Resend Page

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { jwtDecode } from 'jwt-decode';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { resendAction } from './emailResendStatusAction';

interface TokenPayLoad {
  exp: number;
  userId: string;
}

export default function EmailResendStatus() {
  const [emailSent, setEmailSent] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const registrationAccessToken = sessionStorage.getItem("regAccessToken");

    if (!registrationAccessToken) {
      console.error("Please try register again.");
      router.push('/verify/error');
      return;
    }

    try {
      if (registrationAccessToken) {
        const decoded = jwtDecode<TokenPayLoad>(registrationAccessToken);
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
          console.error("Token has expired. Redirecting to error page.");
          sessionStorage.removeItem("regAccessToken");
          router.push('/verify/token-expired');
        } else {
          setLoading(false);
        }
      }
    } catch (error) {
      console.error("Invalid token.")
      router.push('verify/error');
    }
  }, [router]);

  const resendEmail = async () => {
    const registrationAccessToken = sessionStorage.getItem("regAccessToken");

    if (!registrationAccessToken) {
      console.error();
      router.push('verify/error');
      return;
    }

    setEmailSent(true);

    try {
      if (registrationAccessToken) {
        const decoded = jwtDecode<TokenPayLoad>(registrationAccessToken);
        const currentTime = Date.now() / 1000;
        if (decoded.exp < currentTime) {
          console.error("Token has expired. Redirecting to error page.");
          sessionStorage.removeItem("regAccessToken");
          router.push('/verify/token-expired');
        }
      }
    } catch (error) {
      console.error("Invalid token.")
      router.push('verify/error');
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

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full"></div>
        </div>
      </div>
    )
  }

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