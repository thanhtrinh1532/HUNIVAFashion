// server/routes/cartRoutes.js
const express = require('express');
const router = express.Router();
const CartController = require('../controllers/CartController');

router.get('/:userId', CartController.getCart);
router.post('/', CartController.addToCart);
router.put('/:id', CartController.updateCartItem);
router.delete('/:id', CartController.removeFromCart);
router.delete('/user/:userId', CartController.clearCart);

module.exports = router;