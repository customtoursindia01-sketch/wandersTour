import express from "express";
import { loginAdmin, getCurrentAdmin } from "../controllers/authController.js";
import { protectAdmin } from "../middlewares/auth.js";

const router = express.Router();

router.post("/login", loginAdmin);
router.get("/me", protectAdmin, getCurrentAdmin);

export default router;
