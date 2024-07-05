const { body, check } = require("express-validator");
const mongoose = require("mongoose");

// Helper function to check if a value is a valid MongoDB ObjectId
const isValidObjectId = (value) => mongoose.Types.ObjectId.isValid(value);

// Common validation rules for nested objects
const nameValidation = [
  check("name.firstName")
    .exists({ checkFalsy: true })
    .withMessage('"firstName" is required')
    .bail()
    .isString()
    .withMessage('"firstName" should be a type of text')
    .isLength({ min: 1 })
    .withMessage('"firstName" should have a minimum length of 1'),
  check("name.lastName")
    .exists({ checkFalsy: true })
    .withMessage('"lastName" is required')
    .bail()
    .isString()
    .withMessage('"lastName" should be a type of text')
    .isLength({ min: 1 })
    .withMessage('"lastName" should have a minimum length of 1'),
];

const contactValidation = [
  check("contact.email")
    .exists({ checkFalsy: true })
    .withMessage('"email" is required')
    .bail()
    .isEmail()
    .withMessage('"email" must be a valid email'),
  check("contact.phone")
    .exists({ checkFalsy: true })
    .withMessage('"phone" is required')
    .bail()
    .matches(/^\+\d{10,15}$/)
    .withMessage('"phone" should be a valid phone number with country code'),
];

const addressValidation = [
  check("address.road")
    .exists({ checkFalsy: true })
    .withMessage('"road" is required')
    .bail()
    .isString()
    .withMessage('"road" should be a type of text'),
  check("address.city")
    .exists({ checkFalsy: true })
    .withMessage('"city" is required')
    .bail()
    .isString()
    .withMessage('"city" should be a type of text'),
  check("address.state")
    .exists({ checkFalsy: true })
    .withMessage('"state" is required')
    .bail()
    .isString()
    .withMessage('"state" should be a type of text'),
  check("address.postalCode")
    .exists({ checkFalsy: true })
    .withMessage('"postalCode" is required')
    .bail()
    .matches(/^\d{4,8}$/)
    .withMessage('"postalCode" should be a 4 to 8 digit number'),
];

// Validation rules for adding a new teacher
const validateAddTeacher = [
  ...nameValidation,
  ...contactValidation,
  ...addressValidation,
  check("account")
    .exists({ checkFalsy: true })
    .withMessage('"account" is required')
    .bail()
    .isString()
    .withMessage('"account" should be a type of text'),
  check("password")
    .exists({ checkFalsy: true })
    .withMessage('"password" is required')
    .bail()
    .isString()
    .withMessage('"password" should be a type of text'),
  check("role")
    .exists({ checkFalsy: true })
    .withMessage('"role" is required')
    .bail()
    .custom(isValidObjectId)
    .withMessage('"role" should be a valid ObjectId'),
];

// Validation rules for updating an existing teacher
const validateUpdateTeacher = [
  body("name.firstName")
    .optional()
    .isString()
    .withMessage('"firstName" should be a type of text')
    .notEmpty()
    .withMessage('"firstName" cannot be an empty field')
    .isLength({ min: 1 })
    .withMessage('"firstName" should have a minimum length of 1'),
  body("name.lastName")
    .optional()
    .isString()
    .withMessage('"lastName" should be a type of text')
    .notEmpty()
    .withMessage('"lastName" cannot be an empty field')
    .isLength({ min: 1 })
    .withMessage('"lastName" should have a minimum length of 1'),
  body("contact.email")
    .optional()
    .isEmail()
    .withMessage('"email" must be a valid email')
    .notEmpty()
    .withMessage('"email" cannot be an empty field'),
  body("contact.phone")
    .optional()
    .matches(/^\+\d{10,15}$/)
    .withMessage('"phone" should be a valid phone number with country code')
    .notEmpty()
    .withMessage('"phone" cannot be an empty field'),
];

module.exports = {
  validateAddTeacher,
  validateUpdateTeacher,
};
