import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let memoryServer = null;

/**
 * Connects to MongoDB. If MONGO_URI is set in the environment, it connects
 * to that database (e.g. MongoDB Atlas or a local MongoDB instance).
 * Otherwise, it automatically spins up an in-memory MongoDB instance so the
 * project runs out-of-the-box without any local database installation.
 */
const connectDB = async () => {
  const configuredUri = process.env.MONGO_URI?.trim();

  if (configuredUri) {
    await mongoose.connect(configuredUri);
    console.log("MongoDB connected:", configuredUri.replace(/\/\/.*@/, "//***@"));
    return;
  }

  console.warn("MONGO_URI not set — starting in-memory MongoDB for local development...");
  memoryServer = await MongoMemoryServer.create();
  const uri = memoryServer.getUri();
  await mongoose.connect(uri, { dbName: "wander-india-tours" });
  console.log("In-memory MongoDB connected. Data resets whenever the server restarts.");
};

export const disconnectDB = async () => {
  await mongoose.disconnect();
  if (memoryServer) await memoryServer.stop();
};

export default connectDB;
