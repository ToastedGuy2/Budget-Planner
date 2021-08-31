const express = require("express");
const {
  postTransaction,
  patchTransaction,
  getAllTransactions,
  getTransaction,
  deleteTransaction,
  deleteManyTransactions,
} = require("../controllers/transactionController");
const DataSanitation = require("../middlewares/DataSanitationMiddlewares/TransactionSanMiddleware");
const {
  validateTransaction,
} = require("../middlewares/ValidationMiddlewares/transactionValidationMiddleware");
const {
  isCategoryResourceAvailable,
} = require("../middlewares/ValidationMiddlewares/isResourceAvailable");
const transactionRouter = express.Router({ mergeParams: true });
transactionRouter
  .route("/")
  .get(getAllTransactions)
  .post(validateTransaction, DataSanitation, postTransaction)
  .delete(deleteManyTransactions);

transactionRouter
  .route("/:id")
  .get(getTransaction)
  .patch(patchTransaction)
  .delete(deleteTransaction);

// categoryRouter.route("/:id").get(isCategoryResourceAvailable, getCategoryById);
module.exports = transactionRouter;
