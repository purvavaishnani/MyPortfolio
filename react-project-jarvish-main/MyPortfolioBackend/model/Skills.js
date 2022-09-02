// load mongoose since we need it to define a model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
SkillSchema = new Schema({ 
    userId:String,
    SkillName: String,
});

module.exports = mongoose.model('Skills', SkillSchema);
