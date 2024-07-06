"use client";
import Link from "next/link";
import React from "react";
import SigninWithPassword from "../SigninWithPassword";

export default function Signin() {
  return (
<div className="h-[100vh] w-full flex justify-center items-center  ">
<div className="h-1/2 w-1/2 ">

      <div className="my-6 flex items-center justify-center">
        <span className="block h-px w-full bg-stroke dark:bg-dark-3"></span>

        <div className="block w-full min-w-fit bg-transparent px-3 text-center font-medium dark:bg-gray-dark">
        <h2 className="text-center text-2xl font-bold mb-6"> Sign in</h2>
        </div>
        <span className="block h-px w-full bg-stroke dark:bg-dark-3"></span>
      </div>

      <div>
        <SigninWithPassword />
      </div>

      <div className="mt-6 text-center">
        <p>
          Don’t have any account?{" "}
          <Link href="/signup" className="text-primary">
            Sign Up
          </Link> 
        </p>
      </div>
    </div>
</div>
  );
}
