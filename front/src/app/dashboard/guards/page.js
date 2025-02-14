"use client";
import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

export default function GuardLocation() {
  const [location, setLocation] = useState({ lat: null, lng: null });

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });

          // Send location to WebSocket server
          socket.emit("updateLocation", {
            guardId: "65d85e9ab0f5bc0012f7b920", // Replace with actual guard ID
            lat: latitude,
            lng: longitude,
          });
        },
        (error) => console.error("Error fetching location:", error),
        { enableHighAccuracy: true }
      );
    } else {
      console.log("Geolocation is not available.");
    }
  }, []);

  return (
    <div>
      <h1>Live Guard Tracking</h1>
      <p>Latitude: {location.lat}</p>
      <p>Longitude: {location.lng}</p>
    </div>
  );
}
