require('dotenv').config({ path: '../.env' });
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Product = require('./models/Product'); // Import Product model
const seedDatabase = require('./seed'); // Import the seed script
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5001;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/khulakush';

// Middleware
app.use(express.json()); // For parsing application/json
app.use(cors({
    origin: [
        'https://khulakush-frontend.onrender.com',
        'http://localhost:5174',
        'http://localhost:4173',
        'http://localhost:4176', // Added for local dev
        'http://localhost:5173' // Added for Vite dev server
    ], // Allow requests from your deployed frontend and local development
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Specify allowed headers
}));

// Serve static files from the public/images directory
app.use('/images', express.static(path.join(__dirname, '../public/images')));

// MongoDB Connection
mongoose.connect(MONGODB_URI)
    .then(async () => {
        console.log('MongoDB connected successfully');
        // Check if products exist, if not, seed the database
        const productCount = await Product.countDocuments();
        if (productCount === 0) {
            console.log('No products found, seeding database...');
            await seedDatabase(Product); // Pass the Product model
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
