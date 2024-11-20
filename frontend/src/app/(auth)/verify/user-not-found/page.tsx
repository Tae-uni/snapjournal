"use client";

import MessageCard from "@/components/auth/emailVerification/MessageCard";
import { useRouter } from "next/navigation";

export default function UserNotFoundPage() {
  const router = useRouter();

  const handleRegClick = () => {
    router.push('/signup');
  };

  return (
    <MessageCard 
      title="User Not Found"
      description="We couldn't find your account. Please register to continue."
      btnText="Go to Sign Up"
      imgSrc="/images/warning.png"
      onBtnClick={handleRegClick}
    />
  );
}