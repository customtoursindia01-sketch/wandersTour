import express from "express";
import { getSettings, updateSettings } from "../controllers/settingsController.js";
import { protectAdmin } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", getSettings); // public
router.put("/admin", protectAdmin, updateSettings);

export default router;
