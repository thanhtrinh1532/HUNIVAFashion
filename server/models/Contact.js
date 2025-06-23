const { sequelize } = require('../config/db.js');
const { DataTypes } = require('sequelize');

if (!sequelize || typeof sequelize.define !== 'function') {
  throw new Error('Sequelize instance is not properly configured in db.js');
}

const Contact = sequelize.define('Contact', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false
  }
}, {
  tableName: 'contacts',
  timestamps: false
});

module.exports = { Contact };