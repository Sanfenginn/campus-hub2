const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserModel = require("../models/userModel");
const Role = require("../models/roleModel");
const createNewErrors = require("../utils/createNewErrors");
const config = require("../config");
const checkResource = require("../utils/checkResource");

const login = async (req, res, next) => {
  const { account, password } = req.body;

  try {
    const user = await UserModel.findOne({ account }).populate("role").exec();

    checkResource(user, "User not found", 404, "notFound", next);

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    checkResource(
      isPasswordCorrect,
      "Incorrect password",
      401,
      "unauthorized",
      next
    );

    const token = jwt.sign(
      { age: user.age, roleId: user.role._id },
      config.JWT_SECRET,
      { expiresIn: "1h" }
    );

    console.log("token", token);

    // 将 token 存储在 HttpOnly cookies 中
    res.cookie("token", token, {
      httpOnly: true,
      // secure: false,
      secure: process.env.NODE_ENV === "production", // 在生产环境中使用 HTTPS
      sameSite: "strict",
      maxAge: 3600000, // 1小时
      // maxAge: 60 * 1000,
    });

    res.formatResponse(200, "Login successful", {
      userId: user._id,
      userRole: user.role.userType,
      token: token,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  login,
  // other functions
};
