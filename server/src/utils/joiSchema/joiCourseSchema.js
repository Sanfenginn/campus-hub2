const Joi = require("joi");

const courseSchema = Joi.object({
  name: Joi.string().min(1).max(255).optional().messages({
    "string.base": `"name" should be a type of 'text'`,
    "string.empty": `"name" cannot be an empty field`,
    "string.min": `"name" should have a minimum length of {#limit}`,
    "string.max": `"name" should have a maximum length of {#limit}`,
  }),
  description: Joi.string().min(1).max(1000).optional().messages({
    "string.base": `"description" should be a type of 'text'`,
    "string.empty": `"description" cannot be an empty field`,
    "string.min": `"description" should have a minimum length of {#limit}`,
    "string.max": `"description" should have a maximum length of {#limit}`,
  }),
  classroom: Joi.string().min(1).max(255).optional().messages({
    "string.base": `"classRoom" should be a type of 'text'`,
    "string.empty": `"classRoom" cannot be an empty field`,
  }),
  courseSchedule: Joi.object({
    dayOfWeek: Joi.string().min(1).max(255).optional().messages({
      "string.base": `"dayOfWeek" should be a type of 'text'`,
      "string.empty": `"dayOfWeek" cannot be an empty field`,
    }),
    courseTime: Joi.object({
      startTime: Joi.string().min(1).max(255).optional().messages({
        "string.base": `"startTime" should be a type of 'text'`,
        "string.empty": `"startTime" cannot be an empty field`,
      }),
      endTime: Joi.string().min(1).max(255).optional().messages({
        "string.base": `"endTime" should be a type of 'text'`,
        "string.empty": `"endTime" cannot be an empty field`,
      }),
    }).messages({
      "object.base": `"courseTime" should be an object`,
    }),
    courseDate: Joi.object({
      startDate: Joi.date().optional().messages({
        "date.base": `"startDate" should be a valid date`,
        "any.required": `"startDate" is a required field`,
      }),
      endDate: Joi.date().optional().messages({
        "date.base": `"endDate" should be a valid date`,
        "any.required": `"endDate" is a required field`,
      }),
    }).messages({
      "object.base": `"courseDate" should be an object`,
    }),
  }).messages({
    "object.base": `"classSchedule" should be an object`,
  }),
  instructor: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .messages({
      "string.pattern.base": `"teacher" should be a valid ObjectId`,
    })
    .optional(),
  studentClasses: Joi.array().items(
    Joi.string()
      .pattern(/^[0-9a-fA-F]{24}$/)
      .messages({
        "string.pattern.base": `"class" should be a valid ObjectId`,
      })
      .optional()
  ),
});

module.exports = courseSchema;
