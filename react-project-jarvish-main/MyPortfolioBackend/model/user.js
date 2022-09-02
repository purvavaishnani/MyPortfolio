// load mongoose since we need it to define a model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
UserSchema = new Schema({
    firstName : String,
    lastName : String,
    email : String,
    password : String,
    token : String
});
module.exports = mongoose.model('User', UserSchema);
