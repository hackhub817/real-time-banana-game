const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.registerUser = async (req, res) => {
  const { username, email, password, role } = req.body;
  console.log("body", req.body);

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser)
      return res.status(200).json({ error: "Username already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password: hashedPassword,
      email,
      role,
    });
    console.log("ser", newUser);
    await newUser.save();

    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(email);
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(400).json({ error: "Invalid password" });

    const token = jwt.sign(
      { user: { id: user._id, role: user.role, name: user.username } },
      process.env.JWT_SECRET,
      {
        expiresIn: "12h",
      }
    );
    res.cookie("jwt", token, {
      httpOnly: false,
      secure: false,
      sameSite: "lax",
      path: "/",
    });
    res.json({ token, user: user });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.logout = async (req, res) => {
  if (!req.cookies.jwt) {
    res.status(200).json({ message: "User not autenticated" });
  }
  try {
    res.clearCookie("jwt");
    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal Server error" });
  }
};
