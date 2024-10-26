const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
  getUsers,
} = require("../controller/AuthController");
const { auth } = require("../middleware/auth");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users", auth, getUsers);
router.get("/logout", auth, logout);

module.exports = router;
