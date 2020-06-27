const express = require('express');
const searchRouter = express.Router();
const wilaya = require('../models/Wilaya').wilaya;
const establishment = require('../models/Establishment').establishment;
const volunteer = require('../models/Volunteer').volunteer;
const booking = require('../models/Booking').booking;
const constraint = require('../models/SearchConstraint').constraint;
const myvolunteer = require('../models/MyVolunteer').myvolunteer;

searchRouter.get('/',async(req,res)=>{
    try{
        const result = [ myvolunteer];
        result.splice(0,1);
        let searchconstraint = new constraint(req.body);
        //var startDate = searchconstraint.startDate;
        //var endDate = searchconstraint.endDate;
        const establishmentId = searchconstraint.establishmentId;
        const establishmentvar = await establishment.findById(establishmentId);
        const wilayaVolunteers = await volunteer.aggregate([
            {"$match": {"wilayaCode":establishmentvar.establishmentWilaya}}
            ]);    
        for(i=0;i<wilayaVolunteers.length;i++){
            let start = new constraint(req.body).startDate;;
            let end = new constraint(req.body).endDate;
        // console.log('ser',end);
            if(wilayaVolunteers[i].reservationTime.length==0){
                const element = new myvolunteer();
                element.volunteer= wilayaVolunteers[i];
                element.startDate=req.body.startDate;
                element.endDate= req.body.endDate;
                result.push(element);
               // console.log(element);
          //      console.log('i==',i,'result:',result);
                 //console.log(wilayaVolunteers[i]);
            }else{
                var startprim = new constraint(req.body).startDate;
                //var startprim = req.body.startDate;
                var endprim = new constraint(req.body).endDate;
                var toadd = true;
            //   console.log(startprim);
               //  console.log(endprim);
                for(j=0;j<wilayaVolunteers[i].reservationTime.length;j++){
                   // let reservationStart=wilayaVolunteers[i].reservationTime[j].startDate;
                    //let reservationEnd=wilayaVolunteers[i].reservationTime[j].endDate;
                  //  console.log(reservationStart);
                 // console.log(wilayaVolunteers[i]);
                    if(startprim<wilayaVolunteers[i].reservationTime[j].startDate){
                     //   console.log('here');
                        if(endprim>wilayaVolunteers[i].reservationTime[j].endDate
                         || (endprim<wilayaVolunteers[i].reservationTime[j].endDate && 
                            endprim>wilayaVolunteers[i].reservationTime[j].startDate)){ 
                           //endprim.setDate(wilayaVolunteers[i].reservationTime[j].startDate.getDate()-1);
                           endprim=wilayaVolunteers[i].reservationTime[j].startDate;
                           endprim.setDate(endprim.getDate()-1);
                      //     console.log('roba',endprim,'nrmlmnt',wilayaVolunteers[i].reservationTime[j].startDate.getDate()-1);
                        }
                      //  elseif(endprim<reservationStart)
                    }else{
                       // console.log('there  startprim', startprim,'start date',wilayaVolunteers[i].reservationTime[j].startDate);
                        if(startprim>wilayaVolunteers[i].reservationTime[j].startDate){
                          //  console.log('yogui')
                            if(endprim<wilayaVolunteers[i].reservationTime[j].endDate)toadd=false;
                            if(startprim<wilayaVolunteers[i].reservationTime[j].endDate){
                           //     console.log('ranma')
                                startprim.setDate(wilayaVolunteers[i].reservationTime[j].endDate.getDate()+1)
                            }
                           // if(startprim>reservationEnd)
                          // console.log('i==',i,'startprim',startprim);
                        }
                    }
                    if(start<startprim){
                    //    console.log('start',start);
                        start=startprim;
                    }
                    if(end>endprim){
                        end=endprim;
                    }
                }
                if(toadd==true){
                    const element = new myvolunteer();
                    element.volunteer= wilayaVolunteers[i];
                    element.startDate=start;
                    element.endDate= end;
                    result.push(element);


                }   
            }
            //console.log('i==',i,'result:',result);
        }   
      //  console.log(result);    
        res.json(result);
        //res.json(wilayaVolunteers);
    }catch(err){
        res.json({message : err});
    }
});

searchRouter.get('/wilaya', (req,res)=>{
    wilaya.find({},function(err, todos) {
        if (err) {
            console.log(err);
        } else {
            res.json(todos);
        }
    });
});
searchRouter.get('/wilaya/:id', async (req, res)=>{
    try{
        const wilayavar = await wilaya.findById(req.params.id);
        res.json(wilayavar);
    }catch(err){
        res.json({message : err});
    }
});
searchRouter.post('/wilaya', async (req,res) => { 
    
    let wilayavar = new wilaya(req.body);
    console.log(req.body);
    wilayavar.save()
        .then(wilaya => {
            res.status(201).send(wilayavar);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});



searchRouter.get('/establishment',(req,res)=>{
    establishment.find({},function(err, todos) {
        if (err) {
            console.log(err);
        } else {
            res.json(todos);
        }
    });
});

searchRouter.post('/establishment', async (req,res) => { 
    
    let establishmentvar = new establishment(req.body);
    console.log(req.body);
    establishmentvar.save()
        .then(establishment => {
            res.status(201).send(establishmentvar);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

searchRouter.get('/establishment/:id', async (req, res)=>{
    try{
        const varia = await establishment.findById(req.params.id);
        res.json(varia);
    }catch(err){
        res.json({message : err});
    }
});

searchRouter.get('/volunteer',(req,res)=>{
    volunteer.find({},function(err, todos) {
        if (err) {
            console.log(err);
        } else {
            res.json(todos);
        }
    });
});

searchRouter.post('/volunteer', async (req,res) => { 
    
    let volunteervar = new volunteer(req.body);
    console.log(req.body);
    volunteervar.save()
        .then(volunteer => {
            res.status(201).send(volunteervar);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});

searchRouter.delete('/volunteer', async (req,res) => { 
   try{
        const deletd = await volunteer.remove();
        res.json(deletd);
   }catch(err){
       res.json({message : err});
   }
});
searchRouter.delete('/booking', async (req,res) => { 
    try{
         const deletd = await booking.remove();
         res.json(deletd);
    }catch(err){
        res.json({message : err});
    }
 });
 searchRouter.delete('/booking/:id', async (req,res) => { 
    try{
         const deletd = await booking.remove({_id:req.params.id});
         res.json(deletd);
    }catch(err){
        res.json({message : err});
    }
 });
searchRouter.get('/booking',(req,res)=>{
    booking.find({},function(err, todos) {
        if (err) {
            console.log(err);
        } else {
            res.json(todos);
        }
    });
});

searchRouter.post('/booking', async (req,res) => { 
    
    let bookingvar = new  booking(req.body);
    console.log('yeogi',req.body);
    bookingvar.save()
        .then(booking => {
            res.status(201).send(bookingvar);
        })
        .catch(err => {
            res.status(400).send(err);
        });
});
module.exports = searchRouter;