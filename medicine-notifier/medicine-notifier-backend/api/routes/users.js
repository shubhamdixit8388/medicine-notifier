const express = require('express');
const router = express.Router();
const User = require('../models/user');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/check-auth');

router.get('/get-signup', checkAuth, (req, res, next) => {
   User.find().select('_id email password').exec().then(users => {
       res.status(200).json({
           message: 'All Data Fetched',
           all_users: users
       });
   })
});

router.post('/signup', (req, res, next) => {
    User.find({email: req.body.email}).exec().then(result => {
        if(result.length >= 1){
            return res.status(409).json({
                message: 'Email already exists'
            });
        }
        else{
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if(err){
                    res.status(500).json({
                        message: 'Failed to Sign Up',
                        error: err
                    });
                }
                else {
                    const user = new User({
                        _id: mongoose.Types.ObjectId(),
                        username: req.body.username,
                        email: req.body.email,
                        password: hash
                    });
                    user.save().then(user => {
                        res.status(200).json({
                            message: 'Sign Up Successfully',
                        });
                    }).catch(err => {
                        res.status(500).json({
                            message: 'Failed to Sign Up',
                            error: err
                        });
                    });
                }
            });
        }
    })

});

router.post('/login', (req, res, next) => {
   User.findOne({username: req.body.username}).exec().then(result => {
       if(!result){
           return res.status(401).json({
               message: 'Authentcation failed'
           });
       }
       bcrypt.compare(req.body.password, result.password, (err, result) => {
           if(err){
               return res.status(401).json({
                   message: 'Authentcation failed'
               });
           }
           if(result){
               const token = jwt.sign({
                   email: result.email,
                   userId: result._id
               }, 'secret-key',{
                   expiresIn: '1h'
               });
               // secret key should be added to environment variable
               return res.status(200).json({
                   message: 'Authentcation Successful',
                   token: token
               });
           }
           return res.status(401).json({
               message: 'Authentcation failed'
           });
       });
   }) ;
});

module.exports = router;