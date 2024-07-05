import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
// import jwt from "jsonwebtoken";
import config from "../config/index";
import createLogger from "../utils/logger";

import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);

const logger = createLogger(__filename);
const app = express();

// Token 验证中间件
// const verifyToken = (req: express.Request, res: express.Response, next: express.NextFunction) => {
//   const token = req.headers["authorization"];
//   if (!token) {
//     return res.status(401).send("Access Denied");
//   }

//   try {
//     const verified = jwt.verify(token, config.JWT_SECRET);
//     (req as any).user = verified;
//     next();
//   } catch (err) {
//     res.status(400).send("Invalid Token");
//   }
// };

// 日志中间件
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

// RESTful API 代理
app.use(
  "/api",
  createProxyMiddleware({
    target: "http://localhost:51004",
    changeOrigin: true,
  })
);

// GraphQL API 代理
app.use(
  "/graphql",
  createProxyMiddleware({
    target: "http://localhost:51005",
    changeOrigin: true,
  })
);

// // 示例保护的路由
// app.use("/protected", verifyToken, (req, res) => {
//   res.send("This is a protected route");
// });

// 启动服务器
app.listen(config.PORT_API_GATEWAY, () => {
  logger.info(
    `API Gateway running on http://localhost:${config.PORT_API_GATEWAY}`
  );
});
