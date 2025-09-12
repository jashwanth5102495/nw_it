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

// Recreate Rohan user
const recreateRohanUser = async () => {
  try {
    console.log('🔄 Recreating user "rohan"...');
    
    // First, delete any existing rohan user
    const deleteResult = await User.deleteMany({ username: 'rohan' });
    console.log(`🗑️  Deleted ${deleteResult.deletedCount} existing rohan user(s)`);
    
    // Create new user with explicit password hashing
    const plainPassword = 'rohan123';
    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    
    console.log('🔐 Creating user with:');
    console.log(`   Username: rohan`);
    console.log(`   Password: ${plainPassword}`);
    console.log(`   Hashed: ${hashedPassword.substring(0, 20)}...`);
    
    const newUser = new User({
      username: 'rohan',
      password: plainPassword, // Let the pre-save middleware handle hashing
      role: 'user'
    });

    await newUser.save();
    
    console.log('✅ User "rohan" created successfully!');
    
    // Verify the user was created correctly
    const verifyUser = await User.findOne({ username: 'rohan' });
    if (verifyUser) {
      console.log('\n✅ Verification successful:');
      console.log(`   ID: ${verifyUser._id}`);
      console.log(`   Username: ${verifyUser.username}`);
      console.log(`   Role: ${verifyUser.role}`);
      console.log(`   Password hash: ${verifyUser.password.substring(0, 20)}...`);
      
      // Test password comparison
      const isPasswordValid = await verifyUser.comparePassword('rohan123');
      console.log(`   Password test: ${isPasswordValid ? 'VALID ✅' : 'INVALID ❌'}`);
      
      if (isPasswordValid) {
        console.log('\n🎉 User is ready for login!');
        console.log('   Username: rohan');
        console.log('   Password: rohan123');
      }
    } else {
      console.log('❌ Verification failed - user not found after creation');
    }
    
  } catch (error) {
    console.error('❌ Error recreating user:', error.message);
    console.error('Full error:', error);
  }
};

// Main function
const main = async () => {
  await connectDB();
  await recreateRohanUser();
  await mongoose.connection.close();
  console.log('\n✅ Database connection closed');
};

// Run the script
main().catch(console.error);