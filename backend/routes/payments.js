const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');
const Student = require('../models/Student');
const Course = require('../models/Course');

// Create a new payment record
router.post('/', async (req, res) => {
  try {
    const {
      paymentId,
      studentId,
      courseId,
      courseName,
      amount,
      originalAmount,
      studentName,
      studentEmail,
      discountCode,
      discountAmount,
      razorpayOrderId,
      razorpaySignature,
      metadata
    } = req.body;

    // Validate required fields
    if (!paymentId || !studentId || !courseId || !courseName || !amount || !studentName || !studentEmail) {
      return res.status(400).json({
        success: false,
        message: 'Missing required payment information'
      });
    }

    // Check if payment already exists
    const existingPayment = await Payment.findOne({ paymentId });
    if (existingPayment) {
      return res.status(400).json({
        success: false,
        message: 'Payment already recorded'
      });
    }

    // Verify student exists
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found'
      });
    }

    // Verify course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    // Create payment record
    const payment = new Payment({
      paymentId,
      studentId,
      courseId,
      courseName,
      amount,
      originalAmount: originalAmount || amount,
      transactionId: paymentId, // Using paymentId as transactionId for Razorpay
      studentName,
      studentEmail,
      discountCode,
      discountAmount: discountAmount || 0,
      razorpayOrderId,
      razorpaySignature,
      metadata: metadata || {},
      status: 'completed'
    });

    await payment.save();

    res.status(201).json({
      success: true,
      message: 'Payment recorded successfully',
      data: {
        paymentId: payment.paymentId,
        amount: payment.amount,
        courseName: payment.courseName,
        paymentDate: payment.paymentDate
      }
    });
  } catch (error) {
    console.error('Error recording payment:', error);
    res.status(500).json({
      success: false,
      message: 'Error recording payment',
      error: error.message
    });
  }
});

// Get all payments (Admin only)
router.get('/', async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      status,
      courseId,
      studentId,
      startDate,
      endDate,
      sortBy = 'paymentDate',
      sortOrder = 'desc'
    } = req.query;

    // Build filter object
    const filter = {};
    if (status) filter.status = status;
    if (courseId) filter.courseId = courseId;
    if (studentId) filter.studentId = studentId;
    if (startDate || endDate) {
      filter.paymentDate = {};
      if (startDate) filter.paymentDate.$gte = new Date(startDate);
      if (endDate) filter.paymentDate.$lte = new Date(endDate);
    }

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Get payments with pagination
    const payments = await Payment.find(filter)
      .populate('studentId', 'firstName lastName email studentId')
      .populate('courseId', 'title courseId category level')
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    // Get total count for pagination
    const totalPayments = await Payment.countDocuments(filter);
    const totalPages = Math.ceil(totalPayments / parseInt(limit));

    res.json({
      success: true,
      data: {
        payments,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalPayments,
          hasNextPage: parseInt(page) < totalPages,
          hasPrevPage: parseInt(page) > 1
        }
      }
    });
  } catch (error) {
    console.error('Error fetching payments:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching payments',
      error: error.message
    });
  }
});

// Get payment statistics (Admin only)
router.get('/stats', async (req, res) => {
  try {
    const stats = await Payment.getPaymentStats();
    const monthlyRevenue = await Payment.getMonthlyRevenue();
    const courseRevenue = await Payment.getCourseRevenue();

    res.json({
      success: true,
      data: {
        overview: stats,
        monthlyRevenue,
        courseRevenue
      }
    });
  } catch (error) {
    console.error('Error fetching payment statistics:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching payment statistics',
      error: error.message
    });
  }
});

// Get payment by ID
router.get('/:paymentId', async (req, res) => {
  try {
    const { paymentId } = req.params;

    const payment = await Payment.findOne({ paymentId })
      .populate('studentId', 'firstName lastName email studentId phone')
      .populate('courseId', 'title courseId category level duration');

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Payment not found'
      });
    }

    res.json({
      success: true,
      data: payment
    });
  } catch (error) {
    console.error('Error fetching payment:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching payment',
      error: error.message
    });
  }
});

// Get payments by student ID
router.get('/student/:studentId', async (req, res) => {
  try {
    const { studentId } = req.params;
    const { page = 1, limit = 10 } = req.query;

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const payments = await Payment.find({ studentId })
      .populate('courseId', 'title courseId category level')
      .sort({ paymentDate: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const totalPayments = await Payment.countDocuments({ studentId });
    const totalPages = Math.ceil(totalPayments / parseInt(limit));

    res.json({
      success: true,
      data: {
        payments,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalPayments,
          hasNextPage: parseInt(page) < totalPages,
          hasPrevPage: parseInt(page) > 1
        }
      }
    });
  } catch (error) {
    console.error('Error fetching student payments:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching student payments',
      error: error.message
    });
  }
});

// Update payment status (Admin only)
router.put('/:paymentId/status', async (req, res) => {
  try {
    const { paymentId } = req.params;
    const { status } = req.body;

    if (!['pending', 'completed', 'failed', 'refunded'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid payment status'
      });
    }

    const payment = await Payment.findOneAndUpdate(
      { paymentId },
      { status },
      { new: true }
    );

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: 'Payment not found'
      });
    }

    res.json({
      success: true,
      message: 'Payment status updated successfully',
      data: payment
    });
  } catch (error) {
    console.error('Error updating payment status:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating payment status',
      error: error.message
    });
  }
});

module.exports = router;