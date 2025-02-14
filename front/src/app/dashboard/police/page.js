"use client";
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableCell, TableBody } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import io from "socket.io-client";
import "leaflet/dist/leaflet.css";
import AuthLayout from "@/components/AuthLayout";

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

  const handleApproveGuard = (guardId) => {
    socket.emit("approveGuard", guardId);
  };

  return (
    <AuthLayout role="police">
    <div className="p-4 space-y-4">
      {/* Live Map with Guard Locations */}
      <Card>
        <CardHeader>📍 Guard Live Tracking</CardHeader>
        <CardContent>
          <MapContainer center={[22.7766, 86.1445]} zoom={13} style={{ height: "350px", width: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {guards.map((guard, index) => (
              <Marker key={index} position={[guard.lat, guard.lng]}>
                <Popup>{guard.name} - {guard.dutyStatus}</Popup>
              </Marker>
            ))}
          </MapContainer>
        </CardContent>
      </Card>

      {/* Incident Reports Table */}
      <Card>
        <CardHeader>🚨 Incident Reports</CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell>Guard</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Report</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {incidents.map((incident, index) => (
                <TableRow key={index}>
                  <TableCell>{incident.guardName}</TableCell>
                  <TableCell>{incident.location}</TableCell>
                  <TableCell>{incident.description}</TableCell>
                  <TableCell>
                    <Button variant="outline">Verify</Button>
                    <Button className="ml-2 bg-red-600">Alert Response Team</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Guard Approval Section */}
      <Card>
        <CardHeader>🛂 Approve Guards (Background Check)</CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Experience</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pendingGuards.map((guard, index) => (
                <TableRow key={index}>
                  <TableCell>{guard.name}</TableCell>
                  <TableCell>{guard.age}</TableCell>
                  <TableCell>{guard.experience} years</TableCell>
                  <TableCell>
                    <Button className="bg-green-500 mr-2" onClick={() => handleApproveGuard(guard.id)}>
                      Approve
                    </Button>
                    <Button className="bg-red-500">Reject</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Emergency Alert Button */}
      <Button className="w-full bg-red-600 hover:bg-red-700 text-white text-lg p-3 rounded-lg">
        🚨 Trigger Emergency Response
      </Button>
    </div>
    </AuthLayout>
  );
}
