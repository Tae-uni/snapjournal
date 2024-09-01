"use client";

import axios from 'axios';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

export default function ConfirmationMessage() {
  const [emailSent, setEmailSent] = useState(false);

  const resendEmail = async () => {
    const email = localStorage.getItem('userEmail');

    if (!email) {
      console.error('No email found in localStorage');
      return;
    }

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/local/resend-confirmation`, { email });
      if (response.status === 200) {
        setEmailSent(true);
        localStorage.removeItem('userEmail');
      }
    } catch (error) {
      console.error('Error resending email:', error);
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
            We've sent a confirmation link to your email. Please check your inbox and verify your account.
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
              Didn't receive the email? Please check your spam folder or click below to resend.
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}