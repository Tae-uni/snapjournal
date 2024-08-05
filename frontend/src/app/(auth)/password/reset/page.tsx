import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

import ResetPassword from "@/components/auth/password/ResetPassword";

export default async function PasswordResetPage() {
  // if the user is logged in, redirect to account where password change is possible
  // const session = await getServerSession(authOptions);
  // if (session) redirect('/account');
  return <ResetPassword />;
}