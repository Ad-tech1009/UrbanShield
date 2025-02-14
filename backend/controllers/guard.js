import { connectDB } from "@/lib/mongodb";
import Guard from "@/models/Guard";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      await connectDB();
      const guards = await Guard.find();
      res.status(200).json(guards);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch guards", error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
  
  const { id } = req.query;

  if (req.method === "DELETE") {
    try {
      await connectDB();
      await Guard.findByIdAndDelete(id);
      res.status(200).json({ message: "Guard deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete guard", error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}