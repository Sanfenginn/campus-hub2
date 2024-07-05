const Joi = require("joi");

const studentClassSchema = Joi.object({
  className: Joi.string()
    .min(1)
    .max(255)
    .messages({
      "string.base": `"className" should be a type of 'text'`,
      "string.empty": `"className" cannot be an empty field`,
      "any.required": `"className" is required`,
      "string.min": `"className" should have a minimum length of {#limit}`,
      "string.max": `"className" should have a maximum length of {#limit}`,
    })
    .when("$isUpdate", {
      is: true,
      then: Joi.optional(),
      otherwise: Joi.required(),
    }),
  students: Joi.array().items(
    Joi.object({
      studentId: Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .messages({
          "string.pattern.base": `"studentId" should be a valid ObjectId`,
        }),
      // .when("$isUpdate", {
      //   is: true,
      //   then: Joi.optional(),
      //   otherwise: Joi.required(),
      // }),
    })
  ),
});

module.exports = studentClassSchema;
