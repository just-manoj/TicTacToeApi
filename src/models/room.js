const mongoose = require("mongoose");

const playerSchema = require("./player");

const roomSchema = new mongoose.Schema({
  occupancy: { type: Number, default: 2 },
  maxRounds: { type: Number, default: 6 },
  currentRound: { type: Number, default: 1 },
  roomName: { type: String, required: true, unique: true },
  players: [playerSchema],
  createdAt: { type: Date, default: Date.now },
  canJoin: { type: Boolean, default: true },
  turn: playerSchema,
  turnIndex: { type: Number, default: 0 },
});

module.exports = mongoose.model("Room", roomSchema);
