const mongoose = require('mongoose');
const Order = require('../models/order');
const Medicine = require('../models/medicine');

exports.get_all_orders = (req, res, next) => {
    Order.find().select('_id quantity product').populate('product', '_id name').exec().then(result => {
        res.status(200).json({
            message: "All data Fetched",
            count: result.length,
            orders: result.map(doc => {
                return {
                    _id: doc._id,
                    quantity: doc.quantity,
                    product: doc.product,
                    result: {
                        type: 'GET',
                        url : 'localhost:3000/orders/' + doc._id
                    }
                }
            })
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
        startDate: req.body.startDate,
        endDate: req.body.endDate,
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
