"use client";

import Link from "next/link";
import { useState } from "react";
import { MenuIcon, XIcon } from "lucide-react";
import { Button } from "../ui/button";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  function getMenuClasses() {
    let menuClasses = [];

    if (isOpen) {
      menuClasses = [
        "flex",
        "absolute",
        "top-[60px]",
        "bg-gray-800",
        "w-full",
        "p-6",
        "left-0",
        "gap-10",
        "flex-col",
        "item-center",
      ];
    } else {
      menuClasses.push("hidden", "md:flex");
    }

    return menuClasses.join(" ");
  }

  return (
    <nav className="bg-gray-800 flex justify-between text-white p-4 sm:p-6 md:flex md:justify-between md:items-center">
      <div className="container justify-between mx-auto flex px-4 items-center">
        <a href="" className="text-2xl font-bold mr-16">
          SnapJournal
        </a>
        <div className="flex ml-auto">
          <div className={getMenuClasses()}>
            <Link href="/" className="mx-5 hover:text-gray-300">
              Home
            </Link>
            <Link href="/" className="mx-5 hover:text-gray-300">
              How to use
            </Link>
            <Link href="/" className="mx-5 hover:text-gray-300">
              Contact
            </Link>
          </div>
        </div>
        <Button variant="default" size="sm" className="mx-2">
          <Link href="/signin">
            Sign In
          </Link>
        </Button>
        <div className="md:hidden flex items-center">
          <button onClick={() => {
            setIsOpen(!isOpen);
          }}>
            {isOpen ? (
              <XIcon className="h-6 w-6" />
            ) : (
              <MenuIcon className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
    </nav>
  )
}