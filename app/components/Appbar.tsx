"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

const Appbar = () => {
  const session = useSession();
  return (
    <div>
      <div className="flex justify-between">
        <div className="">MusicApp</div>
        <div className="">
          {session.data?.user && (
            <button className="m-2 p-2 bg-blue-400" onClick={() => signOut()}>
              Sign Out
            </button>
          )}
          {!session.data?.user && (
            <button className="m-2 p-2 bg-blue-400" onClick={() => signIn()}>
              Sign In
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Appbar;
