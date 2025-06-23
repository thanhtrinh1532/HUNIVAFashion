// server/controllers/CartController.js
const Cart = require('../models/Cart');

const CartController = {
  // Lấy giỏ hàng của người dùng
  getCart: async (req, res) => {
    try {
      const cartItems = await Cart.getByUserId(req.params.userId);
      res.status(200).json(cartItems);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching cart', details: error.message });
    }
  },

  // Thêm sản phẩm vào giỏ hàng
  addToCart: async (req, res) => {
    try {
      const { user_id, product_id, quantity } = req.body;
      if (!user_id || !product_id || !quantity) {
        return res.status(400).json({ error: 'User ID, product ID, and quantity are required' });
      }
      const cartItem = await Cart.addItem(user_id, product_id, quantity);
      res.status(201).json(cartItem);
    } catch (error) {
      res.status(500).json({ error: 'Error adding to cart', details: error.message });
    }
  },

  // Cập nhật số lượng sản phẩm trong giỏ hàng
  updateCartItem: async (req, res) => {
    try {
      const { quantity } = req.body;
      if (!quantity) {
        return res.status(400).json({ error: 'Quantity is required' });
      }
      const success = await Cart.updateItem(req.params.id, quantity);
      if (!success) {
        return res.status(404).json({ error: 'Cart item not found' });
      }
      res.status(200).json({ message: 'Cart item updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error updating cart item', details: error.message });
    }
  },

  // Xóa sản phẩm khỏi giỏ hàng
  removeFromCart: async (req, res) => {
    try {
      const success = await Cart.removeItem(req.params.id);
      if (!success) {
        return res.status(404).json({ error: 'Cart item not found' });
      }
      res.status(200).json({ message: 'Cart item removed successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error removing from cart', details: error.message });
    }
  },

  // Xóa toàn bộ giỏ hàng của người dùng
  clearCart: async (req, res) => {
    try {
      const success = await Cart.clear(req.params.userId);
      if (!success) {
        return res.status(404).json({ error: 'Cart not found or already empty' });
      }
      res.status(200).json({ message: 'Cart cleared successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error clearing cart', details: error.message });
    }
  },
};

module.exports = CartController;