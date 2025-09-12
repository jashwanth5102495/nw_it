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

// Check Rohan user
const checkRohanUser = async () => {
  try {
    console.log('🔍 Searching for user "rohan"...');
    
    const user = await User.findOne({ username: 'rohan' });
    
    if (!user) {
      console.log('❌ User "rohan" not found in database');
      return;
    }

    console.log('✅ User "rohan" found!');
    console.log('User details:', {
      id: user._id,
      username: user.username,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      lastLogin: user.lastLogin
    });
    
    // Test password comparison
    console.log('\n🔐 Testing password...');
    const isPasswordValid = await user.comparePassword('rohan123');
    console.log(`Password "rohan123" is ${isPasswordValid ? 'VALID ✅' : 'INVALID ❌'}`);
    
    // Also test with bcrypt directly
    const directCompare = await bcrypt.compare('rohan123', user.password);
    console.log(`Direct bcrypt compare: ${directCompare ? 'VALID ✅' : 'INVALID ❌'}`);
    
    console.log('\nHashed password in DB:', user.password.substring(0, 20) + '...');
    
  } catch (error) {
    console.error('❌ Error checking user:', error.message);
  }
};

// Main function
const main = async () => {
  await connectDB();
  await checkRohanUser();
  await mongoose.connection.close();
  console.log('✅ Database connection closed');
};

// Run the script
main().catch(console.error);