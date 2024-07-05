const Joi = require("joi");
const mongoose = require("mongoose");

const objectId = Joi.extend((joi) => ({
  type: "objectId",
  base: joi.string(),
  messages: {
    "objectId.base": `"{{#label}}" should be a valid ObjectId`,
    "objectId.invalid": `"{{#label}}" is not a valid ObjectId`,
  },
  validate(value, helpers) {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      return { value, errors: helpers.error("objectId.invalid") };
    }
  },
}));

const idSchema = objectId.object({
  id: objectId.objectId().required(),
});

module.exports = idSchema;
