const mongoose = require("mongoose");

const budgetSchema = mongoose.Schema({
  amount: Numeric,
  name: String,
  userId: mongoose.Schema.Types.ObjectId,
});

const BudgetModel = mongoose.model("Category", budgetSchema);

module.exports = BudgetModel;
