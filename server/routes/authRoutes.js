const express = require("express");
const { login, authenticate } = require("../controllers/authController");

const authRouter = express.Router();

authRouter.get("/", authenticate).post("/", login);

module.exports = authRouter;
