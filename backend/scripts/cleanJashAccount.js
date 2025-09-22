const mongoose = require('mongoose');
const Student = require('../models/Student');

mongoose.connect('mongodb://localhost:27017/jasnav_projects', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const findAndCleanJashAccount = async () => {
  try {
    console.log('Searching for Jash accounts...');
    
    // Search for any account with jash in name or email
    const students = await Student.find({
      $or: [
        { firstName: { $regex: /jash/i } },
        { lastName: { $regex: /rao/i } },
        { email: { $regex: /jash/i } }
      ]
    });

    console.log('Found', students.length, 'matching students:');
    
    for (let student of students) {
      console.log('---');
      console.log('Name:', student.firstName, student.lastName);
      console.log('Email:', student.email);
      console.log('Student ID:', student.studentId);
      console.log('Enrolled courses:', student.enrolledCourses.length);
      console.log('Payment history:', student.paymentHistory.length);
      
      // If this account has courses but shouldn't (new account), clear them
      if (student.enrolledCourses.length > 0 || student.paymentHistory.length > 0) {
        console.log('Clearing courses and payments for this account...');
        student.enrolledCourses = [];
        student.paymentHistory = [];
        await student.save();
        console.log('✅ Account cleaned');
      }
    }
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    mongoose.connection.close();
  }
};

findAndCleanJashAccount();