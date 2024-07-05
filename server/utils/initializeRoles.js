const mongoose = require("mongoose");
const Role = require("../models/roleModel");
const Permission = require("../models/permissionModel");

mongoose.connect("mongodb://localhost:27017/yourdbname", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function seedRolesAndPermissions() {
  // 检查是否已经存在权限
  const existingPermissions = await Permission.find().exec();
  if (existingPermissions.length > 0) {
    console.log("Permissions already exist. Skipping seeding.");
    return;
  }

  // 插入权限
  const permissions = [
    "manage_users_add",
    "manage_users_delete",
    "manage_users_edit",
    "manage_users_view",
    "manage_classes_add",
    "manage_classes_delete",
    "manage_classes_edit",
    "manage_classes_view",
    "manage_courses_add",
    "manage_courses_delete",
    "manage_courses_edit",
    "manage_courses_view",
    "manage_teacher_courses_view",
    "manage_teacher_courses_add",
    "manage_teacher_courses_delete",
    "manage_teacher_courses_edit",
    "view_reports",
    "view_own_courses",
    "view_own_courses_content",
    "manage_course_students_add",
    "manage_course_students_remove",
    "view_course_students",
    "view_own_info",
    "edit_own_info",
    "view_course_content",
  ];

  const permissionObjects = await Permission.insertMany(
    permissions.map((permission) => ({ permission }))
  );

  const permissionsMap = {};
  permissionObjects.forEach((permission) => {
    permissionsMap[permission.permission] = permission._id;
  });

  // 检查是否已经存在角色
  const existingRoles = await Role.find().exec();
  if (existingRoles.length > 0) {
    console.log("Roles already exist. Skipping seeding.");
    mongoose.connection.close();
    return;
  }

  // 插入角色并关联权限
  await Role.insertMany([
    {
      role: "admin",
      permissions: [
        permissionsMap["manage_users_add"],
        permissionsMap["manage_users_delete"],
        permissionsMap["manage_users_edit"],
        permissionsMap["manage_users_view"],
        permissionsMap["manage_classes_add"],
        permissionsMap["manage_classes_delete"],
        permissionsMap["manage_classes_edit"],
        permissionsMap["manage_classes_view"],
        permissionsMap["manage_courses_add"],
        permissionsMap["manage_courses_delete"],
        permissionsMap["manage_courses_edit"],
        permissionsMap["manage_courses_view"],
        permissionsMap["manage_teacher_courses_view"],
        permissionsMap["manage_teacher_courses_add"],
        permissionsMap["manage_teacher_courses_delete"],
        permissionsMap["manage_teacher_courses_edit"],
        permissionsMap["view_reports"],
      ],
    },
    {
      role: "teacher",
      permissions: [
        permissionsMap["view_own_courses"],
        permissionsMap["view_own_courses_content"],
        permissionsMap["manage_course_students_add"],
        permissionsMap["manage_course_students_remove"],
        permissionsMap["view_course_students"],
        permissionsMap["view_own_info"],
        permissionsMap["edit_own_info"],
      ],
    },
    {
      role: "student",
      permissions: [
        permissionsMap["view_own_courses"],
        permissionsMap["view_course_content"],
        permissionsMap["view_own_info"],
        permissionsMap["edit_own_info"],
      ],
    },
  ]);

  mongoose.connection.close();
}

seedRolesAndPermissions().catch((err) => console.log(err));
