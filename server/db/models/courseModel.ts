import { Schema, model, Document } from "mongoose";

interface CourseTime {
  startTime: string;
  endTime: string;
}

interface CourseDate {
  startDate: Date;
  endDate: Date;
}

interface CourseSchedule {
  dayOfWeek: string;
  courseTime: CourseTime;
  courseDate: CourseDate;
}

export interface ICourse extends Document {
  name: string;
  description: string;
  classroom: string;
  courseSchedule: CourseSchedule;
  instructor: Schema.Types.ObjectId;
  studentClasses: Schema.Types.ObjectId[];
}

const courseTimeSchema = new Schema<CourseTime>(
  {
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
  },
  { _id: false }
);

const courseDateSchema = new Schema<CourseDate>(
  {
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
  },
  { _id: false }
);

const courseScheduleSchema = new Schema<CourseSchedule>(
  {
    dayOfWeek: { type: String, required: true },
    courseTime: { type: courseTimeSchema, required: true },
    courseDate: { type: courseDateSchema, required: true },
  },
  { _id: false }
);

const courseSchema = new Schema<ICourse>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  classroom: { type: String, required: true },
  courseSchedule: { type: courseScheduleSchema, required: true },
  instructor: { type: Schema.Types.ObjectId, ref: "Teacher", required: true },
  studentClasses: [{ type: Schema.Types.ObjectId, ref: "StudentClass" }],
});

const Course = model<ICourse>("Course", courseSchema);

export default Course;
