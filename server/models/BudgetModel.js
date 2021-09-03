const mongoose = require("mongoose");

const budgetSchema = mongoose.Schema({
  amount: Number,
  month: Number,
  year: Number,
  userId: mongoose.Schema.Types.ObjectId,
});

const BudgetModel = mongoose.model("Budget", budgetSchema);

module.exports = BudgetModel;
