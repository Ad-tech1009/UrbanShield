import mongoose from "mongoose";

const GuardSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true,
  },
  personalDetails: {
    fullName: { type: String, required: true },
    age: { type: Number, required: true },
    contact: { type: String, required: true },
    address: { type: String, required: true },
    photo: { type: String }, // URL or base64-encoded image
    governmentId: { type: String }, // Store image URL or base64-encoded ID
    guardId: { type: String, unique: true, required: true }, // Unique Guard ID for lookup
  },
  pastWorkHistory: [
    {
      location: String,
      fromDate: Date,
      toDate: Date,
      feedback: String,
      rating: Number,
    },
  ],
  residenceDetails: {
    currentAddress: String,
    city: String,
    state: String,
    pincode: String,
  },
  currentDeployment: {
    assignedLocation: String,
    shiftTimings: String,
    dutyStatus: { type: String, enum: ["On Duty", "Off Duty"], default: "Off Duty" },
  },
  backgroundVerificationStatus: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
});

const Guard = mongoose.model("Guard", GuardSchema);

export default Guard;