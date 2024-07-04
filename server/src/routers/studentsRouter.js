const express = require("express");
const studentsRouter = express.Router();
const {
  getAllStudents,
  getStudentById,
  addStudent,
  updateStudent,
  deleteStudent,
  addStudentToClass,
  removeStudentFromClass,
} = require("../controllers/studentsController");
const {
  validateStudent,
  checkId,
} = require("../middlewares/validationMiddleware");

studentsRouter.post("/", validateStudent, addStudent);
studentsRouter.delete("/:id", checkId, deleteStudent);
studentsRouter.put("/:id", checkId, validateStudent, updateStudent);
studentsRouter.get("/", getAllStudents);
studentsRouter.get("/:id", checkId, getStudentById);
studentsRouter.post("/:studentId/class/:classId", addStudentToClass);
studentsRouter.delete("/:studentId/class/:classId", removeStudentFromClass);

module.exports = studentsRouter;
