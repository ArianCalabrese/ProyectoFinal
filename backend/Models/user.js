const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 8 },
  member_since: { type: String },
  es_transportista: { type: Boolean, require: true },
  patente: { type: String },
  tipo_vehiculo: { type: String },
  marca: { type: String },
  modelo: { type: String },
  dias_habiles: { type: Array },
  horarios_habiles: { type: Array },
  posts: [{ type: mongoose.Types.ObjectId, required: true, ref: "Post" }],
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
