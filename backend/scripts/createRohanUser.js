const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
require('dotenv').config();

// MongoDB connection
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/jasnav-it-solutions', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
};

// Create Rohan user
const createRohanUser = async () => {
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ username: 'rohan' });
    
    if (existingUser) {
      console.log('✅ User "rohan" already exists');
      console.log('User details:', {
        id: existingUser._id,
        username: existingUser.username,
        role: existingUser.role,
        createdAt: existingUser.createdAt
      });
      return;
    }

    // Create new user
    const newUser = new User({
      username: 'rohan',
      password: 'rohan123', // This will be automatically hashed by the pre-save middleware
      role: 'user'
    });

    await newUser.save();
    
    console.log('✅ User "rohan" created successfully!');
    console.log('Login credentials:');
    console.log('  Username: rohan');
    console.log('  Password: rohan123');
    console.log('  Role: user');
    console.log('  User ID:', newUser._id);
    
  } catch (error) {
    console.error('❌ Error creating user:', error.message);
  }
};

// Main function
const main = async () => {
  await connectDB();
  await createRohanUser();
  await mongoose.connection.close();
  console.log('✅ Database connection closed');
};

// Run the script
main().catch(console.error);