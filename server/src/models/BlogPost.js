import mongoose from "mongoose";

const blogPostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    excerpt: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true },
    link: { type: String, default: "#", trim: true },
    publishedOn: { type: Date, default: Date.now },
    isPublished: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("BlogPost", blogPostSchema);
