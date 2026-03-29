require('dotenv').config();
const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/products');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/products', productRoutes);
app.use(authRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({ message: 'Smartphone E-commerce API is running!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
