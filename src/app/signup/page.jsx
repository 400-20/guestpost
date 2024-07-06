
"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { toast } from 'react-hot-toast';

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
    return password.length >= 6;
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
            : "Password must be at least 6 characters long",
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
      router.push("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="h-[100vh] w-full flex justify-center items-center">
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
            className={`flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg p-4 font-medium text-white transition ${isButtonDisabled ? "bg-gray-400" : "bg-primary hover:bg-opacity-90"
              }`}
            disabled={isButtonDisabled}
          >
            Sign up
          </button>
        </form>

        <div className="mt-6 text-center">
          <p>
            Already have an account?{" "}
            <Link href="/" className="text-primary">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
