"use client";

import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function VerifyEmailHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    if (token) {
      axios
      .get(`${process.env.NEXT_PUBLIC_EXPRESS_URL}/api/auth/verify-email?token=${token}`)
      .then((response) => {
        const { code } = response.data;
        switch (code) {
          case "VERIFICATION_SUCCESS":
            router.push('/verify/success');
            break;
          case "USER_VERIFIED":
            router.push('/verify/already-verified');
            break;
          case "USER_NOT_FOUND":
            router.push('/verify/user-not-found');
            break;
          case "TOKEN_EXPIRED":
            router.push('/verify/token-expired');
            break;
          default:
            router.push('verify/error');
            break;
        }
      })
      .catch(() => {
        router.push('verify/error');
      })
      // axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/verify-email?token=${token}`)
    } else {
      router.push('/verify/user-not-found');
    }
  }, [token, router]);

  return (
    <div>
      <h1>Verifying your email...</h1>
    </div>
  );
}