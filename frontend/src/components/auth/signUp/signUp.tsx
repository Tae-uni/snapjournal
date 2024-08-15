import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import Link from "next/link";
import SignUpForm from "./signUpForm";


export default async function SignUp() {
  const session = await getServerSession(authOptions);
  return (
    <div>
      <h2>
        Sign Up
      </h2>
      {session ? (
        <p>You are already signed in.</p>
      ) : (
        <div>
          <p>
            Sign up for a new account or {' '}
            <Link href='/signin' className="underline">
              sign in
            </Link>{' '}
            when you already have an account.
          </p>
          <SignUpForm />
        </div>
      )}
    </div>
  );
}