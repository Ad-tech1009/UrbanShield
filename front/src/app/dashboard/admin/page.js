"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import Sidebar from "@/components/Sidebar";
const data = [
  { name: "Guards", value: 25 },
  { name: "Incidents", value: 10 },
  { name: "Resolved", value: 8 },
  { name: "Pending", value: 2 },
];

export default function Dashboard() {
  return (
    <>
    {/* Sidebar */}
    <Sidebar />
    <div className="p-6 space-y-6 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 min-h-screen text-white">
      {/* Dashboard Header */}
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400 animate-pulse">
          Admin Dashboard
        </h1>
        <p className="text-gray-400 mt-2">
          Welcome back! Here’s an overview of your system.
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 rounded-2xl shadow-lg">
          <CardHeader className="text-white text-xl font-bold">Total Guards</CardHeader>
          <CardContent className="text-3xl font-bold text-blue-400">25</CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 rounded-2xl shadow-lg">
          <CardHeader className="text-white text-xl font-bold">Total Incidents</CardHeader>
          <CardContent className="text-3xl font-bold text-red-400">10</CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 rounded-2xl shadow-lg">
          <CardHeader className="text-white text-xl font-bold">Resolved Incidents</CardHeader>
          <CardContent className="text-3xl font-bold text-green-400">8</CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 rounded-2xl shadow-lg">
          <CardHeader className="text-white text-xl font-bold">Pending Incidents</CardHeader>
          <CardContent className="text-3xl font-bold text-yellow-400">2</CardContent>
        </Card>
      </div>

      {/* Charts */}
      <Card className="bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 rounded-2xl shadow-lg">
        <CardHeader className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400 text-xl font-bold animate-pulse">
          📊 Incident Reports
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <XAxis dataKey="name" stroke="white" />
              <YAxis stroke="white" />
              <Tooltip />
              <Bar dataKey="value" fill="#4F46E5" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
    </>
  );
}