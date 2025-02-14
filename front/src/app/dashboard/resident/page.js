"use client";
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableCell, TableBody } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import io from "socket.io-client";
import "leaflet/dist/leaflet.css";
import AuthLayout from "@/components/AuthLayout";

const socket = io("http://localhost:5000");

export default function ResidentDashboard() {
  const [guards, setGuards] = useState([]);
  const [incidents, setIncidents] = useState([]);
  const [incidentDetails, setIncidentDetails] = useState({ description: "", location: "" });

  useEffect(() => {
    socket.on("guardLocations", (data) => {
      setGuards(data);
    });

    socket.on("incidentReports", (data) => {
      setIncidents(data);
    });

    return () => {
      socket.off("guardLocations");
      socket.off("incidentReports");
    };
  }, []);

  const reportIncident = () => {
    socket.emit("reportIncident", incidentDetails);
    setIncidentDetails({ description: "", location: "" });
  };

  return (
    <AuthLayout role="resident">
      <div className="p-6 space-y-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 min-h-screen text-white">
        {/* Dashboard Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400 animate-pulse">
            Resident Dashboard
          </h1>
          <p className="text-gray-400 mt-2">
            Welcome back! Here you can track guards, report incidents, and view your incident history.
          </p>
        </div>

        {/* Live Map with Guards */}
        <Card className="bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 rounded-2xl shadow-lg">
          <CardHeader className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400 text-xl font-bold animate-pulse">
            📍 Nearby Security Guards
          </CardHeader>
          <CardContent>
            <MapContainer
              center={[22.7766, 86.1445]}
              zoom={13}
              style={{ height: "350px", width: "100%" }}
              className="rounded-xl"
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {guards.map((guard, index) => (
                <Marker key={index} position={[guard.lat, guard.lng]}>
                  <Popup className="text-black">{guard.name} - {guard.dutyStatus}</Popup>
                </Marker>
              ))}
            </MapContainer>
          </CardContent>
        </Card>

        {/* Incident Reporting Form */}
        <Card className="bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 rounded-2xl shadow-lg">
          <CardHeader className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-400 text-xl font-bold animate-pulse">
            🚨 Report an Incident
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="text"
              placeholder="Incident Location"
              value={incidentDetails.location}
              onChange={(e) => setIncidentDetails({ ...incidentDetails, location: e.target.value })}
              className="bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Textarea
              placeholder="Describe the Incident"
              value={incidentDetails.description}
              onChange={(e) => setIncidentDetails({ ...incidentDetails, description: e.target.value })}
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

        {/* Incident History Table */}
        <Card className="bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 rounded-2xl shadow-lg">
          <CardHeader className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400 text-xl font-bold animate-pulse">
            📜 Your Incident Reports
          </CardHeader>
          <CardContent>
            <Table className="text-gray-300">
              <TableHeader>
                <TableRow className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400 text-lg">
                  <TableCell>Location</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {incidents.map((incident, index) => (
                  <TableRow key={index} className="hover:bg-gray-700 transition-colors duration-200">
                    <TableCell>{incident.location}</TableCell>
                    <TableCell>{incident.description}</TableCell>
                    <TableCell>{incident.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Emergency Alert Button */}
        <Button className="relative group w-full bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 text-white text-lg p-4 rounded-lg shadow-lg shadow-red-500/50 transition-all transform hover:scale-105 overflow-hidden">
          <span className="absolute inset-0 bg-white opacity-20 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-lg"></span>
          <span className="relative">🚨 Trigger Emergency Alert</span>
        </Button>
      </div>
    </AuthLayout>
  );
}