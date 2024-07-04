const Joi = require("joi");

// 基础学生验证模式
const studentSchema = Joi.object({
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
  age: Joi.number()
    .integer()
    .min(0)
    .max(100)
    .messages({
      "number.base": `"age" should be a type of 'number'`,
      "number.min": `"age" should be a minimum of {#limit}`,
      "number.max": `"age" should be a maximum of {#limit}`,
    })
    .when("$isUpdate", {
      is: true,
      then: Joi.optional(),
      otherwise: Joi.required(),
    }),
  address: Joi.object({
    road: Joi.string()
      .messages({
        "string.base": `"road" should be a type of 'text'`,
        "string.empty": `"road" cannot be an empty field`,
      })
      .when("$isUpdate", {
        is: true,
        then: Joi.optional(),
        otherwise: Joi.required(),
      }),
    city: Joi.string()
      .messages({
        "string.base": `"city" should be a type of 'text'`,
        "string.empty": `"city" cannot be an empty field`,
      })
      .when("$isUpdate", {
        is: true,
        then: Joi.optional(),
        otherwise: Joi.required(),
      }),
    state: Joi.string()
      .messages({
        "string.base": `"state" should be a type of 'text'`,
        "string.empty": `"state" cannot be an empty field`,
      })
      .when("$isUpdate", {
        is: true,
        then: Joi.optional(),
        otherwise: Joi.required(),
      }),
    postalCode: Joi.string()
      .pattern(/^\d{4,8}$/)
      .messages({
        "string.pattern.base": `"postalCode" should be a 4 to 8 digit number`,
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
  studentClass: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .messages({
      "string.pattern.base": `"studentClass" should be a valid ObjectId`,
    }),
});

module.exports = studentSchema;
