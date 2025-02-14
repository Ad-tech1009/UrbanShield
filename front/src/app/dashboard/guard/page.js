"use client";
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import io from "socket.io-client";
import "leaflet/dist/leaflet.css";

const socket = io("http://localhost:5000");

export default function GuardDashboard() {
  const [location, setLocation] = useState({ lat: 22.7766, lng: 86.1445 });
  const [status, setStatus] = useState("Off Duty");
  const [incident, setIncident] = useState("");

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
    <div className="p-4 space-y-4">
      {/* Live Location & Duty Status */}
      <Card>
        <CardHeader>📍 Assigned Location</CardHeader>
        <CardContent>
          <MapContainer center={[location.lat, location.lng]} zoom={15} style={{ height: "250px", width: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <Marker position={[location.lat, location.lng]}>
              <Popup>Assigned Location</Popup>
            </Marker>
          </MapContainer>
        </CardContent>
      </Card>

      {/* Shift & Duty Management */}
      <Card>
        <CardHeader>🛡 Duty Status</CardHeader>
        <CardContent>
          <p className="text-lg font-semibold">Current Status: {status}</p>
          <Button className="mt-2" onClick={toggleDuty}>
            {status === "On Duty" ? "Go Off Duty" : "Start Duty"}
          </Button>
        </CardContent>
      </Card>

      {/* Incident Reporting */}
      <Card>
        <CardHeader>🚨 Report an Incident</CardHeader>
        <CardContent>
          <Textarea placeholder="Describe the incident..." value={incident} onChange={(e) => setIncident(e.target.value)} />
          <Button className="mt-2" onClick={reportIncident}>
            Submit Report
          </Button>
        </CardContent>
      </Card>

      {/* Emergency SOS Button */}
      <Button className="w-full bg-red-600 hover:bg-red-700 text-white text-lg p-3 rounded-lg">
        ⚠️ Emergency SOS
      </Button>
    </div>
  );
}
