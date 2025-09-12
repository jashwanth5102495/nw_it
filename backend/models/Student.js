const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const studentSchema = new mongoose.Schema({
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
  password: {
    type: String,
    required: function() {
      return this.loginMethod !== 'google';
    },
    minlength: 6
  },
  loginMethod: {
    type: String,
    enum: ['email', 'google'],
    default: 'email'
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
    discountCode: {
      type: String,
      default: null
    },
    discountAmount: {
      type: Number,
      default: 0
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

// Hash password before saving
studentSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
studentSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

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

// Static method to find by email
studentSchema.statics.findByEmail = function(email) {
  return this.findOne({ email: email.toLowerCase() });
};

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;