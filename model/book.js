const mongoose=require('mongoose');

const Schema = mongoose.Schema;

const book = new Schema({
    Title:String,
    Author:String,
    Descrption:String,
    Book_link:String,
    Date:String,
    publicID:String,
})

module.exports = mongoose.model('book',book)