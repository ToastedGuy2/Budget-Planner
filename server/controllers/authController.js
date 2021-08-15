const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModels");
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({
        status: "failed",
        message: "Invalid Credentials",
      });
    }
    const arePasswordsSame = await bcrypt.compare(password, user.password);
    if (!arePasswordsSame) {
      return res.status(401).json({
        status: "failed",
        message: "Invalid Credentials",
      });
    }
    jwt.sign(
      { email },
      process.env.TOKEN_SECRET,
      { expiresIn: "15 days" },
      (err, jwt) => {
        if (err) {
          throw new Exception(err);
        }
        const daysToExpire = 15;
        res.cookie("token", jwt, {
          maxAge: daysToExpire * 24 * 60 * 60 * 1000,
        });
        return res.json(jwt);
      }
    );
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json(
        "Something went wrong on our servers while processing your request. Please try again"
      );
  }
};
