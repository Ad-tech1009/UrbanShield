import mongoose from "mongoose";


const shiftSchema = new mongoose.Schema({
    guard_id: { type: mongoose.Schema.Types.ObjectId, ref: "Guard", required: true },
    location: { latitude: Number, longitude: Number },
    start_time: Date,
    end_time: Date,
    status: { type: String, enum: ["Scheduled", "Ongoing", "Completed", "Missed"], default: "Scheduled" }
});

const Shift = mongoose.model("Shift", shiftSchema);

export default Shift; // ✅ Use default export  
