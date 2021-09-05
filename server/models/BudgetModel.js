const mongoose = require("mongoose");

const budgetSchema = mongoose.Schema({
  amount: Number,
  month: Number,
  year: Number,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const BudgetModel = mongoose.model("Budget", budgetSchema);

module.exports = BudgetModel;
