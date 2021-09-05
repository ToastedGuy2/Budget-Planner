const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  name: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const CategoryModel = mongoose.model("Category", categorySchema);

module.exports = CategoryModel;
