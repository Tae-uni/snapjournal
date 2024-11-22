"use client";
// Generic error page

import MessageCard from "@/components/auth/emailVerification/MessageCard";
import { useRouter } from "next/navigation";

export default function ErrorPage() {
  const router = useRouter();

  const handleErrorClick = () => {
    router.push('/');
  };

  return (
    <MessageCard 
      title="Something Went Wrong"
      description="An unexpected error occurred. Please try again later."
      btnText="Go to Home"
      imgSrc="/images/404error.png"
      onBtnClick={handleErrorClick}
    />
  );
}