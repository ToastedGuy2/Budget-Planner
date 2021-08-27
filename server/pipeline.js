const express = require("express");
const morgan = require("morgan");
const multer = require("multer");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authentication = require("./middlewares/authentication/authenticationMiddleware");
const {
  isUserResourceAvailable,
} = require("./middlewares/ValidationMiddlewares/isResourceAvailable");

const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(multer().none());
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use(
  "/api/users/:userId/categories",
  authentication,
  isUserResourceAvailable,
  categoryRoutes
);
module.exports = app;
