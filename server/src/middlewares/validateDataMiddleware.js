const { validationResult } = require("express-validator");
const createNewErrors = require("../utils/createNewErrors");

const validation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorDetails = errors.array().map((err) => {
      const param = err.param || "";
      const path = param ? param.replace(".*.", "").replace(".", ".") : "";
      const key = param ? param.split(".").pop() : "";
      return {
        message: err.msg,
        path: path,
        type: err.location,
        context: {
          label: param,
          key: key,
          value: err.value,
        },
      };
    });

    const err = createNewErrors(
      "Validation failed",
      400,
      "validation",
      errorDetails
    );
    return next(err);
  }
  next();
};

module.exports = validation;
