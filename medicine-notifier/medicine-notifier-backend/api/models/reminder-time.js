const mongoose = require('mongoose');

const ReminderTimeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true},
    medicineId: { type: String, required: true},
});
module.exports = mongoose.model('ReminderTime', ReminderTimeSchema);
