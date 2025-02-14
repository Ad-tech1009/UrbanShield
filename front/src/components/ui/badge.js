"use client";

export function Badge({ children, className = "" }) {
  return (
    <span className={`px-3 py-1 text-sm font-semibold rounded-full ${className}`}>
      {children}
    </span>
  );
}
