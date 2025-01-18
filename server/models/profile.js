const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  name: String,
  major: String,
  pfp: String,
});

// compile model from schema
module.exports = mongoose.model("profile", ProfileSchema);
