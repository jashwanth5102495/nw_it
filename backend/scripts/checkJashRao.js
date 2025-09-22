const mongoose = require('mongoose');
const Student = require('../models/Student');
const Course = require('../models/Course');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/nw_it_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const checkJashRao = async () => {
  try {
    console.log('Checking for Jash Rao in database...');

    // Search for students with name containing "jash" (case insensitive)
    const students = await Student.find({
      $or: [
        { firstName: { $regex: /jash/i } },
        { lastName: { $regex: /rao/i } },
        { email: { $regex: /jash/i } }
      ]
    }).populate('enrolledCourses.courseId', 'title courseId')
      .populate('paymentHistory.courseId', 'title courseId');

    console.log(`Found ${students.length} students matching "Jash Rao":`);
    
    students.forEach((student, index) => {
      console.log(`\n--- Student ${index + 1} ---`);
      console.log(`Name: ${student.firstName} ${student.lastName}`);
      console.log(`Email: ${student.email}`);
      console.log(`Student ID: ${student.studentId}`);
      
      console.log(`\nEnrolled Courses (${student.enrolledCourses.length}):`);
      student.enrolledCourses.forEach((enrollment, i) => {
        console.log(`  ${i + 1}. ${enrollment.courseId?.title || 'Course not found'} (${enrollment.courseId?.courseId || 'N/A'})`);
        console.log(`     Progress: ${enrollment.progress}%, Status: ${enrollment.status}`);
      });
      
      console.log(`\nPayment History (${student.paymentHistory.length}):`);
      student.paymentHistory.forEach((payment, i) => {
        console.log(`  ${i + 1}. ${payment.courseId?.title || 'Course not found'} (${payment.courseId?.courseId || 'N/A'})`);
        console.log(`     Amount: ₹${payment.amount}, Status: ${payment.status}`);
        console.log(`     Payment Date: ${payment.paymentDate}`);
      });
    });

    // Also check all courses to see what's available
    console.log('\n=== Available Courses ===');
    const courses = await Course.find({});
    console.log(`Total courses in database: ${courses.length}`);
    courses.forEach((course, index) => {
      console.log(`${index + 1}. ${course.title} (${course.courseId})`);
    });

    // Check if the specific courses exist
    const aiCourse = await Course.findOne({ title: { $regex: /AI Tools Mastery/i } });
    const frontendCourse = await Course.findOne({ title: { $regex: /Frontend Development.*Beginner/i } });
    
    console.log('\n=== Specific Course Check ===');
    console.log('AI Tools Mastery:', aiCourse ? 'Found' : 'Not Found');
    console.log('Frontend Development - Beginner:', frontendCourse ? 'Found' : 'Not Found');

  } catch (error) {
    console.error('Error checking Jash Rao:', error);
  } finally {
    mongoose.connection.close();
  }
};

checkJashRao();