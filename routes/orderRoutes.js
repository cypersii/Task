const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Order routes
router.post('/products/:productId/orders', orderController.placeOrder);
router.delete('/orders/:orderId', orderController.cancelOrder);

module.exports = router;