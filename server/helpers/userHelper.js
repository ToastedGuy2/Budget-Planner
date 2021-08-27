const User = require("../models/UserModel");
const { isIdValid } = require("./commonHelper");
const isEmailInUse = (email) => {
  return User.exists({ email });
};
const doesUserExists = async (id) => {
  if (isIdValid(id)) {
    const user = await User.findById(id);
    return user ? true : false;
  }
  return false;
};

module.exports = {
  isEmailInUse,
  doesUserExists,
};
