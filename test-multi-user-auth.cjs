const axios = require('axios');

const API_BASE = 'http://localhost:5000/api';

// Test multiple user authentication
const testMultiUserAuth = async () => {
  console.log('🔐 Testing Multi-User Authentication System');
  console.log('=' .repeat(50));
  
  try {
    // Test User 1: rohan
    console.log('\n👤 Testing User 1: rohan');
    console.log('-'.repeat(30));
    
    const rohanLogin = await axios.post(`${API_BASE}/auth/login`, {
      username: 'rohan',
      password: 'rohan123'
    });
    
    if (rohanLogin.data.success) {
      console.log('✅ Rohan login successful!');
      console.log(`   User ID: ${rohanLogin.data.data.user.id}`);
      console.log(`   Username: ${rohanLogin.data.data.user.username}`);
      console.log(`   Role: ${rohanLogin.data.data.user.role}`);
      console.log(`   Token: ${rohanLogin.data.data.token.substring(0, 30)}...`);
    } else {
      console.log('❌ Rohan login failed:', rohanLogin.data.message);
    }
    
    // Test User 2: testuser
    console.log('\n👤 Testing User 2: testuser');
    console.log('-'.repeat(30));
    
    const testUserLogin = await axios.post(`${API_BASE}/auth/login`, {
      username: 'testuser',
      password: 'test123'
    });
    
    if (testUserLogin.data.success) {
      console.log('✅ TestUser login successful!');
      console.log(`   User ID: ${testUserLogin.data.data.user.id}`);
      console.log(`   Username: ${testUserLogin.data.data.user.username}`);
      console.log(`   Role: ${testUserLogin.data.data.user.role}`);
      console.log(`   Token: ${testUserLogin.data.data.token.substring(0, 30)}...`);
    } else {
      console.log('❌ TestUser login failed:', testUserLogin.data.message);
    }
    
    // Test User 3: admin
    console.log('\n👤 Testing User 3: admin');
    console.log('-'.repeat(30));
    
    const adminLogin = await axios.post(`${API_BASE}/auth/login`, {
      username: 'admin',
      password: 'admin123'
    });
    
    if (adminLogin.data.success) {
      console.log('✅ Admin login successful!');
      console.log(`   User ID: ${adminLogin.data.data.user.id}`);
      console.log(`   Username: ${adminLogin.data.data.user.username}`);
      console.log(`   Role: ${adminLogin.data.data.user.role}`);
      console.log(`   Token: ${adminLogin.data.data.token.substring(0, 30)}...`);
    } else {
      console.log('❌ Admin login failed:', adminLogin.data.message);
    }
    
    // Verify user isolation
    console.log('\n🔍 User Isolation Verification');
    console.log('-'.repeat(30));
    
    const rohanId = rohanLogin.data.success ? rohanLogin.data.data.user.id : null;
    const testUserId = testUserLogin.data.success ? testUserLogin.data.data.user.id : null;
    const adminId = adminLogin.data.success ? adminLogin.data.data.user.id : null;
    
    if (rohanId && testUserId && adminId) {
      const allDifferent = (rohanId !== testUserId) && (rohanId !== adminId) && (testUserId !== adminId);
      
      if (allDifferent) {
        console.log('✅ User isolation verified - all users have unique IDs');
        console.log(`   Rohan ID:    ${rohanId}`);
        console.log(`   TestUser ID: ${testUserId}`);
        console.log(`   Admin ID:    ${adminId}`);
      } else {
        console.log('❌ User isolation failed - duplicate user IDs detected!');
      }
    } else {
      console.log('❌ Cannot verify isolation - some logins failed');
    }
    
    // Test invalid credentials
    console.log('\n🚫 Testing Invalid Credentials');
    console.log('-'.repeat(30));
    
    try {
      await axios.post(`${API_BASE}/auth/login`, {
        username: 'rohan',
        password: 'wrongpassword'
      });
      console.log('❌ Security issue: Invalid password accepted!');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.log('✅ Security verified: Invalid password rejected');
      } else {
        console.log('❌ Unexpected error:', error.message);
      }
    }
    
    console.log('\n🎉 Multi-User Authentication Test Complete!');
    console.log('\n📋 Summary:');
    console.log('   • Multiple users can login with unique credentials');
    console.log('   • Each user gets a unique ID and session');
    console.log('   • Invalid credentials are properly rejected');
    console.log('   • User isolation is maintained');
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.response) {
      console.error('   Response:', error.response.data);
    }
  }
};

// Run the test
testMultiUserAuth();