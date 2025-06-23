const db = require('../config/db');

const OrderDetail = {
  // Lấy tất cả chi tiết đơn hàng
  getAll: async () => {
    const [rows] = await db.query('SELECT * FROM order_items');
    return rows;
  },

  // Lấy chi tiết đơn hàng theo order_id
  getByOrderId: async (order_id) => {
    const [rows] = await db.query('SELECT * FROM order_items WHERE order_id = ?', [order_id]);
    return rows;
  },

  // Thêm chi tiết đơn hàng
  create: async (order_id, product_id, quantity, price) => {
    const [result] = await db.query(
      'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
      [order_id, product_id, quantity, price]
    );
    return { id: result.insertId, order_id, product_id, quantity, price };
  },

  // Cập nhật chi tiết đơn hàng
  update: async (id, quantity, price) => {
    const [result] = await db.query(
      'UPDATE order_items SET quantity = ?, price = ? WHERE id = ?',
      [quantity, price, id]
    );
    return result.affectedRows > 0;
  },

  // Xóa chi tiết đơn hàng
  delete: async (id) => {
    const [result] = await db.query('DELETE FROM order_items WHERE id = ?', [id]);
    return result.affectedRows > 0;
  },
};

module.exports = OrderDetail;