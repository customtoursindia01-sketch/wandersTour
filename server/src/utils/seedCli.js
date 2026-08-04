import "dotenv/config";
import connectDB from "../config/db.js";
import { seedDatabase } from "./seedData.js";

// CLI entry point: `npm run seed` — force reseeds demo content and ensures
// the default admin account exists. Useful when running against a real
// persistent MongoDB (Atlas / local) rather than the in-memory database.
connectDB()
  .then(() => seedDatabase({ force: true }))
  .then(() => {
    console.log("Seeding complete.");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Seeding failed:", error);
    process.exit(1);
  });
