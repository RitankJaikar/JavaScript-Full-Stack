const express = require("express");
const jwtBasedRouter = express.Router();
const User = require("../models/User.js");
const customResponse = require("../utils/customResponse.js");
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const RefreshToken = require("../models/RefreshToken.js");
const checkLoginJwt = require("../middleware/checkLoginJwt.js");

// ✅ JWT Secrets (Move to `.env` for security)
const JWT_SECRET = process.env.JWT_SECRET || "ritank";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "ritank";

jwtBasedRouter.post("/register", async (req, res) => {
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

jwtBasedRouter.post("/login", async (req, res) => {
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

    // ✅ Generate JWT Access Token (short-lived, used for authentication)
    // `expiresIn: "15m"` means the token will expire in 15 minutes
    const accessToken = jwt.sign(
      { id: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: "1m" } // Set a reasonable expiry time
    );

    // ✅ Generate JWT Refresh Token (long-lived, used for renewing access token)
    const refreshToken = jwt.sign(
      { id: user._id, email: user.email },
      JWT_REFRESH_SECRET,
      { expiresIn: "30d" } // Set refresh token expiry
    );

    // ✅ Store refresh token in the database (for logout & security)
    await RefreshToken.create({ user: user._id, refresh: refreshToken });

    // ✅ Send tokens in response
    return customResponse(
      res,
      200,
      true,
      "Login successful",
      { accessToken, refreshToken },
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

//using middleware- checkLoginJwt
jwtBasedRouter.get("/secret2", checkLoginJwt, async (req, res) => {
  return customResponse(
    res,
    200,
    true,
    "Welcome to the secret route!",
    { secretData: "This is confidential data", user: req.user },
    null
  );
});

jwtBasedRouter.patch("/updateAuthToken", async (req, res) => {
  const { refreshToken } = req.body; // Get refresh token from request body

  if (!refreshToken) {
    return customResponse(
      res,
      400,
      false,
      "Refresh token is required",
      null,
      null
    );
  }

  try {
    // Find the refresh token in the database and populate user details
    const storedToken = await RefreshToken.findOne({
      refresh: refreshToken,
    }).populate("user");

    // If token is not found, return an error
    if (!storedToken || !storedToken.user) {
      return customResponse(
        res,
        403,
        false,
        "Invalid refresh token",
        null,
        null
      );
    }

    // Generate a new access token
    const newAccessToken = jwt.sign(
      { id: storedToken.user._id, email: storedToken.user.email },
      JWT_SECRET,
      { expiresIn: "1m" } // Set appropriate expiry time
    );

    return customResponse(
      res,
      200,
      true,
      "Access token refreshed",
      { accessToken: newAccessToken },
      null
    );
  } catch (err) {
    return customResponse(res, 500, false, "Error updating token", null, err);
  }
});

jwtBasedRouter.delete("/logout", checkLoginJwt, async (req, res) => {
  try {
    // Extract the refresh token from request body or headers
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return customResponse(
        res,
        400,
        false,
        "Refresh token is required",
        null,
        null
      );
    }

    // Remove the refresh token from the database
    await RefreshToken.findOneAndDelete({ refresh: refreshToken });

    return customResponse(res, 200, true, "Logout successful", null, null);
  } catch (err) {
    return customResponse(res, 500, false, "Error logging out", null, err.message);
  }
});

module.exports = jwtBasedRouter;

/*
We use two tokens (Access Token & Refresh Token) to balance security & user experience.

Access Token (Short-Lived, short-lived, prevents misuse)
🔹 Purpose: Used for authenticating API requests (e.g., accessing protected routes).
🔹 Expires Quickly: Usually within 15 minutes to 1 hour (for security).
🔹 Stored in: Client-side memory (React, Vue, etc.) or HTTP headers (not local storage for security
🔹 Issue: Once it expires, the user has to log in again—which is frustrating.
e.g. Every time a user requests a protected API (/profile), they send the Access Token in the Authorization header.

Refresh Token (Long-Lived, avoids repeated logins)
🔹 Purpose: Used to get a new Access Token without forcing the user to log in again.
🔹 Expires Slowly: Usually in 7 to 30 days (to keep users logged in for a long time).
🔹 Stored in: Database & HTTP-only cookies (not in local storage for security reasons).
🔹 Issue: If stolen, an attacker can generate new Access Tokens. That's why it's stored securely in HTTP-only cookies.
e.g. When the Access Token expires, the client sends the Refresh Token to get a new Access Token.
If the Refresh Token is valid, the server generates a new Access Token & sends it back.
*/
