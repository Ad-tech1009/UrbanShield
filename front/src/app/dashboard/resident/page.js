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
    <div className="p-4 space-y-4">
      {/* Live Map with Guards */}
      <Card>
        <CardHeader>📍 Nearby Security Guards</CardHeader>
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

      {/* Incident Reporting Form */}
      <Card>
        <CardHeader>🚨 Report an Incident</CardHeader>
        <CardContent>
          <Input
            type="text"
            placeholder="Incident Location"
            value={incidentDetails.location}
            onChange={(e) => setIncidentDetails({ ...incidentDetails, location: e.target.value })}
          />
          <Textarea
            placeholder="Describe the Incident"
            value={incidentDetails.description}
            onChange={(e) => setIncidentDetails({ ...incidentDetails, description: e.target.value })}
          />
          <Button className="mt-2 w-full bg-blue-600" onClick={reportIncident}>
            Submit Report
          </Button>
        </CardContent>
      </Card>

      {/* Incident History Table */}
      <Card>
        <CardHeader>📜 Your Incident Reports</CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell>Location</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {incidents.map((incident, index) => (
                <TableRow key={index}>
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
      <Button className="w-full bg-red-600 hover:bg-red-700 text-white text-lg p-3 rounded-lg">
        🚨 Trigger Emergency Alert
      </Button>
    </div>
  );
}
