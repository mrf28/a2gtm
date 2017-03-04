var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var cardSchema = mongoose.Schema({
    title: String,
    columnId: String,
    boardId: String,
    order: Number
});

module.exports = mongoose.model('Card', cardSchema);
