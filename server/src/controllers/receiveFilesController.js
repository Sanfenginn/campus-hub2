const multer = require("multer");
const path = require("path");
const fs = require("fs-extra");
const Papa = require("papaparse");
const UserModel = require("../models/userModel");
const RoleModel = require("../models/roleModel");
const TeacherModel = require("../models/teacherModel");
const StudentModel = require("../models/studentModel");
const createNewErrors = require("../utils/createNewErrors");
const userSchema = require("../utils/joiSchema/joiUserSchema"); // 引入 Joi 验证 schema
const bcrypt = require("bcrypt");
const { userInfo } = require("os");

// 设置 multer 存储配置
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

// 创建 multer 实例
const upload = multer({ storage: storage }).array("files");

const receiveFiles = async (req, res, next) => {
  upload(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      const customErr = createNewErrors(
        "File upload failed.",
        500,
        "uploadError",
        err.message
      );
      console.log("err.message", err.message);
      return next(customErr);
    } else if (err) {
      const customErr = createNewErrors(
        "Unknown error occurred.",
        500,
        "unknownError",
        err.message
      );
      return next(customErr);
    }

    // 文件上传成功，解析文件内容
    try {
      let newUsers = [];
      for (const file of req.files) {
        const filePath = path.join(
          __dirname,
          "../../uploads",
          file.originalname
        );
        if (file.mimetype === "text/csv") {
          newUsers = await parseCSVAndInsert(filePath, next);
        } else if (file.mimetype === "application/json") {
          newUsers = await parseJSONAndInsert(filePath, next);
        }
      }
      res.formatResponse(200, "Files uploaded successfully.", newUsers);
    } catch (error) {
      const err = createNewErrors("Failed to parse file.", 400, "uploadError");
      return next(err);
    }
  });
};

const parseCSVAndInsert = async (filePath, next) => {
  console.log("开始解析 CSV 文件");
  try {
    const fileContent = await fs.readFile(filePath, "utf8");
    const parsedData = Papa.parse(fileContent, {
      header: true,
      skipEmptyLines: true,
    });

    if (parsedData.errors.length) {
      const errorMessage = parsedData.errors.map((e) => e.message).join(", ");
      const err = createNewErrors(
        `Failed to parse CSV file: ${errorMessage}`,
        400,
        "parseError",
        errorMessage
      );
      return next(err);
    }

    const jsonData = parsedData.data;

    const modifiedData = jsonData.map((data) => {
      const [day, month, year] = data.dob.split("/");
      const formattedDob = new Date(`${year}-${month}-${day}`);
      console.log("formattedDob", formattedDob);

      const user = {
        name: {
          firstName: data["name.firstName"],
          lastName: data["name.lastName"],
        },
        dob: formattedDob,
        account: data.account,
        password: data.password,
        role: {
          userType: data["role.userType"],
          roleInfo: data["role.roleInfo"],
        },
        contact: {
          email: data["contact.email"],
          phone: data["contact.phone"],
        },
        address: {
          houseNumber: data["address.houseNumber"],
          street: data["address.street"],
          suburb: data["address.suburb"],
          city: data["address.city"],
          state: data["address.state"],
          country: data["address.country"],
          postalCode: data["address.postalCode"],
        },
      };
      return user;
    });

    console.log("modifiedData", modifiedData);
    const validatedUsers = await validateUsers(modifiedData);
    console.log("validatedUsers", validatedUsers);
    await insertUsersWithRoles(validatedUsers);
    return validatedUsers;
  } catch (error) {
    const err = createNewErrors("Failed to parse CSV file.", 400, "parseError");
    return next(err);
  }
};

const parseJSONAndInsert = async (filePath, next) => {
  console.log("开始解析 JSON 文件");
  try {
    const fileContent = await fs.readFile(filePath, "utf8");
    const users = JSON.parse(fileContent);
    const validatedUsers = await validateUsers(users);
    await insertUsersWithRoles(validatedUsers);
    return validatedUsers;
    // return users;
  } catch (error) {
    const err = createNewErrors(
      "Failed to parse JSON file.",
      400,
      "parseError"
    );
    return next(err);
  }
};

const validateUsers = async (users) => {
  const validatedUsers = [];
  for (const user of users) {
    console.log("user", user);
    console.log("user.dob", user.dob);
    const { error, value } = userSchema.validate(user);
    if (error) {
      throw createNewErrors(
        `Invalid user data: ${error.message}`,
        400,
        "validation"
      );
    }
    validatedUsers.push(value);
  }
  console.log("验证通过");
  return validatedUsers;
};

const insertUsersWithRoles = async (users, next) => {
  try {
    // Step 1: Hash passwords and find roles
    const usersWithHashedPasswordsAndRoles = await Promise.all(
      users.map(async (user) => {
        try {
          const hashedPassword = await bcrypt.hash(user.password, 10);
          const dob = new Date(user.dob);
          const role = await RoleModel.findOne({
            role: user.role.userType,
          }).exec();

          return {
            ...user,
            password: hashedPassword,
            role: {
              ...user.role,
              roleInfo: role._id,
            },
            dob: dob,
          };
        } catch (error) {
          console.error(`处理用户 ${user.name} 时出现错误: ${error}`);
          throw error;
        }
      })
    );

    console.log(
      "usersWithHashedPasswordsAndRoles:",
      usersWithHashedPasswordsAndRoles
    );

    // Step 2: Insert users with hashed passwords
    const newUsers = await UserModel.insertMany(
      usersWithHashedPasswordsAndRoles
    );

    // Step 3: Create related student or teacher documents
    const relatedDocsPromises = newUsers.map(async (user) => {
      let relatedDoc;
      if (user.role.userType === "teacher") {
        relatedDoc = await TeacherModel.create({
          name: user.name,
          userId: user._id,
        });
      } else if (user.role.userType === "student") {
        relatedDoc = await StudentModel.create({
          name: user.name,
          userId: user._id,
        });
      }
      return relatedDoc
        ? {
            userId: user._id,
            relatedDocId: relatedDoc._id,
            roleType: user.role.userType,
          }
        : null;
    });

    const relatedDocs = (await Promise.all(relatedDocsPromises)).filter(
      (doc) => doc !== null
    );

    // Step 4: Update users with the related document IDs
    const updateUsersPromises = relatedDocs.map(
      ({ userId, relatedDocId, roleType }) =>
        UserModel.findByIdAndUpdate(
          userId,
          {
            $set: { "role.userId": relatedDocId, "role.userType": roleType },
          },
          { new: true }
        )
    );

    const updatedUsers = await Promise.all(updateUsersPromises);
    console.log("用户更新完成:", updatedUsers);
  } catch (error) {
    console.error("Error inserting users:", error);
    const err = createNewErrors("Failed to insert users.", 500, "insertError");
    return next(err);
  }
};

module.exports = {
  receiveFiles,
};
