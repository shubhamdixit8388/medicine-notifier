const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const medicineController = require('../controllers/medicine');

router.post('/add-reminder', checkAuth,  medicineController.add_reminder);

module.exports = router;
