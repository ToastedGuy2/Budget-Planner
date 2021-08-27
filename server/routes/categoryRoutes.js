const express = require("express");
const {
  postCategory,
  getAllCategoriesByUser,
  getCategoryById,
} = require("../controllers/categoryController");
const DataSanitation = require("../middlewares/DataSanitationMiddlewares/CategorySanitationMiddleware");
const {
  validateCategory,
} = require("../middlewares/ValidationMiddlewares/categoryValidationMiddleware");
const {
  isCategoryResourceAvailable,
} = require("../middlewares/ValidationMiddlewares/isResourceAvailable");
const categoryRouter = express.Router();
categoryRouter
  .route("/")
  .get(getAllCategoriesByUser)
  .post(validateCategory, DataSanitation, postCategory);
categoryRouter.route("/:id").get(isCategoryResourceAvailable, getCategoryById);
module.exports = categoryRouter;
