import Guard from "../models/guardSchema.js";
import Shift from "../models/shiftSchema.js";
import User from '../models/userSchema.js';
import mongoose from "mongoose";



export const getUnverifiedGuards = async (req, res) => {
  try {
    const unverifiedGuards = await Guard.find({ backgroundVerificationStatus: "Pending" });

    if (!unverifiedGuards.length) {
      return res.status(404).json({ message: "No unverified guards found" });
    }

    res.status(200).json(unverifiedGuards);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};



export const verifyGuard = async (req, res) => {
  try {
    const { guardId } = req.body;
    const { status } = req.body;

    if (!["Approved", "Rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status. Use 'Approved' or 'Rejected'." });
    }

    const updatedGuard = await Guard.findOneAndUpdate(
      { "id": guardId },
      { backgroundVerificationStatus: status },
      { new: true }
    );

    if (!updatedGuard) {
      return res.status(404).json({ message: "Guard not found" });
    }

    res.status(200).json({ message: `Guard ${status}`, guard: updatedGuard });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
