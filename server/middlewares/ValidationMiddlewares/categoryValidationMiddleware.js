const { isCategoryNameAvailable } = require("../../helpers/categoryHelper");
const { doesUserExists } = require("../../helpers/userHelper");
const Validator = require("validatorjs");

exports.validateCategory = (req, res, next) => {
  try {
    const category = req.body;
    Validator.registerAsync(
      "category_name_available",
      (name, attribute, req, passes) => {
        isCategoryNameAvailable(name, category.userId).then((result) => {
          result
            ? passes()
            : passes(false, "There's already a category with this name");
        });
      }
    );
    let rules = {
      name: "required|category_name_available",
    };
    let validation = new Validator(category, rules, {
      required: "This field is required",
    });
    const LooksGood = () => next();
    const fails = () =>
      res.status(400).json({
        status: "failed",
        message: "invalid data",
        errors: {
          name: validation.errors.first("name"),
        },
      });
    validation.checkAsync(LooksGood, fails);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "failed",
      message:
        "Something went wrong on our servers while processing your request",
    });
  }
};
