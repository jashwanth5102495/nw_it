const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/jasnav_projects')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

async function testLogin() {
  try {
    // Test the login API endpoint
    const axios = require('axios');
    
    const response = await axios.post('http://localhost:5000/api/students/login', {
      username: 'jash',
      password: 'password123'
    }, {
      headers: {
        'Content-Type': 'application/json',
      }
    });

    const result = response.data;
    
    if (result.success) {
      console.log('Login successful!');
      console.log('Student data:', JSON.stringify(result.data.student, null, 2));
      console.log('Token:', result.data.token);
      
      // Test the purchased courses API
      console.log('\n--- Testing purchased courses API ---');
      const coursesResponse = await axios.get(`http://localhost:5000/api/courses/purchased/${result.data.student.email}`);
      const coursesResult = coursesResponse.data;
      
      console.log('Purchased courses result:', JSON.stringify(coursesResult, null, 2));
    } else {
      console.log('Login failed:', result.message);
    }
  } catch (error) {
    console.error('Error testing login:', error);
  } finally {
    mongoose.disconnect();
  }
}

testLogin();