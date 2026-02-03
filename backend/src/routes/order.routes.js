// Order routes (to be implemented)
const express = require('express');
const orderController = require('../controllers/order.controller');

const router = express.Router();

// User order routes
router.get('/', orderController.getUserOrders);
router.post('/', orderController.createOrder);
router.get('/:id', orderController.getOrderDetails);

module.exports = router;
