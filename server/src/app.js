const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");

const errorHandler = require("./middlewares/handleErrorMiddleware");
const morgan = require("./utils/morgan");
const rateLimit = require("./utils/rateLimit"); // 引入 rate limiter
const formatResponse = require("./middlewares/formatResponseMiddleware");
const router = require("./routers");
const pathNotFound = require("./middlewares/pathNotFound");
const { login } = require("./controllers/loginController");
const { authenticate } = require("./middlewares/authMiddleware");

const app = express();

app.use(helmet());
app.use(cors());
// app.use(
//   cors({
//     origin: allowedOrigins,
//     origin: "http://localhost:3000", // 你的前端地址
//     credentials: true,
//   })
// );
app.use(express.json());
app.use(morgan);
app.use(rateLimit);

app.use(formatResponse);

app.post("/api/login", login);

app.use(cookieParser());
// 使用 authenticate 中间件来保护以下路由
// app.use(authenticate);

app.use("/api", router);

app.use(pathNotFound); //需要放在错误处理中间件之前
app.use(errorHandler);

module.exports = app;
