const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let reserveSchema = new Schema({
    startDate :{
        type : Date
    },
    endDate :{
        type : Date
    }
});
const reservationtime=mongoose.model('reservationtimes',reserveSchema);
module.exports= {reservationtime};