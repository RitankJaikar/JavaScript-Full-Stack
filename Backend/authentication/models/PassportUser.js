const mongoose = require("mongoose");

// Define the User schema
const userSchema = new mongoose.Schema({
  googleId: { type: String, required: true, unique: true }, // Important for Google OAuth, prevents duplicate accounts and ensures consistency
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

// Export the model
module.exports = mongoose.model("User", userSchema);