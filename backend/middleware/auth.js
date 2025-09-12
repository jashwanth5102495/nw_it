const jwt = require('jsonwebtoken');
const Student = require('../models/Student');

// Middleware to verify JWT token and extract student ID
const authenticateStudent = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'Access denied. No token provided or invalid format.'
      });
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
      
      // Check if token is for a student
      if (decoded.type !== 'student') {
        return res.status(401).json({
          success: false,
          message: 'Invalid token type.'
        });
      }

      // Verify student exists
      const student = await Student.findById(decoded.studentId);
      if (!student) {
        return res.status(401).json({
          success: false,
          message: 'Student not found.'
        });
      }

      // Add student info to request object
      req.student = {
        id: decoded.studentId,
        studentData: student
      };
      
      next();
    } catch (jwtError) {
      return res.status(401).json({
        success: false,
        message: 'Invalid token.'
      });
    }
  } catch (error) {
    console.error('Authentication middleware error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during authentication.'
    });
  }
};

// Middleware to ensure user can only access their own data
const authorizeOwnProfile = (req, res, next) => {
  try {
    const requestedUserId = req.params.id;
    const authenticatedUserId = req.student.id;
    
    if (requestedUserId !== authenticatedUserId) {
      return res.status(403).json({
        success: false,
        message: 'Access denied. You can only access your own profile.'
      });
    }
    
    next();
  } catch (error) {
    console.error('Authorization middleware error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error during authorization.'
    });
  }
};

module.exports = {
  authenticateStudent,
  authorizeOwnProfile
};