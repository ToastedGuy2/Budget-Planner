const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const transactionSchema = Schema({
  type: String,
  name: String,
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  amount: Number,
  date: Date,
  user: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

const TransactionModel = mongoose.model("Transaction", transactionSchema);

module.exports = TransactionModel;
