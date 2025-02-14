import React from "react";

export function Card({ children, className }) {
  return <div className={`bg-white shadow-md rounded-xl p-4 ${className}`}>{children}</div>;
}

export function CardHeader({ children }) {
  return <h3 className="text-lg font-semibold mb-2">{children}</h3>;
}

export function CardContent({ children }) {
  return <div>{children}</div>;
}
