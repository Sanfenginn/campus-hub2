const createNewErrors = require("../utils/createNewErrors");

const pathNotFound = (req, res, next) => {
  const err = createNewErrors(
    `path ${req.originalUrl} not found`,
    404,
    "notFound"
  );
  next(err);
};

module.exports = pathNotFound;
