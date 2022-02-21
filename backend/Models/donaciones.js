const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const donacionesSchema = new Schema({
  state: { type: String, default: "En espera" },
  post_name: { type: String, required: true },
  post: { type: mongoose.Types.ObjectId, required: true, ref: "Post" },
  post_creator_id: { type: String, required: true },
  donator: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
  items: { type: Array, default: [] },
});

module.exports = mongoose.model("Donation", donacionesSchema);
