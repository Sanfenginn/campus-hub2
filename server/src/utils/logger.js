const path = require("path");
const winston = require("winston");

// filename 是每个文件的路径，level 是日志级别
const createLogger = (filename) => {
  const logger = winston.createLogger({
    level: "info", // 最低日志级别，将记录此级别及以上的日志
    defaultMeta: { file: filename ? path.basename(filename) : undefined },
    format: winston.format.combine(
      winston.format.timestamp({
        format: "YYYY-MM-DD HH:mm:ss", // 设置时间戳格式
      }),
      winston.format.json(),
      winston.format.printf(
        ({
          timestamp,
          file,
          level,
          message,
          status,
          stack,
          data,
          type,
          errorFileName,
        }) => {
          // 检查 message 是否包含 Morgan 属性
          if (message.Morgan) {
            // 如果存在，直接使用 Morgan 对象的内容
            return JSON.stringify({
              timestamp,
              logLevel: level.toUpperCase(),
              Morgan: message.Morgan, // 直接使用 Morgan 的内容
            });
          }
          const log = {
            timestamp,
            logLevel: level.toUpperCase(),
            fileName: file,
            message: message,
            statusCode: status,
            errorType: type,
            errorData: data,
            stackTrace:
              process.env.NODE_ENV === "production" ? undefined : stack,
            errorFileName: errorFileName,
          };
          return JSON.stringify(log);
        }
      )
    ),
    transports: [
      // 输出到控制台
      new winston.transports.Console({ level: "info" }),
      // 输出到文件
      new winston.transports.File({
        filename: path.join(process.cwd(), "combined.log"), // 记录所有 info 及以上级别的日志
      }),
      new winston.transports.File({
        filename: path.join(process.cwd(), "errors.log"), // 仅记录 error 及以上级别的日志
        level: "error",
      }),
    ],
  });

  logger.stream = {
    write: (message) => {
      try {
        const morganLog = JSON.parse(message);
        logger.info({ Morgan: morganLog });
      } catch (error) {
        logger.info({ Morgan: message }); // Fallback to log as a string if parsing fails
      }
    },
  };

  return logger;
};

module.exports = createLogger;
