"use client";
import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";

export default function IncidentReports() {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    fetchIncidents();
  }, []);

  const fetchIncidents = async () => {
    const res = await fetch("/api/incidents");
    const data = await res.json();
    setIncidents(data);
  };

  const handleResolve = async (id) => {
    const res = await fetch(`/api/incidents/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "resolved" }),
    });
    const data = await res.json();
    if (data) fetchIncidents(); // Refresh the list
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 p-6">
        <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400 mb-4">
          Incident Reports
        </h2>
        <div className="space-y-4">
          {incidents.map((incident) => (
            <div key={incident._id} className="p-4 bg-gray-700 rounded-lg">
              <p>Location: {incident.location}</p>
              <p>Description: {incident.description}</p>
              <p>Status: {incident.status}</p>
              <div className="flex space-x-2 mt-2">
                <button
                  onClick={() => handleResolve(incident._id)}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                >
                  Resolve
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}