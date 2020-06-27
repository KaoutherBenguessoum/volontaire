
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser  = require('body-parser');
require('dotenv/config');
// middlewares
app.use(bodyParser.json());
// import routes
const searchRoute = require('./routes/searchVolunteer');
app.use('/searchVolunteers', searchRoute);

const reservedRoute = require('./routes/reservedVolunteers');
app.use('/reserved', reservedRoute);

const reservingRoute = require('./routes/reservingVolunteer');
app.use('/reserving', reservingRoute);
//connect to DB
mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true },
    ()=>console.log('connected to DB')
); 

//start listening to the server
app.listen(3000);