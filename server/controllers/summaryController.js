const { morphism } = require("morphism");
const Schema = require("../morphismSchemas/TransactionSchema");
const Transaction = require("../models/TransactionModel");
const Budget = require("../models/BudgetModel");
const { DateTime } = require("luxon");
module.exports.monthly = async (req, res) => {
  const { month, year, userId } = req.params;
  const startDate = new Date(
    DateTime.fromObject({
      day: 1,
      month,
      year,
      hour: 0,
      minute: 0,
      second: 0,
    }).toISO()
  );
  const endDate = new Date(
    DateTime.fromObject({
      day: DateTime.utc().daysInMonth,
      month,
      year,
      hour: 23,
      minute: 59,
      second: 59,
    }).toISO()
  );
  const transactionsDocs = await Transaction.find({
    date: { $gte: startDate, $lte: endDate },
    userId,
  }).sort({ addedOn: "desc" });
  const transactions = morphism(Schema,transactionsDocs);
  const incomeList = transactions.filter(transaction => transaction.type === "Income");
  const income = incomeList.reduce((acc,item) => acc + item.amount,0);
  const expenseList = transactions.filter(transaction => transaction.type === "Expense");
  const expense = expenseList.reduce((acc,item) => acc + item.amount,0);  
  const budgetDoc = await Budget.findOne({month,year,userId});
  const budget = budgetDoc? budgetDoc.amount:0;
  const remaining = budget - expense;

  const summary = {
    from: startDate,
    end:endDate,
    transactions:{
      results: transactions.length,
      data: transactions,
    },
    income: {
      results: incomeList.length,
      data: incomeList,
      amount: income
    },
    expenses:{
      results: expenseList.length,
      data: expenseList,
      amount: expense 
    },
    budget:{
      amount: budget,
      remaining
    }
  }

  res.json(summary);
};
