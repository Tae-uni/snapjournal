"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export default function ConfirmationMessage() {
  const [emailSent, setEmailSent] = useState(false);

  const resendEmail = async () => {
    try {
      // Add logic to resend email here
      setEmailSent(true);
    } catch (error) {
      console.error('Error resending email:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="max-w-md w-full p-6">
        <CardHeader>
          <CardTitle>Confirm Your Email</CardTitle>
          <CardDescription>We sent you an email with a confirmation link. Please check your email and click the link to verify your account.</CardDescription>
        </CardHeader>
        <CardContent>
            If you did not receive the email, please check your spam folder or click the button below to resend the confirmation email.
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button 
            onClick={resendEmail} 
            disabled={emailSent} 
            className={`${emailSent ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'} w-full py-2 text-white`}
          >
            {emailSent ? 'Email Sent' : 'Resend Email'}
          </Button>
            Need help? <a href="/help" className="text-blue-600 hover:underline">Visit our help center</a> or <a href="/contact" className="text-blue-600 hover:underline">contact support</a>.
        </CardFooter>
      </Card>
    </div>
  );
}