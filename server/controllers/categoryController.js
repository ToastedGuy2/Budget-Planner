const Category = require("../models/CategoryModel");
const { morphism } = require("morphism");
const Schema = require("../morphismSchemas/CategorySchema");

exports.postCategory = async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(201).json({
      status: "success",
      message: "Category added successfully",
      data: {
        category: morphism(Schema, newCategory),
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
exports.getCategoryById = async (req, res) => {
  try {
    const { id, userId } = req.params;
    const category = await Category.findOne({ _id: id, userId });
    if (!category) {
      return res.status(404).json({
        status: "failed",
        message: "The category you're looking for doesn't exist",
      });
    }
    return res.json({
      status: "success",
      message: "category found",
      data: {
        user: morphism(Schema, category),
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
exports.getAllCategoriesByUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const categories = await Category.find(userId);
    return res.json({
      status: "successful",
      results: categories.length,
      data: {
        users: morphism(Schema, categories),
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
