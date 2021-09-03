const { morphism } = require("morphism");
const Schema = require("../morphismSchemas/TransactionSchema");


const Transaction = require("../models/TransactionModel");

exports.postTransaction = async (req, res) => {
  try {
    const newTransaction = await Transaction.create(req.body);
    newTransaction.id = newTransaction._id;
    delete newTransaction._id;
    res.status(201).json({
      status: "success",
      message: "Transaction added successfully",
      data: {
        transaction: morphism(Schema,newTransaction),
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message:
        "SORRY: something gone wrong in the server when processing your request",
    });
  }
};
exports.patchTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!transaction) {
      return res.status(404).json({
        status: "failed",
        message: "The transaction you're looking for doesn't exist",
      });
    }
    res.status(200).json({
      status: "success",
      message: "Transaction updated successfully",
      data: {
        transaction: morphism(Schema,transaction),
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message:
        "SORRY: something gone wrong in the server when processing your request",
    });
  }
};
exports.getTransaction = async (req, res) => {
  try {
    const { id, userId } = req.params;
    const transaction = await Transaction.findOne({ _id: id, userId });
    if (!transaction) {
      return res.status(404).json({
        status: "failed",
        message: "The transaction you're looking for doesn't exist",
      });
    }
    return res.json({
      status: "success",
      message: "transaction found",
      data: {
        transaction:morphism(Schema,transaction),
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json(
        "Something went wrong on our servers while processing your request. Please try again"
      );
  }
};
exports.getAllTransactions = async (req, res) => {
  try {
    const userId = req.params.userId;
    const transactions = await Transaction.find({ userId });
    return res.json({
      status: "successful",
      results: transactions.length,
      data: {
        transactions:morphism(Schema,transactions),
      },
    });
  } catch (error) {
    return res
      .status(500)
      .json(
        "Something went wrong on our servers while processing your request. Please try again"
      );
  }
};
exports.deleteTransaction = async (req, res) => {
  try {
    const id = req.params.id;
    await Transaction.deleteOne({ _id: id });
    return res.send();
  } catch (error) {
    return res
      .status(500)
      .json(
        "Something went wrong on our servers while processing your request. Please try again"
      );
  }
};
exports.deleteManyTransactions = async (req, res) => {
  try {
    const ids = req.query.id;
    await Transaction.deleteMany({ _id: { $in: ids } });
    return res.send();
  } catch (error) {
    return res
      .status(500)
      .json(
        "Something went wrong on our servers while processing your request. Please try again"
      );
  }
};
