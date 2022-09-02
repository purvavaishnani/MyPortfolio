// load mongoose since we need it to define a model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
RecommendationSchema = new Schema({
    fullName: String,
    position: String,
    contactNo: String,
    emailId: String,
    messageContent: String,
    userId: String
});

module.exports = mongoose.model('Recommendation', RecommendationSchema);
