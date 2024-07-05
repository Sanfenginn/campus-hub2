const { body } = require("express-validator");
const mongoose = require("mongoose");

// Helper function to check if a value is a valid MongoDB ObjectId
const isValidObjectId = (value) => mongoose.Types.ObjectId.isValid(value);

// Common validation rules for nested objects
const nameValidation = [
  body("*.name.firstName")
    .notEmpty()
    .withMessage('"firstName" cannot be an empty field')
    .bail() // stops running validations if any of the previous ones have failed
    .isString()
    .withMessage('"firstName" should be a type of text')
    .isLength({ min: 1 })
    .withMessage('"firstName" should have a minimum length of 1'),
  body("*.name.lastName")
    .notEmpty()
    .withMessage('"lastName" cannot be an empty field')
    .bail()
    .isString()
    .withMessage('"lastName" should be a type of text')
    .isLength({ min: 1 })
    .withMessage('"lastName" should have a minimum length of 1'),
];

const contactValidation = [
  body("*.contact.email")
    .notEmpty()
    .withMessage('"email" cannot be an empty field')
    .bail()
    .isEmail()
    .withMessage('"email" must be a valid email'),
  body("*.contact.phone")
    .notEmpty()
    .withMessage('"phone" cannot be an empty field')
    .bail()
    .matches(/^\+\d{10,15}$/)
    .withMessage('"phone" should be a valid phone number with country code'),
];

const addressValidation = [
  body("*.address.road")
    .notEmpty()
    .withMessage('"road" cannot be an empty field')
    .bail()
    .isString()
    .withMessage('"road" should be a type of text'),
  body("*.address.city")
    .notEmpty()
    .withMessage('"city" cannot be an empty field')
    .bail()
    .isString()
    .withMessage('"city" should be a type of text'),
  body("*.address.state")
    .notEmpty()
    .withMessage('"state" cannot be an empty field')
    .bail()
    .isString()
    .withMessage('"state" should be a type of text'),
  body("*.address.postalCode")
    .notEmpty()
    .withMessage('"postalCode" cannot be an empty field')
    .bail()
    .matches(/^\d{4,8}$/)
    .withMessage('"postalCode" should be a 4 to 8 digit number'),
];

// Validation rules for adding a new user
const validateAddUser = [
  ...nameValidation,
  body("*.account")
    .notEmpty()
    .withMessage('"account" cannot be an empty field')
    .bail()
    .isString()
    .withMessage('"account" should be a type of text'),
  body("*.password")
    .notEmpty()
    .withMessage('"password" cannot be an empty field')
    .bail()
    .isString()
    .withMessage('"password" should be a type of text'),
  body("*.role")
    .notEmpty()
    .withMessage('"role" cannot be an empty field')
    .bail()
    .custom(isValidObjectId)
    .withMessage('"role" should be a valid ObjectId'),
  ...contactValidation,
  ...addressValidation,
];

// Validation rules for updating an existing user
const validateUpdateUser = [
  body("*.name.firstName")
    .optional()
    .notEmpty()
    .withMessage('"firstName" cannot be an empty field')
    .bail()
    .isString()
    .withMessage('"firstName" should be a type of text')
    .isLength({ min: 1 })
    .withMessage('"firstName" should have a minimum length of 1'),
  body("*.name.lastName")
    .optional()
    .notEmpty()
    .withMessage('"lastName" cannot be an empty field')
    .bail()
    .isString()
    .withMessage('"lastName" should be a type of text')
    .isLength({ min: 1 })
    .withMessage('"lastName" should have a minimum length of 1'),
  body("*.account")
    .optional()
    .notEmpty()
    .withMessage('"account" cannot be an empty field')
    .bail()
    .isString()
    .withMessage('"account" should be a type of text'),
  body("*.password")
    .optional()
    .notEmpty()
    .withMessage('"password" cannot be an empty field')
    .bail()
    .isString()
    .withMessage('"password" should be a type of text'),
  body("*.role")
    .optional()
    .notEmpty()
    .withMessage('"role" cannot be an empty field')
    .bail()
    .custom(isValidObjectId)
    .withMessage('"role" should be a valid ObjectId'),
  body("*.contact.email")
    .optional()
    .notEmpty()
    .withMessage('"email" cannot be an empty field')
    .bail()
    .isEmail()
    .withMessage('"email" must be a valid email'),
  body("*.contact.phone")
    .optional()
    .notEmpty()
    .withMessage('"phone" cannot be an empty field')
    .bail()
    .matches(/^\+\d{10,15}$/)
    .withMessage('"phone" should be a valid phone number with country code'),
  body("*.address.road")
    .optional()
    .notEmpty()
    .withMessage('"road" cannot be an empty field')
    .bail()
    .isString()
    .withMessage('"road" should be a type of text'),
  body("*.address.city")
    .optional()
    .notEmpty()
    .withMessage('"city" cannot be an empty field')
    .bail()
    .isString()
    .withMessage('"city" should be a type of text'),
  body("*.address.state")
    .optional()
    .notEmpty()
    .withMessage('"state" cannot be an empty field')
    .bail()
    .isString()
    .withMessage('"state" should be a type of text'),
  body("*.address.postalCode")
    .optional()
    .notEmpty()
    .withMessage('"postalCode" cannot be an empty field')
    .bail()
    .matches(/^\d{4,8}$/)
    .withMessage('"postalCode" should be a 4 to 8 digit number'),
];

module.exports = {
  validateAddUser,
  validateUpdateUser,
};
