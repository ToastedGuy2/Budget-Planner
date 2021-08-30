const Validator = require("validatorjs");
const _ = require("lodash/string");
const { DateTime } = require("luxon");
const { doesCategoryExists } = require("../../helpers/categoryHelper");
const { isIdValid } = require("../../helpers/commonHelper");
const { isDateWithinThisMonth } = require("../../helpers/transactionHelpers");
exports.validateTransaction = (req, res, next) => {
  try {
    const transaction = req.body;
    const userId = req.params.userId;
    Validator.register(
      "correct_type",
      (type, attribute, req) => {
        type = _.toLower(type);
        return type === "income" || type === "expense";
      },
      "Invalid type. It must be income or expense"
    );
    Validator.register(
      "higher_than_0",
      (amount, attribute, req) => {
        return amount * 1 > 0;
      },
      "The amount must be higher than 0"
    );
    Validator.register(
      "within_this_month",
      (date, attribute, req) => isDateWithinThisMonth(date),
      "The date must be within this month"
    );
    Validator.register(
      "objectId",
      (id, attribute, req) => {
        return isIdValid(id);
      },
      "This field must be an ObjectId"
    );
    Validator.registerAsync(
      "category_exists",
      (categoryId, attribute, req, passes) => {
        doesCategoryExists(categoryId, userId).then((result) => {
          result
            ? passes()
            : passes(
                false,
                "This category doesn't exists or is not related to the provided user"
              );
        });
      }
    );

    let rules = {
      type: "string|required|correct_type",
      name: "string|required|min:3",
      categoryId: "objectId|required|category_exists",
      amount: "numeric|required|higher_than_0",
      date: `date|required|within_this_month`,
    };
    let validation = new Validator(transaction, rules, {
      string: "This field must be text value",
      numeric: "This field must be a numeric value",
      date: "This field must be a date value",
      required: "This field is required",
      min: "This field must contain at least 3 characters",
    });
    const LooksGood = () => next();
    const fails = () => {
      const getAttributeError = (propertyName) =>
        validation.errors.first(propertyName)
          ? validation.errors.first(propertyName)
          : undefined;
      const errors = {
        type: getAttributeError("type"),
        name: getAttributeError("name"),
        categoryId: getAttributeError("categoryId"),
        amount: getAttributeError("amount"),
        date: getAttributeError("date"),
      };
      res.status(400).json({
        status: "failed",
        message: "invalid data",
        errors,
      });
    };
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
