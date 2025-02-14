"use client";  // Ensure it's a client component

import dynamic from "next/dynamic"; 
import { useState, useEffect } from "react";
import io from "socket.io-client";
import "leaflet/dist/leaflet.css";

// Load react-leaflet dynamically to avoid SSR issues
const MapContainer = dynamic(() => import("react-leaflet").then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then(mod => mod.Popup), { ssr: false });

const socket = io("http://localhost:5000"); // Use your backend URL

export default function LiveMap() {
  const [location, setLocation] = useState({ lat: 22.7766, lng: 86.1445 });

  useEffect(() => {
    if (typeof window !== "undefined" && navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          setLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
        },
        (error) => console.error("Geolocation error:", error),
        { enableHighAccuracy: true }
      );
    }

    socket.on("connect", () => console.log("Connected to socket server"));
    return () => socket.off("connect");
  }, []);

  return (
    <MapContainer center={[location.lat, location.lng]} zoom={13} style={{ height: "500px", width: "100%" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[location.lat, location.lng]}>
        <Popup>Your Location</Popup>
      </Marker>
    </MapContainer>
  );
}