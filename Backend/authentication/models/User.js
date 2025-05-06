const mongoose = require("mongoose");
const schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = new schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email is unique"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    token: {
        type: String
    }
  },
  { timestamps: true }
);

// Pre-save middleware for the user schema
// userSchema.pre("save", async function (next) {
//   if (this.isModified("password")) {
//     // Hash the new/modified password using bcrypt before saving
//     this.password = await bcrypt.hash(this.password, 10);
//     console.log(this.password); //(for debugging, should be removed in production)
//   }
//   next();
// });

const User = mongoose.model("User", userSchema);

module.exports = User;