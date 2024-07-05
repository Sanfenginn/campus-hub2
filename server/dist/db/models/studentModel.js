"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const studentSchema = new mongoose_1.Schema({
    name: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        _id: false,
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    studentClass: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "StudentClass",
    },
});
const Student = (0, mongoose_1.model)("Student", studentSchema);
exports.default = Student;
