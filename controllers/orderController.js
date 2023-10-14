const Product = require('../models/product');
const Order = require('../models/order');
const mongoose = require('mongoose');

// Place an order for a product
exports.placeOrder = async (req, res) => {
  try {
    const productId = req.params.productId;
    const quantity = req.body.quantity;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    if (product.stock < quantity) {
      return res.status(400).json({ error: 'Product not available in the requested quantity' });
    }

    // Create a new order
    const order = new Order({
      productId: product._id,
      quantity,
    });

    // Update product stock and save it
    product.stock -= quantity;
    await product.save();

    // Save the order
    await order.save();

    res.status(201).json({ message: 'Order placed successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Cancel an order for a product and restore stock
exports.cancelOrder = async (req, res) => {
  try {
    const orderId = req.params.orderId;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const product = await Product.findById(order.productId);

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Restore product stock and save it
    product.stock += order.quantity;
    await product.save();

    // Remove the order
    await Order.findByIdAndDelete(
        orderId
    );

    res.json({ message: 'Order canceled successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
