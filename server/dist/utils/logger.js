"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const winston_1 = __importDefault(require("winston"));
const createLogger = (filename) => {
    const logger = winston_1.default.createLogger({
        level: "info", // 最低日志级别，将记录此级别及以上的日志
        defaultMeta: { file: filename ? path_1.default.basename(filename) : undefined },
        format: winston_1.default.format.combine(winston_1.default.format.timestamp({
            format: "YYYY-MM-DD HH:mm:ss", // 设置时间戳格式
        }), winston_1.default.format.json(), winston_1.default.format.printf(({ timestamp, file, level, message, status, stack, data, type, errorFileName, }) => {
            // 检查 message 是否包含 Morgan 属性
            if (typeof message === "object" && "Morgan" in message) {
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
                message,
                statusCode: status,
                errorType: type,
                errorData: data,
                stackTrace: process.env.NODE_ENV === "production" ? undefined : stack,
                errorFileName,
            };
            return JSON.stringify(log);
        })),
        transports: [
            // 输出到控制台
            new winston_1.default.transports.Console({ level: "info" }),
            // 输出到文件
            new winston_1.default.transports.File({
                filename: path_1.default.join(process.cwd(), "combined.log"), // 记录所有 info 及以上级别的日志
            }),
            new winston_1.default.transports.File({
                filename: path_1.default.join(process.cwd(), "errors.log"), // 仅记录 error 及以上级别的日志
                level: "error",
            }),
        ],
    });
    // 使用类型断言声明 `stream`
    logger.stream = {
        write: (message) => {
            try {
                const morganLog = JSON.parse(message);
                logger.info({ Morgan: morganLog });
            }
            catch (error) {
                logger.info({ Morgan: message }); // Fallback to log as a string if parsing fails
            }
        },
    };
    return logger;
};
exports.default = createLogger;
