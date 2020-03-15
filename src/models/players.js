const mongo = require('mongoose');
const Schema = mongo.Schema;

const playerSchema = new Schema({
  name: String,
});

module.exports = mongo.model('Player', playerSchema);