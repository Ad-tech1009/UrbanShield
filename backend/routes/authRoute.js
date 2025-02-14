import express from "express";
import { handlelogin, handlesignup} from "../controllers/user.js";
// import {handleRequest} from "../controllers/incident.js";
const router = express.Router();

router.post("/signup", handlesignup);
router.post("/login", handlelogin);
// router.get("/pending",handleRequest);
// router.put("/approve",handleRequest);

export default router; // ✅ Use default export
