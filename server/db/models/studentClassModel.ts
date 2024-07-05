import { Schema, model, Document, Types } from "mongoose";

interface IStudentClass extends Document {
  className: string;
  students: Types.ObjectId[];
  courses: Types.ObjectId[];
}

const studentClassSchema = new Schema<IStudentClass>({
  className: {
    type: String,
    required: true,
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

const StudentClass = model<IStudentClass>("StudentClass", studentClassSchema);

export default StudentClass;
