const mongoose = require('mongoose');
const Purchase = require('../models/Purchase');
const Student = require('../models/Student');
const Course = require('../models/Course');

async function checkJashData() {
  try {
    await mongoose.connect('mongodb://localhost:27017/jasnav_projects');
    console.log('Connected to MongoDB');

    // Find jash student (correct email)
    const student = await Student.findOne({ email: 'jash@example.com' });
    console.log('\n=== Jash Student Data ===');
    if (student) {
      console.log('Student found:', student.firstName, student.lastName);
      console.log('Email:', student.email);
      console.log('Student ID:', student.studentId);
    } else {
      console.log('Student not found');
    }

    // Check purchases for jash
    console.log('\n=== Purchase Records ===');
    const purchases = await Purchase.find({ 
      studentId: student?.studentId 
    }).populate('courseId');
    
    console.log('Total purchases:', purchases.length);
    purchases.forEach((purchase, i) => {
      console.log(`Purchase ${i + 1}:`);
      console.log('  Course:', purchase.courseId?.title || 'Course not found');
      console.log('  Course ID:', purchase.courseId?._id);
      console.log('  Course courseId:', purchase.courseId?.courseId);
      console.log('  Status:', purchase.status);
      console.log('  Payment ID:', purchase.paymentId);
      console.log('  Purchase Date:', purchase.purchaseDate);
    });

    // Test API endpoint
    console.log('\n=== API Test ===');
    const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
    const response = await fetch('http://localhost:5000/api/courses/purchased/jash@example.com');
    const result = await response.json();
    console.log('API Response:', JSON.stringify(result, null, 2));

    // Check what course IDs are returned
    if (result.success && result.data.length > 0) {
      console.log('\n=== Course IDs from API ===');
      result.data.forEach((course, i) => {
        console.log(`Course ${i + 1}:`);
        console.log('  _id:', course._id);
        console.log('  courseId:', course.courseId);
        console.log('  title:', course.title);
      });
    }

    await mongoose.disconnect();
  } catch (error) {
    console.error('Error:', error);
  }
}

checkJashData();