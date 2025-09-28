const mongoose = require('mongoose');
const User = require('../models/User');
const Student = require('../models/Student');
const Course = require('../models/Course');
const Payment = require('../models/Payment');

async function createJashTestData() {
  try {
    await mongoose.connect('mongodb://localhost:27017/jasnav_projects');
    console.log('Connected to MongoDB (jasnav_projects)');

    // Create a test user
    const timestamp = Date.now();
    const userData = {
      username: `jashtest_${timestamp}`,
      email: `jashtest_${timestamp}@example.com`,
      password: 'password123',
      role: 'student'
    };

    let user = await User.findOne({ email: userData.email });
    if (!user) {
      user = new User(userData);
      await user.save();
      console.log('Created test user:', user.email);
    } else {
      console.log('Using existing user:', user.email);
    }

    // Create a test student
    const studentData = {
      user_id: user._id,
      studentId: 'JASH001',
      firstName: 'Jash',
      lastName: 'Test',
      email: userData.email,
      phone: '+1234567890',
      education: 'bachelors',
      dateOfBirth: new Date('1995-01-01'),
      address: {
        street: '123 Test Street',
        city: 'Test City',
        state: 'Test State',
        zipCode: '12345',
        country: 'Test Country'
      }
    };

    let student = await Student.findOne({ email: studentData.email });
    if (!student) {
      student = new Student(studentData);
      await student.save();
      console.log('Created test student:', student.firstName, student.lastName);
    } else {
      console.log('Using existing student:', student.firstName, student.lastName);
    }

    // Get a course (or create one if none exists)
    let course = await Course.findOne({});
    if (!course) {
      course = new Course({
        courseId: 'JASH_TEST_COURSE',
        title: 'Test Course for JASH',
        description: 'A test course for JASH referral testing',
        price: 4999,
        duration: '4 weeks',
        level: 'Beginner',
        category: 'Test'
      });
      await course.save();
      console.log('Created test course:', course.title);
    } else {
      console.log('Using existing course:', course.title);
    }

    // Create a payment with JASH referral code
    const paymentData = {
      paymentId: `PAY_JASH_${Date.now()}`,
      studentId: student._id,
      courseId: course._id,
      courseName: course.title,
      amount: 1999.60,
      currency: 'INR',
      paymentMethod: 'manual_qr',
      status: 'completed',
      confirmationStatus: 'confirmed',
      transactionId: `TXN_JASH_${Date.now()}`,
      studentName: `${student.firstName} ${student.lastName}`,
      studentEmail: student.email,
      originalAmount: 4999,
      referralCode: 'JASH',
      discountAmount: 2999.40,
      commissionAmount: 1199.76,
      commissionPaid: false,
      paymentDate: new Date()
    };

    const payment = new Payment(paymentData);
    await payment.save();
    console.log('Created payment with JASH referral code');
    console.log('Payment ID:', payment.paymentId);
    console.log('Student ID in payment:', payment.studentId);
    console.log('Referral Code:', payment.referralCode);

    // Test the API endpoint
    console.log('\n=== Testing API Endpoint ===');
    const response = await fetch('http://localhost:5000/api/students/by-referral/JASH');
    const data = await response.json();
    console.log('API Response:', JSON.stringify(data, null, 2));

    mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error);
    mongoose.disconnect();
  }
}

createJashTestData();