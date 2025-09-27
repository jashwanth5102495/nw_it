const { default: fetch } = require('node-fetch');

// Test authentication with detailed logging
async function testAuthLogging() {
  try {
    console.log('🧪 Testing authentication with detailed logging...\n');
    
    // Step 1: Login to get a token
    const timestamp = Date.now();
    const loginData = {
      username: `testuser${timestamp}`,
      password: 'password123'
    };
    
    // First register a user
    console.log('1. Registering a new test user...');
    const registrationData = {
      firstName: 'Test',
      lastName: 'User',
      email: `testuser${timestamp}@example.com`,
      phone: '+1234567890',
      username: loginData.username,
      password: loginData.password,
      dateOfBirth: '1995-01-01',
      education: 'bachelors',
      experience: 'beginner',
      address: {
        street: '123 Test St',
        city: 'Test City',
        state: 'Test State',
        zipCode: '12345',
        country: 'United States'
      }
    };
    
    const registerResponse = await fetch('http://localhost:5000/api/students/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(registrationData)
    });
    
    const registerResult = await registerResponse.json();
    if (!registerResult.success) {
      console.log('❌ Registration failed:', registerResult.message);
      return;
    }
    
    const { token, student } = registerResult.data;
    console.log('✅ Registration successful');
    console.log('Student ID:', student.id);
    console.log('Token preview:', token.substring(0, 50) + '...\n');
    
    // Step 2: Test profile access to trigger authentication middleware
    console.log('2. Testing profile access (this will trigger auth middleware)...');
    console.log('Making request to:', `/api/students/profile/${student.id}`);
    console.log('With token:', token.substring(0, 50) + '...\n');
    
    const profileResponse = await fetch(`http://localhost:5000/api/students/profile/${student.id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    const profileResult = await profileResponse.json();
    console.log('Profile access result:', profileResult.success ? '✅ Success' : '❌ Failed');
    if (!profileResult.success) {
      console.log('Error:', profileResult.message);
    } else {
      console.log('Profile data received for:', `${profileResult.data.firstName} ${profileResult.data.lastName}`);
    }
    
    // Step 3: Test enrollment to see more auth logging
    console.log('\n3. Testing course enrollment (more auth middleware logging)...');
    const enrollmentData = {
      courseId: 'ai-tools-mastery',
      paymentDetails: {
        amount: 12000,
        method: 'testing',
        transactionId: `TEST_${Date.now()}`
      },
      referralCode: null
    };
    
    const enrollResponse = await fetch(`http://localhost:5000/api/students/${student.id}/enroll`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(enrollmentData)
    });
    
    const enrollResult = await enrollResponse.json();
    console.log('Enrollment result:', enrollResult.success ? '✅ Success' : '❌ Failed');
    if (!enrollResult.success) {
      console.log('Error:', enrollResult.message);
    } else {
      console.log('Enrolled in:', enrollResult.data.courseTitle);
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

testAuthLogging();