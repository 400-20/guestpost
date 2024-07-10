"use client";
import Link from "next/link";
import React from "react";
import SigninWithPassword from "../../components/Auth/SigninWithPassword";
import Signin from "@/components/Auth/Signin";
import Image from "next/image";

export default function Signinin() {
  return (
    <>
    <header className="hea_der">
    <nav className="nav_bar">
        <div className="lo_go">
        <Link href="/"><h1>GuestPostSale</h1></Link>
        </div>
        <div className="nav_Links">
            <Link href="/signin" className="nav_Button">Sign In</Link>
            <Link href="/signup" className="nav_Button">Sign Up</Link>
        </div>
    </nav>
</header>

<div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card ">
        <div className="flex flex-wrap items-center">
          <div className="w-full xl:w-1/2">
            <div className="w-full p-4 sm:p-12.5 xl:p-15">
              <Signin />
            </div>
          </div>

          <div className="hidden w-full p-7.5 xl:block xl:w-1/2">
            <div className="custom-gradient-1 overflow-hidden rounded-2xl px-12.5 pt-12.5 dark:!bg-dark-2 dark:bg-none">
              <Link className="mb-10 inline-block" href="/">
                <Image
                  className="hidden dark:block"
                  src={"/images/logo/logo.svg"}
                  alt="Logo"
                  width={176}
                  height={32}
                />
                <Image
                  className="dark:hidden"
                  src={"/images/logo/logo-dark.svg"}
                  alt="Logo"
                  width={176}
                  height={32}
                />
              </Link>
              <p className="mb-3 text-xl font-medium text-dark dark:text-white">
                Sign in to your account
              </p>

              <h1 className="mb-4 text-2xl font-bold text-dark dark:text-white sm:text-heading-3">
                Welcome Back!
              </h1>

              <p className="w-full max-w-[375px] font-medium text-dark-4 dark:text-dark-6">
                Please sign in to your account by completing the necessary
                fields.
              </p>

              <div className="mt-31">
                <Image
                  src={"/images/grids/grid-02.svg"}
                  alt="Logo"
                  width={405}
                  height={325}
                  className="mx-auto dark:opacity-30"
                />
              </div>
            </div>
          </div>
        </div>
      </div>




{/* <div className="h-[90vh] w-full flex justify-center items-center  ">
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
</div> */}

<footer className="foo_ter">
    <p>&copy; 2024 GuestPostSale. All rights reserved.</p>
</footer>
</>
  );
}
