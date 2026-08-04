import express from "express";
import { getStats, updateStats } from "../controllers/statController.js";
import { protectAdmin } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getStats); // public
router.put("/admin", protectAdmin, updateStats);

export default router;
