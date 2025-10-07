require('dotenv').config({ path: '../.env' });
const mongoose = require('mongoose');
const Product = require('./models/Product');
const seedDatabase = require('./seed');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/khulakush';

async function clearAndReseed() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB connected successfully');

    // Delete all existing products
    await Product.deleteMany({});
    console.log('All products deleted');

    // Reseed the database
    await seedDatabase(Product);
    console.log('Database reseeded successfully');

    // Close connection
    await mongoose.connection.close();
    console.log('Connection closed');
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

clearAndReseed();
