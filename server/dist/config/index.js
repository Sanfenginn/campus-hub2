"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const optionalConfig = {
    PORT_API_GATEWAY: parseInt(process.env.PORT_API_GATEWAY || "3000", 10),
    PORT_RESTFUL: parseInt(process.env.PORT_RESTFUL || "3001", 10),
    PORT_GRAPHQL: parseInt(process.env.PORT_GRAPHQL || "3002", 10),
    NODE_ENV: process.env.NODE_ENV || "development",
};
// 将字符串转换为数字，10表示使用十进制
const requiredConfig = {
    DB_CONNECTION_STRING: process.env.DB_CONNECTION_STRING,
    JWT_SECRET: process.env.JWT_SECRET,
};
for (const key in requiredConfig) {
    if (requiredConfig[key] == null) {
        throw new Error(`Missing value for environment variable ${key}`);
    }
}
const config = { ...optionalConfig, ...requiredConfig };
exports.default = config;
