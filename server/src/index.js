import "dotenv/config";
import express from "express";
import cors from "cors";

import connectDB from "./config/db.js";
import { seedDatabase } from "./utils/seedData.js";
import { notFound, errorHandler } from "./middlewares/errorHandler.js";
import { registerCrudRoutes } from "./routes/registerCrudRoutes.js";

import authRoutes from "./routes/authRoutes.js";
import inquiryRoutes from "./routes/inquiryRoutes.js";
import statRoutes from "./routes/statRoutes.js";
import settingsRoutes from "./routes/settingsRoutes.js";

import tourController from "./controllers/tourController.js";
import destinationController from "./controllers/destinationController.js";
import themeController from "./controllers/themeController.js";
import guideController from "./controllers/guideController.js";
import testimonialController from "./controllers/testimonialController.js";
import blogController from "./controllers/blogController.js";
import faqController from "./controllers/faqController.js";

const app = express();

const allowedOrigins = (process.env.CLIENT_ORIGINS || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      // Allow non-browser tools (no origin header) and any configured origin.
      if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      callback(new Error(`Origin ${origin} not allowed by CORS`));
    },
    credentials: true,
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    name: "Wander India Tours API",
    status: "ok",
    health: "/api/health",
    docs: "All endpoints are under /api/*",
  });
});

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

app.use("/api/auth", authRoutes);
app.use("/api/inquiries", inquiryRoutes);
app.use("/api/stats", statRoutes);
app.use("/api/settings", settingsRoutes);

registerCrudRoutes(app, "tours", tourController);
registerCrudRoutes(app, "destinations", destinationController);
registerCrudRoutes(app, "themes", themeController);
registerCrudRoutes(app, "guides", guideController);
registerCrudRoutes(app, "testimonials", testimonialController);
registerCrudRoutes(app, "blog", blogController);
registerCrudRoutes(app, "faqs", faqController);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5050;

const start = async () => {
  await connectDB();
  await seedDatabase();
  app.listen(PORT, () => {
    console.log(`Wander India Tours API running on http://localhost:${PORT}`);
  });
};

start().catch((error) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
