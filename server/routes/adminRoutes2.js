// server/routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/AdminController');

router.get('/users', AdminController.getAllUsers);
router.get('/orders', AdminController.getAllOrders);
router.get('/products', AdminController.getAllProducts);
router.put('/users/:id', AdminController.updateUser);
router.put('/orders/:id', AdminController.updateOrder);
router.put('/products/:id', AdminController.updateProduct);
router.post('/products', AdminController.createProduct);
router.delete('/users/:id', AdminController.deleteUser);
router.delete('/orders/:id', AdminController.deleteOrder);
router.delete('/products/:id', AdminController.deleteProduct);

module.exports = router;