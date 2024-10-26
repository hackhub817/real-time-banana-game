const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  isBlocked: { type: Boolean, default: false },
  role: { type: String, enum: ["admin", "player"], default: "player" },
});

module.exports = mongoose.model("User", userSchema);
