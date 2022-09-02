// load mongoose since we need it to define a model
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
ContactSchema = new Schema({
    userId:String,
    email : String,
    linkID : String,
    gitHubID : String,
    phone: String,
        
    
});
module.exports = mongoose.model('Contact', ContactSchema);
