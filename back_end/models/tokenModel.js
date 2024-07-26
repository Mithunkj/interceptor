const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
  userId: { type: String },
  token: { type: String },
});

module.exports = mongoose.model("Token", tokenSchema);
