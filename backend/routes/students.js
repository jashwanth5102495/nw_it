const express = require('express');
const jwt = require('jsonwebtoken');
const Student = require('../models/Student');
const Course = require('../models/Course');
const { authenticateStudent, authorizeOwnProfile } = require('../middleware/auth');
const router = express.Router();

// Generate JWT token
const generateToken = (studentId) => {
  return jwt.sign(
    { studentId, type: 'student' },
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: '7d' }
  );
};

// Student registration
router.post('/register', async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      password,
      dateOfBirth,
      address,
      selectedCourse,
      paymentDetails,
      loginMethod
    } = req.body;

    // Check if student already exists
    const existingStudent = await Student.findByEmail(email);
    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: 'Student with this email already exists'
      });
    }

    // Generate unique student ID
    const { v4: uuidv4 } = require('uuid');
    const studentId = `STU-${uuidv4().substring(0, 8).toUpperCase()}`;

    // Find the selected course
    const course = await Course.findOne({ courseId: selectedCourse.courseId });
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Selected course not found'
      });
    }

    // Create new student
    const student = new Student({
      studentId,
      firstName,
      lastName,
      email,
      phone,
      password: loginMethod === 'google' ? undefined : password,
      dateOfBirth: new Date(dateOfBirth),
      address,
      loginMethod: loginMethod || 'email'
    });

    // Add payment history
    student.paymentHistory.push({
      courseId: course._id,
      amount: paymentDetails.amount,
      discountCode: paymentDetails.discountCode || null,
      discountAmount: paymentDetails.discountAmount || 0,
      paymentMethod: paymentDetails.method,
      transactionId: paymentDetails.transactionId || `TXN-${Date.now()}`,
      status: 'completed'
    });

    // Enroll in the selected course
    await student.enrollInCourse(course._id);

    await student.save();

    // Generate token
    const token = generateToken(student._id);

    res.status(201).json({
      success: true,
      message: 'Student registered successfully',
      data: {
        student: {
          id: student._id,
          studentId: student.studentId,
          firstName: student.firstName,
          lastName: student.lastName,
          email: student.email,
          enrolledCourses: student.enrolledCourses
        },
        token
      }
    });
  } catch (error) {
    console.error('Error registering student:', error);
    res.status(500).json({
      success: false,
      message: 'Error registering student',
      error: error.message
    });
  }
});

// Student login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required'
      });
    }

    // Find student by email
    const student = await Student.findByEmail(email).populate('enrolledCourses.courseId');
    if (!student) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check password
    const isPasswordValid = await student.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Update last login
    student.lastLogin = new Date();
    await student.save();

    // Generate token
    const token = generateToken(student._id);

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        student: {
          id: student._id,
          studentId: student.studentId,
          firstName: student.firstName,
          lastName: student.lastName,
          email: student.email,
          enrolledCourses: student.enrolledCourses,
          lastLogin: student.lastLogin
        },
        token
      }
    });
  } catch (error) {
    console.error('Error during student login:', error);
    res.status(500).json({
      success: false,
      message: 'Error during login',
      error: error.message
    });
  }
});

// Get student profile (requires authentication)
router.get('/profile/:id', authenticateStudent, authorizeOwnProfile, async (req, res) => {
  try {
    const student = await Student.findById(req.params.id)
      .populate('enrolledCourses.courseId')
      .populate('paymentHistory.courseId');

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    res.json({
      success: true,
      data: {
        id: student._id,
        studentId: student.studentId,
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email,
        phone: student.phone,
        dateOfBirth: student.dateOfBirth,
        address: student.address,
        enrolledCourses: student.enrolledCourses,
        paymentHistory: student.paymentHistory,
        createdAt: student.createdAt,
        lastLogin: student.lastLogin
      }
    });
  } catch (error) {
    console.error('Error fetching student profile:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching student profile',
      error: error.message
    });
  }
});

// Update student profile
router.put('/profile/:id', authenticateStudent, authorizeOwnProfile, async (req, res) => {
  try {
    const allowedUpdates = ['firstName', 'lastName', 'phone', 'address'];
    const updates = {};

    Object.keys(req.body).forEach(key => {
      if (allowedUpdates.includes(key)) {
        updates[key] = req.body[key];
      }
    });

    const student = await Student.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        id: student._id,
        studentId: student.studentId,
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email,
        phone: student.phone,
        address: student.address
      }
    });
  } catch (error) {
    console.error('Error updating student profile:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating student profile',
      error: error.message
    });
  }
});

// Enroll in additional course
router.post('/:id/enroll', authenticateStudent, authorizeOwnProfile, async (req, res) => {
  try {
    const { courseId, paymentDetails } = req.body;

    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    const course = await Course.findOne({ courseId });
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    // Check if already enrolled
    const existingEnrollment = student.enrolledCourses.find(
      enrollment => enrollment.courseId.toString() === course._id.toString()
    );

    if (existingEnrollment) {
      return res.status(400).json({
        success: false,
        message: 'Already enrolled in this course'
      });
    }

    // Add payment history
    student.paymentHistory.push({
      courseId: course._id,
      amount: paymentDetails.amount,
      discountCode: paymentDetails.discountCode || null,
      discountAmount: paymentDetails.discountAmount || 0,
      paymentMethod: paymentDetails.method,
      transactionId: paymentDetails.transactionId || `TXN-${Date.now()}`,
      status: 'completed'
    });

    // Enroll in course
    await student.enrollInCourse(course._id);

    res.json({
      success: true,
      message: 'Successfully enrolled in course',
      data: {
        courseId: course.courseId,
        courseTitle: course.title,
        enrollmentDate: new Date()
      }
    });
  } catch (error) {
    console.error('Error enrolling in course:', error);
    res.status(500).json({
      success: false,
      message: 'Error enrolling in course',
      error: error.message
    });
  }
});

// Update course progress
router.put('/:id/progress', authenticateStudent, authorizeOwnProfile, async (req, res) => {
  try {
    const { courseId, progress, completedModules } = req.body;

    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    const course = await Course.findOne({ courseId });
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    await student.updateCourseProgress(course._id, progress, completedModules);

    res.json({
      success: true,
      message: 'Progress updated successfully',
      data: {
        courseId,
        progress,
        completedModules
      }
    });
  } catch (error) {
    console.error('Error updating progress:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating progress',
      error: error.message
    });
  }
});

// Get all students (Admin only)
router.get('/', async (req, res) => {
  try {
    const { page = 1, limit = 10, search } = req.query;
    const skip = (page - 1) * limit;

    let query = { isActive: true };
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { studentId: { $regex: search, $options: 'i' } }
      ];
    }

    const students = await Student.find(query)
      .populate('enrolledCourses.courseId', 'title courseId')
      .select('-password')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Student.countDocuments(query);

    res.json({
      success: true,
      data: students,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total
      }
    });
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching students',
      error: error.message
    });
  }
});

module.exports = router;