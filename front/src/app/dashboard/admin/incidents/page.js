"use client";
import { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";

export default function IncidentReports() {
  const [incidents, setIncidents] = useState([]);

  useEffect(() => {
    fetchIncidents();
  }, []);

  const fetchIncidents = async () => {
    try {
      const res = await fetch("http://localhost:5000/incidents");
      if (!res.ok) throw new Error("Failed to fetch incidents");
      const data = await res.json();
      setIncidents(data);
    } catch (error) {
      console.error("Error fetching incidents:", error);
    }
  };

  const handleResolve = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/incidents/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Resolved" }),
      });
      if (!res.ok) throw new Error("Failed to update incident");
      fetchIncidents(); // Refresh the list
    } catch (error) {
      console.error("Error resolving incident:", error);
    }
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
          {incidents.length === 0 ? (
            <p className="text-gray-400">No incidents reported yet.</p>
          ) : (
            incidents.map((incident) => (
              <div key={incident._id} className="p-4 bg-gray-700 rounded-lg">
                <h3 className="text-lg font-semibold text-blue-400">{incident.title}</h3>
                <p className="text-gray-300">Description: {incident.description}</p>
                <p className="text-gray-300">
                  Location: {incident.location.lat}, {incident.location.lng}
                </p>
                <p className={`font-semibold ${incident.status === "resolved" ? "text-green-400" : "text-red-400"}`}>
                  Status: {incident.status}
                </p>
                <div className="flex space-x-2 mt-2">
                  {incident.status !== "resolved" && (
                    <button
                      onClick={() => handleResolve(incident._id)}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                    >
                      Mark as Resolved
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
