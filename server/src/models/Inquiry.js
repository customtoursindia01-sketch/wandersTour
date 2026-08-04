import mongoose from "mongoose";

const inquirySchema = new mongoose.Schema(
  {
    arrivalDate: { type: String, default: "" },
    departureDate: { type: String, default: "" },
    travelers: { type: Number, default: 1 },
    destination: { type: String, default: "" },
    accommodation: { type: String, default: "" },
    budget: { type: String, default: "" },
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    country: { type: String, default: "", trim: true },
    whatsapp: { type: String, default: "", trim: true },
    source: { type: String, default: "" },
    notes: { type: String, default: "" },
    status: {
      type: String,
      enum: ["new", "contacted", "confirmed", "closed"],
      default: "new",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Inquiry", inquirySchema);
