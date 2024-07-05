"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const index_1 = __importDefault(require("../config/index"));
const logger_1 = __importDefault(require("./logger"));
const logger = (0, logger_1.default)(__filename);
const connectToDB = async (next) => {
    const db = mongoose_1.default.connection;
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
        await mongoose_1.default.connect(index_1.default.DB_CONNECTION_STRING);
        logger.info("Mongoose connected successfully.");
        if (next) {
            next();
        }
    }
    catch (err) {
        logger.error("Failed to connect to the database", err);
        throw err; // Rethrow the error to be caught in the calling context
    }
};
exports.default = connectToDB;
