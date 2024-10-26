const express = require("express");
const { auth, adminAuth } = require("../middleware/auth");
const User = require("../models/userModel");
const {
  getAllPlayers,
  blockPlayer,
  updatebanana,
  leaderboard,
  deletePlayer,
} = require("../controller/playerController");

const router = express.Router();

router.get("/players", auth, getAllPlayers);

router.patch("/player/:id/block", auth, blockPlayer);
router.post("/updateBananaCount", auth, updatebanana);
router.delete("/player/:id", auth, deletePlayer);
router.get("/leaderboard", auth, leaderboard);
module.exports = router;
