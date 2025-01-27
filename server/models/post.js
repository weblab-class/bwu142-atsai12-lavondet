const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  id: String,
  lat: Number,
  lng: Number,
  name: String,
  major: String,
  info: String,
});

// compile model from schema
module.exports = mongoose.model("post", PostSchema);
