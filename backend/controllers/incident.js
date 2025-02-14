
import moment from "moment";
import Incident from '../models/incidentSchema.js';


export const addIncident = async (req, res) => {
    try {
        const { location, latitude, longitude, time, description } = req.body;
        const reported_by = req.user.id; // Assuming authentication middleware provides user ID

        const incidentTime = moment(time);
        const time_of_day = incidentTime.hours();
        const day_of_week = incidentTime.day();

        const newIncident = new Incident({
            location,
            latitude,
            longitude,
            time_of_day,
            day_of_week,
            description,
            reported_by
        });

        await newIncident.save();
        res.status(201).json({ message: "Incident reported successfully", incident: newIncident });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
