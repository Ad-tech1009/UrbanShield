"use client";
import Link from "next/link";

export default function ExploreFeaturesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white p-6 relative overflow-hidden">
      {/* Links at the top right corner */}
      <div className="absolute top-6 right-6 flex space-x-4">
        <Link
          href="/signup"
          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-lg font-semibold py-2 px-6 rounded-lg transition-all transform hover:scale-105"
        >
          Sign Up
        </Link>
        <Link
          href="/login"
          className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-lg font-semibold py-2 px-6 rounded-lg transition-all transform hover:scale-105"
        >
          Login
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center text-center py-20">
        {/* Page Title */}
        <h1 className="text-6xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">
          Explore UrbanShield
        </h1>

        {/* Subtitle */}
        <p className="text-2xl text-gray-400 mb-12">
          Revolutionizing Urban Security with Cutting-Edge Features
        </p>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl px-6">
          {/* Feature 1: Security Guard Database */}
          <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 hover:border-blue-500 transition-all transform hover:scale-105">
            <h2 className="text-2xl font-bold mb-4">Security Guard Database</h2>
            <p className="text-gray-400">
              Maintain structured records of all security personnel, including personal details, work history, and current deployment.
            </p>
          </div>

          {/* Feature 2: Live Guard Location Tracking */}
          <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 hover:border-green-500 transition-all transform hover:scale-105">
            <h2 className="text-2xl font-bold mb-4">Live Guard Location Tracking</h2>
            <p className="text-gray-400">
              Track on-duty security guards in real-time using GPS integration and display their locations on an interactive map.
            </p>
          </div>

          {/* Feature 3: Real-Time Guard Movement Tracking */}
          <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 hover:border-purple-500 transition-all transform hover:scale-105">
            <h2 className="text-2xl font-bold mb-4">Real-Time Guard Movement Tracking</h2>
            <p className="text-gray-400">
              Monitor the actual movement of security guards on maps with automatic status updates.
            </p>
          </div>

          {/* Feature 4: Multi-Level Access Control */}
          <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 hover:border-pink-500 transition-all transform hover:scale-105">
            <h2 className="text-2xl font-bold mb-4">Multi-Level Access Control</h2>
            <p className="text-gray-400">
              Implement role-based access control (RBAC) for Admins, Police, Society Owners, and Field Users.
            </p>
          </div>

          {/* Feature 5: Duty Assignment & Rotation System */}
          <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 hover:border-yellow-500 transition-all transform hover:scale-105">
            <h2 className="text-2xl font-bold mb-4">Duty Assignment & Rotation System</h2>
            <p className="text-gray-400">
              Admins can assign and reassign guards to duty locations with ease.
            </p>
          </div>

          {/* Feature 6: Guard Verification & Background Checks */}
          <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 hover:border-indigo-500 transition-all transform hover:scale-105">
            <h2 className="text-2xl font-bold mb-4">Guard Verification & Background Checks</h2>
            <p className="text-gray-400">
              Police stations, businesses, and residents can request background verification through an approval system.
            </p>
          </div>

          {/* Feature 7: Shift & Attendance Monitoring */}
          <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 hover:border-teal-500 transition-all transform hover:scale-105">
            <h2 className="text-2xl font-bold mb-4">Shift & Attendance Monitoring</h2>
            <p className="text-gray-400">
              Automate check-in/check-out tracking to ensure compliance with assigned shifts.
            </p>
          </div>

          {/* Feature 8: Incident Reporting & Quick Response */}
          <div className="bg-gray-800 p-8 rounded-2xl border border-gray-700 hover:border-orange-500 transition-all transform hover:scale-105">
            <h2 className="text-2xl font-bold mb-4">Incident Reporting & Quick Response</h2>
            <p className="text-gray-400">
              Allow users to report security concerns and notify the nearest available security personnel.
            </p>
          </div>
        </div>

        {/* Call-to-Action Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Urban Security?</h2>
          <Link
            href="/signup"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-2xl font-semibold py-4 px-12 rounded-full transition-all transform hover:scale-110 shadow-lg shadow-purple-500/50"
          >
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
}
