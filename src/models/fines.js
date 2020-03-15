const mongo = require('mongoose');
const Schema = mongo.Schema;

const fineSchema = new Schema({
  name: String,
  description: String,
  value: Number
});

module.exports = mongo.model('Fine', fineSchema);