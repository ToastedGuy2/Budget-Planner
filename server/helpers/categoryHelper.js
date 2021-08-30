const _ = require("lodash/string");
const { isIdValid } = require("../helpers/commonHelper");
const Category = require("../models/CategoryModel");

// const doesCategoryExists = async (id) => {
//   if (isIdValid(id)) {
//     const category = await Category.findById(id);
//     return category ? true : false;
//   }
//   return false;
// };
const doesCategoryExists = async (id, userId) => {
  if (isIdValid(id) && isIdValid(userId)) {
    const category = await Category.findOne({ _id: id, userId });
    return category ? true : false;
  }
  return false;
};
const isCategoryNameAvailable = async (name = "", userId) => {
  if (isIdValid(userId)) {
    const categories = await Category.find({ userId });
    const category = categories.find(
      (category) => _.toLower(category.name) === _.toLower(name)
    );
    return category ? false : true;
  }
  return true;
};

module.exports = { isCategoryNameAvailable, doesCategoryExists };
