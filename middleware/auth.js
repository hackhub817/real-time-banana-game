const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const auth = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("dec", decoded);
    const user = await User.findById(decoded.user.id);

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
  const token = req.cookies.jwt;

  if (!token) {
    return res.status(401).json({ error: "User not authenticated" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("decode1", decoded);
    if (decoded.user.role === "admin") {
      return res
        .status(403)
        .json({ msg: "Forbidden: Insufficient permissions" });
    }
    req.user = decoded.user;
    next();
  } catch (err) {
    console.log("err", err);
    res.status(401).json({ msg: "Token is not valid" });
  }
};

module.exports = { auth, adminAuth };
