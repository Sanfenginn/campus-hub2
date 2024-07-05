import { Schema, model } from "mongoose";

const teacherSchema = new Schema({
  name: {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    _id: false,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  courses: [
    {
      type: Schema.Types.ObjectId,
      ref: "Course",
      _id: false,
    },
  ],
  studentClasses: [
    {
      type: Schema.Types.ObjectId,
      ref: "StudentClass",
      _id: false,
    },
  ],
});

export const Teacher = model("Teacher", teacherSchema);
