const mongoose = require("mongoose");

const refreshTokenSchema = new mongoose.Schema(
  {
    refresh: {
      type: String,
      required: [true, "Token is required"],    // The actual refresh token string
      unique: [true, "Token is unique"],    // Ensures no duplicate tokens exist
    },
    user: {
      type: mongoose.Schema.Types.ObjectId, // Links the refresh token to a user
      ref: "User",  // References the "User" model
      required: [true, "User is required"], // Ensures every token is linked to a user
    },
    createdAt: {
      type: Date,
      default: Date.now, // Automatically set when token is created
      expires: 60 * 60 * 24 * 30, // Auto-delete after 30 days
    },
    // ❌ Not needed: expiresAt does the same thing as createdAt with expires
    // expiresAt: {
    //   type: Date,
    //   required: true,
    //   index: { expires: "30d" }, // Auto-delete after 30 days
    // },
  },
  { timestamps: true }
);

const RefreshToken = mongoose.model("RefreshToken", refreshTokenSchema);

module.exports = RefreshToken;
