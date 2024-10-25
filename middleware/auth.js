const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const auth = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("Error occurring in Authentication: " + error);
    return res.status(401).json({ error: "User not authenticated" });
  }
};

const adminAuth = (req, res, next) => {
  console.log("ans", req.user.isAdmin);
  if (req.user.isAdmin !== true) return res.status(403).send("Access Denied");
  next();
};

module.exports = { auth, adminAuth };
