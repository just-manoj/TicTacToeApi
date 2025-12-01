const http = require("http");
const express = require("express");
const mongoose = require("mongoose");

const RoomSchema = require("./src/models/room");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);

const io = require("socket.io")(server);

app.use(express.json());

io.on("connection", async (socket) => {
  console.log("a user connected:", socket.id);
  socket.on("createRoom", async ({ roomName }) => {
    const roomSchema = new RoomSchema();
    roomSchema.roomName = roomName;
    roomSchema.players.push({
      socketId: socket.id,
      username: "Host",
      symbol: "X",
    });
    roomSchema.turn = { socketId: socket.id, username: "Host", symbol: "X" };
    const room = await roomSchema.save();
    socket.join(room._id.toString());
    socket.emit("createRoomSuccess", room);
  });
});

mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

server.listen(port, "0.0.0.0", () => {
  console.log("server start and listen from ", port);
});
