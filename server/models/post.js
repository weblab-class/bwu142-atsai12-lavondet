const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  name: String,
  major: String,
  note: String,
});

// compile model from schema
module.exports = mongoose.model("post", PostSchema);
