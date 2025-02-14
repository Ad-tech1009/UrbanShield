"use client";
import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="w-64 bg-gradient-to-r from-gray-900 to-gray-800 h-screen p-4 shadow-lg">
      <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400 mb-6">
        Admin Panel
      </h2>
      <ul className="space-y-2">
        <li>
          <Link
            href="/dashboard/admin/request"
            className="flex items-center p-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-all transform hover:scale-105"
          >
            📝 Request Section
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/admin/guards"
            className="flex items-center p-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-all transform hover:scale-105"
          >
            🛡 Guard Management
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/admin/incidents"
            className="flex items-center p-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-all transform hover:scale-105"
          >
            🚨 Incident Reports
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/admin/reports"
            className="flex items-center p-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white transition-all transform hover:scale-105"
          >
            📊 Reports & Analytics
          </Link>
        </li>
      </ul>
    </div>
  );
}