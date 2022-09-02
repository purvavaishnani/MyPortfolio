// load mongoose since we need it to define a model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
ProjectWorkSchema = new Schema({
   userId:String,
   proName : String,
   proDesc: String,
   tech:String,
   gitHubLink : String,
   webLink: String,
        
    
});
module.exports = mongoose.model('ProjectWork', ProjectWorkSchema);

