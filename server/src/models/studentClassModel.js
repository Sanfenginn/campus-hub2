const { Schema, model } = require("mongoose");
const Course = require("./courseModel");

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

// 在删除 StudentClass 文档之前，更新所有关联的 Student 文档
studentClassSchema.pre("remove", async function (next) {
  const StudentModel = require("./studentModel"); // 引入 Student 模型
  await StudentModel.updateMany(
    { studentClass: this._id },
    { $unset: { studentClass: "" } } // 将 studentClass 字段置空
  );
  next();
});

const StudentClass = model("StudentClass", studentClassSchema);

module.exports = StudentClass;
