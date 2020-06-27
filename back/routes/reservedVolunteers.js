const express = require('express');
const reservedRouter = express.Router();
const establishment = require('../models/Establishment').establishment;
//const volunteer = require('../models/Volunteer').volunteer;
const booking = require('../models/Booking').booking;
reservedRouter.get('/:establishmentId', async(req,res)=>{
  
    try{
         const establishmentvar = await establishment.findById(req.params.establishmentId);
          const reservedVolunteers = await booking.aggregate([
          {"$match": {"establishmentId":establishmentvar._id}},
              { "$lookup": {
                  "localField": "volunteerId",
                  "from": "volunteers",
                  "foreignField": "_id",
                  "as": "myreservedvolunteers"
              } },
              { "$unwind": "$myreservedvolunteers" },
          ]);
          console.log(reservedVolunteers[0], ' ,', reservedVolunteers.length );
          res.json(reservedVolunteers);
        }catch(err){
        res.json({message : err});
    }
});

module.exports = reservedRouter;