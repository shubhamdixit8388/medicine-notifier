const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
let mongoose = require('mongoose');

const userRoute = require('./api/routes/users');
const medicineRoute = require('./api/routes/medicine');

mongoose.connect("mongodb+srv://shubham:shubham8388@medicine-notifier.vv6ed.mongodb.net/<dbname>?" +
    "retryWrites=true&w=majority",{useNewUrlParser: true, useUnifiedTopology: true },function(error){
    if(error){
        console.log("error: "+error);
    } else{ 
        console.log('Connection Successful');
    }
});

app.use(morgan('dev'));
app.use('/Uploaded-Docs', express.static('Uploaded-Docs'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.use('/users', userRoute);
app.use('/medicine', medicineRoute);

app.use((req, res, next)=>{
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;
