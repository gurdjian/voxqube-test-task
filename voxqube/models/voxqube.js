const mongoose = require("mongoose");

const voxqubeSchema = new mongoose.Schema({
  id: String,
  name: String,
  sex: String,
  language: String,
  providerLanguage: String,
  provider: String,
  flags: [String],
});

const Voxqube = mongoose.model('Voxqube', voxqubeSchema);

module.exports = Voxqube;
