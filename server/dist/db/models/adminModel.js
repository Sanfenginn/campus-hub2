"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// 创建 Admin 模式
const adminSchema = new mongoose_1.Schema({
    name: {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        _id: false, // 禁用 _id 创建
    },
});
// 创建 Admin 模型
const Admin = (0, mongoose_1.model)("Admin", adminSchema);
exports.default = Admin;
