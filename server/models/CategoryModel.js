const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  name: String,
  userId: mongoose.Schema.Types.ObjectId,
});

const CategoryModel = mongoose.model("Category", categorySchema);

module.exports = CategoryModel;
