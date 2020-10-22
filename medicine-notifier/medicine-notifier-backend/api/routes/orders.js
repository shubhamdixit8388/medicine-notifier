const express = require('express');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const orderController = require('../controllers/orders');

router.get('/', checkAuth, orderController.get_all_orders);

router.get('/:id', checkAuth, orderController.get_order_details);

router.post('/', checkAuth, orderController.place_order);

router.delete('/:id', checkAuth, orderController.delete_order);

router.patch('/:id', checkAuth, orderController.update_order);

module.exports = router;