const express = require("express");
const mongoose = require("mongoose");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");
const dotenv = require("dotenv");
const adminRoutes = require("./routes/adminRoute");
const authRoutes = require("./routes/authRoutes");
const path = require("path");
const cookieParser = require("cookie-parser");
const User = require("./models/userModel");

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: { origin: "http://localhost:3000", credentials: true },
});

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connected"))
  .catch((error) => console.error("Database error:", error));

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

let playerStats = {};

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("banana_click", async (userId) => {
    try {
      if (!playerStats[userId]) {
        const user = await User.findById(userId).select("username");
        if (user) {
          playerStats[userId] = { name: user.username, count: 0 };
        } else {
          console.error(`User with ID ${userId} not found.`);
          return;
        }
      }

      playerStats[userId].count++;
      console.log("Emitting updated player stats:", playerStats);
      io.emit("update_banana_counts", playerStats);
    } catch (error) {
      console.error("Error handling banana_click:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

// app.get("/", (req, res) => {
//   app.use(express.static(path.resolve(__dirname, "frontend", "build")));
//   res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
// });

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
