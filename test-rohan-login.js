// Test script to verify rohan user login
import fetch from 'node-fetch';

async function testRohanLogin() {
  console.log('🔐 Testing login for user "rohan"...');
  console.log('');
  
  try {
    const loginData = {
      username: 'rohan',
      password: 'rohan123'
    };
    
    console.log('📤 Sending login request with:');
    console.log(`   Username: ${loginData.username}`);
    console.log(`   Password: ${loginData.password}`);
    console.log('');
    
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginData)
    });
    
    const result = await response.json();
    
    console.log(`📡 Response Status: ${response.status}`);
    console.log('');
    
    if (result.success) {
      console.log('✅ LOGIN SUCCESSFUL!');
      console.log('');
      console.log('📋 User Details:');
      console.log(`   Username: ${result.data.user.username}`);
      console.log(`   User ID: ${result.data.user.id}`);
      console.log(`   Role: ${result.data.user.role}`);
      console.log(`   Last Login: ${result.data.user.lastLogin}`);
      console.log('');
      console.log('🔑 Authentication Token:');
      console.log(`   ${result.data.token.substring(0, 50)}...`);
      console.log('');
      console.log('🎉 YOUR LOGIN CREDENTIALS:');
      console.log('   ┌─────────────────────────────────────┐');
      console.log('   │  Username: rohan                   │');
      console.log('   │  Password: rohan123                │');
      console.log('   └─────────────────────────────────────┘');
      console.log('');
      console.log('💡 How to login:');
      console.log('   1. Go to your login page');
      console.log('   2. Enter Username: rohan');
      console.log('   3. Enter Password: rohan123');
      console.log('   4. Click Login');
      console.log('');
      console.log('🌐 API Login Details:');
      console.log('   Endpoint: POST http://localhost:5000/api/auth/login');
      console.log('   Body: {"username":"rohan","password":"rohan123"}');
      
    } else {
      console.log('❌ LOGIN FAILED:');
      console.log(`   Error: ${result.message}`);
      console.log('');
      console.log('🔍 Debug Info:');
      console.log('   Response:', JSON.stringify(result, null, 2));
    }
    
  } catch (error) {
    console.log('❌ CONNECTION ERROR:');
    console.log(`   ${error.message}`);
    console.log('');
    console.log('🔧 Make sure the backend server is running on http://localhost:5000');
  }
}

testRohanLogin().catch(console.error);