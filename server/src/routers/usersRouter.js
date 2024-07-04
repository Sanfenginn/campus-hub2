const express = require("express");
const usersRouter = express.Router();
const {
  addUser,
  bulkDeleteUserById,
  updateUserById,
  getAllUsers,
  getUserById,
} = require("../controllers/usersController");
const {
  validateUser,
  checkId,
} = require("../middlewares/validationMiddleware");

usersRouter.get("/", getAllUsers);
usersRouter.get("/:id", checkId, getUserById);
usersRouter.post("/", validateUser, addUser);
usersRouter.put("/:id", checkId, validateUser, updateUserById);
usersRouter.delete("/", bulkDeleteUserById);

module.exports = usersRouter;
