const express = require("express");
const morgan = require("morgan");
const multer = require("multer");
const cors = require("cors");
const {
  validateUser,
} = require("../server/middlewares/dataValidationMiddleware");
const userRouter = require("./routes/userRoutes");
const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(multer().none());

app.use("/api/users", validateUser, userRouter);
module.exports = app;
