import { useEffect, useState } from "react";

import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

import { getUnverifiedGuards, verifyGuard } from "@/services/police";

const PoliceDashboard1 = () => {
  const [pendingGuards, setPendingGuards] = useState([]);

  useEffect(() => {
    const fetchGuards = async () => {
      const data = await getUnverifiedGuards();
      setPendingGuards(data);
    };
    fetchGuards();
    console.log(pendingGuards);
  }, []);

  const handleApproveGuard = async (guardId) => {
    await verifyGuard(guardId);
    setPendingGuards(pendingGuards.filter((guard) => guard.id !== guardId));
  };

  return (
    <Card className="bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 shadow-lg shadow-yellow-500/20">
      <CardHeader className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400 animate-pulse">
        🛂 Approve Guards   
      </CardHeader>
      <CardContent>
        <Table className="text-gray-300">
          <TableHeader>
            <TableRow className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400 text-lg">
              <TableCell>Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Experience</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pendingGuards.map((guard) => (
              <TableRow key={guard.id} className="hover:bg-gray-700 transition-colors duration-200">
                <TableCell>{guard.personalDetails.fullName}</TableCell>
                <TableCell>{guard.personalDetails.age}</TableCell>
                <TableCell>{guard.experience || "1"} years</TableCell>
                <TableCell>
                  <Button
                    className="relative group bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-2 px-4 rounded-lg transition-all transform hover:scale-105 overflow-hidden mr-2"
                    onClick={() => handleApproveGuard(guard.id)}
                  >
                    <span className="absolute inset-0 bg-white opacity-10 scale-0 group-hover:scale-100 transition-transform duration-300"></span>
                    <span className="relative">Approve</span>
                  </Button>
                  <Button className="relative group bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold py-2 px-4 rounded-lg transition-all transform hover:scale-105 overflow-hidden">
                    <span className="absolute inset-0 bg-white opacity-10 scale-0 group-hover:scale-100 transition-transform duration-300"></span>
                    <span className="relative">Reject</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default PoliceDashboard1;
