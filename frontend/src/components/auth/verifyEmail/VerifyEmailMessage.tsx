"use client";

import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function VerifyEmailMessage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (token) {
      axios.get(`${process.env.NEXT_PUBLIC_STRAPI_URL}/api/auth/verify-email?token=${token}`)
        .then((response) => {
          const { code } = response.data;
          switch (code) {
            case "VERIFICATION_SUCCESS":
              // setMessage("Email verified successfully");
              console.log('Email verified successfully', response.data);
              router.push('/confirmation/success');
              break;
            case "USER_VERIFIED":
              router.push('/confirmation/already-verified');
              break;
            default:
              router.push('/confirmation/error');
          }
        })
        .catch((error) => {
          console.error('Error verifying email', error.response.data);
          router.push('/confirmation/error');
        });
    }
  }, [token, router]);

  return (
    <div>
      <h1>{message || "Verifying your email..."}</h1>
    </div>
  );
}