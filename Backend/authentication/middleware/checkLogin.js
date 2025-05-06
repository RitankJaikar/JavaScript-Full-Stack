const User = require("../models/User.js");
const customResponse = require("../utils/customResponse.js");

const checkLogin = async (req, res, next) => {
  const token = req.headers.authorization; // Extract token from headers

  if (!token) {
    return customResponse(
      res,
      401,
      false,
      "Access denied. No token provided.",
      null,
      null
    );
  }

  try {
    const user = await User.findOne({ token });

    if (!user) {
      return customResponse(
        res,
        403,
        false,
        "Invalid token. Access denied.",
        null,
        null
      );
    }

    req.user = user;

    next();
  } catch (err) {
    return customResponse(res, 500, false, "Error verifying token", null, err);
  }
};

module.exports = checkLogin;
