const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const AdminController = require('../controllers/AdminController');

// ✅ Middleware đơn giản tạm thời cho phép truy cập
const verifyAdmin = (req, res, next) => {
  // ⚠️ Đây là bản tạm thời để test - KHÔNG dùng cho production
  console.log('Tạm thời cho phép tất cả request vào admin routes');
  next();
};

// 📦 Route quản lý người dùng
router.get('/users', verifyAdmin, AdminController.getAllUsers);
// router.put('/users/:id', verifyAdmin, AdminController.updateUser);
router.delete('/users/:id', verifyAdmin, AdminController.deleteUser);

// 📦 Route quản lý đơn hàng
router.get('/orders', verifyAdmin, AdminController.getAllOrders);
router.put('/orders/:id', verifyAdmin, AdminController.updateOrder);
router.delete('/orders/:id', verifyAdmin, AdminController.deleteOrder);

// 📦 Route quản lý sản phẩm
router.get('/products', verifyAdmin, AdminController.getAllProducts);
router.post('/products', verifyAdmin, AdminController.createProduct);
router.put('/products/:id', verifyAdmin, AdminController.updateProduct);
router.delete('/products/:id', verifyAdmin, AdminController.deleteProduct);

module.exports = router;
