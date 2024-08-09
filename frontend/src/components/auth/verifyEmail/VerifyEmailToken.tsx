"use client";

import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function VerifyEmailToken() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    if (token) {
      axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/local/expire?token=${token}`)
        .then((response) => {
          if (response.data.message === 'Valid token') {
            router.push(`/password/reset?token=${token}`);
          } else {
            router.push(`/token-expired`);
          }
        })
        .catch((error) => {
          router.push(`/token-expired`);
        });
    } else {
      router.push(`/token-expired`);
    }
  }, [token, router]);

  return (
    <div>
      <h1>Verifying token...</h1>
    </div>
  );
}