const express = require("express");
const morgan = require("morgan");
const multer = require("multer");
const cors = require("cors");

const userRouter = require("./routes/userRoutes");
const authRouter = require("./routes/authRouter");
const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(multer().none());

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
module.exports = app;
