const express = require("express");
const { monthly } = require("../controllers/summaryController");

const summaryRouter = express.Router({ mergeParams: true });
summaryRouter.route("/monthly/:month/:year").get(monthly);

module.exports = summaryRouter;
