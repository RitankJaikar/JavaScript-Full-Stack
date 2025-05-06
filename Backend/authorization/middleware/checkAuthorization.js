const User = require("../models/User.js");
const customResponse = require("../utils/customResponse.js");

// Middleware to check user authorization based on roles
const checkAuthorization = (allowedRoles) => {
  return async (req, res, next) => {
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
      // Fetch user details from the database
      const user = await User.findById(id);

      if (!user) {
        return customResponse(res, 404, false, "User not found", null, null);
      }

      // Check if the user's role is allowed to access the route
      if (!allowedRoles.includes(user.userType)) {
        return customResponse(
          res,
          403,
          false,
          "Forbidden: You do not have permission",
          null,
          null
        );
      }

      // Attach user data to request (optional)
      req.user = user;

      // Proceed to the next middleware or route handler
      next();
    } catch (err) {
      console.error("Authorization Error:", err);
      return customResponse(
        res,
        500,
        false,
        "Internal server error",
        null,
        err.message || err
      );
    }
  };
};

module.exports = checkAuthorization;
