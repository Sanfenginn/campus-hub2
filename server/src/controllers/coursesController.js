const createNewErrors = require("../utils/createNewErrors");
const CourseModel = require("../models/courseModel");
const checkResource = require("../utils/checkResource");
const TeacherModel = require("../models/teacherModel");
const StudentClassesModel = require("../models/studentClassModel");

const addCourse = async (req, res, next) => {
  const courses = req.body;
  try {
    const newCourses = await CourseModel.insertMany(courses);
    console.log("newCourses", newCourses);

    const teacherUpdate = newCourses.map((course) => {
      return TeacherModel.findByIdAndUpdate(
        course.instructor,
        { $addToSet: { courses: [course._id] } },
        { new: true }
      );
    });

    const studentClassesUpdate = newCourses.flatMap((course) => {
      return course.studentClasses.map((item) => {
        return StudentClassesModel.findByIdAndUpdate(
          item,
          { $addToSet: { courses: [course._id] } },
          { new: true }
        );
      });
    });

    const total = await Promise.all([
      ...teacherUpdate,
      ...studentClassesUpdate,
    ]);

    console.log("teacherUpdate", teacherUpdate);
    console.log("studentClassesUpdate", studentClassesUpdate);
    console.log("total", total);

    res.formatResponse(201, newCourses);
  } catch (err) {
    next(err);
  }
};

const bulkDeleteCourseById = async (req, res, next) => {
  const { ids } = req.body;
  console.log("id", ids);

  try {
    const deletedCourse = await CourseModel.deleteMany({
      _id: { $in: ids },
    });

    checkResource(deletedCourse, "Course not found", 404, "notFound", next);

    res.formatResponse(204);
  } catch (err) {
    next(err);
  }
};

const deleteCourseById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedCourse = await CourseModel.findById(id).exec();

    checkResource(deletedCourse, "Course not found", 404, "notFound", next);

    await deletedCourse.remove();

    res.formatResponse(204);
  } catch (err) {
    next(err);
  }
};

const updateCourseById = async (req, res, next) => {
  const courseData = req.body;
  const { id } = req.params;

  try {
    const updatedCourse = await CourseModel.findByIdAndUpdate(
      id,
      {
        $set: courseData,
      },
      { new: true }
    ).exec();

    checkResource(updatedCourse, "Course not found", 404, "notFound", next);

    res.formatResponse(200, updatedCourse);
  } catch (err) {
    next(err);
  }
};

const getAllCourses = async (req, res, next) => {
  const { courseName } = req.query;
  console.log("courseName: ", courseName);

  const query = courseName ? { name: courseName } : {};
  console.log("query: ", query);

  try {
    const allCourses = await CourseModel.find(query)
      .populate("studentClasses", "className")
      .populate("instructor", "name")
      .exec();

    if (allCourses.length === 0) {
      const err = createNewErrors("Courses not found", 404, "notFound");
      return next(err);
    }

    res.formatResponse(200, allCourses);
  } catch (err) {
    next(err);
  }
};

const getCourseById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const course = await CourseModel.findById(id).exec();

    checkResource(course, "Course not found", 404, "notFound", next);

    res.formatResponse(200, course);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addCourse,
  deleteCourseById,
  updateCourseById,
  getAllCourses,
  getCourseById,
  bulkDeleteCourseById,
};
