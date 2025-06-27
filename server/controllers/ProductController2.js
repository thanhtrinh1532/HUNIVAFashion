// server/controllers/ProductController.js
const { Product } = require('../models/Product'); // Đảm bảo đường dẫn đúng đến model Product Sequelize

const ProductController = {
  // Lấy tất cả sản phẩm
  getAllProducts: async (req, res) => {
    try {
      const products = await Product.findAll(); // Sử dụng findAll của Sequelize
      res.status(200).json(products);
    } catch (error) {
      console.error('Error in getAllProducts:', error); // Log lỗi để debug
      res.status(500).json({ error: 'Error fetching products', details: error.message });
    }
  },

  // Lấy sản phẩm theo ID
  getProductById: async (req, res) => {
    try {
      const product = await Product.findByPk(req.params.id); // Sử dụng findByPk của Sequelize
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.status(200).json(product);
    } catch (error) {
      console.error(`Error in getProductById for ID ${req.params.id}:`, error);
      res.status(500).json({ error: 'Error fetching product', details: error.message });
    }
  },

  // Lấy sản phẩm theo danh mục
  getProductsByCategory: async (req, res) => {
    try {
      const { categoryId } = req.params; // Lấy categoryId từ params (đảm bảo phù hợp với tên tham số trong route)
      const products = await Product.findAll({
        where: {
          category_id: categoryId // Lọc theo category_id
        }
      });
      res.status(200).json(products);
    } catch (error) {
      console.error(`Error in getProductsByCategory for category ID ${req.params.categoryId}:`, error);
      res.status(500).json({ error: 'Error fetching products by category', details: error.message });
    }
  },

  // Tạo sản phẩm mới
  createProduct: async (req, res) => {
    try {
      const { name, description, thumbnail, price, quantity, category_id, view } = req.body;

      // Validate dữ liệu đầu vào cơ bản
      if (!name || !price || !category_id) {
        return res.status(400).json({ error: 'Name, price, and category_id are required' });
      }

      // Tạo sản phẩm mới bằng phương thức create của Sequelize
      // Sequelize tự động xử lý các trường timestamps (created_at, updated_at)
      const newProduct = await Product.create({
        name,
        description,
        thumbnail,
        price,
        quantity,
        category_id,
        view: view || 0 // Đặt giá trị mặc định cho view nếu không được cung cấp
      });

      res.status(201).json(newProduct);
    } catch (error) {
      // Xử lý lỗi validation của Sequelize (nếu bạn định nghĩa validation trong model)
      if (error.name === 'SequelizeValidationError') {
        const errors = error.errors.map(err => err.message);
        return res.status(400).json({ error: 'Validation failed', details: errors });
      }
      console.error('Error in createProduct:', error);
      res.status(500).json({ error: 'Error creating product', details: error.message });
    }
  },

  // Cập nhật sản phẩm
  // updateProduct: async (req, res) => {
  //   try {
  //     const { id } = req.params;
  //     const updatedData = req.body; // Lấy tất cả dữ liệu cần cập nhật từ req.body

  //     const product = await Product.findByPk(id); // Tìm sản phẩm theo ID
  //     if (!product) {
  //       return res.status(404).json({ error: 'Product not found' });
  //     }

  //     // Cập nhật sản phẩm bằng phương thức update trên instance của model
  //     await product.update(updatedData);

  //     res.status(200).json({ message: 'Product updated successfully', updatedProduct: product });
  //   } catch (error) {
  //     if (error.name === 'SequelizeValidationError') {
  //       const errors = error.errors.map(err => err.message);
  //       return res.status(400).json({ error: 'Validation failed', details: errors });
  //     }
  //     console.error(`Error in updateProduct for ID ${req.params.id}:`, error);
  //     res.status(500).json({ error: 'Error updating product', details: error.message });
  //   }
  // },

  // Xóa sản phẩm
  deleteProduct: async (req, res) => {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id); // Tìm sản phẩm theo ID

      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }

      await product.destroy(); // Xóa sản phẩm bằng phương thức destroy trên instance của model
      res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
      console.error(`Error in deleteProduct for ID ${req.params.id}:`, error);
      res.status(500).json({ error: 'Error deleting product', details: error.message });
    }
  },
};

module.exports = ProductController;