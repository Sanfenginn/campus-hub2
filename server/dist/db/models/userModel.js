"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    name: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        _id: false,
    },
    dob: {
        type: Date,
        required: true,
        set: (value) => {
            if (typeof value === "string") {
                return new Date(value);
            }
            return value;
        },
    },
    account: { type: String, required: true },
    password: { type: String },
    role: {
        userType: {
            type: String,
            enum: ["student", "teacher", "admin"],
            required: true,
        },
        userId: { type: mongoose_1.Schema.Types.ObjectId, refPath: "role.userTypeRef" },
        roleInfo: { type: mongoose_1.Schema.Types.ObjectId, ref: "Role" },
        _id: false,
    },
    contact: {
        email: { type: String, required: true },
        phone: { type: String, required: true },
        _id: false,
    },
    address: {
        houseNumber: { type: String },
        street: { type: String },
        suburb: { type: String },
        city: { type: String },
        state: { type: String },
        country: { type: String },
        postalCode: { type: String },
        _id: false,
    },
});
// 动态设置引用的路径
userSchema.virtual("role.userTypeRef").get(function () {
    return this.role.userType === "student"
        ? "Student"
        : this.role.userType === "teacher"
            ? "Teacher"
            : this.role.userType === "admin"
                ? "Admin"
                : null;
});
const User = (0, mongoose_1.model)("User", userSchema);
exports.default = User;
