import express from "express";
import {
  createInquiry,
  getInquiries,
  updateInquiryStatus,
  deleteInquiry,
} from "../controllers/inquiryController.js";
import { protectAdmin } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", createInquiry); // public — itinerary form submission

router.get("/admin", protectAdmin, getInquiries);
router.put("/admin/:id", protectAdmin, updateInquiryStatus);
router.delete("/admin/:id", protectAdmin, deleteInquiry);

export default router;
