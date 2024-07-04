const parseFlatObject = require("../utils/joiSchema/joiParseFlatObject");
const userSchema = require("../utils/joiSchema/joiUserSchema");
const idSchema = require("../utils/joiSchema/joiIdSchema");
const teacherSchema = require("../utils/joiSchema/joiTeacherSchema");
const studentSchema = require("../utils/joiSchema/joiStudentSchema");
const studentClassSchema = require("../utils/joiSchema/joiStudentClassSchema");
const courseSchema = require("../utils/joiSchema/joiCourseSchema");
const createNewErrors = require("../utils/createNewErrors");
const createLogger = require("../utils/logger");
const logger = createLogger(__filename);
const Joi = require("joi");

const validateUser = (req, res, next) => {
  const { body } = req;
  const isUpdate = req.method === "PUT";
  const options = { context: { isUpdate } };

  if (!isUpdate) {
    req.body = parseFlatObject(body);
  }

  const { error } = isUpdate
    ? userSchema.validate(body, options)
    : Joi.array().items(userSchema).validate(body, options);

  if (error) {
    const err = createNewErrors(
      "Validation failed",
      400,
      "validation",
      error.details
    );
    logger.error("Validation failed", error.details);
    return next(err);
  }
  next();
};

const checkId = (req, res, next) => {
  if (req.params.id) {
    logger.info("开始验证222！");
    const { error } = idSchema.validate(req.params);
    if (error) {
      const err = createNewErrors(
        "Validation failed",
        400,
        "validation",
        error.details
      );
      logger.error("Validation failed", error.details);
      return next(err);
    }
  }
  logger.info("验证通过！");
  next();
};

//已通过;
const validateTeacher = (req, res, next) => {
  const { body } = req;
  const isUpdate = req.method === "PUT";
  const options = { context: { isUpdate } };

  if (!isUpdate) {
    req.body = parseFlatObject(body);
  }

  const { error } = isUpdate
    ? teacherSchema.validate(body, options)
    : Joi.array().items(teacherSchema).validate(body, options);

  if (error) {
    const err = createNewErrors(
      "Validation failed",
      400,
      "validation",
      error.details
    );
    logger.error("Validation failed", error.details);
    return next(err);
  }
  next();
};

const validateStudent = (req, res, next) => {
  const { body } = req;
  const isUpdate = req.method === "PUT";
  const options = { context: { isUpdate } };

  if (!isUpdate) {
    req.body = parseFlatObject(body);
  }

  const { error } = isUpdate
    ? studentSchema.validate(body, options)
    : Joi.array().items(studentSchema).validate(body, options);

  if (error) {
    const err = createNewErrors(
      "Validation failed",
      400,
      "validation",
      error.details
    );
    logger.error("Validation failed", error.details);
    return next(err);
  }
  next();
};

const validateStudentClass = (req, res, next) => {
  const { body } = req;
  const isUpdate = req.method === "PUT";
  const options = { context: { isUpdate } };

  if (!isUpdate) {
    req.body = parseFlatObject(body);
  }

  const { error } = isUpdate
    ? studentClassSchema.validate(body, options)
    : Joi.array().items(studentClassSchema).validate(body, options);

  if (error) {
    const err = createNewErrors(
      "Validation failed",
      400,
      "validation",
      error.details
    );
    logger.error("Validation failed", error.details);
    return next(err);
  }
  next();
};

const validateCourse = (req, res, next) => {
  const { body } = req;
  const isUpdate = req.method === "PUT";
  const options = { context: { isUpdate } };

  if (!isUpdate) {
    req.body = parseFlatObject(body);
  }

  const { error } = isUpdate
    ? courseSchema.validate(body, options)
    : Joi.array().items(courseSchema).validate(body, options);

  if (error) {
    const err = createNewErrors(
      "Validation failed",
      400,
      "validation",
      error.details
    );
    logger.error("Validation failed", error.details);
    return next(err);
  }
  next();
};

module.exports = {
  validateUser,
  checkId,
  validateTeacher,
  validateStudent,
  validateStudentClass,
  validateCourse,
};
