import mongoose from 'mongoose';

const GuardLocationSchema = new mongoose.Schema({
  guardId: { type: mongoose.Schema.Types.ObjectId, ref: "SecurityGuard", required: true },
  timestamp: { type: Date, default: Date.now },
  location: {
    type: { type: String, enum: ["Point"], default: "Point" },
    coordinates: { type: [Number], required: true }, // [longitude, latitude]
  },
});

GuardLocationSchema.index({ location: "2dsphere" }); // Enable geospatial queries

const GuardLocation = mongoose.model("GuardLocation", GuardLocationSchema);

export default GuardLocation;