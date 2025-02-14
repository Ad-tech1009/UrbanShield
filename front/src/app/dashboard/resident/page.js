"use client";
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableCell, TableBody } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import AuthLayout from "@/components/AuthLayout";

export default function ResidentDashboard() {
  const [guards, setGuards] = useState([]);
  const [incidents, setIncidents] = useState([]);
  const [incidentDetails, setIncidentDetails] = useState({ title: "", description: "", location: { lat: null, lng: null } });

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

  // Report an Incident
  const reportIncident = async () => {
    if (!incidentDetails.title || !incidentDetails.description) return alert("Please fill all fields");

    try {
      await axios.post("http://localhost:5000/incidents", incidentDetails);
      setIncidentDetails({ title: "", description: "", location: incidentDetails.location });

      // Refresh incidents
      const res = await axios.get("http://localhost:5000/incidents");
      setIncidents(res.data);
    } catch (error) {
      console.error("Error reporting incident:", error);
    }
  };

  return (
    <AuthLayout role="resident">
      <div className="p-6 space-y-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 min-h-screen text-white">
        {/* Dashboard Header */}
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400 animate-pulse">
            Resident Dashboard
          </h1>
          <p className="text-gray-400 mt-2">Track guards, report incidents, and view incident history.</p>
        </div>

        {/* Live Map with Guards */}
        <Card className="bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 rounded-2xl shadow-lg">
          <CardHeader className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400 text-xl font-bold animate-pulse">
            📍 Nearby Security Guards
          </CardHeader>
          <CardContent>
            <MapContainer
              center={[incidentDetails.location.lat || 22.7766, incidentDetails.location.lng || 86.1445]}
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
              placeholder="Incident Title"
              value={incidentDetails.title}
              onChange={(e) => setIncidentDetails({ ...incidentDetails, title: e.target.value })}
              className="bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Textarea
              placeholder="Describe the Incident"
              value={incidentDetails.description}
              onChange={(e) => setIncidentDetails({ ...incidentDetails, description: e.target.value })}
              className="bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all" onClick={reportIncident}>
              Submit Report
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
      </div>
    </AuthLayout>
  );
}
