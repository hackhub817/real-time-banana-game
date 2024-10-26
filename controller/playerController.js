const User = require("../models/userModel");

const getAllPlayers = async (req, res) => {
  try {
    const players = await User.find({ role: "player" });
    console.log("Players:", players);
    res.status(200).json({ players });
  } catch (error) {
    console.error("Error fetching players:", error);
    res.status(500).json({ error: "Failed to fetch players." });
  }
};

const blockPlayer = async (req, res) => {
  try {
    const player = await User.findById(req.params.id);
    if (!player) {
      return res.status(404).json({ error: "Player not found." });
    }

    player.isBlocked = !player.isBlocked;
    await player.save();
    res.json({ msg: `Player ${player.isBlocked ? "blocked" : "unblocked"}` });
  } catch (error) {
    console.error("Error blocking player:", error);
    res.status(500).json({ error: "Failed to update player status." });
  }
};

module.exports = {
  getAllPlayers,
  blockPlayer,
};
