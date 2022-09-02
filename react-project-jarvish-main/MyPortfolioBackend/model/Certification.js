// load mongoose since we need it to define a model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
CertificationSchema = new Schema({
    certificationName: String,
    organizationName: String,
    startDate: Date,
    endDate: Date,
    description: String,
    userId: String
});

module.exports = mongoose.model('Certification', CertificationSchema);
