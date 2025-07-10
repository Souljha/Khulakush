require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Product = require('./models/Product'); // Import Product model
const seedDatabase = require('./seed'); // Import the seed script

const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/khulakush';

// Middleware
app.use(express.json()); // For parsing application/json
app.use(cors({
    origin: 'https://khulakush-frontend.onrender.com', // Allow requests from your deployed frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Specify allowed headers
}));

// MongoDB Connection
mongoose.connect(MONGODB_URI)
    .then(async () => {
        console.log('MongoDB connected successfully');
        // Check if products exist, if not, seed the database
        const productCount = await Product.countDocuments();
        if (productCount === 0) {
            console.log('No products found, seeding database...');
            await seedDatabase();
            console.log('Database seeded successfully.');
        } else {
            console.log('Products already exist, skipping seeding.');
        }
    })
    .catch(err => console.error('MongoDB connection error:', err));

// Routes
const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);

// Basic Route
app.get('/', (req, res) => {
    res.send('Khula Kush Backend API');
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
