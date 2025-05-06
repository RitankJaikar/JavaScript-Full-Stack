const express = require("express");
const tokenBasedRouter = express.Router();
const User = require("../models/User.js");
const customResponse = require("../utils/customResponse.js");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const checkLogin = require("../middleware/checkLogin.js");

tokenBasedRouter.post("/register", async (req, res) => {
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

tokenBasedRouter.post("/login", async (req, res) => {
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

    let token = uuidv4();
    user.token = token;
    const updatedUser = await user.save();

    return customResponse(
      res,
      200,
      true,
      "Login successful",
      updatedUser,
      null
    );
  } catch (err) {
    return customResponse(res, 500, false, "Error logging in", null, err);
  }
});

//without any middleware
tokenBasedRouter.get("/secret1", async (req, res) => {
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

    return customResponse(
      res,
      200,
      true,
      "Welcome to the secret route!",
      { secretData: "This is confidential data" },
      null
    );
  } catch (err) {
    return customResponse(res, 500, false, "Error verifying token", null, err);
  }
});

//using middleware- checkLogin(same logic as above)
tokenBasedRouter.get("/secret2", checkLogin, async (req, res) => {
  return customResponse(
    res,
    200,
    true,
    "Welcome to the secret route!",
    { secretData: "This is confidential data", user: req.user },
    null
  );
});

module.exports = tokenBasedRouter;
