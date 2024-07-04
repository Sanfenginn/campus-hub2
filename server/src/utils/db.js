const mongoose = require("mongoose");
const config = require("../config/index");
const createLogger = require("../utils/logger");
const logger = createLogger(__filename);

const connectToDB = async (next) => {
  const db = mongoose.connection;
  db.on("error", (err) => {
    logger.error("Database connection error:", err);
    process.exit(1); //exit with failure 正常退出是0，非0是异常退出
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
  } catch (err) {
    logger.error("Failed to connect to the database", err);
    throw err; // 抛出错误以便在调用处捕获
  }

  //此处不需要 await，因为mongoose.connect返回的是一个promise，不需要等待
  //为什么不需要 try catch，因为在调用connectToDB的地方已经有try catch了？
};

module.exports = connectToDB;
