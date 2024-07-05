import { Schema, model } from "mongoose";

const studentClassSchema = new Schema({
  className: {
    type: String,
    required: true,
    notEmpty: true,
  },
  students: [
    {
      type: Schema.Types.ObjectId,
      ref: "Student",
      _id: false,
    },
  ],
  courses: [
    {
      type: Schema.Types.ObjectId,
      ref: "Course",
      _id: false,
    },
  ],
});

export const StudentClass = model("StudentClass", studentClassSchema);
