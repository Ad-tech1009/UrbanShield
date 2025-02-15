"use client";
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableCell, TableBody } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import io from "socket.io-client";
import "leaflet/dist/leaflet.css";
import AuthLayout from "@/components/AuthLayout";
import axios from "axios";

const socket = io("http://localhost:5000");

export default function PoliceDashboard() {
  const [guards, setGuards] = useState([]);
  const [incidents, setIncidents] = useState([]);
  const [pendingGuards, setPendingGuards] = useState([]);

  useEffect(() => {
    socket.on("guardLocations", (data) => setGuards(data));
    socket.on("incidentReports", (data) => setIncidents(data));
    socket.on("pendingGuards", (data) => setPendingGuards(data));

    return () => {
      socket.off("guardLocations");
      socket.off("incidentReports");
      socket.off("pendingGuards");
    };
  }, []);

  // Fetch guards & incidents
  useEffect(() => {
    axios.get("http://localhost:5000/incidents").then((res) => setIncidents(res.data));

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIncidentDetails((prev) => ({
          ...prev,
          location: { lat: position.coords.latitude, lng: position.coords.longitude },
        }));
      },
      (error) => console.error("Error fetching location:", error),
      { enableHighAccuracy: true }
    );
  }, []);

  const handleApproveGuard = (guardId) => {
    socket.emit("approveGuard", guardId);
  };

  return (
    <AuthLayout role="police">
      <div className="p-6 space-y-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 min-h-screen text-white">
        {/* Dashboard Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400 animate-pulse">
            Police Dashboard
          </h1>
          <p className="text-gray-400 mt-2">Track guards, report incidents, and view incident history.</p>
        </div>
        {/* Live Map with Guard Locations */}
        <Card className="bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 shadow-lg shadow-blue-500/20">
          <CardHeader className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400 animate-pulse">
            📍 Guard Live Tracking
          </CardHeader>
          <CardContent>
            <MapContainer center={[22.7766, 86.1445]} zoom={13} style={{ height: "350px", width: "100%" }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {guards.map((guard, index) => (
                <Marker key={index} position={[guard.lat, guard.lng]}>
                  <Popup className="text-black">{guard.name} - {guard.dutyStatus}</Popup>
                </Marker>
              ))}
            </MapContainer>
          </CardContent>
        </Card>

        {/* Incident History Table */}
        <Card className="bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 rounded-2xl shadow-lg">
          <CardHeader className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400 text-xl font-bold animate-pulse">
            📜 Your Incident Reports
          </CardHeader>
          <CardContent>
            <Table className="text-gray-300">
              <TableHeader>
                <TableRow className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400 text-lg">
                  <TableCell>Title</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {incidents.map((incident, index) => (
                  <TableRow key={index} className="hover:bg-gray-700 transition-colors duration-200">
                    <TableCell>{incident.title}</TableCell>
                    <TableCell>{incident.description}</TableCell>
                    <TableCell>{incident.location.lat.toFixed(4)}, {incident.location.lng.toFixed(4)}</TableCell>
                    <TableCell>{incident.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Guard Approval Section */}
        <Card className="bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 shadow-lg shadow-yellow-500/20">
          <CardHeader className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400 animate-pulse">
            🛂 Approve Guards
          </CardHeader>
          <CardContent>
            <Table className="text-gray-300">
              <TableHeader>
                <TableRow className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400 text-lg">
                  <TableCell>Name</TableCell>
                  <TableCell>Age</TableCell>
                  <TableCell>Experience</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingGuards.map((guard, index) => (
                  <TableRow key={index} className="hover:bg-gray-700 transition-colors duration-200">
                    <TableCell>{guard.name}</TableCell>
                    <TableCell>{guard.age}</TableCell>
                    <TableCell>{guard.experience} years</TableCell>
                    <TableCell>
                      <Button className="relative group bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-2 px-4 rounded-lg transition-all transform hover:scale-105 overflow-hidden mr-2" onClick={() => handleApproveGuard(guard.id)}>
                        <span className="absolute inset-0 bg-white opacity-10 scale-0 group-hover:scale-100 transition-transform duration-300"></span>
                        <span className="relative">Approve</span>
                      </Button>
                      <Button className="relative group bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-2 px-4 rounded-lg transition-all transform hover:scale-105 overflow-hidden">
                        <span className="absolute inset-0 bg-white opacity-10 scale-0 group-hover:scale-100 transition-transform duration-300"></span>
                        <span className="relative">Reject</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Emergency Alert Button */}
        <Button className="w-full relative group bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white text-lg p-4 rounded-lg shadow-lg shadow-red-500/50 transition-all transform hover:scale-105 overflow-hidden">
          <span className="absolute inset-0 bg-white opacity-20 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-lg"></span>
          <span className="relative">🚨 Trigger Emergency Response</span>
        </Button>
      </div>
    </AuthLayout>
  );
}