// Load environment variables from parent directory in development, or use Railway's env vars in production
const path = require('path');
const fs = require('fs');
const parentEnvPath = path.join(__dirname, '../.env');
if (fs.existsSync(parentEnvPath)) {
    require('dotenv').config({ path: parentEnvPath });
} else {
    require('dotenv').config(); // Fallback to default .env location or use system env vars
}
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Product = require('./models/Product'); // Import Product model
const seedDatabase = require('./seed'); // Import the seed script

const app = express();
const PORT = process.env.PORT || 5001;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/khulakush';

// Middleware
app.use(express.json()); // For parsing application/json
app.use(cors({
    origin: [
        'https://khulakush.store',
        'https://www.khulakush.store',
        'https://khulakush.vercel.app',
        'https://khulakush-rkuwccppf-brendons-projects-fe75eefe.vercel.app',
        'http://localhost:5174',
        'http://localhost:4173',
        'http://localhost:4176',
        'http://localhost:5173'
    ], // Allow requests from your deployed frontend and local development
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], // Specify allowed methods
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
const chatRoutes = require('./routes/chat');
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
app.use('/api/products', productRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/payment', paymentRoutes);

// Basic Route
app.get('/', (req, res) => {
    res.send('Khula Kush Backend API');
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});
