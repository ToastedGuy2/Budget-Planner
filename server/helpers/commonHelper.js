const mongoose = require("mongoose");
const _ = require("lodash");
const isIdValid = (id) => mongoose.isValidObjectId(id);
const StringToPascalCase = (string) => _.startCase(_.camelCase(string));

module.exports = { isIdValid, StringToPascalCase };
