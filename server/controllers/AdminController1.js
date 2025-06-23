// server/controllers/AdminController.js
const bcrypt = require('bcrypt');
const { User, Product, Category, Order, OrderItem } = require('../models');

const AdminController = {
  // Middleware kiểm tra quyền admin (giả định req.user từ JWT)
  isAdmin: async (req, res, next) => {
    try {
      const user = await User.findByPk(req.user.id);
      if (!user || user.role !== 'admin') {
        return res.status(403).json({ error: 'Yêu cầu quyền admin' });
      }
      next();
    } catch (error) {
      res.status(500).json({ error: 'Lỗi xác thực', details: error.message });
    }
  },

  // Lấy tất cả người dùng (có phân trang)
  getAllUsers: async (req, res) => {
    try {
      const { page = 1, limit = 10 } = req.query;
      const offset = (page - 1) * limit;
      const { count, rows: users } = await User.findAndCountAll({
        limit: parseInt(limit),
        offset: parseInt(offset),
      });
      res.status(200).json({
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        users,
      });
    } catch (error) {
      res.status(500).json({ error: 'Lỗi khi lấy người dùng', details: error.message });
    }
  },

  // Lấy tất cả đơn hàng (bao gồm OrderItem)
  getAllOrders: async (req, res) => {
    try {
      const { page = 1, limit = 10 } = req.query;
      const offset = (page - 1) * limit;
      const { count, rows: orders } = await Order.findAll({
        include: [{ model: OrderItem, as: 'items' }],
        limit: parseInt(limit),
        offset: parseInt(offset),
      });
      res.status(200).json({
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        orders,
      });
    } catch (error) {
      res.status(500).json({ error: 'Lỗi khi lấy đơn hàng', details: error.message });
    }
  },

  // Lấy tất cả sản phẩm (lọc sản phẩm hợp lệ)
  getAllProducts: async (req, res) => {
    try {
      const { page = 1, limit = 10 } = req.query;
      const offset = (page - 1) * limit;
      const { count, rows: products } = await Product.findAll({
        include: [{ model: Category, as: 'category' }],
        limit: parseInt(limit),
        offset: parseInt(offset),
      });
      // Lọc sản phẩm có id hợp lệ
      const validProducts = products.filter(p => p.id && !isNaN(parseInt(p.id)));
      if (validProducts.length < products.length) {
        console.warn('Sản phẩm không hợp lệ đã bị lọc:', products.filter(p => !p.id || isNaN(parseInt(p.id))));
      }
      res.status(200).json({
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        products: validProducts,
      });
    } catch (error) {
      res.status(500).json({ error: 'Lỗi khi lấy sản phẩm', details: error.message });
    }
  },

  // Lấy tất cả danh mục
  getAllCategories: async (req, res) => {
    try {
      const { page = 1, limit = 10 } = req.query;
      const offset = (page - 1) * limit;
      const { count, rows: categories } = await Category.findAll({
        limit: parseInt(limit),
        offset: parseInt(offset),
      });
      res.status(200).json({
        total: count,
        page: parseInt(page),
        limit: parseInt(limit),
        categories,
      });
    } catch (error) {
      res.status(500).json({ error: 'Lỗi khi lấy danh mục', details: error.message });
    }
  },

  // Cập nhật người dùng
  updateUser: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: 'ID người dùng không hợp lệ' });
      }
      const { email, password, role } = req.body;
      if (!email || !role) {
        return res.status(400).json({ error: 'Email và vai trò là bắt buộc' });
      }
      const updates = { email, role };
      if (password) {
        if (password.length < 8) {
          return res.status(400).json({ error: 'Mật khẩu phải dài ít nhất 8 ký tự' });
        }
        updates.password = await bcrypt.hash(password, 10);
      }
      const [updated] = await User.update(updates, { where: { id } });
      if (!updated) {
        return res.status(404).json({ error: 'Không tìm thấy người dùng' });
      }
      const updatedUser = await User.findByPk(id);
      res.status(200).json({ message: 'Cập nhật người dùng thành công', user: updatedUser });
    } catch (error) {
      res.status(500).json({ error: 'Lỗi khi cập nhật người dùng', details: error.message });
    }
  },

  // Cập nhật đơn hàng
  updateOrder: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: 'ID đơn hàng không hợp lệ' });
      }
      const { code, status } = req.body;
      if (!code || !status) {
        return res.status(400).json({ error: 'Mã và trạng thái là bắt buộc' });
      }
      const [updated] = await Order.update({ code, status }, { where: { id } });
      if (!updated) {
        return res.status(404).json({ error: 'Không tìm thấy đơn hàng' });
      }
      const updatedOrder = await Order.findByPk(id, { include: [{ model: OrderItem, as: 'items' }] });
      res.status(200).json({ message: 'Cập nhật đơn hàng thành công', order: updatedOrder });
    } catch (error) {
      res.status(500).json({ error: 'Lỗi khi cập nhật đơn hàng', details: error.message });
    }
  },

  // Cập nhật sản phẩm
  updateProduct: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: 'ID sản phẩm không hợp lệ' });
      }
      const { name, description, thumbnail, price, quantity, category_id, view } = req.body;
      if (!name || !price || !quantity || !category_id) {
        return res.status(400).json({ error: 'Tên, giá, số lượng và danh mục là bắt buộc' });
      }
      const updates = {
        name,
        description: description || null,
        thumbnail: thumbnail || null,
        price: parseFloat(price),
        quantity: parseInt(quantity),
        category_id: parseInt(category_id),
        view: parseInt(view) || 0,
      };
      const [updated] = await Product.update(updates, { where: { id } });
      if (!updated) {
        return res.status(404).json({ error: 'Không tìm thấy sản phẩm' });
      }
      const updatedProduct = await Product.findByPk(id, { include: [{ model: Category, as: 'category' }] });
      res.status(200).json({ message: 'Cập nhật sản phẩm thành công', product: updatedProduct });
    } catch (error) {
      res.status(500).json({ error: 'Lỗi khi cập nhật sản phẩm', details: error.message });
    }
  },

  // Xóa người dùng
  deleteUser: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: 'ID người dùng không hợp lệ' });
      }
      const deleted = await User.destroy({ where: { id } });
      if (!deleted) {
        return res.status(404).json({ error: 'Không tìm thấy người dùng' });
      }
      res.status(200).json({ message: 'Xóa người dùng thành công' });
    } catch (error) {
      res.status(500).json({ error: 'Lỗi khi xóa người dùng', details: error.message });
    }
  },

  // Xóa đơn hàng
  deleteOrder: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: 'ID đơn hàng không hợp lệ' });
      }
      await OrderItem.destroy({ where: { order_id: id } });
      const deleted = await Order.destroy({ where: { id } });
      if (!deleted) {
        return res.status(404).json({ error: 'Không tìm thấy đơn hàng' });
      }
      res.status(200).json({ message: 'Xóa đơn hàng thành công' });
    } catch (error) {
      res.status(500).json({ error: 'Lỗi khi xóa đơn hàng', details: error.message });
    }
  },

  // Xóa sản phẩm
  deleteProduct: async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: 'ID sản phẩm không hợp lệ' });
      }
      const deleted = await Product.destroy({ where: { id } });
      if (!deleted) {
        return res.status(404).json({ error: 'Không tìm thấy sản phẩm' });
      }
      res.status(200).json({ message: 'Xóa sản phẩm thành công' });
    } catch (error) {
      res.status(500).json({ error: 'Lỗi khi xóa sản phẩm', details: error.message });
    }
  },

  // Tạo sản phẩm mới (thêm chức năng)
  createProduct: async (req, res) => {
    try {
      const { name, description, thumbnail, price, quantity, category_id, view = 0 } = req.body;
      if (!name || !price || !quantity || !category_id) {
        return res.status(400).json({ error: 'Tên, giá, số lượng và danh mục là bắt buộc' });
      }
      const product = await Product.create({
        name,
        description: description || null,
        thumbnail: thumbnail || null,
        price: parseFloat(price),
        quantity: parseInt(quantity),
        category_id: parseInt(category_id),
        view: parseInt(view),
      });
      const createdProduct = await Product.findByPk(product.id, { include: [{ model: Category, as: 'category' }] });
      res.status(201).json({ message: 'Tạo sản phẩm thành công', product: createdProduct });
    } catch (error) {
      res.status(500).json({ error: 'Lỗi khi tạo sản phẩm', details: error.message });
    }
  },
};

module.exports = AdminController;