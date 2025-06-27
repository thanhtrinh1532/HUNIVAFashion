// server/controllers/UserController.js
const User = require('../models/User');
const bcrypt = require('bcrypt');

const UserController = {
  // Lấy tất cả người dùng
  getAllUsers: async (req, res) => {
    try {
      const users = await User.findAll();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching users', details: error.message });
    }
  },

  // Lấy người dùng theo ID
  getUserById: async (req, res) => {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching user', details: error.message });
    }
  },

  // Đăng ký người dùng
  register: async (req, res) => {
    try {
      const { email, password, role } = req.body;
      if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
      }
      const existingUser = await User.getByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error: 'Email already exists' });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create(email, hashedPassword, role || 'user');
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: 'Error registering user', details: error.message });
    }
  },

  //   // Đăng nhập
  //   login: async (req, res) => {
  //     try {
  //       const { email, password } = req middleware {
  //     try {
  //       const { email, password, role } = req.body;
  //       const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;
  //       const success = await User.update(req.params.id, email, hashedPassword, role);
  //       if (!success) {
  //         return res.status(404).json({ error: 'User not found' });
  //       }
  //       res.status(200).json({ message: 'User updated successfully' });
  //     } catch (error) {
  //       res.status(500).json({ error: 'Error updating user', details: error.message });
  //     }
  //   },

  // Xóa người dùng
  deleteUser: async (req, res) => {
    try {
      const success = await User.delete(req.params.id);
      if (!success) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting user', details: error.message });
    }
  },

  // Cập nhật người dùng
  updateUser: async (req, res) => {
    try {
      const { email, password, role } = req.body;
      const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;
      const success = await User.update(req.params.id, email, hashedPassword, role);
      if (!success) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error updating user', details: error.message });
    }
  },
};

module.exports = UserController;
