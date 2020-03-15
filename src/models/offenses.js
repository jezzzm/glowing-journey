const mongo = require('mongoose');
const Schema = mongo.Schema;

const offenseSchema = new Schema({
  name: String,
  rating: Number
});

module.exports = mongo.model('Offense', offenseSchema);