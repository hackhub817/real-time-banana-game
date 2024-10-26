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

const updatebanana = async (req, res) => {
  const { userId, bananaCount } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).send("User not found");

    user.bananaCount = bananaCount;
    await user.save();
    res.status(200).send("Banana count updated successfully");
  } catch (error) {
    res.status(500).send("Error updating banana count");
  }
};

const deletePlayer = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("d", id);
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "Player deleted successfully" });
  } catch (error) {
    console.error("Error deleting player:", error);
    res.status(500).json({ message: "Failed to delete player" });
  }
};
const leaderboard = async (req, res) => {
  try {
    const leaderboard = await User.find({ role: "player" }).sort({
      bananaCount: -1,
    });

    res.json(leaderboard);
  } catch (error) {
    res.status(500).send("Error retrieving leaderboard");
  }
};
module.exports = {
  getAllPlayers,
  blockPlayer,
  updatebanana,
  leaderboard,
  deletePlayer,
};
