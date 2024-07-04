const rateLimit = require("express-rate-limit");
const createNewErrors = require("./createNewErrors");

// 配置 rate limiter
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1小时的时间窗口
  max: 10000, // 每个IP地址最多可以请求10次
  handler: (req, res, next) => {
    const err = createNewErrors(
      "Too many requests from this IP, please try again after an hour",
      429,
      "rateLimit"
    );
    next(err);
  },
  headers: true, // 发送RateLimit的相关信息到Headers,把请求限制的信息发送到Headers
});

module.exports = limiter;
