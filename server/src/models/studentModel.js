const AutoIncrement = require("mongoose-sequence")(require("mongoose"));
const { Schema, model } = require("mongoose");

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

// 在删除 Student 文档之前，更新所有关联的 StudentClass 文档
studentSchema.pre("remove", async function (next) {
  const StudentClassModel = require("./studentClassModel"); // 引入 Student 模型
  await StudentClassModel.updateMany(
    { students: this._id },
    { $pull: { students: this._id } } // 将 studentClass 字段置空
  );
  next();
});

// 创建模型，其实就是创建集合
const Student = model("Student", studentSchema);

module.exports = Student;

//"Student" 是集合的名称，mongoose会自动将其转换为复数形式，即 "students",要独一无二，不要和其他集合重名
//首字母大写，单数形式，表示一个模型
//存在数据库后，会自动变成复数形式，即 "students"，表示一个集合
//自定义集合名称
// const Student = model("Student", studentSchema, "myStudents");
//第三个参数是集合的名称，如果不传，mongoose会自动将第一个参数转换为复数形式，即 "students"
//如果传了，就会使用传入的名称，不会自动转换
//适用于集合名称不符合规范的情况，比如集合名称是复数形式，或者是中文，或者是其他形式，或者复数形式不规则

//在什么时候触发验证？谁来触发？怎么触发？
//在保存到数据库之前触发验证，如果验证失败，就不会保存到数据库
//谁来触发？mongoose
//怎么触发？在创建model的时候，mongoose会根据schema自动创建验证规则
//默认情况下只有 save()方法会触发验证，如果想要在其他方法中触发验证，可以使用validate()方法
//update()方法默认不会触发验证，如果想要触发验证，可以使用runValidators: true选项
//insertMany()方法默认不会触发验证，如果想要触发验证，可以使用validateBeforeSave: true选项
//document 会有一个 save()方法，默认先检查数据是否符合schema的验证规则，如果符合，就保存到数据库，如果不符合，就返回一个错误
//这些验证是mongoose内置的，不需要我们自己写
//数据库的验证和前端的验证是不一样的，前端的验证是为了提高用户体验，数据库的验证是为了保证数据的完整性
//数据库本身没有验证功能，是mongoose封装了这个功能
//mongoose提供了哪些 api？比如 除了save
//document提供了哪些api？比如 save
//model提供了哪些api？比如 create
//query提供了哪些api？比如 find
//mongoose提供了哪些钩子？比如 pre save
//document提供了哪些钩子？比如 pre save
//model提供了哪些钩子？比如 pre save
//query提供了哪些钩子？比如 pre find
