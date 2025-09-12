// Test script to simulate frontend authentication flow
import fetch from 'node-fetch';

async function testAuthFlow() {
  console.log('Testing authentication flow...');
  
  // Step 1: Login with first user
  console.log('\n1. Logging in with new@gmail.com...');
  const loginResponse1 = await fetch('http://localhost:5000/api/students/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'new@gmail.com',
      password: 'new123'
    })
  });
  
  const loginData1 = await loginResponse1.json();
  console.log('User 1 ID:', loginData1.data.student.id);
  console.log('User 1 Name:', loginData1.data.student.firstName, loginData1.data.student.lastName);
  
  // Step 2: Fetch profile for first user
  console.log('\n2. Fetching profile for User 1...');
  const profileResponse1 = await fetch(`http://localhost:5000/api/students/profile/${loginData1.data.student.id}`, {
    headers: {
      'Authorization': `Bearer ${loginData1.data.token}`,
      'Content-Type': 'application/json'
    }
  });
  
  const profileData1 = await profileResponse1.json();
  console.log('Profile Name:', profileData1.data.firstName, profileData1.data.lastName);
  console.log('Profile Email:', profileData1.data.email);
  
  // Step 3: Login with second user
  console.log('\n3. Logging in with test2@gmail.com...');
  const loginResponse2 = await fetch('http://localhost:5000/api/students/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'test2@gmail.com',
      password: 'test123'
    })
  });
  
  const loginData2 = await loginResponse2.json();
  console.log('User 2 ID:', loginData2.data.student.id);
  console.log('User 2 Name:', loginData2.data.student.firstName, loginData2.data.student.lastName);
  
  // Step 4: Fetch profile for second user
  console.log('\n4. Fetching profile for User 2...');
  const profileResponse2 = await fetch(`http://localhost:5000/api/students/profile/${loginData2.data.student.id}`, {
    headers: {
      'Authorization': `Bearer ${loginData2.data.token}`,
      'Content-Type': 'application/json'
    }
  });
  
  const profileData2 = await profileResponse2.json();
  console.log('Profile Name:', profileData2.data.firstName, profileData2.data.lastName);
  console.log('Profile Email:', profileData2.data.email);
  
  // Step 5: Cross-check - try to access User 1's profile with User 2's token
  console.log('\n5. Cross-check: Accessing User 1 profile with User 2 token...');
  const crossCheckResponse = await fetch(`http://localhost:5000/api/students/profile/${loginData1.data.student.id}`, {
    headers: {
      'Authorization': `Bearer ${loginData2.data.token}`,
      'Content-Type': 'application/json'
    }
  });
  
  if (crossCheckResponse.ok) {
    const crossCheckData = await crossCheckResponse.json();
    console.log('SECURITY ISSUE: User 2 can access User 1 data!');
    console.log('Accessed Name:', crossCheckData.data.firstName, crossCheckData.data.lastName);
  } else {
    console.log('GOOD: Cross-access denied with status:', crossCheckResponse.status);
  }
  
  console.log('\nTest completed!');
}

testAuthFlow().catch(console.error);