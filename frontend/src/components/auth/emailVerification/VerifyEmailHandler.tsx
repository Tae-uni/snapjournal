"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function VerifyEmailHandler() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    if (token) {
      window.location.href = `${process.env.EXPRESS_URL}/api/auth/verify-email?token=${token}`;
      // axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/verify-email?token=${token}`)
    } else {
      window.location.href = `/verify/user-not-found`;
    }
  }, [token]);

  return (
    <div>
      <h1>Verifying your email...</h1>
    </div>
  );
}