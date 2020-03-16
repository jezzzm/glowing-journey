const mongo = require('mongoose');
const Schema = mongo.Schema;

const offenseSchema = new Schema({
  ruleId: String,
  playerId: String,
  comment: String,
});

module.exports = mongo.model('Offense', offenseSchema);