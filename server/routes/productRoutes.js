// server/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');
const AdminController = require('../controllers/AdminController');

router.get('/', ProductController.getAllProducts);
router.get('/:id', ProductController.getProductById);
router.get('/category/:categoryId', ProductController.getProductsByCategory);
router.post('/', ProductController.createProduct);
router.put('/:id', AdminController.updateProduct); // Dòng 10
router.delete('/:id', ProductController.deleteProduct);

module.exports = router;