import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    place: { type: String, default: "", trim: true },
    quote: { type: String, required: true, trim: true },
    avatar: { type: String, default: "", trim: true },
    isPublished: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Testimonial", testimonialSchema);
