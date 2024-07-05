import { Schema, model } from "mongoose";

const studentSchema = new Schema({
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
  studentClass: {
    type: Schema.Types.ObjectId,
    ref: "StudentClass",
  },
});

export const Student = model("Student", studentSchema);
