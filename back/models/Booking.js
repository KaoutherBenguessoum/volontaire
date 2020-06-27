const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let bookingSchema = new Schema({
    establishmentId:{
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "establishments"
    },
    volunteerId:{
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "volunteers"
    },
    startDate :{
        type : Date,
        required : true
    },
    endDate :{
        type : Date,
        required : true
    },
    volunteerResponse :{
        type : String,
        enum : ["Confirmée", "Refusée", "Non traitée"]
    },
    establishmentResponse :{
        type : String,
        enum : ["Réservée", "Annulée","Non traité"]
    }
});
const booking=mongoose.model('bookings',bookingSchema);
module.exports= {booking};