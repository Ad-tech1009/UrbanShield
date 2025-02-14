import mongoose from 'mongoose';
const incidentSchema = new mongoose.Schema({
    location:{type:String, required:true},
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    time_of_day: { type: Number, required: true, min: 0, max: 23 }, // 0-23 hours
    day_of_week: { type: Number, required: true, min: 0, max: 6 }, 
    description: { type: String },
    reported_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Foreign key reference to users collection
    timestamp: { type: Date, default: Date.now }
});

const Incident = mongoose.model("Incident", incidentSchema);
export default Incident;

