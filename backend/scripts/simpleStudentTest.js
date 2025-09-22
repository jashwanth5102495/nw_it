const mongoose = require('mongoose');
require('dotenv').config();

// Import models
const Student = require('../models/Student');

async function testStudent() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/vstudents');
    console.log('Connected to MongoDB');

    // Find all students
    const allStudents = await Student.find({});
    console.log(`Total students found: ${allStudents.length}`);
    
    allStudents.forEach((student, index) => {
      console.log(`${index + 1}. ${student.firstName} ${student.lastName} - ${student.email}`);
    });

    // Try to find the specific student
    const testStudent = await Student.findOne({ email: 'jash@example.com' });
    if (testStudent) {
      console.log('\n✓ Found test student:', testStudent.firstName, testStudent.lastName);
    } else {
      console.log('\n✗ Test student not found');
    }

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

testStudent();