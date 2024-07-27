"use client";

import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function VerifyEmailMessage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    if (token) {
      axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/local/verify?token=${token}`)
      .then((response) => {
        console.log('Email verified successfully', response.data);
        router.push('/confirmation/success');
      })
      .catch((error) => {
        console.error('Error verifying email', error.response.data);
        router.push('/confirmation/error');
      });
    }
  }, [token]);

  return (
    <div>
      <h1>Verifying your email...</h1>
    </div>
  );
}