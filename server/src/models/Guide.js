import mongoose from "mongoose";

const guideSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    photo: { type: String, required: true, trim: true },
    tag: { type: String, default: "Government-Approved Guide", trim: true },
    languages: { type: String, required: true, trim: true }, // e.g. "English & French"
    isPublished: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Guide", guideSchema);
