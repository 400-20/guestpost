"use client"
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Login = () => {
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  const handleLogin = () => {
    if (buttonDisabled) return;
    setLoading(true);

    router.push("profile")
    // Your login logic here
    // ...
    setLoading(false);
  };

  return (
<div className="flex  items-center justify-center w-full h-[100vh]">
<div className="flex flex-col items-center justify-center  w-1/2  py-10 border border-black rounded-xl">
      <h1 className="text-3xl font-bold text-gray-900">{loading ? "Processing" : "Login"}</h1>
      <hr className="my-4 border-b border-gray-200" />

      <label className="block mb-2" htmlFor="email">
        Email
      </label>
      <input
        className="w-[50%] p-2 pl-10 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-blue-600 text-gray-700"
        id="email"
        type="text"
        value={user.email}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
        placeholder="email"
      />
      <label className="block mb-2" htmlFor="password">
        Password
      </label>
      <input
        className="w-[50%] p-2 pl-10 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-blue-600 text-gray-700"
        id="password"
        type="password"
        value={user.password}
        onChange={(e) => setUser({ ...user, password: e.target.value })}
        placeholder="password"
      />
      <button
        onClick={handleLogin}
        className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg ${buttonDisabled ? 'opacity-50' : ''} mb-5`}
        disabled={buttonDisabled}
      >
        Login here
      </button>
      <Link href="/signup" className="text-md  text-gray-600 hover:text-black hover:px-3 rounded-lg hover:bg-slate-200 ">
        Visit Signup page
      </Link>
    </div>



    
</div>

    
  );
};

export default Login;