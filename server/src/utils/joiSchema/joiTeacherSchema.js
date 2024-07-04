const Joi = require("joi");

// 基础老师验证模式
const teacherSchema = Joi.object({
  name: Joi.object({
    firstName: Joi.string()
      .min(1)
      .max(255)
      .messages({
        "string.base": `"firstName" should be a type of 'text'`,
        "string.empty": `"firstName" cannot be an empty field`,
        "string.min": `"firstName" should have a minimum length of {#limit}`,
        "string.max": `"firstName" should have a maximum length of {#limit}`,
      })
      .when("$isUpdate", {
        is: true,
        then: Joi.optional(),
        otherwise: Joi.required(),
      }),
    lastName: Joi.string()
      .min(1)
      .max(255)
      .messages({
        "string.base": `"lastName" should be a type of 'text'`,
        "string.empty": `"lastName" cannot be an empty field`,
        "string.min": `"lastName" should have a minimum length of {#limit}`,
        "string.max": `"lastName" should have a maximum length of {#limit}`,
      })
      .when("$isUpdate", {
        is: true,
        then: Joi.optional(),
        otherwise: Joi.required(),
      }),
  }).when("$isUpdate", {
    is: true,
    then: Joi.optional(),
    otherwise: Joi.required(),
  }),
  contact: Joi.object({
    email: Joi.string()
      .email()
      .messages({
        "string.email": `"email" must be a valid email`,
      })
      .when("$isUpdate", {
        is: true,
        then: Joi.optional(),
        otherwise: Joi.required(),
      }),
    phone: Joi.string()
      .pattern(/^\+\d{10,15}$/)
      .messages({
        "string.pattern.base": `"phone" should be a valid phone number with country code`,
      })
      .when("$isUpdate", {
        is: true,
        then: Joi.optional(),
        otherwise: Joi.required(),
      }),
  }).when("$isUpdate", {
    is: true,
    then: Joi.optional(),
    otherwise: Joi.required(),
  }),
  courses: Joi.array().items(
    Joi.string()
      .pattern(/^[0-9a-fA-F]{24}$/)
      .messages({
        "string.pattern.base": `"course" should be a valid ObjectId`,
      })
  ),
  studentClass: Joi.array().items(
    Joi.string()
      .pattern(/^[0-9a-fA-F]{24}$/)
      .messages({
        "string.pattern.base": `"studentClass" should be a valid ObjectId`,
      })
  ),
});

module.exports = teacherSchema;
