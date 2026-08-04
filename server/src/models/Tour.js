import mongoose from "mongoose";

const tourSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      trim: true,
      // Free text so admins can create brand-new tabs on the public site
      // simply by assigning tours to a new category name.
    },
    duration: { type: String, required: true, trim: true }, // e.g. "3 Days / 2 Nights"
    route: { type: String, required: true, trim: true }, // e.g. "Delhi – Agra – Jaipur"
    price: { type: Number, required: true, min: 0 },
    currency: { type: String, default: "USD" },
    image: { type: String, required: true, trim: true },
    description: { type: String, default: "", trim: true },
    isFeatured: { type: Boolean, default: false },
    isPublished: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Tour", tourSchema);
