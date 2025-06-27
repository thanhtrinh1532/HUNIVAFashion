const db = require('../config/db');

const User = {
  // Lấy tất cả người dùng
  getAll: async () => {
    const [rows] = await db.query('SELECT id, email, role FROM users');
    return rows;
  },

  // Lấy người dùng theo ID
  getById: async (id) => {
    const [rows] = await db.query('SELECT id, email, role FROM users WHERE id = ?', [id]);
    return rows[0];
  },

  // Lấy người dùng theo email
  getByEmail: async (email) => {
    const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  },

  // Thêm người dùng
  create: async (email, password, role) => {
    const [result] = await db.query(
      'INSERT INTO users (email, password, role) VALUES (?, ?, ?)',
      [email, password, role]
    );
    return { id: result.insertId, email, role };
  },

  // Cập nhật người dùng
  update: async (id, email, password, role) => {
    const [result] = await db.query(
      'UPDATE users SET email = ?, password = ?, role = ? WHERE id = ?',
      [email, password, role, id]
    );
    return result.affectedRows > 0;
  },

  // Xóa người dùng
  delete: async (id) => {
    const [result] = await db.query('DELETE FROM users WHERE id = ?', [id]);
    return result.affectedRows > 0;
  },
};

module.exports = User;