"use client";

import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function VerifyEmailHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    if (token) {
      axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/verify-email?token=${token}`)
        .then((response) => {
          const { code } = response.data;
          switch (code) {
            case "VERIFICATION_SUCCESS":
              console.log('Email verified successfully', response.data);
              router.push('/confirmation/success');
              break;
            case "USER_VERIFIED":
              router.push('/confirmation/already-verified');
              break;
            default:
              router.push('/confirmation/error');
              break;
          }
        })
        .catch((error) => {
          const code = error.response?.data?.code;
          if (code === "USER_NOT_FOUND") {
            router.push('/confirmation/error?reason=user-not-found');
          } else if (code === "TOKEN_EXPIRED") {
            router.push('/confirmation/error?reason=token-expired');
          } else {
            router.push('/confirmation/error?reason=unknown');
          }
          console.error('Error verifying email', error.response.data);
          router.push('/confirmation/error');
        });
    } else {
      router.push('/confirmation/error?reason=no-token');
    }
  }, [token, router]);

  return (
    <div>
      <h1>Verifying your email...</h1>
    </div>
  );
}