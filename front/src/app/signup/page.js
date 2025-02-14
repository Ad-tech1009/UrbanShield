"use client";

import AuthService from "@/services/auth";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const roles = ["admin", "police", "society_owner", "guard", "resident"];

const Signup = () => {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", phone: "", role: "" });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      await AuthService.signup(credentials);
      alert("Signup successful!");
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
          Create an Account
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
        <form className="space-y-5" onSubmit={handleSignup}>
          {['name', 'email', 'password', 'phone'].map((field) => (
            <div key={field}>
              <label htmlFor={field} className="block mb-2 text-sm font-medium text-gray-400">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                type={field === 'password' ? 'password' : 'text'}
                name={field}
                id={field}
                value={credentials[field]}
                onChange={handleChange}
                className="bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-3 placeholder-gray-400"
                placeholder={`Enter your ${field}`}
                required
              />
            </div>
          ))}
          <div>
            <label htmlFor="role" className="block mb-2 text-sm font-medium text-gray-400">
              Role
            </label>
            <select
              name="role"
              id="role"
              value={credentials.role}
              onChange={handleChange}
              className="bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
              required
            >
              <option value="" disabled>Select your role</option>
              {roles.map((role) => (
                <option key={role} value={role}>{role.replace("_", " ").toUpperCase()}</option>
              ))}
            </select>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full text-white bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 focus:ring-4 focus:outline-none focus:ring-blue-500 font-medium rounded-lg text-sm px-5 py-3 transition-all"
          >
            Sign up
          </motion.button>
          <p className="text-sm font-light text-gray-400 text-center">
            Already have an account?{' '}
            <Link href={'/login'} className="font-medium text-blue-500 hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </motion.div>
    </section>
  );
};

export default Signup;