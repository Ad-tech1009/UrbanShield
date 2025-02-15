import { Router } from "express";
import Incident from "../models/incidentSchema.js"; // Import Incident Model
const router = Router();

// Fetch all incidents
router.get("/", async (req, res) => {
  try {
    const incidents = await Incident.find();
    res.json(incidents);
  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
});

// Report a new incident
router.post("/", async (req, res) => {
  try {
    const { title, description, location } = req.body;
    if (!title || !description || !location)
      return res.status(400).json({ error: "All fields are required" });

    const newIncident = new Incident({ title, description, location });
    await newIncident.save();
    res.status(201).json({ message: "Incident reported successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Update incident status
router.put("/:id", async (req, res) => {
  try {
    const incident = await Incident.findById(req.params.id);
    if (!incident) return res.status(404).json({ error: "Incident not found" });
    incident.status = req.body.status;
    await incident.save();
    res.json({ message: "Incident updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router; // Export the router
