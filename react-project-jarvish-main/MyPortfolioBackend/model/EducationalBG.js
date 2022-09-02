var mongoose = require('mongoose');
var Schema = mongoose.Schema;
EducationalSchema = new Schema({
    school: String,
    college: String,
    master: String,
    course: String,
    masterCourse: String,
    additional: String,
    userId: String
});

module.exports = mongoose.model('EducationalBG', EducationalSchema);