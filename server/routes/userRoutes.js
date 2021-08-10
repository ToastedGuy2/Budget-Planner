const express = require("express");
const { postUser, getUser } = require("../controllers/userController");
const userRouter = express.Router();

userRouter.route("/").post(postUser);
userRouter.route("/:id").get(getUser);

module.exports = userRouter;
