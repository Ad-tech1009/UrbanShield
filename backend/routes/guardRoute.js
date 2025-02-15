import express from "express";

import { approvehandler, getNextShift } from "../controllers/guard.js";

const router = express.Router();

router.get('/duty',getNextShift);
router.post('/apply',approvehandler);
// router.get("/pending",handleRequest);
// router.put("/approve",handleRequest);

export default router; // ✅ Use default export
