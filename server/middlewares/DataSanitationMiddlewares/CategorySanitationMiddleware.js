const { StringToPascalCase } = require("../../helpers/commonHelper");
module.exports = (req, res, next) => {
  const category = req.body;
  category.userId = req.params.userId;
  category.name = StringToPascalCase(category.name);
  req.body = category;
  next();
};
