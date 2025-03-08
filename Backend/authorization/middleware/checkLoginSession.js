const User = require("../models/User.js");
const customResponse = require("../utils/customResponse.js");

const checkLoginSession = async (req, res, next) => {
  const id = req.headers.id;

  if (!id) {
    return customResponse(
      res,
      401,
      false,
      "Unauthorized: No userId provided",
      null,
      null
    );
  }

  try {
    const user = await User.findById(id);

    if (!user) {
      return customResponse(
        res,
        401,
        false,
        "Unauthorized: User not found",
        null,
        null
      );
    }

    req.user = user;

    next();
  } catch (err) {
    return customResponse(res, 500, false, "Error verifying user", null, err);
  }
};

module.exports = checkLoginSession;