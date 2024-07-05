"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const morgan_1 = __importDefault(require("morgan"));
const moment_1 = __importDefault(require("moment"));
const logger_1 = __importDefault(require("./logger"));
const index_1 = __importDefault(require("../config/index"));
const logger = (0, logger_1.default)();
morgan_1.default.format("custom", (tokens, req, res) => {
    return JSON.stringify({
        timestamp: (0, moment_1.default)(tokens.date(req, res, "iso")).format("YYYY-MM-DD HH:mm:ss"),
        clientIP: tokens["remote-addr"](req, res),
        method: tokens.method(req, res),
        url: tokens.url(req, res),
        status: tokens.status(req, res),
        responseTime: `${tokens["response-time"](req, res)} ms`,
        userAgent: tokens["user-agent"](req, res),
    });
});
// 根据 NODE_ENV 设置 morgan 格式
const format = index_1.default.NODE_ENV === "development" ? "tiny" : "custom";
const morganMiddleware = (0, morgan_1.default)(format, {
    stream: {
        write: (message) => {
            logger.info({ Morgan: JSON.parse(message) });
        },
    },
});
exports.default = morganMiddleware;
