"use client";

import AuthService from "@/services/auth";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const data = await AuthService.login(credentials);
      const role = data.role;
      if (role === "admin") {
        router.push("/dashboard/admin");
      } else if (role === "police") {
        router.push("/dashboard/police");
      } else if (role === "guard") {
        router.push("/dashboard/guard");
      } else if (role === "resident") {
        router.push("/dashboard/resident");
      } else if (role === "society_owner") {
        router.push("/dashboard/society_owner");
      }
      alert("Login successful!");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <section className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 min-h-screen flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 p-8"
      >
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400 text-center mb-6"
        >
          Welcome Back
        </motion.h1>
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-red-500 text-sm text-center mb-4"
          >
            {error}
          </motion.div>
        )}
        <form className="space-y-5" onSubmit={handleLogin}>
          <div>
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-400">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={credentials.email}
              onChange={handleChange}
              className="bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-3 placeholder-gray-400"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-400">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={credentials.password}
              onChange={handleChange}
              className="bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-3 placeholder-gray-400"
              placeholder="Enter your password"
              required
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full text-white bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 focus:ring-4 focus:outline-none focus:ring-blue-500 font-medium rounded-lg text-sm px-5 py-3 transition-all"
          >
            Sign in
          </motion.button>
          <p className="text-sm font-light text-gray-400 text-center">
            Don’t have an account yet?{' '}
            <Link href="/signup" className="font-medium text-blue-500 hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </motion.div>
    </section>
  );
};

export default Login;
