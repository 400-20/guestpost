"use client";
import Link from "next/link";

import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { toast } from 'react-hot-toast';
import Image from "next/image";


export default function Signup() {
  const router = useRouter();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateUsername = (username) => {
    return username.length >= 3;
  };

  const validatePassword = (password) => {
    return password.length >= 5;
  };

  const validateConfirmPassword = (password, confirmPassword) => {
    return password === confirmPassword;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });

    // Perform validation
    switch (name) {
      case "email":
        setErrors({
          ...errors,
          email: validateEmail(value) ? "" : "Invalid email address",
        });
        break;
      case "username":
        setErrors({
          ...errors,
          username: validateUsername(value)
            ? ""
            : "Username must be at least 3 characters long",
        });
        break;
      case "password":
        setErrors({
          ...errors,
          password: validatePassword(value)
            ? ""
            : "Password must be at least 5 characters long",
        });
        break;
      case "password2":
        setErrors({
          ...errors,
          password2: validateConfirmPassword(user.password, value)
            ? ""
            : "Passwords do not match",
        });
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const isFormValid =
      validateEmail(user.email) &&
      validateUsername(user.username) &&
      validatePassword(user.password) &&
      validateConfirmPassword(user.password, user.password2);
    setIsButtonDisabled(!isFormValid);
  }, [user]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      console.log(user);
      const response = await axios.post(
        "http://172.16.16.22:8000/auth/api/register/",
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Signup successful");
      router.push("/signin");
    } catch (error) {
      toast.error(error.message);
    }
  };

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
{/* signup comp */}
            <div className=" w-full flex justify-center items-center">
      <div className="h-1/2 w-1/2">
        <h2 className="text-center text-2xl font-bold mb-6">Sign Up</h2>

        <form>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="mt-1 block w-full px-3 py-2 border bg-transparent border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              value={user.email}
              onChange={handleChange}
            />
            <div className="min-h-[24px]">
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Username
            </label>
            <input
              type="text"
              name="username"
              className="mt-1 block w-full px-3 py-2 border bg-transparent border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              value={user.username}
              onChange={handleChange}
            />
            <div className="min-h-[24px]">
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">{errors.username}</p>
              )}
            </div>

          </div>

          <div className="mb-4 relative">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <input
              type={passwordVisible ? "text" : "password"}
              name="password"
              className="mt-1 block w-full px-3 py-2 border bg-transparent border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              value={user.password}
              onChange={handleChange}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 ">
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="focus:outline-none"
              >
                {passwordVisible ? (
                  <FaEyeSlash className="text-xl " />
                ) : (
                  <FaEye className="text-xl " />
                )}
              </button>
            </div>
            <div className="min-h-[24px]">
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
          </div>

          <div className="mb-6 relative">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Confirm Password
            </label>
            <input
              type={confirmPasswordVisible ? "text" : "password"}
              name="password2"
              className="mt-1 block w-full px-3 py-2 border bg-transparent border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
              value={user.password2}
              onChange={handleChange}
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="focus:outline-none"
              >
                {confirmPasswordVisible ? (
                  <FaEyeSlash className="text-xl " />
                ) : (
                  <FaEye className="text-xl " />
                )}
              </button>
            </div>
            <div className="min-h-[24px]">
              {errors.password2 && (
                <p className="text-red-500 text-sm mt-1">{errors.password2}</p>
              )}
            </div>

          </div>

          <button
            onClick={handleSubmit}
            type="submit"
            className={`flex w-full ${isButtonDisabled?"cursor-not-allowed" : "cursor-pointer"} items-center justify-center gap-2 rounded-lg p-4 font-medium text-white transition ${isButtonDisabled ? "bg-blue-400" : "bg-primary hover:bg-opacity-90"
              }`}
            disabled={isButtonDisabled}
          >
            Sign up
          </button>
        </form>

        <div className="mt-6 text-center">
          <p>
            Already have an account?{" "}
            <Link href="/signin" className="text-primary">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div> 
{/* signup comp */}
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
                Sign up to your account
              </p>

              <h1 className="mb-4 text-2xl font-bold text-dark dark:text-white sm:text-heading-3">
                Welcome Back!
              </h1>

              <p className="w-full max-w-[375px] font-medium text-dark-4 dark:text-dark-6">
                Please sign up to your account by completing the necessary
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
 

<footer className="foo_ter">
    <p>&copy; 2024 GuestPostSale. All rights reserved.</p>
</footer>
    </>

  );
}
