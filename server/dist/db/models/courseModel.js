"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const courseTimeSchema = new mongoose_1.Schema({
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
}, { _id: false });
const courseDateSchema = new mongoose_1.Schema({
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
}, { _id: false });
const courseScheduleSchema = new mongoose_1.Schema({
    dayOfWeek: { type: String, required: true },
    courseTime: { type: courseTimeSchema, required: true },
    courseDate: { type: courseDateSchema, required: true },
}, { _id: false });
const courseSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    classroom: { type: String, required: true },
    courseSchedule: { type: courseScheduleSchema, required: true },
    instructor: { type: mongoose_1.Schema.Types.ObjectId, ref: "Teacher", required: true },
    studentClasses: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "StudentClass" }],
});
const Course = (0, mongoose_1.model)("Course", courseSchema);
exports.default = Course;
