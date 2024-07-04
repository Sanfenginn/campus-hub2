const formatResponse = (req, res, next) => {
  // Add a new method to the response object
  res.formatResponse = (statusCode, message, data, otherInfo = {}) => {
    if (typeof statusCode === "undefined" || arguments.length === 0) {
      return res.status(204).send(); // 返回 204 No Content
    }

    // let message = "";

    // switch (statusCode) {
    //   case 200:
    //     message = "Get Data Success";
    //     break;
    //   case 201:
    //     message = "Create Data Success";
    //     break;
    // }

    res.status(statusCode).json({ statusCode, message, data, ...otherInfo });
  };
  next();
};

module.exports = formatResponse;
