const mongoose = require('mongoose');
const Medicine = require('../models/medicine');

exports.get_all_medicines_reminder = (req, res, next) => {
    Medicine.find().then(result => {
        res.status(200).json({
            message: "All data Fetched",
            count: result.length,
            result: result
        });
    }).catch(err => {
        res.status(500).json({
            message: 'Data fetch failed',
            error: err
        })
    });
};
exports.add_reminder = (req, res, next) => {
    const medicine = new Medicine({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        description: req.body.description,
        date: req.body.date,
        time: req.body.time,
        shapeImgUrl: req.body.shapeImgUrl,
        isActive: req.body.isActive,
        status: req.body.status,
    });
    medicine.save().then(result => {
        res.status(200).json({
            message: 'Data Saved',
            request: {
                type: 'GET',
                url: 'localhost:3000/medicine' + result._id
            }
        });
    }).catch(err => {
        res.status(500).json({
            message: 'Failed to save data',
            error: err
        });
    });
};
