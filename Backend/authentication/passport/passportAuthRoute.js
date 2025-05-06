const express = require("express");
const passport = require("passport");
const checkPassport = require("../middleware/checkLoginPassport")

const passportBasedRouter = express.Router();

// Route for initiating Google authentication
// When the user accesses this route, they are redirected to Google's authentication page
passportBasedRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Callback route that Google redirects to after authentication
// If authentication fails, the user is redirected to "/login-failed"
// If authentication is successful, the user data is sent as a response
passportBasedRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login-failed", // Redirects the user to this route if authentication fails
    successRedirect: "/dashboard", // (Optional) Redirects to a success page after authentication
    // could change url according to frontend
  }),
  (req, res) => {
    res.json({
      success: true,
      message: "Google Login Successful",
      user: req.user,
    });
  }
);

// Logout route
// Logs the user out, destroys the session, and responds with a success message
passportBasedRouter.get("/logout", (req, res) => {
  req.logout((err) => {
    if (err)
      return res
        .status(500)
        .json({ success: false, message: "Logout failed", error: err });
    req.session.destroy(); // Destroy session data
    res.json({ success: true, message: "Logged out successfully" });
  });
});

passportBasedRouter.get("/secret2", checkPassport, async (req, res) => {
  return customResponse(
    res,
    200,
    true,
    "Welcome to the secret route!",
    { secretData: "This is confidential data", user: req.user },
    null
  );
});

module.exports = passportBasedRouter;
