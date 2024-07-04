const createLogger = require("../utils/logger");
const logger = createLogger(__filename);
const config = require("../config/index");

const errorHandler = (err, req, res, next) => {
  console.log("err:", err);
  console.log("error.stack1: ", err.stack);

  const defaultError = {
    statusCode: 500,
    message: "Internal Server Error",
    stack: "No stack trace available",
    data: "No data available",
  };

  let { statusCode, message, stack, data } = defaultError;

  if (err.errorType) {
    statusCode = err.statusCode || defaultError.statusCode;
    message = err.message || defaultError.message;
    stack = err.stack || defaultError.stack;

    if (err.errorType === "validation") {
      data = err.data || "No data available";
    }

    if (err.errorType === "axios") {
      statusCode = err.response?.status || defaultError.status;
      message = err.response?.statusText || defaultError.message;
    }

    // console.log("Error Type: ", err.errorType);
    // console.log("Error Status Code: ", statusCode);
    // console.log("Error Message: ", message);

    res.status(statusCode).json({
      message,
      statusCode,
      ...(err.errorType === "validation" ? { data } : {}),
      stack: process.env.NODE_ENV === "production" ? undefined : stack,
    });

    logger.error(`Error fetching news: ${err.message}`, {
      statusCode,
      stack: process.env.NODE_ENV === "production" ? undefined : stack,
      errorType: err.errorType,
      ...(err.errorType === "validation" && { data: data }),
      errorFileName: err.fileName || "Unknown",
    });
  } else {
    res.status(defaultError.statusCode).json({
      message: defaultError.message,
      statusCode: defaultError.statusCode,
    });

    logger.error(`Error fetching news: ${defaultError.message}`, {
      statusCode: defaultError.statusCode,
      stack:
        process.env.NODE_ENV === "production" ? undefined : defaultError.stack,
    });
  }
};

module.exports = errorHandler;
