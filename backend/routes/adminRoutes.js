import express from "express";
import { handlelogin, handlesignup} from "../controllers/user.js";
import {handleRequest} from "../controllers/incident.js";
import { handler} from "../controllers/guard.js";
const router = express.Router();

router.get("/guards", handler);
router.delete("/guards", handler);
router.get("/incidents",handleRequest);
router.put("/approve",handleRequest);

export default router; // ✅ Use default export
