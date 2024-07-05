const Joi = require("joi");

const userSchema = Joi.object({
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
  }),
  dob: Joi.date()
    .messages({})
    .messages({
      "date.base": `"dob" should be a type of 'date'`,
      "date.empty": `"dob" cannot be an empty field`,
    })
    .when("$isUpdate", {
      is: true,
      then: Joi.optional(),
      otherwise: Joi.required(),
    }),
  age: Joi.number().messages({
    "number.base": `"age" should be a type of 'number'`,
    "number.empty": `"age" cannot be an empty field`,
  }),
  account: Joi.string()
    .messages({
      "string.base": `"account" should be a type of 'text'`,
      "string.empty": `"account" cannot be an empty field`,
    })
    .when("$isUpdate", {
      is: true,
      then: Joi.optional(),
      otherwise: Joi.required(),
    }),
  password: Joi.string()
    .messages({
      "string.base": `"password" should be a type of 'text'`,
      "string.empty": `"password" cannot be an empty field`,
    })
    .optional(),
  // .when("$isUpdate", {
  //   is: true,
  //   then: Joi.optional(),
  //   otherwise: Joi.required(),
  // }),
  role: Joi.object({
    userType: Joi.string()
      .valid("student", "teacher", "admin")
      .messages({
        "any.only": `"userType" must be one of ['student', 'teacher', 'admin']`,
      })
      .when("$isUpdate", {
        is: true,
        then: Joi.optional(),
        otherwise: Joi.required(),
      }),
    userId: Joi.string()
      .pattern(/^[0-9a-fA-F]{24}$/)
      .messages({
        "string.pattern.base": `"userId" must be a valid ObjectId`,
      }),
    roleInfo: Joi.string()
      .pattern(/^[0-9a-fA-F]{24}$/)
      .messages({
        "string.pattern.base": `"roleInfo" must be a valid ObjectId`,
      }),
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
  }),
  address: Joi.object({
    houseNumber: Joi.string()
      .messages({
        "string.base": `"houseNumber" should be a type of 'text'`,
      })
      .optional(),
    street: Joi.string()
      .messages({
        "string.base": `"road" should be a type of 'text'`,
      })
      .optional(),
    suburb: Joi.string()
      .messages({
        "string.base": `"suburb" should be a type of 'text'`,
      })
      .allow("")
      .optional(),
    city: Joi.string()
      .messages({
        "string.base": `"city" should be a type of 'text'`,
      })
      .optional(),
    state: Joi.string()
      .messages({
        "string.base": `"state" should be a type of 'text'`,
      })
      .optional(),
    country: Joi.string()
      .messages({
        "string.base": `"country" should be a type of 'text'`,
      })
      .optional(),
    postalCode: Joi.string()
      .pattern(/^\d{4,8}$/)
      .messages({
        "string.pattern.base": `"postalCode" should be a 4 to 8 digit number`,
      })
      .optional(),
  }),
});

module.exports = userSchema;
