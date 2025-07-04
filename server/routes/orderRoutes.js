// server/routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const OrderController = require('../controllers/OrderController');

router.get('/', OrderController.getAllOrders);
router.get('/:id', OrderController.getOrderById);
router.get('/user/:userId', OrderController.getOrdersByUser);
router.post('/', OrderController.createOrder);
router.put('/:id', OrderController.updateOrder);
router.delete('/:id', OrderController.deleteOrder);

module.exports = router;