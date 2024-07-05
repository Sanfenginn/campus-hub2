import { Schema, model, Document, Types } from "mongoose";

interface ITeacher extends Document {
  name: {
    firstName: string;
    lastName: string;
  };
  userId: Types.ObjectId;
  courses: Types.ObjectId[];
  studentClasses: Types.ObjectId[];
}

const teacherSchema = new Schema<ITeacher>({
  name: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
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

const Teacher = model<ITeacher>("Teacher", teacherSchema);

export default Teacher;
