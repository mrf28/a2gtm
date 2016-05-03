var mongoose = require('mongoose');

var columnSchema = mongoose.Schema({
  title: String,
  boardId: String,
  order: Number
});

module.exports = mongoose.model('Column', columnSchema);