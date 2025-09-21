const express = require('express');
const Course = require('../models/Course');
const router = express.Router();

// Get all active courses
router.get('/', async (req, res) => {
  try {
    const { category, level } = req.query;
    let query = { isActive: true };
    
    if (category) {
      query.category = category;
    }
    
    if (level) {
      query.level = level;
    }
    
    const courses = await Course.find(query).sort({ createdAt: -1 });
    
    res.json({
      success: true,
      data: courses,
      count: courses.length
    });
  } catch (error) {
    console.error('Error fetching courses:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching courses',
      error: error.message
    });
  }
});

// Get course by ID
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }
    
    res.json({
      success: true,
      data: course
    });
  } catch (error) {
    console.error('Error fetching course:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching course',
      error: error.message
    });
  }
});

// Get course by courseId
router.get('/code/:courseId', async (req, res) => {
  try {
    const course = await Course.findOne({ courseId: req.params.courseId });
    
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }
    
    res.json({
      success: true,
      data: course
    });
  } catch (error) {
    console.error('Error fetching course:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching course',
      error: error.message
    });
  }
});


// Create new course (Admin only)
router.post('/', async (req, res) => {
  try {
    const courseData = req.body;
    
    // Generate unique courseId if not provided
    if (!courseData.courseId) {
      const { v4: uuidv4 } = require('uuid');
      courseData.courseId = `COURSE-${uuidv4().substring(0, 8).toUpperCase()}`;
    }
    
    const course = new Course(courseData);
    await course.save();
    
    res.status(201).json({
      success: true,
      message: 'Course created successfully',
      data: course
    });
  } catch (error) {
    console.error('Error creating course:', error);
    
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Course with this ID already exists'
      });
    }
    
    res.status(500).json({
      success: false,
      message: 'Error creating course',
      error: error.message
    });
  }
});

// Update course (Admin only)
router.put('/:id', async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Course updated successfully',
      data: course
    });
  } catch (error) {
    console.error('Error updating course:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating course',
      error: error.message
    });
  }
});

// Delete course (Admin only)
router.delete('/:id', async (req, res) => {
  try {
    const course = await Course.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Course deactivated successfully'
    });
  } catch (error) {
    console.error('Error deactivating course:', error);
    res.status(500).json({
      success: false,
      message: 'Error deactivating course',
      error: error.message
    });
  }
});

// Get courses by category
router.get('/category/:category', async (req, res) => {
  try {
    const courses = await Course.getByCategory(req.params.category);
    
    res.json({
      success: true,
      data: courses,
      count: courses.length
    });
  } catch (error) {
    console.error('Error fetching courses by category:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching courses by category',
      error: error.message
    });
  }
});

// Get courses by level
router.get('/level/:level', async (req, res) => {
  try {
    const courses = await Course.find({ level: req.params.level, isActive: true });
    
    res.json({
      success: true,
      data: courses,
      count: courses.length
    });
  } catch (error) {
    console.error('Error fetching courses by level:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching courses by level',
      error: error.message
    });
  }
});

// Purchase course endpoint
router.post('/purchase', async (req, res) => {
  try {
    const { courseId, studentId, paymentId, referralCode } = req.body;
    
    // Verify course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }
    
    // Calculate price with referral discount
    let finalPrice = course.price;
    let discount = 0;
    
    if (referralCode === 'REFER60') {
      discount = 60;
      finalPrice = course.price * 0.4; // 60% discount
    }
    
    // Create purchase record
    const Purchase = require('../models/Purchase');
    const purchase = new Purchase({
      studentId,
      courseId,
      originalPrice: course.price,
      finalPrice,
      discount,
      referralCode: referralCode || null,
      paymentId,
      status: 'completed',
      purchaseDate: new Date()
    });
    
    await purchase.save();
    
    res.json({
      success: true,
      message: 'Course purchased successfully',
      data: {
        purchaseId: purchase._id,
        courseId,
        finalPrice,
        discount
      }
    });
  } catch (error) {
    console.error('Error processing course purchase:', error);
    res.status(500).json({
      success: false,
      message: 'Error processing course purchase',
      error: error.message
    });
  }
});

// Get purchased courses for a student
router.get('/purchased/:studentId', async (req, res) => {
  try {
    const Purchase = require('../models/Purchase');
    const purchases = await Purchase.find({ 
      studentId: req.params.studentId,
      status: 'completed'
    }).populate('courseId');
    
    const purchasedCourses = purchases.map(purchase => ({
      ...purchase.courseId.toObject(),
      purchaseDate: purchase.purchaseDate,
      finalPrice: purchase.finalPrice,
      discount: purchase.discount
    }));
    
    res.json({
      success: true,
      data: purchasedCourses,
      count: purchasedCourses.length
    });
  } catch (error) {
    console.error('Error fetching purchased courses:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching purchased courses',
      error: error.message
    });
  }
});

// Verify referral code
router.post('/verify-referral', async (req, res) => {
  try {
    const { referralCode } = req.body;
    
    // Simple referral code validation
    const validCodes = {
      'REFER60': { discount: 60, description: '60% off on all courses' }
    };
    
    if (validCodes[referralCode]) {
      res.json({
        success: true,
        valid: true,
        discount: validCodes[referralCode].discount,
        description: validCodes[referralCode].description
      });
    } else {
      res.json({
        success: true,
        valid: false,
        message: 'Invalid referral code'
      });
    }
  } catch (error) {
    console.error('Error verifying referral code:', error);
    res.status(500).json({
      success: false,
      message: 'Error verifying referral code',
      error: error.message
    });
  }
});

// Update course progress
router.post('/progress/update', async (req, res) => {
  try {
    const { studentId, courseId, lessonId, progress } = req.body;
    
    const Purchase = require('../models/Purchase');
    
    // Find the purchase record
    const purchase = await Purchase.findOne({ 
      studentId, 
      courseId,
      status: 'completed'
    });
    
    if (!purchase) {
      return res.status(404).json({
        success: false,
        message: 'Course not purchased or purchase not found'
      });
    }
    
    // Update progress
    purchase.progress = Math.max(purchase.progress, progress);
    purchase.lastAccessedAt = new Date();
    
    // Add completed lesson if provided
    if (lessonId) {
      const existingLesson = purchase.completedLessons.find(
        lesson => lesson.lessonId === lessonId
      );
      
      if (!existingLesson) {
        purchase.completedLessons.push({
          lessonId,
          completedAt: new Date()
        });
      }
    }
    
    await purchase.save();
    
    res.json({
      success: true,
      message: 'Progress updated successfully',
      data: {
        progress: purchase.progress,
        completedLessons: purchase.completedLessons.length
      }
    });
  } catch (error) {
    console.error('Error updating course progress:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating course progress',
      error: error.message
    });
  }
});

// Get course progress
router.get('/progress/:studentId/:courseId', async (req, res) => {
  try {
    const { studentId, courseId } = req.params;
    
    const Purchase = require('../models/Purchase');
    
    const purchase = await Purchase.findOne({ 
      studentId, 
      courseId,
      status: 'completed'
    });
    
    if (!purchase) {
      return res.status(404).json({
        success: false,
        message: 'Course not purchased or purchase not found'
      });
    }
    
    res.json({
      success: true,
      data: {
        progress: purchase.progress,
        completedLessons: purchase.completedLessons,
        lastAccessedAt: purchase.lastAccessedAt,
        purchaseDate: purchase.purchaseDate
      }
    });
  } catch (error) {
    console.error('Error fetching course progress:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching course progress',
      error: error.message
    });
  }
});

module.exports = router;