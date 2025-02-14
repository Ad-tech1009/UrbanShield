"use client";

import { useState, useEffect } from "react";

export default function Home() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/test") // Call Express API
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching:", error));
  }, []);

  return (
    <div>
      <h1>Urban Shield</h1>
      <p>Backend Response: {data ? data.message : "Loading..."}</p>
    
    </div>
  );
}
