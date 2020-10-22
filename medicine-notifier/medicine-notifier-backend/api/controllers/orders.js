const mongoose = require('mongoose');
const Order = require('../models/order');
const Product = require('../models/product');

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

exports.get_order_details = (req, res, next) => {
    var id = req.params.id;
    Order.findById({_id: id}).select('_id quantity').populate('product', '_id name').exec().then(result => {
        if(!result){
            return res.status(404).json({
                message: 'Order not found'
            });
        }
        res.status(200).json({
            message: 'Data fetched successfully!!!',
            order: result,
            request: {
                type: 'GET',
                url: 'localhost:3000/orders'
            }
        });
    }).catch(err => {
        res.status(500).json({
            message: 'Order Id not found'
        });
    });
};

exports.place_order = (req, res, next) => {
    Product.findById({_id: req.body.productId}).exec().then(product => {
        if(!product){
            return res.status(200).json({
                message: 'Product not found'
            });
        }
        const order = new Order({
            _id: mongoose.Types.ObjectId(),
            quantity: req.body.quantity,
            product: req.body.productId
        });
        return order.save();
    })
        .then(result => {
            console.log('jjjjjjjjjjjjjjjjjj');
            res.status(200).json({
                message: 'Data Saved',
                createdOrder: {
                    order_id: result._id,
                    product_id: result.product,
                    quantity: result.quantity
                },
                request: {
                    type: 'GET',
                    url: 'localhost:3000/orders' + result._id
                }
            });
        }).catch(err => {
        res.status(500).json({
            message: 'Failed to save data',
            error: err
        });
    });
};

exports.delete_order = (req, res, next) => {
    var id = req.params.id;
    Order.remove({_id: id}).exec().then(result => {
        res.status(200).json({
            message: 'Order Removed Successfully',
            result: result,
            request: {
                type: 'POST',
                url: 'localhost:3000/orders',
                format: {
                    productID: 'Product Id',
                    quantity: 'Number of Orders'
                }
            }
        });
    }).catch(err => {
        res.status(500).json({
            message: 'Order Id not found'
        });
    });
};

exports.update_order = (req, res, next) =>{
    const id = req.params.id;
    Order.update({_id: id}, {$set: {quantity: req.body.quantity, product: req.body.productId}}).then(result =>{
        res.status(200).json({
            message: 'Data Uploaded',
            result: result
        });
    }).catch(err => {
        res.status(500).json({
            message: 'Failed to upload data',
            error: err
        });
    });
}