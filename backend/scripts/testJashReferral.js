const mongoose = require('mongoose');
const Student = require('../models/Student');
const Course = require('../models/Course');
const Payment = require('../models/Payment');

async function testJashReferral() {
  try {
    await mongoose.connect('mongodb://localhost:27017/jasnav_projects');
    console.log('Connected to MongoDB');

    // Find an existing student or use the one we just created
    let student = await Student.findOne({ email: 'teststudent@example.com' });
    if (!student) {
      console.log('No test student found');
      return;
    }

    console.log('Using student:', student.firstName, student.lastName, 'ID:', student._id);

    // Get a course
    const course = await Course.findOne();
    if (!course) {
      console.log('No courses found');
      return;
    }

    console.log('Using course:', course.title, 'ID:', course._id);

    // Create a payment with JASH referral code
    const payment = new Payment({
      paymentId: `PAY_JASH_${Date.now()}`,
      studentId: student._id,
      courseId: course._id,
      courseName: course.title,
      amount: course.price * 0.4, // 60% discount
      originalAmount: course.price,
      transactionId: `TXN_JASH_${Date.now()}`,
      studentName: `${student.firstName} ${student.lastName}`,
      studentEmail: student.email,
      status: 'completed',
      confirmationStatus: 'confirmed',
      paymentMethod: 'manual_qr',
      referralCode: 'JASH',
      discountAmount: course.price * 0.6,
      commissionAmount: (course.price * 0.4) * 0.6 // 60% commission on discounted amount
    });

    await payment.save();
    console.log('Payment created with JASH referral code');
    console.log('Payment ID:', payment.paymentId);
    console.log('Student ID in payment:', payment.studentId);
    console.log('Referral Code:', payment.referralCode);

    // Test the API endpoint
    console.log('\n=== Testing API Endpoint ===');
    const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
    
    const response = await fetch('http://localhost:5000/api/students/by-referral/JASH');
    const result = await response.json();
    
    console.log('API Response:', JSON.stringify(result, null, 2));

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
  }
}

testJashReferral();