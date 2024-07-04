const StudentClassModel = require("../models/studentClassModel");
const createNewErrors = require("../utils/createNewErrors");
const StudentModel = require("../models/studentModel");
const checkResource = require("../utils/checkResource");

const addStudentClass = async (req, res, next) => {
  const studentClasses = req.body;
  try {
    const newStudentClasses = await StudentClassModel.insertMany(
      studentClasses
    );
    res.formatResponse(201, newStudentClasses);
  } catch (err) {
    next(err);
  }
};

const deleteStudentClass = async (req, res, next) => {
  const { id } = req.params;

  try {
    // const deletedStudentClass = await StudentClassModel.findByIdAndDelete(
    //   id
    // ).exec();

    const deletedStudentClass = await StudentClassModel.findById(id).exec();

    checkResource(
      deletedStudentClass,
      "Student Class not found",
      404,
      "notFound",
      next
    );

    await deletedStudentClass.remove();

    // await StudentModel.updateMany(
    //   { studentClass: deletedStudentClass._id },
    //   { $unset: { studentClass: "" } }
    // );
    res.formatResponse(204);
  } catch (err) {
    next(err);
  }
};

const updateStudentClass = async (req, res, next) => {
  const studentClassData = req.body;
  const { id } = req.params;

  try {
    const updatedStudentClass = await StudentClassModel.findByIdAndUpdate(
      id,
      {
        $set: studentClassData,
      },
      { new: true }
    ).exec();

    checkResource(
      updatedStudentClass,
      "Student Class not found",
      404,
      "notFound",
      next
    );

    res.formatResponse(200, updatedStudentClass);
  } catch (err) {
    next(err);
  }
};

const getAllStudentClasses = async (req, res, next) => {
  // const { studentIds } = req.;

  try {
    const allStudentClasses = await StudentClassModel.find().exec();

    if (allStudentClasses.length === 0) {
      const err = createNewErrors("Student Classes not found", 404, "notFound");
      return next(err);
    }

    res.formatResponse(200, allStudentClasses);
  } catch (err) {
    next(err);
  }
};

const getStudentClassById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const studentClass = await StudentClassModel.findById(id);

    checkResource(
      studentClass,
      "Student Class not found",
      404,
      "notFound",
      next
    );

    res.formatResponse(200, studentClass);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addStudentClass,
  deleteStudentClass,
  updateStudentClass,
  getAllStudentClasses,
  getStudentClassById,
};
