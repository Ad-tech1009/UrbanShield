import express from "express";
import { handlelogin, handlesignup } from "../controllers/user.js";

const router = express.Router();

router.post("/signup", handlesignup);
router.post("/login", handlelogin);

export default router; // ✅ Use default export
