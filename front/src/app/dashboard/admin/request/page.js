"use client";
import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";

export default function PendingRequests() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchPendingRequests();
  }, []);

  const fetchPendingRequests = async () => {
    const res = await fetch("/api/pending-requests");
    const data = await res.json();
    setRequests(data);
  };

  const handleApprove = async (id) => {
    const res = await fetch(`/api/approve-request/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "approved" }),
    });
    const data = await res.json();
    if (data) fetchPendingRequests(); // Refresh the list
  };

  const handleReject = async (id) => {
    const res = await fetch(`/api/approve-request/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "rejected" }),
    });
    const data = await res.json();
    if (data) fetchPendingRequests(); // Refresh the list
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400 mb-4">
          Pending Registration Requests
        </h2>
        <div className="space-y-4">
          {requests.map((request) => (
            <div key={request._id} className="p-4 bg-gray-700 rounded-lg">
              <p>Name: {request.name}</p>
              <p>Email: {request.email}</p>
              <p>Role: {request.role}</p>
              <div className="flex space-x-2 mt-2">
                <button
                  onClick={() => handleApprove(request._id)}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(request._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}