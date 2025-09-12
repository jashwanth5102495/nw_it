const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

// Use the same connection string as the server
const connectDB = async () => {
  try {
    // Same connection string as in database.js
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/jasnav_projects';
    const conn = await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`✅ MongoDB Connected to: ${mongoURI}`);
    console.log(`✅ Database: ${conn.connection.name}`);
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  }
};

// Create Rohan user in the correct database
const createRohanUser = async () => {
  try {
    console.log('🔄 Creating user "rohan" in the correct database...');
    
    // First, delete any existing rohan user
    const deleteResult = await User.deleteMany({ username: 'rohan' });
    console.log(`🗑️  Deleted ${deleteResult.deletedCount} existing rohan user(s)`);
    
    // Create new user
    const newUser = new User({
      username: 'rohan',
      password: 'rohan123', // Will be hashed by pre-save middleware
      role: 'user'
    });

    await newUser.save();
    
    console.log('✅ User "rohan" created successfully in the correct database!');
    
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
        console.log('   ┌─────────────────────────────────────┐');
        console.log('   │  Username: rohan                   │');
        console.log('   │  Password: rohan123                │');
        console.log('   │  Database: jasnav_projects         │');
        console.log('   └─────────────────────────────────────┘');
      }
    } else {
      console.log('❌ Verification failed - user not found after creation');
    }
    
    // List all users in this database
    console.log('\n📋 All users in this database:');
    const allUsers = await User.find({});
    allUsers.forEach((user, index) => {
      console.log(`   ${index + 1}. ${user.username} (${user.role})`);
    });
    
  } catch (error) {
    console.error('❌ Error creating user:', error.message);
    console.error('Full error:', error);
  }
};

// Main function
const main = async () => {
  await connectDB();
  await createRohanUser();
  await mongoose.connection.close();
  console.log('\n✅ Database connection closed');
};

// Run the script
main().catch(console.error);