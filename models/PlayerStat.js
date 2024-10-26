const mongoose = require("mongoose");

const PlayerStatSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  bananaCount: { type: Number, default: 0 },
});

module.exports = mongoose.model("PlayerStat", PlayerStatSchema);
