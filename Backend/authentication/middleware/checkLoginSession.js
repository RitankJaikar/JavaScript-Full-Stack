const User = require("../models/User.js");
const customResponse = require("../utils/customResponse.js");

const checkLoginSession = async (req, res, next) => {
  const id = req.headers.id; // Retrieve the user ID from request headers (sent by the client)
  // console.log(id);  //Since Express converts header keys to lowercase, using id (or userid) works consistently

  if (!id) {
    // If no userId is provided in the request, return an unauthorized response
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
    // Find the user in the database based on userId
    const user = await User.findById(id);

    if (!user) {
      // If user does not exist, return an unauthorized response
      return customResponse(
        res,
        401,
        false,
        "Unauthorized: User not found",
        null,
        null
      );
    }

    // If user exists, attach user data to req object for further use in route handlers
    req.user = user;

    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    // Handle errors, such as database issues, and return a 500 Internal Server Error response
    return customResponse(res, 500, false, "Error verifying user", null, err);
  }
};

module.exports = checkLoginSession;
