const jwt = require("jsonwebtoken");
const User = require("../models/User.js");
const customResponse = require("../utils/customResponse.js");

const JWT_SECRET = "ritank"; // Move this to an environment variable in production

const checkLoginJwt = async (req, res, next) => {
  // Extract token from Authorization header
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return customResponse(
      res,
      401,
      false,
      "Access denied. No token provided.",
      null,
      null
    );
  }

  const token = authHeader.split(" ")[1]; // Get the token part

  try {
    // Verify JWT token (auth token)
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Find the user by ID from the decoded token
    const user = await User.findById(decoded.id);
    if (!user) {
      return customResponse(res, 403, false, "Invalid token. Access denied.", null, null);
    }

    req.user = user; // Attach user data to request object
    next(); // Proceed to the next middleware
  } catch (err) {
    return customResponse(res, 401, false, "Invalid or expired token.", null, err);
  }
};

module.exports = checkLoginJwt;