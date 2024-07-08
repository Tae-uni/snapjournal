import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex flex-col">
      <h1>Welcome to the SnapJournal!</h1>
      <div>
        <Link className="underline ml-2" href="/signup" >Sign Up</Link>
      </div>
      <div>
        <Link className="underline ml-2" href="/signin">Sign In</Link>
      </div>
    </main>
  );
}
