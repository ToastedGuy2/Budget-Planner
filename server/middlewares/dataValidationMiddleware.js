const Validator = require("validatorjs");
const { isEmailInUse } = require("../helpers/userHelper");
exports.validateUser = async (req, res, next) => {
  try {
    const user = req.body;
    const rules = {
      email: "required|email",
      password: "required",
      repeat_password: "required|same:password",
    };
    const validation = new Validator(user, rules, {
      required: "This field is required",
      same: "Passwords do not match",
    });
    if (validation.fails()) {
      const errors = {
        email: validation.errors.has("email")
          ? validation.errors.first("email")
          : undefined,
        password: validation.errors.has("password")
          ? validation.errors.first("password")
          : undefined,
        repeat_password: validation.errors.has("repeat_password")
          ? validation.errors.first("repeat_password")
          : undefined,
      };
      return res.status(400).json({
        status: "failed",
        message: "invalid data",
        errors,
      });
    }
    if (await isEmailInUse(req.body.email)) {
      return res.status(400).json({
        status: "failed",
        message: "invalid email",
        errors: {
          email: "Email is already in use.",
        },
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: "Oops something went wrong...",
    });
  }
};
