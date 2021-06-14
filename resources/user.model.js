const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
});

userSchema.pre("find", function (next) {
  this.select("-__v");

  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
