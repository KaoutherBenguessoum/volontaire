const mongoose = require('mongoose');
const Schema = mongoose.Schema;
volunteers = require('./Volunteer'); //proper path here
const volunteerSchema = mongoose.model('volunteers').schema;
let myvolunteerSchema = new Schema({
    volunteer:{
        type: volunteerSchema,
        ref :'volunteers'
    },
    startDate:{type: Date},
    endDate: {type: Date}
});
const myvolunteer=mongoose.model('myvolunteers',myvolunteerSchema);
module.exports= {myvolunteer};