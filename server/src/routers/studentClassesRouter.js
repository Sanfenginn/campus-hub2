const {
  addStudentClass,
  deleteStudentClass,
  updateStudentClass,
  getAllStudentClasses,
  getStudentClassById,
} = require("../controllers/studentClassesController");
const express = require("express");
const studentClassesRouter = express.Router();
const {
  validateStudentClass,
  checkId,
} = require("../middlewares/validationMiddleware");

studentClassesRouter.get("/", getAllStudentClasses);
studentClassesRouter.get("/:id", checkId, getStudentClassById);
studentClassesRouter.post("/", validateStudentClass, addStudentClass);
studentClassesRouter.put(
  "/:id",
  checkId,
  validateStudentClass,
  updateStudentClass
);
studentClassesRouter.delete("/:id", checkId, deleteStudentClass);

module.exports = studentClassesRouter;
