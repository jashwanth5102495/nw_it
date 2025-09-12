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

// Validate discount code
router.post('/validate-discount', async (req, res) => {
  try {
    const { courseId, discountCode } = req.body;
    
    if (!courseId || !discountCode) {
      return res.status(400).json({
        success: false,
        message: 'Course ID and discount code are required'
      });
    }
    
    const course = await Course.findOne({ courseId });
    
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }
    
    const isValid = course.discountCode && 
                   course.discountCode.toLowerCase() === discountCode.toLowerCase();
    
    if (isValid) {
      res.json({
        success: true,
        message: 'Discount code is valid',
        data: {
          originalPrice: course.price,
          discountPrice: course.discountPrice,
          savings: course.price - course.discountPrice
        }
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Invalid discount code'
      });
    }
  } catch (error) {
    console.error('Error validating discount code:', error);
    res.status(500).json({
      success: false,
      message: 'Error validating discount code',
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
    const courses = await Course.getByLevel(req.params.level);
    
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

module.exports = router;