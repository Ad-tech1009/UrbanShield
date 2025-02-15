import express from "express";
import { handlelogin, handlesignup} from "../controllers/user.js";
//import {handleRequest} from "../controllers/incident.js";
import { deleteGuard, getGuards} from "../controllers/guard.js";
const router = express.Router();

router.get("/guards", getGuards);
router.delete("/guard/:id", deleteGuard);
//router.get("/incidents",handleRequest);
//router.put("/approve",handleRequest);

export default router; // ✅ Use default export
