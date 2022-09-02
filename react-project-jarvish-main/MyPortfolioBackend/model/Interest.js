var mongoose = require('mongoose');
var Schema = mongoose.Schema;

InterestSchema = new Schema({
    interest : String,
    userId : String
})

module.exports = mongoose.model('Interest', InterestSchema);