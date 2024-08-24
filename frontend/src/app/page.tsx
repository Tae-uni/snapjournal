import { Navbar } from "@/components/layout/Navbar";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex flex-col">
    <Navbar />
      <h1>Welcome to the SnapJournal!</h1>
    </main>
  );
}
