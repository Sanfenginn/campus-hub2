const express = require("express");
const permissionsRouter = express.Router();
const {
  getRolesWithPermissions,
  postRolesWithPermissions,
} = require("../controllers/permissionsControllers");

permissionsRouter.get("/", getRolesWithPermissions);
permissionsRouter.post("/update-roles", postRolesWithPermissions);

module.exports = permissionsRouter;
