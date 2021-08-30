const { doesUserExists } = require("../../helpers/userHelper");
const { doesCategoryExists } = require("../../helpers/categoryHelper");

const isUserResourceAvailable = async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const result = await doesUserExists(userId);
    if (result) return next();
    return res.status(404).send("User resource doesn't exist");
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "failed",
      message:
        "Something went wrong on our servers while processing your request",
    });
  }
};
const isCategoryResourceAvailable = async (req, res, next) => {
  try {
    const { id, userId } = req.params;
    const result = await doesCategoryExists(id, userId);
    if (result) return next();
    return res
      .status(404)
      .send("Category resource doesn't exist or It's not own by the user");
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "failed",
      message:
        "Something went wrong on our servers while processing your request",
    });
  }
};

module.exports = { isUserResourceAvailable, isCategoryResourceAvailable };
