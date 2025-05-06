const express = require("express");
const sessionBasedRouter = express.Router();
const User = require("../models/User.js");
const customResponse = require("../utils/customResponse.js");
const bcrypt = require("bcrypt");
const checkLoginSession = require("../middleware/checkLoginSession.js");


// register route same as userToken's register based router
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

    // impt. to create session (do not set req.session.id, it will break express-session logic)
    req.session.userid = user._id; // Mark this user as logged in and remember them across future requests
    // due to this session is created, this .session object came from expressSession() middleware
    // by attaching user._id with req.session.id session is created

    // ✅ Send tokens in response
    return customResponse(
      res,
      200,
      true,
      "Login successful",
      user,
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

    // test cookie in frontend, for every page load count increases by 1 in one session (means in one device or browser)
    // if(req.session.count) {
    //   req.session.count++
    // }
    // else {
    //   req.session.count = 1;
    // }
    // return res.send(`${req.session.count}`);

    // ✅ Send tokens in response
    return customResponse(
      res,
      200,
      true,
      "Login successful",
      user,
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

sessionBasedRouter.post("/logout", checkLoginSession, (req, res) => {
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
