"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import "leaflet/dist/leaflet.css";
import AuthLayout from "@/components/AuthLayout";

// Dynamically import React-Leaflet components (avoid SSR issues)
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false });

// Dynamically import Recharts components
const ResponsiveContainer = dynamic(() => import("recharts").then((mod) => mod.ResponsiveContainer), { ssr: false });
const BarChart = dynamic(() => import("recharts").then((mod) => mod.BarChart), { ssr: false });
const XAxis = dynamic(() => import("recharts").then((mod) => mod.XAxis), { ssr: false });
const YAxis = dynamic(() => import("recharts").then((mod) => mod.YAxis), { ssr: false });
const Tooltip = dynamic(() => import("recharts").then((mod) => mod.Tooltip), { ssr: false });
const Bar = dynamic(() => import("recharts").then((mod) => mod.Bar), { ssr: false });

// Mock guard data
const guards = [
  { id: 1, name: "Guard 1", lat: 22.7766, lng: 86.1445, status: "On Duty" },
  { id: 2, name: "Guard 2", lat: 22.7800, lng: 86.1400, status: "Off Duty" },
];

export default function AdminDashboard() {
  const [liveGuards] = useState(guards);

  return (
    <AuthLayout role="admin">
    <div className="grid grid-cols-12 gap-4 p-4">
      {/* Sidebar */}
      <div className="col-span-3 bg-gray-800 text-white p-4 rounded-xl">
        <h2 className="text-xl font-bold">Admin Panel</h2>
        <ul className="mt-4">
          <li className="p-2 hover:bg-gray-700 rounded">📍 Live Tracking</li>
          <li className="p-2 hover:bg-gray-700 rounded">🚨 Incident Reports</li>
          <li className="p-2 hover:bg-gray-700 rounded">🛡 Guard Management</li>
          <li className="p-2 hover:bg-gray-700 rounded">📊 Reports & Analytics</li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="col-span-9 space-y-4">
        {/* Live Map */}
        <Card>
          <CardHeader>Live Guard Tracking</CardHeader>
          <CardContent>
            <MapContainer center={[22.7766, 86.1445]} zoom={14} style={{ height: "300px", width: "100%" }}>
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {liveGuards.map((guard) => (
                <Marker key={guard.id} position={[guard.lat, guard.lng]}>
                  <Popup>{guard.name} - {guard.status}</Popup>
                </Marker>
              ))}
            </MapContainer>
          </CardContent>
        </Card>

        {/* Stats & Reports */}
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardHeader>📊 Incident Reports</CardHeader>
            <CardContent>
              <p>3 new reports today.</p>
              <Button className="mt-2">View Reports</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>🛡 Guard Performance</CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={150}>
                <BarChart data={[{ name: "Guard 1", value: 8 }, { name: "Guard 2", value: 6 }]}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#4F46E5" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div></AuthLayout>
  );
}
