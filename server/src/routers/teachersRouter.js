const express = require("express");
const teachersRouter = express.Router();
const {
  addTeachers,
  deleteTeacherById,
  updateTeacherById,
  getAllTeachers,
  getTeacherById,
} = require("../controllers/teachersController");
const {
  validateTeacher,
  checkId,
} = require("../middlewares/validationMiddleware");

teachersRouter.get("/", getAllTeachers);
teachersRouter.get("/:id", checkId, getTeacherById);
teachersRouter.post("/", validateTeacher, addTeachers);
teachersRouter.put("/:id", checkId, validateTeacher, updateTeacherById);
teachersRouter.delete("/:id", checkId, deleteTeacherById);

module.exports = teachersRouter;
