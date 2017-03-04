var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var columnSchema = mongoose.Schema({
  title: String,
  boardId: String,
  order: Number
});

module.exports = mongoose.model('Column', columnSchema);