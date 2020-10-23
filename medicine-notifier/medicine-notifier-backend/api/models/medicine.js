const mongoose = require('mongoose');

const medicineSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true},
    description: { type: String, required: true},
    startDate: {type: Date, required: false},
    endDate: {type: Date, required: false},
    shapeImgUrl: { type: String, required: true},
    isActive: { type: Boolean, required: true},
    status: { type: String, required: true},
});
module.exports = mongoose.model('Medicine', medicineSchema);
