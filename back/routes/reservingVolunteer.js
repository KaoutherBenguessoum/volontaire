const express = require('express');
const reservingRouter = express.Router();
const establishment = require('../models/Establishment').establishment;
const volunteer = require('../models/Volunteer').volunteer;
const booking = require('../models/Booking').booking;
const reservationtime = require('../models/reservationTime').reservationtime;
reservingRouter.post('/', async (req,res) => { 
    //add the date to volunteer
    let bookingvar = new  booking(req.body);
    const timeR = new reservationtime();
    timeR.startDate= bookingvar.startDate;
    timeR.endDate = bookingvar.endDate;
    console.log(timeR);
    const getreservationTime = await volunteer.findById(bookingvar.volunteerId);
    var reservation=getreservationTime.reservationTime;
    reservation.push(timeR);
    console.log(reservation);
    const updatedVolunteer = await volunteer.updateOne(
        {_id:bookingvar.volunteerId},
        {$set:{reservationTime: reservation}});
    bookingvar.save()
        .then(booking => {
            res.status(201).send(bookingvar);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

module.exports = reservingRouter;