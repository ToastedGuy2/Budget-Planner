const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const transactionSchema = Schema({
  type: String,
  name: String,
  categoryId: Schema.Types.ObjectId,
  amount: Number,
  date: Date,
  userId: Schema.Types.ObjectId,
  addedOn: {
    type: Date,
    default: new Date(),
  },
});

const TransactionModel = mongoose.model("Transaction", transactionSchema);

module.exports = TransactionModel;
