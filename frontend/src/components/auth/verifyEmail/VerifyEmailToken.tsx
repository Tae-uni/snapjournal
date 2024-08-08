"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function VerifyEmailToken() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    if (token) {
      
    }
  })
}