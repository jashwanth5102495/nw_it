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

// Debug login process
const debugLogin = async () => {
  try {
    const username = 'rohan';
    const password = 'rohan123';
    
    console.log('🔍 Debug Login Process');
    console.log('='.repeat(50));
    console.log(`Input username: "${username}"`);
    console.log(`Input password: "${password}"`);
    console.log('');
    
    // Step 1: Check what the login route does
    const searchUsername = username.toLowerCase().trim();
    console.log(`🔍 Step 1: Search username after toLowerCase().trim(): "${searchUsername}"`);
    
    // Step 2: Find user
    console.log('🔍 Step 2: Searching for user in database...');
    const user = await User.findOne({ username: searchUsername });
    
    if (!user) {
      console.log('❌ User not found with search username');
      
      // Try finding with original username
      console.log('🔍 Trying with original username...');
      const userOriginal = await User.findOne({ username: username });
      if (userOriginal) {
        console.log('✅ User found with original username!');
        console.log('🚨 ISSUE: Username case mismatch!');
        console.log(`   Database has: "${userOriginal.username}"`);
        console.log(`   Login searches for: "${searchUsername}"`);
      } else {
        console.log('❌ User not found with original username either');
      }
      return;
    }
    
    console.log('✅ User found!');
    console.log(`   Database username: "${user.username}"`);
    console.log(`   User ID: ${user._id}`);
    console.log(`   Role: ${user.role}`);
    console.log('');
    
    // Step 3: Test password
    console.log('🔍 Step 3: Testing password...');
    console.log(`   Input password: "${password}"`);
    console.log(`   Stored hash: ${user.password.substring(0, 20)}...`);
    
    const isPasswordValid = await user.comparePassword(password);
    console.log(`   comparePassword result: ${isPasswordValid}`);
    
    // Also test direct bcrypt
    const directCompare = await bcrypt.compare(password, user.password);
    console.log(`   Direct bcrypt.compare: ${directCompare}`);
    
    if (isPasswordValid) {
      console.log('✅ Password is valid!');
      console.log('✅ Login should succeed!');
    } else {
      console.log('❌ Password is invalid!');
      console.log('❌ Login will fail!');
    }
    
  } catch (error) {
    console.error('❌ Error in debug login:', error.message);
  }
};

// Main function
const main = async () => {
  await connectDB();
  await debugLogin();
  await mongoose.connection.close();
  console.log('\n✅ Database connection closed');
};

// Run the script
main().catch(console.error);