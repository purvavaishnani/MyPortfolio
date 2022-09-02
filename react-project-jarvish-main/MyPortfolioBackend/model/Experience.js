// load mongoose since we need it to define a model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
ExperienceSchema = new Schema({
    userId:String,
    jobtitle: String,
    company: String,
    jobstatus: String,
    startDate: String,
    endDate: String,
    description:String,
    location:String

});

module.exports = mongoose.model('Experience',ExperienceSchema);
