const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let wilayaSchema = new Schema({
    wilayaCode:{
        type : Number,
        required : true,
        Unique : true
        },
        wilayaName:{
        type :String,
        required : true,
        Unique : true
        }
});
const wilaya=mongoose.model('wilayas',wilayaSchema);
module.exports= {wilaya};