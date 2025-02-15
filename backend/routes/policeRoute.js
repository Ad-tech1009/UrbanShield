import express from "express";


import { getUnverifiedGuards, verifyGuard } from "../controllers/police.js";


const router = express.Router();

router.get('/approves',getUnverifiedGuards);
router.post('/verify',verifyGuard);

export default router; // ✅ Use default export
