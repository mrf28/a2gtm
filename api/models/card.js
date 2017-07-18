var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var checklistSchema = mongoose.Schema({
    title: String,
    description: String,
    done: Boolean
});

var cardSchema = mongoose.Schema({
    title: String,
    columnId: String,
    boardId: String,
    order: Number,
    description: String,
    labels: [{type: mongoose.Schema.Types.ObjectId, ref: 'Label' }],
    checklists: [checklistSchema]
});

module.exports = mongoose.model('Card', cardSchema);
