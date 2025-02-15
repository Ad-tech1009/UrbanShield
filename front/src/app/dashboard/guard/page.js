"use client";
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import io from "socket.io-client";
import "leaflet/dist/leaflet.css";
import AuthLayout from "@/components/AuthLayout";
import GuardApprovalForm from "@/components/Approvalform";

const socket = io("http://localhost:5000");

export default function GuardDashboard() {
  const [location, setLocation] = useState({ lat: 22.7766, lng: 86.1445 });
  const [status, setStatus] = useState("Off Duty");
  const [incident, setIncident] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
        },
        (error) => console.error(error),
        { enableHighAccuracy: true }
      );
    }

    socket.on("connect", () => console.log("Connected to server"));
    return () => socket.off("connect");
  }, []);

  const toggleDuty = () => {
    setStatus(status === "On Duty" ? "Off Duty" : "On Duty");
  };

  const reportIncident = () => {
    console.log("Incident Reported:", incident);
    setIncident("");
  };

  return (
    <AuthLayout role="guard">


      <div className="p-6 space-y-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 min-h-screen text-white">
        {/* Dashboard Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400 animate-pulse">
            Guard Dashboard
          </h1>
          <p className="text-gray-400 mt-2">
            Welcome back! Here you can manage your duty status, report incidents, and track your location.
          </p>
        </div>

        {/* Live Location & Duty Status */}
        <Card className="bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 rounded-2xl shadow-lg">
          <CardHeader className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400 text-xl font-bold animate-pulse">
            📍 Assigned Location
          </CardHeader>
          <CardContent>
            <MapContainer
              center={[location.lat, location.lng]}
              zoom={15}
              style={{ height: "250px", width: "100%" }}
              className="rounded-xl"
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={[location.lat, location.lng]}>
                <Popup className="text-black">Assigned Location</Popup>
              </Marker>
            </MapContainer>
          </CardContent>
        </Card>

        {/* Shift & Duty Management */}
        <Card className="bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 rounded-2xl shadow-lg">
          <CardHeader className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400 text-xl font-bold animate-pulse">
            🛡 Duty Status
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold text-white">Current Status: {status}</p>
            <Button
              className="relative group w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-all transform hover:scale-105 overflow-hidden"
              onClick={toggleDuty}
            >
              <span className="absolute inset-0 bg-white opacity-10 scale-0 group-hover:scale-100 transition-transform duration-300"></span>
              <span className="relative">{status === "On Duty" ? "Go Off Duty" : "Start Duty"}</span>
            </Button>
          </CardContent>
        </Card>

        {/* Incident Reporting */}
        <Card className="bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 rounded-2xl shadow-lg">
          <CardHeader className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-400 text-xl font-bold animate-pulse">
            🚨 Report an Incident
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder="Describe the incident..."
              value={incident}
              onChange={(e) => setIncident(e.target.value)}
              className="bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button
              className="relative group w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-all transform hover:scale-105 overflow-hidden"
              onClick={reportIncident}
            >
              <span className="absolute inset-0 bg-white opacity-10 scale-0 group-hover:scale-100 transition-transform duration-300"></span>
              <span className="relative">Submit Report</span>
            </Button>
          </CardContent>
        </Card>

        {/* Emergency SOS Button */}
        <button onClick={() => setIsOpen(true)} className="bg-blue-600 text-white px-5 py-2 rounded-lg">
        Apply for Guard Approval
      </button>
      <GuardApprovalForm isOpen={isOpen} onClose={() => setIsOpen(false)} />

        <Button className="relative group w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white text-lg p-4 rounded-lg shadow-lg shadow-red-500/50 transition-all transform hover:scale-105 overflow-hidden">
          <span className="absolute inset-0 bg-white opacity-20 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-lg"></span>
          <span className="relative">⚠️ Emergency SOS</span>
        </Button>
      </div>
    </AuthLayout>
  );
}