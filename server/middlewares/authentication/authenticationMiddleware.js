const jwt = require("jsonwebtoken");
const authenticateUser = (req, res, next) => {
  const token = req.headers["authorization"];
  jwt.verify(token, process.env.TOKEN_SECRET, (err, decode) => {
    if (err)
      return res.status(401).json({
        status: "failed",
        message: "Invalid Credentials",
      });
    next();
  });
};
module.exports = authenticateUser;
