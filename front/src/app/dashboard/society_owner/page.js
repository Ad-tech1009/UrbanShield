"use client";
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableCell, TableBody } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import io from "socket.io-client";
import "leaflet/dist/leaflet.css";
import AuthLayout from "@/components/AuthLayout";

const socket = io("http://localhost:5000");

export default function SocietyOwnerDashboard() {
  const [guards, setGuards] = useState([]);
  const [incidents, setIncidents] = useState([]);
  const [pendingGuards, setPendingGuards] = useState([]);

  useEffect(() => {
    socket.on("guardLocations", (data) => setGuards(data));
    socket.on("pendingGuards", (data) => setPendingGuards(data));

    return () => {
      socket.off("guardLocations");
      socket.off("pendingGuards");
    };
  }, []);

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

  const handleApproveGuard = (guardId) => {
    socket.emit("approveGuard", guardId);
  };

  return (
    <AuthLayout role="society_owner">
      <div className="p-6 space-y-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 min-h-screen text-white">
        {/* Dashboard Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400 animate-pulse">
            Society Owner Dashboard
          </h1>
          <p className="text-gray-400 mt-2">
            Welcome back! Here you can manage guards, monitor incidents, and approve new guard requests.
          </p>
        </div>

        {/* Real-time Guard Tracking */}
        <Card className="bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 rounded-2xl shadow-lg">
          <CardHeader className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400 text-xl font-bold animate-pulse">
            📍 Real-time Guard Tracking
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

        {/* Incident Management */}
        <Card className="bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 rounded-2xl shadow-lg">
          <CardHeader className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-400 text-xl font-bold animate-pulse">
            🚨 Incident Reports
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
                    <TableCell>{incident.location.lat}, {incident.location.lng}</TableCell>
                    <TableCell>
                      <Badge className={incident.status === "Resolved" ? "bg-green-500" : "bg-red-500"}>
                        {incident.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Guard Approval Section */}
        <Card className="bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 rounded-2xl shadow-lg">
          <CardHeader className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400 text-xl font-bold animate-pulse">
            🛂 Approve/Reject Guards
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
                      <Button onClick={() => handleApproveGuard(guard.id)} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg mr-2">
                        Approve
                      </Button>
                      <Button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg">
                        Reject
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AuthLayout>
  );
}
