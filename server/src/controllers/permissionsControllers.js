const PermissionModel = require("../models/permissionModel");
const RoleModel = require("../models/roleModel");

const getRolesWithPermissions = async (req, res, next) => {
  try {
    const roles = await RoleModel.find({ role: { $ne: "admin" } })
      .populate("permissions", "permission")
      .exec();
    const allPermissions = await PermissionModel.find().exec();
    const rolesWithPermissions = [allPermissions, roles];

    res.formatResponse(200, rolesWithPermissions);
  } catch (err) {
    next(err);
  }
};

const postRolesWithPermissions = async (req, res, next) => {
  const { permissions, roleId } = req.body;
  console.log("permissions", permissions);
  console.log("roleId", roleId);

  const newRole = await RoleModel.findByIdAndUpdate(
    roleId,
    { $set: { permissions: permissions } },
    { new: true }
  ).exec();

  console.log("newRole", newRole);
  res.formatResponse(200, newRole);
};

module.exports = { getRolesWithPermissions, postRolesWithPermissions };
