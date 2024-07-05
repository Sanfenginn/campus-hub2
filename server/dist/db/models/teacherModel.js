"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const teacherSchema = new mongoose_1.Schema({
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
    courses: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Course",
            _id: false,
        },
    ],
    studentClasses: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "StudentClass",
            _id: false,
        },
    ],
});
const Teacher = (0, mongoose_1.model)("Teacher", teacherSchema);
exports.default = Teacher;
