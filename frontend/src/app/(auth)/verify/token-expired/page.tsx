"use client";

import MessageCard from "@/components/auth/emailVerification/MessageCard";
import { useRouter } from "next/navigation";

export default function TokenExpiredPage() {
  const router = useRouter();

  const handleResendClick = () => {
    router.push('/verify/resend');
  };

  return (
    <MessageCard 
      title="Link Expired"
      description="This verification link has expired. Please request a new one."
      btnText="Request Email"
      imgSrc="/images/token_expired.png"
      onBtnClick={handleResendClick}
    />
  );
}