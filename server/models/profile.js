const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  id: String,
  name: String,
  major: String,
  kerb: String,
  pfp: String,
  friends: [String],
  incoming: [String],
  sent: [String]
});

// compile model from schema
module.exports = mongoose.model("profile", ProfileSchema);
