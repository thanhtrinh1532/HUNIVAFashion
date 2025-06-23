// server/controllers/OrderController.js
const Order = require('../models/Order');
const OrderItem = require('../models/OrderDetail');

const OrderController = {
  // Lấy tất cả đơn hàng
  getAllOrders: async (req, res) => {
    try {
      const orders = await Order.getAll();
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching orders', details: error.message });
    }
  },

  // Lấy đơn hàng theo ID
  getOrderById: async (req, res) => {
    try {
      const order = await Order.getById(req.params.id);
      if (!order) {
        return res.status(404).json({ error: 'Order not found' });
      }
      const items = await OrderItem.getByOrderId(order.id);
      res.status(200).json({ ...order, items });
    } catch (error) {
      res.status(500).json({ error: 'Error fetching order', details: error.message });
    }
  },

  // Lấy đơn hàng theo user_id
  getOrdersByUser: async (req, res) => {
    try {
      const orders = await Order.getByUserId(req.params.userId);
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching orders by user', details: error.message });
    }
  },

  // Tạo đơn hàng mới
  createOrder: async (req, res) => {
    try {
      const { code, status, user_id, items } = req.body;
      if (!user_id || !items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ error: 'User ID and items array are required' });
      }
      const newOrder = await Order.create(code || `ORD-${Date.now()}`, status || 'pending', user_id);
      for (const item of items) {
        await OrderItem.create(newOrder.id, item.product_id, item.quantity, item.price);
      }
      const createdOrder = await Order.getById(newOrder.id);
      const orderItems = await OrderItem.getByOrderId(newOrder.id);
      res.status(201).json({ ...createdOrder, items: orderItems });
    } catch (error) {
      res.status(500).json({ error: 'Error creating order', details: error.message });
    }
  },

  // Cập nhật đơn hàng
  updateOrder: async (req, res) => {
    try {
      const { code, status } = req.body;
      const success = await Order.update(req.params.id, code, status);
      if (!success) {
        return res.status(404).json({ error: 'Order not found' });
      }
      res.status(200).json({ message: 'Order updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error updating order', details: error.message });
    }
  },

  // Xóa đơn hàng
  deleteOrder: async (req, res) => {
    try {
      await OrderItem.deleteByOrderId(req.params.id);
      const success = await Order.delete(req.params.id);
      if (!success) {
        return res.status(404).json({ error: 'Order not found' });
      }
      res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting order', details: error.message });
    }
  },
};

module.exports = OrderController;