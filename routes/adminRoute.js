const express = require("express");
const { auth, adminAuth } = require("../middleware/auth");
const {
  getAllPlayers,
  blockPlayer,
} = require("../controller/playerController");

const router = express.Router();

router.get("/players", auth, getAllPlayers);

router.patch("/player/:id/block", auth, adminAuth, blockPlayer);

module.exports = router;
