const Transaction = require("../models/TransactionModel");
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
  // TODO: FIX TRANSACTION, SINCE EVERY SINGLE TRANSACTION HAS an Undefined userId, so filtering is never going to work
  const transactions = await Transaction.find({
    addedOn: { $gte: startDate, $lte: endDate },
    userId,
  }).sort({ addedOn: "desc" });

  res.send(transactions);
};
