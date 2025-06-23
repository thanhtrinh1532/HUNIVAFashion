const { sequelize } = require('../config/db');
const { DataTypes } = require('sequelize');

// Kiểm tra cấu hình Sequelize
if (!sequelize || typeof sequelize.define !== 'function') {
  throw new Error('Sequelize instance is not properly configured in db.js');
}

// Định nghĩa model Order
const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  code: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true // Đảm bảo code không rỗng
    }
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true // Đảm bảo status không rỗng
    }
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt: true // Đảm bảo user_id là số nguyên
    }
  }
}, {
  tableName: 'orders', // Tên bảng trong cơ sở dữ liệu
  timestamps: false // Tắt tự động thêm createdAt, updatedAt
});

// Các phương thức tương tự như code gốc
const OrderMethods = {
  // Lấy tất cả đơn hàng
  getAll: async () => {
    const orders = await Order.findAll();
    return orders.map(order => order.toJSON());
  },

  // Lấy đơn hàng theo ID
  getById: async (id) => {
    const order = await Order.findByPk(id);
    return order ? order.toJSON() : null;
  },

  // Lấy đơn hàng theo user_id
  getByUserId: async (user_id) => {
    const orders = await Order.findAll({
      where: { user_id }
    });
    return orders.map(order => order.toJSON());
  },

  // Thêm đơn hàng
  create: async (code, status, user_id) => {
    const order = await Order.create({ code, status, user_id });
    return order.toJSON();
  },

  // Cập nhật đơn hàng
  update: async (id, code, status) => {
    const [affectedRows] = await Order.update(
      { code, status },
      { where: { id } }
    );
    return affectedRows > 0;
  },

  // Xóa đơn hàng
  delete: async (id) => {
    const affectedRows = await Order.destroy({ where: { id } });
    return affectedRows > 0;
  }
};

// Gộp model và methods để xuất
module.exports = {
  Order,
  ...OrderMethods
};