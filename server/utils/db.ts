import mongoose from "mongoose";
import config from "../config/index";
import createLogger from "./logger";
import { fileURLToPath } from "url";
import { User } from "../models/userModel";

const __filename = fileURLToPath(import.meta.url);
const logger = createLogger(__filename);

const connectToDB = async (next?: () => void): Promise<void> => {
  const db = mongoose.connection;

  db.on("error", (err) => {
    logger.error("Database connection error:", err);
    process.exit(1); // exit with failure
  });

  db.on("connected", () => {
    logger.info("Database connected");
  });

  db.on("disconnected", () => {
    logger.warn("Database disconnected");
  });

  try {
    await mongoose.connect(config.DB_CONNECTION_STRING);
    logger.info("Mongoose connected successfully.");
    if (next) {
      next();
    }
  } catch (err) {
    logger.error("Failed to connect to the database", err);
    throw err; // Rethrow the error to be caught in the calling context
  }
};

export default connectToDB;
