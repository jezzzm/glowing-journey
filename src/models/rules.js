const mongo = require('mongoose');
const Schema = mongo.Schema;

const ruleSchema = new Schema({
  name: String,
  description: String,
  value: Number
});

module.exports = mongo.model('Rule', ruleSchema);