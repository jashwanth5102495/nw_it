const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  paymentId: {
    type: String,
    required: true,
    unique: true
  },
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
    required: true
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  courseName: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    default: 'INR'
  },
  paymentMethod: {
    type: String,
    default: 'razorpay'
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'refunded'],
    default: 'completed'
  },
  transactionId: {
    type: String,
    required: true
  },
  studentName: {
    type: String,
    required: true
  },
  studentEmail: {
    type: String,
    required: true
  },
  discountCode: {
    type: String,
    default: null
  },
  discountAmount: {
    type: Number,
    default: 0
  },
  originalAmount: {
    type: Number,
    required: true
  },
  paymentDate: {
    type: Date,
    default: Date.now
  },
  razorpayOrderId: {
    type: String,
    default: null
  },
  razorpaySignature: {
    type: String,
    default: null
  },
  metadata: {
    type: Object,
    default: {}
  }
}, {
  timestamps: true
});

// Index for faster queries
paymentSchema.index({ studentId: 1, paymentDate: -1 });
paymentSchema.index({ courseId: 1 });
paymentSchema.index({ paymentId: 1 });
paymentSchema.index({ status: 1 });

// Static method to get payment statistics
paymentSchema.statics.getPaymentStats = async function() {
  const stats = await this.aggregate([
    {
      $group: {
        _id: null,
        totalPayments: { $sum: 1 },
        totalRevenue: { $sum: '$amount' },
        averagePayment: { $avg: '$amount' },
        completedPayments: {
          $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] }
        },
        failedPayments: {
          $sum: { $cond: [{ $eq: ['$status', 'failed'] }, 1, 0] }
        }
      }
    }
  ]);
  
  return stats[0] || {
    totalPayments: 0,
    totalRevenue: 0,
    averagePayment: 0,
    completedPayments: 0,
    failedPayments: 0
  };
};

// Static method to get monthly revenue
paymentSchema.statics.getMonthlyRevenue = async function() {
  return await this.aggregate([
    {
      $match: {
        status: 'completed',
        paymentDate: {
          $gte: new Date(new Date().getFullYear(), 0, 1) // Start of current year
        }
      }
    },
    {
      $group: {
        _id: {
          year: { $year: '$paymentDate' },
          month: { $month: '$paymentDate' }
        },
        revenue: { $sum: '$amount' },
        count: { $sum: 1 }
      }
    },
    {
      $sort: { '_id.year': 1, '_id.month': 1 }
    }
  ]);
};

// Static method to get course-wise revenue
paymentSchema.statics.getCourseRevenue = async function() {
  return await this.aggregate([
    {
      $match: { status: 'completed' }
    },
    {
      $group: {
        _id: '$courseId',
        courseName: { $first: '$courseName' },
        totalRevenue: { $sum: '$amount' },
        totalEnrollments: { $sum: 1 },
        averagePrice: { $avg: '$amount' }
      }
    },
    {
      $sort: { totalRevenue: -1 }
    }
  ]);
};

const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;