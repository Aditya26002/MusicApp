"use client";
import { Music } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const Appbar = () => {
  const session = useSession();
  return (
    <div>
      <header className="px-4 lg:px-6 h-16 flex items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
        <Link className="flex items-center justify-center" href="#">
          <Music className="h-6 w-6 text-primary" />
          <span className="ml-2 text-2xl font-bold text-primary">
            MusicStream
          </span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Features
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Pricing
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            About
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Contact
          </Link>
          {session.data?.user && (
            <button
              className="text-sm font-medium hover:underline underline-offset-4 "
              onClick={() => signOut()}
            >
              Sign Out
            </button>
          )}
          {!session.data?.user && (
            <button
              className="text-sm font-medium hover:underline underline-offset-4"
              onClick={() => signIn()}
            >
              Sign In
            </button>
          )}
        </nav>
      </header>
    </div>
  );
};

export default Appbar;
