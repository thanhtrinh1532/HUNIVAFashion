const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');
const OrderItem = require('../models/OrderDetail');
const bcrypt = require('bcrypt');

const AdminController = {
  // Lấy tất cả người dùng
  getAllUsers: async (req, res) => {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching users', details: error.message });
    }
  },

  // Lấy tất cả đơn hàng
  getAllOrders: async (req, res) => {
    try {
      const orders = await Order.findAll({
        include: [{ model: OrderItem }] // Lấy chi tiết đơn hàng nếu cần
      });
      res.status(200).json(orders);
    } catch (error) {
      res.status(500).json({ error: 'Lỗi check order', details: error.message });
    }
  },

  // Lấy tất cả sản phẩm
  getAllProducts: async (req, res) => {
    try {
      const products = await Product.findAll();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching products', details: error.message });
    }
  },

  // Thêm sản phẩm mới
  createProduct: async (req, res) => {
    try {
      const { name, description, thumbnail, price, quantity, category_id, view } = req.body;

      // Kiểm tra các trường bắt buộc
      if (!name || !price || !quantity || !category_id) {
        return res.status(400).json({ error: 'Missing required fields' });
      }

      // Tạo sản phẩm mới
      const newProduct = await Product.create({
        name,
        description,
        thumbnail,
        price: parseFloat(price),
        quantity: parseInt(quantity),
        category_id: parseInt(category_id),
        view: view ? parseInt(view) : 0
      });

      res.status(201).json({ message: 'Product created successfully', product: newProduct });
    } catch (error) {
      res.status(500).json({ error: 'Error creating product', details: error.message });
    }
  },

  // Cập nhật người dùng
  updateUser: async (req, res) => {
    try {
      const { id } = req.params;
      const { email, password, role } = req.body;
      const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

      const [affectedRows] = await User.update(
        { email, password: hashedPassword, role },
        { where: { id: parseInt(id) } }
      );

      if (affectedRows === 0) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error updating user', details: error.message });
    }
  },

  // Cập nhật đơn hàng
  updateOrder: async (req, res) => {
    try {
      const { id } = req.params;
      const { code, status } = req.body;

      const [affectedRows] = await Order.update(
        { code, status },
        { where: { id: parseInt(id) } }
      );

      if (affectedRows === 0) {
        return res.status(404).json({ error: 'Order not found' });
      }

      res.status(200).json({ message: 'Order updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error updating order', details: error.message });
    }
  },

  // Cập nhật sản phẩm
  updateProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, description, thumbnail, price, quantity, category_id, view } = req.body;

      // Kiểm tra nếu ID không được cung cấp
      if (!id || isNaN(id)) {
        return res.status(400).json({ error: 'Valid product ID is required' });
      }

      // Kiểm tra các trường bắt buộc
      if (!name || !price || !category_id) {
        return res.status(400).json({ error: 'Name, price, and category_id are required' });
      }

      const [affectedRows] = await Product.update(
        {
          name,
          description,
          thumbnail,
          price: parseFloat(price),
          quantity: parseInt(quantity),
          category_id: parseInt(category_id),
          view: view ? parseInt(view) : undefined
        },
        { where: { id: parseInt(id) } }
      );

      if (affectedRows === 0) {
        return res.status(404).json({ error: 'Product not found' });
      }

      res.status(200).json({ message: 'Product updated successfully' });
    } catch (error) {
      console.error('Error updating product:', error);
      res.status(500).json({ error: 'Error updating product', details: error.message });
    }
  },

  // Xóa người dùng
  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      const affectedRows = await User.destroy({ where: { id: parseInt(id) } });

      if (affectedRows === 0) {
        return res.status(404).json({ error: 'User not found' });
      }

      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting user', details: error.message });
    }
  },

  // Xóa đơn hàng
  deleteOrder: async (req, res) => {
    try {
      const { id } = req.params;
      await OrderItem.destroy({ where: { order_id: parseInt(id) } });
      const affectedRows = await Order.destroy({ where: { id: parseInt(id) } });

      if (affectedRows === 0) {
        return res.status(404).json({ error: 'Order not found' });
      }

      res.status(200).json({ message: 'Order deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting order', details: error.message });
    }
  },

  // Xóa sản phẩm
  deleteProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const affectedRows = await Product.destroy({ where: { id: parseInt(id) } });

      if (affectedRows === 0) {
        return res.status(404).json({ error: 'Product not found' });
      }

      res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting product', details: error.message });
    }
  },
};

module.exports = AdminController;