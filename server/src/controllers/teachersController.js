const TeacherModel = require("../models/teacherModel");
const createNewErrors = require("../utils/createNewErrors");
const checkResource = require("../utils/checkResource");

const addTeachers = async (req, res, next) => {
  const teachers = req.body;

  try {
    const newTeachers = await TeacherModel.insertMany(teachers);
    res.formatResponse(201, newTeachers);
  } catch (err) {
    next(err);
  }
};

const deleteTeacherById = async (req, res, next) => {
  const { id } = req.params;

  try {
    // const deletedTeacher = await TeacherModel.findByIdAndDelete(id).exec();
    const deletedTeacher = await TeacherModel.findById(id).exec();

    checkResource(deletedTeacher, "Teacher not found", 404, "notFound", next);

    await deletedTeacher.remove();

    res.formatResponse(204);
  } catch (err) {
    next(err);
  }
};

const updateTeacherById = async (req, res, next) => {
  const { id } = req.params;
  const teacherData = req.body;

  try {
    const updatedTeacher = await TeacherModel.findByIdAndUpdate(
      id,
      { $set: teacherData },
      { new: true }
    ).exec();

    checkResource(updatedTeacher, "Teacher not found", 404, "notFound", next);

    res.formatResponse(200, updatedTeacher);
  } catch (err) {
    next(err);
  }
};

const getAllTeachers = async (req, res, next) => {
  const { teacherName } = req.query;
  console.log("teacher", teacherName);

  const regex = new RegExp(`^${teacherName}$`, "i"); // 'i' 表示不区分大小写

  const query = {
    $or: [{ "name.firstName": regex }, { "name.lastName": regex }],
  };

  try {
    const allTeachers = await TeacherModel.find(query).exec();

    if (allTeachers.length === 0) {
      const err = createNewErrors("Teachers not found", 404, "notFound");
      return next(err);
    }

    res.formatResponse(200, allTeachers);
  } catch (err) {
    next(err);
  }
};

const getTeacherById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const teacher = await TeacherModel.findById(id).exec();

    checkResource(teacher, "Teacher not found", 404, "notFound", next);

    res.formatResponse(200, teacher);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addTeachers,
  deleteTeacherById,
  updateTeacherById,
  getAllTeachers,
  getTeacherById,
};
