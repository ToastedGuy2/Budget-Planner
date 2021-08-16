const express = require("express");
const {
  postUser,
  getAllUsers,
  getUserByEmail,
} = require("../controllers/userController");
const { validateUser } = require("../middlewares/dataValidationMiddleware");
const userRouter = express.Router();

userRouter.route("/").get(getAllUsers).post(validateUser, postUser);
userRouter.route("/:email").get(getUserByEmail);

module.exports = userRouter;
