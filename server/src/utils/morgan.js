const morgan = require("morgan");
const createLogger = require("./logger");
const logger = createLogger();
const moment = require("moment");
const config = require("../config/index");

morgan.format("custom", (tokens, req, res) => {
  return JSON.stringify({
    timestamp: moment(tokens.date(req, res, "iso")).format(
      "YYYY-MM-DD HH:mm:ss"
    ),
    clientIP: tokens["remote-addr"](req, res),
    method: tokens.method(req, res),
    url: tokens.url(req, res),
    status: tokens.status(req, res),
    responseTime: `${tokens["response-time"](req, res)} ms`,
    userAgent: tokens["user-agent"](req, res),
  });
});

// 根据 NODE_ENV 设置 morgan 格式
const format = config.NODE_ENV === "development" ? "tiny" : "custom";

module.exports = morgan("custom", {
  stream: logger.stream,
});
