const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
var mongoose = require('mongoose');

const productRoute = require('./api/routes/products');
const orderRoute = require('./api/routes/orders');
const userRoute = require('./api/routes/users');

mongoose.connect("mongodb+srv://shopping-cart:mongo@8388@shopping-cart-ap75k.mongodb.net/<dbname>?retryWrites=true&w=majority",{useNewUrlParser: true, useUnifiedTopology: true },function(error){
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

// app.use((req, res, next) => {
//    res.header("Acess-Control-Allow-Origin", "*");
//    res.header("Acess-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//    if(req.method == 'OPTIONS'){
//        req.header("Acess-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
//         res.status(200).json({});
//    }
//    next();
// });

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/products', productRoute);
app.use('/orders', orderRoute);
app.use('/users', userRoute);

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