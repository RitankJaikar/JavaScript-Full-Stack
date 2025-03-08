const customResponse = require("../utils/customResponse.js");

const checkPassport = (req, res, next) => {
  if (req.isAuthenticated()) {  //.isAuthenticated() is a Passport.js method that checks if the user is authenticated (logged in) during the session 
    return next(); // User is authenticated, proceed
  }
  return customResponse(res, 401, false, "Unauthorized: Please log in first", null, null);
};

module.exports = checkPassport;