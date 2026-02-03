// Product routes
const express = require('express');
const productController = require('../controllers/product.controller');

const router = express.Router();

// Public routes
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);

// Admin routes (to be protected)
router.post('/', productController.createProduct);

module.exports = router;
