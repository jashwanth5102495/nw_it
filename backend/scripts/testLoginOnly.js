const { default: fetch } = require('node-fetch');

// Test login with existing user
async function testLogin() {
  try {
    console.log('Testing login with existing student...');
    
    // Use the username we just created
    const loginData = {
      username: 'teststudent1758643543049', // From the previous test
      password: 'password123'
    };
    
    console.log('Attempting to login with:', loginData.username);
    const loginResponse = await fetch('http://localhost:5000/api/students/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginData)
    });
    
    const loginResult = await loginResponse.json();
    console.log('Login result:', JSON.stringify(loginResult, null, 2));
    
    if (loginResult.success) {
      const { token, student } = loginResult.data;
      console.log('✅ Login successful!');
      console.log('Token length:', token.length);
      console.log('Student ID:', student.id);
      
      // Now try to access profile to test authentication
      console.log('\nTesting profile access...');
      const profileResponse = await fetch(`http://localhost:5000/api/students/profile/${student.id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const profileResult = await profileResponse.json();
      console.log('Profile result:', JSON.stringify(profileResult, null, 2));
      
    } else {
      console.log('❌ Login failed');
    }
    
  } catch (error) {
    console.error('Test failed:', error);
  }
}

testLogin();
