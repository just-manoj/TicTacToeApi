const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  username: { type: String, required: true },
  socketId: { type: String, required: true },
  symbol: { type: String, enum: ["X", "O"], required: true },
  score: { type: Number, default: 0 },
});

// module.exports = mongoose.model("Player", playerSchema);
module.exports = playerSchema;
