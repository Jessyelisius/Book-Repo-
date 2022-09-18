const mongoose = require ('mongoose');

const Schema = mongoose.Schema;
const user = new Schema({
    User_name:String,
    Password:String,
    
})

module.exports= mongoose.model('user',user)