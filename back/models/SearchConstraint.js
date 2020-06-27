const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let constraintSchema = new Schema({
    establishmentId:{
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "establishments"
    },
    startDate :{
        type : Date,
        required : true
    },
    endDate :{
        type : Date,
        required : true
    }
});
const constraint=mongoose.model('constraints',constraintSchema);
module.exports= {constraint};