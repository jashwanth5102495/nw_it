const axios = require('axios');

// Test the Students API endpoint

const testStudentsAPI = async () => {
  try {
    console.log('Testing Students API endpoint...');
    
    // Test the GET /api/students endpoint
    const response = await axios.get('http://localhost:5000/api/students', {
      headers: {
        'Authorization': 'Bearer test-token' // You might need a valid token
      }
    });

    console.log('API Response Status:', response.status);
    console.log('Response structure:', Object.keys(response.data));
    console.log('Total Students:', response.data.data?.length || 0);
    
    if (response.data.data && response.data.data.length > 0) {
      console.log('\n=== Students Data ===');
      
      response.data.data.forEach((student, index) => {
        console.log(`\n--- Student ${index + 1} ---`);
        console.log(`Name: ${student.firstName} ${student.lastName}`);
        console.log(`Email: ${student.email}`);
        console.log(`Student ID: ${student.studentId}`);
        
        console.log(`\nEnrolled Courses (${student.enrolledCourses?.length || 0}):`);
        if (student.enrolledCourses && student.enrolledCourses.length > 0) {
          student.enrolledCourses.forEach((enrollment, i) => {
            console.log(`  ${i + 1}. Course ID: ${enrollment.courseId}`);
            if (typeof enrollment.courseId === 'object') {
              console.log(`     Title: ${enrollment.courseId.title}`);
              console.log(`     Course ID: ${enrollment.courseId.courseId}`);
            }
            console.log(`     Progress: ${enrollment.progress}%, Status: ${enrollment.status}`);
          });
        } else {
          console.log('  No enrolled courses');
        }
        
        console.log(`\nPayment History (${student.paymentHistory?.length || 0}):`);
        if (student.paymentHistory && student.paymentHistory.length > 0) {
          student.paymentHistory.forEach((payment, i) => {
            console.log(`  ${i + 1}. Course ID: ${payment.courseId}`);
            if (typeof payment.courseId === 'object') {
              console.log(`     Title: ${payment.courseId.title}`);
              console.log(`     Course ID: ${payment.courseId.courseId}`);
            }
            console.log(`     Amount: ₹${payment.amount}, Status: ${payment.status}`);
          });
        } else {
          console.log('  No payment history');
        }
      });
    }

  } catch (error) {
    console.error('Error testing API:', error.message);
    if (error.response) {
      console.error('Response status:', error.response.status);
      console.error('Response data:', error.response.data);
    }
  }
};

testStudentsAPI();