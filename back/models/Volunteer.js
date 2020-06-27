const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let volunteerSchema = new Schema({
    volunteerFirstName:{
        type :String,
        required : true,
    },
    volunteerLastName:{
        type :String,
        required : true,
    },
    gender :{
        type : String,
        enum : ["HOMME", "FEMME"]
    },
    wilayaCode :{
        type : Number,
        required : true
    },
    jobType :{
        type : String,
        enum : ["MEDECIN", "INFIRMIER"],
        required : true
    },
    volunteerSequencialNumber:{
        type : String,
        required : true
    },
    volunteerEmail:{
        type : String
    },
    volunteerPhone:{
        type : String,
        required : true
    },
    volunteerAddress:{
        type :String,
        required : true
    },
    passWord:{
        type :String,
        required : true
    },
    reservationTime :{
        type : [{
            startDate:{type:Date}, 
            endDate:{type: Date}
        }],
        default : null
    }
});
const volunteer=mongoose.model('volunteers',volunteerSchema);
module.exports= {volunteer};