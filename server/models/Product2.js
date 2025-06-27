const { sequelize } = require('../config/db.js'); // Đảm bảo đường dẫn đúng đến file cấu hình Sequelize của bạn
const { DataTypes } = require('sequelize');

if (!sequelize || typeof sequelize.define !== 'function') {
  throw new Error('Sequelize instance is not properly configured in db.js');
}

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT, // Sử dụng TEXT cho mô tả dài
    allowNull: true // Mô tả có thể rỗng
  },
  thumbnail: {
    type: DataTypes.STRING,
    allowNull: true // Thumbnail có thể rỗng
  },
  price: {
    type: DataTypes.DOUBLE, // DECIMAL cho giá tiền, 10 chữ số tổng, 2 chữ số sau dấu phẩy
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0 // Giá trị mặc định nếu không được cung cấp
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    // Nếu bạn có model Category, bạn có thể thêm khóa ngoại ở đây
    references: {
      model: 'Category', // Tên model của Category
      key: 'id',
    },
    // onUpdate: 'CASCADE',
    onDelete: 'SET NULL' // Hoặc 'RESTRICT', 'CASCADE' tùy thuộc vào logic nghiệp vụ của bạn
  },
  view: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0 // Số lượt xem mặc định là 0
  }
}, {
  tableName: 'products', // Tên bảng trong cơ sở dữ liệu
  timestamps: false, // Sequelize sẽ tự động quản lý createdAt và updatedAt
  createdAt: 'created_at', // Map createdAt của Sequelize sang cột created_at trong DB

});

module.exports = { Product };