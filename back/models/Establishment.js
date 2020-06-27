const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let establishmentSchema = new Schema({
    establishmentName:{
        type :String,
        required : true,
    },
    establishmentWilaya:{
        type : Number,
        required : true
    },
    establishmentAddress:{
        type :String,
        required : true
    },
    establishmentType:{
        type :String,
        enum : ["HOPITAL", "LABORATOIRE"],
        required : true
    }
});
const establishment=mongoose.model('establishments',establishmentSchema);
module.exports= {establishment};