"use client";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white p-6 relative overflow-hidden">
      {/* Links at the top right corner */}
      <div className="absolute top-6 right-6 flex space-x-4">
        <Link href="/signup" passHref>
          <button className="relative group bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-lg font-semibold py-2 px-6 rounded-lg transition-all transform hover:scale-105 overflow-hidden">
            <span className="absolute inset-0 bg-white opacity-10 scale-0 group-hover:scale-100 transition-transform duration-300"></span>
            <span className="relative">Sign Up</span>
          </button>
        </Link>

        <Link href="/login" passHref>
          <button className="relative group bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-lg font-semibold py-2 px-6 rounded-lg transition-all transform hover:scale-105 overflow-hidden">
            <span className="absolute inset-0 bg-white opacity-10 scale-0 group-hover:scale-100 transition-transform duration-300"></span>
            <span className="relative">Login</span>
          </button>
        </Link>
      </div>
      {/* Main Content */}
      <div className="flex flex-col items-center justify-center h-screen text-center">
        {/* Futuristic Title */}
        <h1 className="text-8xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400 animate-pulse">
          UrbanShield
        </h1>
        {/* Tagline with Animation */}
        <p className="text-2xl text-gray-400 mb-12 animate-fade-in">
          Revolutionizing Security with Real-Time Intelligence
        </p>
        {/* Glowing CTA Button */}
        <Link href="/features" passHref>
          <button className="relative group bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-2xl font-semibold py-4 px-12 rounded-full transition-all transform hover:scale-110 shadow-lg shadow-purple-500/50 overflow-hidden">
            <span className="absolute inset-0 bg-white opacity-20 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-full"></span>
            <span className="relative">Explore Features</span>
          </button>
        </Link>
      </div>
    </div>
  );
}
