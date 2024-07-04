const createNewErrors = require("../utils/createNewErrors");
const StudentModel = require("../models/studentModel");
const StudentClassModel = require("../models/studentClassModel");
const checkResource = require("../utils/checkResource");

//exec()方法表示 query 构造完成，执行查询,添加的话，不需要exec()方法

const getAllStudents = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  //如果没有传入page参数，默认为1
  //那前段每次都手动改page参数，

  const pageSize = parseInt(req.query.pageSize) || 10;
  const skip = (page - 1) * pageSize;

  // console.log("page+pageSize+skip: ", page, pageSize, skip);

  try {
    const students = await StudentModel.find()
      .limit(pageSize)
      .skip(skip)
      .exec(); //exec()方法表示 query 构造完成，执行查询

    const total = await StudentModel.countDocuments().exec();

    // if (students.length === 0) {
    //   const err = createNewErrors("No students found", 404, "notFound");
    //   return next(err);
    // }

    res.formatResponse(200, students, { pagination: { total: total } });
  } catch (err) {
    next(err);
  }
};
//成功返回找到的文档对象或数组（find 返回数组，findById 和 findOne 返回单个文档）。
//找不到文档时：findById 和 findOne 返回 null，find 返回空数组。

const getStudentById = async (req, res, next) => {
  const { id } = req.params;

  // 检查 id 是否为有效的 ObjectId
  // if (!mongoose.Types.ObjectId.isValid(id)) {
  //   return res.status(400).send("Invalid ID format");
  // }

  try {
    const student = await StudentModel.findById(id).exec();

    const populatedStudent = await StudentModel.findById(id)
      .populate({
        path: "studentClass",
        select: "className -_id",
        populate: {
          path: "students.studentId",
          select: "name age contact -_id", // 指定要返回的字段
        },
      })
      .exec();

    //如果不存在Mongoose 会返回 null
    checkResource(student, "Student not found", 404, "notFound", next);

    res.formatResponse(200, student);
  } catch (err) {}
};

const addStudent = async (req, res, next) => {
  // const { name, age, studentClass, contact, address } = req.body;
  const students = req.body; // 前端传来的学生数组
  //TODO: 需要验证数据

  try {
    //   const student = new StudentModel({
    //     name,
    //     age,
    //     studentClass,
    //     contact,
    //     address,
    //   });
    //student 是一个document，是一个对象，是一个实例，现在还没有保存到数据库
    const newStudents = await StudentModel.insertMany(students);
    // await student.save(); //save()方法是异步的，返回一个promise,会触发验证
    res.formatResponse(201, newStudents);
    return;
  } catch (err) {
    next(err);
  }
  //成功返回保存后的文档对象，包含 _id 和其他所有字段

  //   StudentModel.create({ firstName, lastName, age, contact, address }); //create()方法是静态方法，不需要new，会触发验证,直接保存到数据库

  //这两种方法都会触发验证，都会返回一个promise，都会保存到数据库，都会返回一个document
  //save()方法是实例方法，需要new，需要调用save()方法，需要触发验证
  //create()方法是静态方法，不需要new，不需要调用save()方法，不需要触发验证
  //区别是create()方法不需要new，不需要调用save()方法，不需要触发验证
};

//
const updateStudent = async (req, res, next) => {
  const { id } = req.params;
  // const { firstName, lastName, age, contact, address } = req.body;
  const updateData = req.body; // 获取请求体中的更新数据

  try {
    const updatedStudent = await StudentModel.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    ).exec();
    //这个方案前端请求体可以只包含部分字段，不会覆盖其他字段

    // const student = await StudentModel.findByIdAndUpdate(
    //   id,
    //   { firstName, lastName, age, contact, address },
    //   { new: true }
    // ).exec();
    //这个方案前端请求体必须包含所有字段，否则不会更新

    //当使用指定的 _id 查找文档但未找到时，会返回 null。
    checkResource(updatedStudent, "Student not found", 404, "notFound", next);

    res.formatResponse(200, updatedStudent);
  } catch (err) {
    next(err);
  }
  //findByIdAndUpdate 返回更新后的文档对象（如果 new: true），否则返回更新前的文档对象。updateOne 和 updateMany 返回包含匹配和修改计数的对象。
  //如果是未找到的文档，返回null

  //findByIdAndUpdate()方法是静态方法，不需要new，不需要调用save()方法，不需要触发验证
  //findByIdAndUpdate()方法会返回一个promise，会更新数据库，会返回一个document
  //如果某个数据没有传，Mongoose 会自动忽略，不会覆盖,只会更新传入的数据
  //不加{new: true}选项，返回的是更新前的数据，加了选项，返回的是更新后的数据
};

const deleteStudent = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedStudent = await StudentModel.findById(id).exec();

    //当使用指定的 _id 查找文档但未找到时，会返回 null。如果找到了文档并成功删除，该方法会返回删除的文档对象。
    checkResource(deletedStudent, "Student not found", 404, "notFound", next);

    await deleteStudent.remove();

    // await StudentClassModel.updateMany(
    //   { "students.studentId": deletedStudent._id },
    //   { $pull: { students: deletedStudent._id } }
    // );

    res.formatResponse(204);
  } catch (error) {}
};
//成功时：findByIdAndDelete 返回删除的文档对象。deleteOne 和 deleteMany 返回包含删除计数的对象。
//找不到文档时：findByIdAndDelete 返回 null。

const addStudentToClass = async (req, res, next) => {
  //获取学生id和班级id
  //查找课程和学生，检查是否存在
  //直接添加，如果已经存在，返回错误，如果不存在，添加（可以检查关系是否存在）
  //保存到数据库，因为只是Mongoose 文档，还没有保存到数据库
  //返回添加的学生文档对象
  try {
    const { studentId, classId } = req.params;
    const student = await StudentModel.findById(studentId).exec();
    const studentClass = await StudentClassModel.findById(classId).exec();

    checkResource(student, "Student not found", 404, "notFound", next);
    checkResource(studentClass, "Class not found", 404, "notFound", next);

    student.studentClass = classId; //只是在内存中添加了一个关系，还没有保存到数据库
    //只是在内存中添加了一个关系，还没有保存到数据库
    await StudentClassModel.findByIdAndUpdate(
      classId,
      { $addToSet: { students: studentId } },
      { new: true, useFindAndModify: false }
    );

    await student.save();
    await studentClass.save();
    //隐患：如果保存student成功，保存studentClass失败，会导致数据不一致
    //解决方案：使用事务，保证两个操作要么都成功，要么都失败

    //返回所有学生的id数组
    res.formatResponse(201);
  } catch (err) {
    next(err);
  }
};

const removeStudentFromClass = async (req, res, next) => {
  try {
    const { studentId, classId } = req.params;
    const student = await StudentModel.findById(studentId).exec();
    const studentClass = await StudentClassModel.findById(classId).exec();

    checkResource(student, "Student not found", 404, "notFound", next);
    checkResource(studentClass, "Class not found", 404, "notFound", next);

    delete student.studentClass;
    studentClass.students.pull(studentId);

    await student.save();
    await studentClass.save();

    res.formatResponse(204);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAllStudents,
  getStudentById,
  addStudent,
  updateStudent,
  deleteStudent,
  addStudentToClass,
  removeStudentFromClass,
};
