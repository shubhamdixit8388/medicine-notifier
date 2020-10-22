const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const mongoose = require('mongoose');
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './Uploaded-Docs/');
    },
    filename: function (req, file, callback) {
        callback(null, new Date().toISOString().replace(/[\/\\:]/g, "_") + '_' + file.originalname);
    }
});
// const fileFilter = (req, file, cb) => {
//     if(file.mimetype === 'image/svg' || file.mimetype === 'image/png'){
//         cb(null, true);
//     } else{
//         cb(null, false)
//     }
// };

const upload = multer({storage: storage, limits: {
    fileSize: 1024 * 1024 * 5
    }
});

router.get('/', checkAuth, (req, res, next) => {
    Product.find().select('name price _id productImage')
    .exec()
    .then(doc => {
        console.log(doc);
        res.status(200).json({
            count: doc.length,
            result: doc.map(doc => {
                return {
                    name: doc.name,
                    price: doc.price,
                    _id: doc._id,
                    productImage: doc.productImage,
                    request: {
                        type: "GET",
                        url: 'localhost:3000/products/' + doc._id
                    }
                }
            })
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
});

router.get('/:productId', checkAuth, (req, res, next) => {
    var id = req.params.productId;
    Product.findById(id)
        .select('name price _id productImage')
        .exec()
        .then(doc => {
            console.log(doc);
            res.status(200).json(doc);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
    });
});

router.post('/', checkAuth, upload.single('productImage'), (req, res, next) => {
    console.log('File: ', req.file, req.file.originalname);
    const product = new Product({
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        price: req.body.price,
        productImage: req.file.path
    });
    product.save().then(result => {
        console.log(result);
        res.status(200).json({
            messgae: 'Data saved',
            product: product
        });
    }).catch(err => {
        console.log(err);
    });
});

router.delete('/:id', checkAuth, (req, res, next) => {
    const id = req.params.id;
    Product.remove({_id: id}).exec().then(result => {
        if(result.deletedCount > 0){
            res.status(200).json({
                message: 'Data Deleted',
                result: result
            });
        }
        else{
            res.status(200).json({
                message: 'No data found with this ID'
            });
        }
    }).catch(err => {
        res.status(500).json({
            error: err
        });
    });
});

router.patch('/:id', checkAuth, (req, res, next) => {
    const id = req.params.id;
    // Product.update({_id: id}, {$set: {name: req.body.name, price: req.body.price}}).exec().then(result => {
    const updateOps = {};
    for (const ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Product.update({_id: id}, {$set: updateOps}).exec().then(result => {
        res.status(200).json({
            message: 'Data updated',
            result: result
        });
    }).catch(err => {
        res.status(500).json({
            error: err
        });
    });
});

module.exports = router;