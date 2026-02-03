// Order routes
const express = require('express');
const orderController = require('../controllers/order.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

// Protected routes
router.get('/', authMiddleware, orderController.getUserOrders);
router.post('/', authMiddleware, orderController.createOrder);
router.get('/:id', authMiddleware, orderController.getOrderById);

module.exports = router;
