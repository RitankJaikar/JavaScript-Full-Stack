const mongoose = require("mongoose");
const schema = mongoose.Schema;

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
    userType: {
        type: String,
        required: true,
        default: "user",
        enum: ["user", "admin", "sub-admin"]
        // `enum` ensures that `userType` can only have one of the specified values.
        // If a value outside of ["user", "admin", "sub-admin"] is provided, Mongoose throws a validation error.
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;