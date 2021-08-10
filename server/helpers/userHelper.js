const User = require("../models/UserModels");
const isEmailInUse = (email) => {
  return User.exists({ email });
};

module.exports = {
  isEmailInUse,
};
