import { Schema, model } from "mongoose";

const courseSchema = new Schema({
  name: {
    type: String,
    required: true,
    notEmpty: true,
  },
  description: {
    type: String,
    required: true,
  },
  classroom: {
    type: String,
    required: true,
  },
  courseSchedule: {
    dayOfWeek: {
      type: String,
      required: true,
    },
    courseTime: {
      startTime: {
        type: String,
        required: true,
      },
      endTime: {
        type: String,
        required: true,
      },
      _id: false,
    },
    courseDate: {
      startDate: {
        type: Date,
        required: true,
      },
      endDate: {
        type: Date,
        required: true,
      },
      _id: false,
    },
    _id: false,
  },
  instructor: {
    type: Schema.Types.ObjectId,
    ref: "Teacher",
  },
  studentClasses: [
    {
      type: Schema.Types.ObjectId,
      ref: "StudentClass",
    },
  ],
});

export const Course = model("Course", courseSchema);
