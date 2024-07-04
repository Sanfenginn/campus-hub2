const express = require("express");
const router = express.Router();

const studentsRouter = require("./studentsRouter");
const coursesRouter = require("./coursesRouter");
const studentClassesRouter = require("./studentClassesRouter");
const teachersRouter = require("./teachersRouter");
const usersRouter = require("./usersRouter");
const addressRouter = require("./addressRouter");
const receiveFilesRouter = require("./receiveFilesRouter");
const permissionsRouter = require("./rolesWithPermissionsRouter");

router.use("/students", studentsRouter);
router.use("/courses", coursesRouter);
router.use("/student-classes", studentClassesRouter);
router.use("/teachers", teachersRouter);
router.use("/users", usersRouter);
router.use("/get-addresses", addressRouter);
router.use("/upload", receiveFilesRouter);
router.use("/permissions", permissionsRouter);

module.exports = router;
