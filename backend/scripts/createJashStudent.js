const mongoose = require('mongoose');
const Student = require('../models/Student');
const User = require('../models/User');

async function createJashStudent() {
  try {
    await mongoose.connect('mongodb://localhost:27017/jasnav_projects');
    console.log('Connected to MongoDB');

    // Check if student already exists
    const existingStudent = await Student.findOne({ email: 'jash@example.com' });
    if (existingStudent) {
      console.log('Student already exists:', existingStudent.firstName, existingStudent.lastName);
      await mongoose.disconnect();
      return;
    }

    // Check if user already exists
    let user = await User.findOne({ username: 'jash' });
    if (user) {
      console.log('User already exists with username: jash');
    } else {
      // Create User record for authentication
      user = new User({
        username: 'jash',
        password: 'password123', // This will be hashed by the User model
        role: 'student'
      });

      await user.save();
      console.log('User created successfully');
    }

    // Generate unique student ID
    const { v4: uuidv4 } = require('uuid');
    const studentId = `STU${Math.floor(Math.random() * 1000000)}`;



    // Create Student record
    const student = new Student({
      user_id: user._id,
      studentId,
      firstName: 'Jash',
      lastName: 'Patel',
      email: 'jash@example.com',
      phone: '+1234567890',
      dateOfBirth: new Date('1995-01-01'),
      address: {
        street: '123 Main St',
        city: 'Mumbai',
        state: 'Maharashtra',
        zipCode: '400001',
        country: 'India'
      },
      education: 'bachelors',
      experience: 'intermediate',
      isActive: true
    });

    await student.save();
    console.log('Student created successfully');
    console.log('Student ID:', student.studentId);
    console.log('Email:', student.email);
    console.log('Username:', user.username);

    await mongoose.disconnect();
    console.log('Student account created successfully!');
  } catch (error) {
    console.error('Error creating student:', error);
    await mongoose.disconnect();
  }
}

createJashStudent();