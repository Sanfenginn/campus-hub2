const jwt = require("jsonwebtoken");
const createNewErrors = require("../utils/createNewErrors");
const config = require("../config");
const RoleModel = require("../models/roleModel");

const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  // const token = req.cookies.token;
  console.log("token", token);

  if (!token) {
    const err = createNewErrors("No token provided", 401, "unauthorized");
    return next(err);
  }

  jwt.verify(token, config.JWT_SECRET, (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        const error = createNewErrors("Token expired", 401, "token_expired");
        return next(error);
      } else {
        const error = createNewErrors(
          "Failed to authenticate token",
          401,
          "unauthorized"
        );
        return next(error);
      }
    }
    req.userId = decoded.userId;
    req.userRole = decoded.role;
    next();
  });
};

const getUserPermissions = async (role) => {
  const roleDoc = await RoleModel.findOne({ role }).exec();
  return roleDoc ? roleDoc.permissions : [];
};

const authorize = (requiredPermission) => {
  return async (req, res, next) => {
    if (req.userRole === "admin") {
      return next(); // admin has all permissions
    }

    try {
      const userPermissions = await getUserPermissions(req.userRole);
      if (!userPermissions.includes(requiredPermission)) {
        const err = createNewErrors("Access denied", 403, "forbidden");
        return next(err);
      }
      next();
    } catch (err) {
      next(err);
    }
  };
};

module.exports = {
  authenticate,
  authorize,
};
