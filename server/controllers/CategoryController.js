const { Category } = require('../models/Category'); // Sequelize model

const CategoryController = {
  // Lấy tất cả danh mục
  getAllCategories: async (req, res) => {
    try {
      const categories = await Category.findAll();
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching categories', details: error.message });
    }
  },

  // Lấy danh mục theo ID
  getCategoryById: async (req, res) => {
    try {
      const category = await Category.findByPk(req.params.id);
      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }
      res.status(200).json(category);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching category', details: error.message });
    }
  },

  // Tạo danh mục mới
  createCategory: async (req, res) => {
    try {
      const { name, thumbnail } = req.body;
      if (!name) {
        return res.status(400).json({ error: 'Name is required' });
      }
      const newCategory = await Category.create({ name, thumbnail });
      res.status(201).json(newCategory);
    } catch (error) {
      res.status(500).json({ error: 'Error creating category', details: error.message });
    }
  },

  // Cập nhật danh mục
  updateCategory: async (req, res) => {
    try {
      const { name, thumbnail } = req.body;
      const category = await Category.findByPk(req.params.id);
      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }
      await category.update({ name, thumbnail });
      res.status(200).json({ message: 'Category updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error updating category', details: error.message });
    }
  },

  // Xóa danh mục
  deleteCategory: async (req, res) => {
    try {
      const category = await Category.findByPk(req.params.id);
      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }
      await category.destroy();
      res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting category', details: error.message });
    }
  },
};

module.exports = CategoryController;
