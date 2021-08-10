const bcrypt = require("bcrypt");
const UserModel = require("../models/UserModels");
exports.postUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hash = await bcrypt.hash(password, 12);
    const newUser = await UserModel.create({ email, password: hash });
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(500);
  }
};
exports.getUser = async (req, res) => {};
