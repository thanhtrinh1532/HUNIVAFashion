const express = require('express');
const dotenv = require('dotenv');
const { sequelize } = require('./config/db');
const cors = require('cors');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const cartRoutes = require('./routes/cartRoutes');
const contactRoutes = require('./routes/contactRoutes');
const adminRoutes = require('./routes/adminRoutes');
const aiRoutes = require('./routes/aiRoutes');

console.log('userRoutes:', userRoutes); // Debug

// Route middleware
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/contacts', contactRoutes);
// app.use('/api/login', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/ai', aiRoutes);
app.get('/test', (req, res) => res.json({ message: 'Test route working' }));
// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Tech Store API' });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!', details: err.message });
});

const initApp = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');
    const { Contact } = require('./models/Contact');
    await Contact.sync({ alter: true });
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running at: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database or sync models:', error);
  }
};



initApp();