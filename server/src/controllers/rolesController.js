const Role = require("../models/roleModel");
const Permission = require("../models/permissionModel");

// 设置角色权限
const setRolePermissions = async (req, res, next) => {
  const { roleId } = req.params;
  const { permissions } = req.body;

  try {
    const permissionObjects = await Permission.find({
      _id: { $in: permissions },
    });
    const updatedRole = await Role.findByIdAndUpdate(
      roleId,
      { permissions: permissionObjects.map((p) => p._id) },
      { new: true }
    );
    if (!updatedRole) {
      return res.status(404).json({ error: "Role not found" });
    }
    res.status(200).json(updatedRole);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  setRolePermissions,
};
