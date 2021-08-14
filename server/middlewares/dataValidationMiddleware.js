const Validator = require("validatorjs");
const { isEmailInUse } = require("../helpers/userHelper");
exports.validateUser = (req, res, next) => {
  const user = req.body;
  Validator.registerAsync(
    "email_available",
    (email, attribute, req, passes) => {
      isEmailInUse(email).then((result) => {
        result ? passes(false, "Email has already been taken") : passes();
      });
    }
  );
  let rules = {
    email: "required|email|email_available",
    password: "required",
    repeat_password: "required|same:password",
  };
  let validation = new Validator(user, rules, {
    same: "Passwords do not match",
    required: "This field is required",
  });
  const passes = () => {
    next();
  };
  const fails = () => {
    const getAttributeError = (propertyName) =>
      validation.errors.first(propertyName)
        ? validation.errors.first(propertyName)
        : undefined;
    const errors = {
      email: getAttributeError("email"),
      password: getAttributeError("password"),
      repeat_password: getAttributeError("repeat_password"),
    };
    res.status(400).json({
      status: "failed",
      message: "invalid data",
      errors,
    });
  };
  validation.checkAsync(passes, fails);
};
