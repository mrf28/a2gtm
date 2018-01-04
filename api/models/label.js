var mongoose = require('mongoose');
mongoose.Promise = global.Promise;

var labelSchema = mongoose.Schema({
    label: String,
    color: String
});

module.exports = mongoose.model('Label', labelSchema);
