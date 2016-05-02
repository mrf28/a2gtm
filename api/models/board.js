var mongoose = require('mongoose');
console.log('inializing Schema');
var boardSchema = mongoose.Schema({
    title: String
});
console.log('exporting Schema');
module.exports = mongoose.model('Board', boardSchema);
console.log('exported Schema');
