const axios = require('axios');

async function simulateFrontendLogin() {
  try {
    console.log('=== Simulating Frontend Login Process ===\n');
    
    // Step 1: Login API call (what frontend does)
    console.log('1. Calling login API...');
    const loginResponse = await axios.post('http://localhost:5000/api/students/login', {
      username: 'jash',
      password: 'password123'
    });

    const loginResult = loginResponse.data;
    
    if (loginResult.success) {
      console.log('✅ Login successful!');
      
      // Step 2: Prepare userData for localStorage (what frontend does)
      const userData = {
        ...loginResult.data.student,
        isAuthenticated: true,
        token: loginResult.data.token
      };
      
      console.log('\n2. User data that would be stored in localStorage:');
      console.log(JSON.stringify(userData, null, 2));
      
      // Step 3: Fetch purchased courses (what StudentPortal does)
      console.log('\n3. Fetching purchased courses for email:', userData.email);
      const coursesResponse = await axios.get(`http://localhost:5000/api/courses/purchased/${userData.email}`);
      const coursesResult = coursesResponse.data;
      
      if (coursesResult.success) {
        console.log('✅ Purchased courses fetched successfully!');
        console.log('Number of purchased courses:', coursesResult.count);
        
        if (coursesResult.count > 0) {
          console.log('\n4. Course details:');
          coursesResult.data.forEach((course, index) => {
            console.log(`Course ${index + 1}:`);
            console.log(`  - ID: ${course.id}`);
            console.log(`  - Title: ${course.title}`);
            console.log(`  - Price: $${course.finalPrice}`);
            console.log(`  - Purchase Date: ${course.purchaseDate}`);
          });
          
          // Step 4: Show what courseIds would be stored
          const courseIds = coursesResult.data.map(course => course.id);
          console.log('\n5. Course IDs that would be stored in purchasedCourses localStorage:');
          console.log(JSON.stringify(courseIds, null, 2));
        } else {
          console.log('❌ No purchased courses found');
        }
      } else {
        console.log('❌ Failed to fetch purchased courses:', coursesResult.message);
      }
      
      console.log('\n=== Frontend Login Simulation Complete ===');
      console.log('\nTo test in browser:');
      console.log('1. Go to http://localhost:3000/student-login');
      console.log('2. Login with username: jash, password: password123');
      console.log('3. Navigate to "My Courses" tab');
      console.log('4. You should see the purchased course displayed');
      
    } else {
      console.log('❌ Login failed:', loginResult.message);
    }
  } catch (error) {
    console.error('❌ Error during simulation:', error.message);
  }
}

simulateFrontendLogin();