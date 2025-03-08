const express = require("express");
const sessionBasedRouter = express.Router();
const User = require("../models/User.js");
const customResponse = require("../utils/customResponse.js");
const bcrypt = require("bcrypt");
const checkLoginSession = require("../middleware/checkLoginSession.js");

sessionBasedRouter.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return customResponse(
      res,
      400,
      false,
      "All fields are required",
      null,
      null
    );
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    return customResponse(
      res,
      201,
      true,
      "User registered successfully",
      savedUser,
      null
    );
  } catch (err) {
    console.error("Registration Error:", err); // Log the error in the console
    return customResponse(
      res,
      500,
      false,
      "Error registering user",
      null,
      err.message || err
    );
  }
});

sessionBasedRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  // Check if both fields are provided
  if (!email || !password) {
    return customResponse(
      res,
      400,
      false,
      "Email and password are required",
      null,
      null
    );
  }

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return customResponse(res, 404, false, "User not found", null, null);
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return customResponse(res, 401, false, "Invalid credentials", null, null);
    }

    req.session.userId = user._id; // Store user ID in the session to maintain login state
    const updatedUser = await user.save(); // Save user data (optional, depends on session updates)

    // ✅ Send tokens in response
    return customResponse(
      res,
      200,
      true,
      "Login successful",
      updatedUser,
      null
    );
  } catch (err) {
    return customResponse(
      res,
      500,
      false,
      "Error logging in",
      null,
      err.message
    );
  }
});

//for frontend visualization
sessionBasedRouter.get("/login", async (req, res) => {
  // const { email, password } = req.body;
  const email = "test1@email.com";
  const password = "zxcvbnm";

  // Check if both fields are provided
  if (!email || !password) {
    return customResponse(
      res,
      400,
      false,
      "Email and password are required",
      null,
      null
    );
  }

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return customResponse(res, 404, false, "User not found", null, null);
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return customResponse(res, 401, false, "Invalid credentials", null, null);
    }

    req.session.userId = user._id;
    const updatedUser = await user.save();

    // ✅ Send tokens in response
    return customResponse(
      res,
      200,
      true,
      "Login successful",
      updatedUser,
      null
    );
  } catch (err) {
    return customResponse(
      res,
      500,
      false,
      "Error logging in",
      null,
      err.message
    );
  }
});

//using middleware- checkLoginSession
sessionBasedRouter.get("/secret2", checkLoginSession, async (req, res) => {
  return customResponse(
    res,
    200,
    true,
    "Welcome to the secret route!",
    { secretData: "This is confidential data", user: req.user },
    null
  );
});

userRouter.post("/logout", checkLoginSession, (req, res) => {
  if (!req.session) {
    return customResponse(
      res,
      400,
      false,
      "No active session found",
      null,
      null
    );
  }

  // Destroy the session
  req.session.destroy((err) => {
    if (err) {
      console.error("Logout Error:", err);
      return customResponse(
        res,
        500,
        false,
        "Logout failed",
        null,
        err.message || err
      );
    }

    // Clear session cookie
    res.clearCookie("connect.sid", { path: "/" }); // Ensure cookie is cleared properly

    return customResponse(
      res,
      200,
      true,
      "Logged out successfully",
      null,
      null
    );
  });
});

module.exports = sessionBasedRouter;
