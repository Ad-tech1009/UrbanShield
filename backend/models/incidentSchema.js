import mongoose from "mongoose";

const IncidentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  status: { type: String, enum: ["Pending", "Verified", "Resolved"], default: "Pending" },
  reportedAt: { type: Date, default: Date.now },
});

const Incident = mongoose.model("Incident", IncidentSchema);
export default Incident;