import path from "path";
import winston from "winston";

interface MorganLog {
  method: string;
  url: string;
  status: number;
  responseTime: number;
  // 其他可能的 Morgan 属性
}

interface LogEntry {
  timestamp: string;
  logLevel: string;
  fileName?: string;
  message: string | { Morgan: MorganLog };
  statusCode?: number;
  errorType?: string;
  errorData?: any;
  stackTrace?: string;
  errorFileName?: string;
}

const createLogger = (filename?: string) => {
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
          if (typeof message === "object" && "Morgan" in message) {
            // 如果存在，直接使用 Morgan 对象的内容
            return JSON.stringify({
              timestamp,
              logLevel: level.toUpperCase(),
              Morgan: message.Morgan, // 直接使用 Morgan 的内容
            });
          }
          const log: LogEntry = {
            timestamp,
            logLevel: level.toUpperCase(),
            fileName: file,
            message,
            statusCode: status,
            errorType: type,
            errorData: data,
            stackTrace:
              process.env.NODE_ENV === "production" ? undefined : stack,
            errorFileName,
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

  // 使用类型断言声明 `stream`
  (logger as any).stream = {
    write: (message: string) => {
      try {
        const morganLog: MorganLog = JSON.parse(message);
        logger.info({ Morgan: morganLog });
      } catch (error) {
        logger.info({ Morgan: message }); // Fallback to log as a string if parsing fails
      }
    },
  };

  return logger;
};

export default createLogger;
