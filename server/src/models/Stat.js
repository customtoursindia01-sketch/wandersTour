import mongoose from "mongoose";

// Singleton document holding the homepage stat counters.
const statSchema = new mongoose.Schema(
  {
    key: { type: String, default: "site-stats", unique: true },
    happyTravelers: { type: Number, default: 6500 },
    tourPackages: { type: Number, default: 120 },
    destinationsCovered: { type: Number, default: 35 },
    yearsOfExperience: { type: Number, default: 10 },
  },
  { timestamps: true }
);

export default mongoose.model("Stat", statSchema);
