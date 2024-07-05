const createNewErrors = require("../utils/createNewErrors");

const checkResource = (
  checkTarget,
  description,
  statusCode,
  type,
  next,
  data = null
) => {
  if (!checkTarget) {
    const err = createNewErrors(description, statusCode, type, data);
    return next(err);
  }

  return checkTarget;
};
module.exports = checkResource;
