import Guard from "../models/guardSchema.js";
import Shift from "../models/shiftSchema.js";
import User from '../models/userSchema.js';
import mongoose from "mongoose";

// Get all guards
export const getGuards = async (req, res) => {
  try {
    const guards = await Guard.find();
    res.status(200).json({message: "success",guards});
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch guards", error: error.message });
  }
};

// Delete a guard by ID
export const deleteGuard = async (req, res) => {
  try {
    const { id } = req.params;
    await Guard.findByIdAndDelete(id);
    res.status(200).json({ message: "Guard deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete guard", error: error.message });
  }
};


// assigning shifts to guards
export const assignGuards= async (req, res) => {
    const { guard_id, latitude, longitude, start_time, end_time } = req.body;

    const newShift = new Shift({
        guard_id,
        location: { latitude, longitude },
        start_time,
        end_time,
        status: "Scheduled"
    });

    await newShift.save();
    res.json({ message: "Shift assigned successfully", shift: newShift });
};

//gett all shifts of a guard
export const getMyShifts = async (req, res) => {
    const { id } = req.user.id;
    const shifts = await Shift.find({ guard_id: id });
    res.json({ message: "success", shifts });
}


// check in a guard to a shift
export const getNextShift = async (req, res) => {
    try {
      const userId=req.user.id;
       
        if (!userId) return res.status(400).json({ message: "Guard ID is required" });

        const now = new Date();

        // Find the next shift where start_time is greater than the current time
        const nextShift = await Shift.findOne({
            userId,
            start_time: { $gt: now },  // Greater than current time
            status: "Scheduled"
        }).sort({ start_time: 1 });  // Sort by start_time (earliest first)

        if (!nextShift) {
            return res.json({ message: "No upcoming shifts found" });
        }

        res.json(nextShift);
    } catch (error) {
        console.error("Error fetching next shift:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

//Approval requests 
export const approvehandler=async (req, res) => {
  const userId=req.user.id;

  const { fullName, age, contact, address, photo, governmentId } = req.body;
 

  try {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid user ID" });
    }

    const userExists = await User.findById(userId);
    if (!userExists) return res.status(404).json({ message: "User not found" });

    const guardExists = await Guard.findOne({ userId });
    if (guardExists) return res.status(400).json({ message: "Guard request already exists" });

    const newGuard = new Guard({
      userId,
      personalDetails: {
        fullName,
        age,
        contact,
        address,
        photo,
        governmentId,
        guardId: `G-${Date.now()}`, // Unique Guard ID
      },
      backgroundVerificationStatus: "Pending",
    });

    await newGuard.save();
    res.status(201).json({ message: "Guard request submitted successfully", guard: newGuard });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};