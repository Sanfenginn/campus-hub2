const express = require("express");
const coursesRouter = express.Router();
const {
  addCourse,
  deleteCourseById,
  updateCourseById,
  getAllCourses,
  getCourseById,
  bulkDeleteCourseById,
} = require("../controllers/coursesController");
const { authenticate, authorize } = require("../middlewares/authMiddleware");
const {
  validateCourse,
  checkId,
} = require("../middlewares/validationMiddleware");

coursesRouter.get("/", getAllCourses);
coursesRouter.get("/:id", checkId, getCourseById);
coursesRouter.post(
  "/",
  // authenticate,
  // authorize("manage_courses_add"),
  validateCourse,
  addCourse
);
coursesRouter.put("/:id", checkId, validateCourse, updateCourseById);
coursesRouter.delete("/:id", checkId, deleteCourseById);
coursesRouter.delete("/", bulkDeleteCourseById);

module.exports = coursesRouter;
