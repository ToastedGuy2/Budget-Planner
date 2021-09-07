const { StringToPascalCase } = require("../../helpers/commonHelper");
module.exports = (req, res, next) => {
  const body = req.body;
  body.user = req.params.userId;
  body.type = StringToPascalCase(body.type);
  body.name = StringToPascalCase(body.name);
  next();
};
