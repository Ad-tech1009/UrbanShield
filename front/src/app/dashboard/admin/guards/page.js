"use client";
import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";

export default function GuardManagement() {
  const [guards, setGuards] = useState([]);

  useEffect(() => {
    fetchGuards();
  }, []);

  const fetchGuards = async () => {
    const res = await fetch("/api/guards");
    const data = await res.json();
    setGuards(data);
  };

  const handleDelete = async (id) => {
    const res = await fetch(`/api/guards/${id}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (data) fetchGuards(); // Refresh the list
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400 mb-4">
          Guard Management
        </h2>
        <div className="space-y-4">
          {guards.map((guard) => (
            <div key={guard._id} className="p-4 bg-gray-700 rounded-lg">
              <p>Name: {guard.name}</p>
              <p>Email: {guard.email}</p>
              <p>Role: {guard.role}</p>
              <p>Status: {guard.status}</p>
              <div className="flex space-x-2 mt-2">
                <button
                  onClick={() => handleDelete(guard._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}