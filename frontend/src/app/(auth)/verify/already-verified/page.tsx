"use client";

import MessageCard from "@/components/auth/emailVerification/MessageCard";
import { useRouter } from "next/navigation";

export default function AlreadyVerifiedPage() {
  const router = useRouter();

  const handleVerifiedClick = () => {
    router.push('/signin');
  };

  return (
    <MessageCard 
      title="Email Already Verified"
      description="This email is already verified. Please log in."
      btnText="Go to Sign In"
      imgSrc="/images/warning.png"
      onBtnClick={handleVerifiedClick}
    />
  );
}