const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  studentId: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    maxlength: 100
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    maxlength: 20
  },
  education: {
    type: String,
    required: true,
    enum: ['high-school', 'diploma', 'bachelors', 'masters', 'phd', 'other']
  },
  experience: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner'
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  address: {
    street: {
      type: String,
      required: true,
      trim: true
    },
    city: {
      type: String,
      required: true,
      trim: true
    },
    state: {
      type: String,
      required: true,
      trim: true
    },
    zipCode: {
      type: String,
      required: true,
      trim: true
    },
    country: {
      type: String,
      required: true,
      trim: true,
      default: 'United States'
    }
  },
  referralCode: {
    type: String,
    trim: true,
    uppercase: true,
    default: null
  },
  enrolledCourses: [{
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true
    },
    enrollmentDate: {
      type: Date,
      default: Date.now
    },
    progress: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    completedModules: [{
      type: Number,
      default: []
    }],
    status: {
      type: String,
      enum: ['active', 'completed', 'paused', 'dropped'],
      default: 'active'
    },
    finalGrade: {
      type: String,
      enum: ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D', 'F'],
      default: null
    },
    certificateIssued: {
      type: Boolean,
      default: false
    }
  }],
  paymentHistory: [{
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true
    },
    amount: {
      type: Number,
      required: true,
      min: 0
    },
    paymentMethod: {
      type: String,
      required: true
    },
    transactionId: {
      type: String,
      required: true
    },
    paymentDate: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'completed'
    }
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  lastLogin: {
    type: Date,
    default: null
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field before saving
studentSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Method to get full name
studentSchema.methods.getFullName = function() {
  return `${this.firstName} ${this.lastName}`;
};

// Method to enroll in a course
studentSchema.methods.enrollInCourse = function(courseId) {
  const existingEnrollment = this.enrolledCourses.find(
    enrollment => enrollment.courseId.toString() === courseId.toString()
  );
  
  if (!existingEnrollment) {
    this.enrolledCourses.push({
      courseId: courseId,
      enrollmentDate: new Date(),
      progress: 0,
      status: 'active'
    });
  }
  
  return this.save();
};

// Method to update course progress
studentSchema.methods.updateCourseProgress = function(courseId, progress, completedModules = []) {
  const enrollment = this.enrolledCourses.find(
    enrollment => enrollment.courseId.toString() === courseId.toString()
  );
  
  if (enrollment) {
    enrollment.progress = progress;
    enrollment.completedModules = completedModules;
    
    if (progress >= 100) {
      enrollment.status = 'completed';
    }
  }
  
  return this.save();
};

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;