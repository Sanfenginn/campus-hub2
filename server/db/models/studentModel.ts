import { Schema, model, Document, Types } from "mongoose";

interface IStudent extends Document {
  name: {
    firstName: string;
    lastName: string;
  };
  userId: Types.ObjectId;
  studentClass?: Types.ObjectId;
}

const studentSchema = new Schema<IStudent>({
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
  studentClass: {
    type: Schema.Types.ObjectId,
    ref: "StudentClass",
  },
});

const Student = model<IStudent>("Student", studentSchema);

export default Student;
