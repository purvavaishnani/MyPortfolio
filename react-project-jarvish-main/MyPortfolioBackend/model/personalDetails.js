// load mongoose since we need it to define a model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
PersonalDetailsSchema = new Schema({
    userId : String,
    displayName: String,
    about: String,
    jobTitle: String,
    profileImage: String
});
module.exports = mongoose.model('personalDetails', PersonalDetailsSchema);
