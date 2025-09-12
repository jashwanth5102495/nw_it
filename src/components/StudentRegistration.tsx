import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useSearchParams, useLocation, useParams } from 'react-router-dom';
import Header from './Header';

// Declare global objects
declare global {
  interface Window {
    google: any;
    Razorpay: any;
  }
}

interface StudentDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  education: string;
  experience: string;
  userId: string;
  password: string;
  confirmPassword: string;
}

interface Course {
  id: string;
  title: string;
  originalPrice: number;
  finalPrice: number;
  discountCode: string;
}

const StudentRegistration = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { courseId } = useParams();
  const courseName = searchParams.get('courseName');
  const coursePrice = searchParams.get('price');
  const selectedCourse = location.state?.selectedCourse;
  
  const [step, setStep] = useState(1);
  const [discountCodeInput, setDiscountCodeInput] = useState('');
  const [isValidCode, setIsValidCode] = useState(false);

  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [registrationComplete, setRegistrationComplete] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [studentDetails, setStudentDetails] = useState<StudentDetails>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    education: '',
    experience: '',
    userId: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState<Partial<StudentDetails>>({});
  const [isLoading, setIsLoading] = useState(false);



  const handleInputChange = (field: keyof StudentDetails, value: string) => {
    setStudentDetails(prev => ({ ...prev, [field]: value }));
    // Clear error when user types
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateStep1 = () => {
    const newErrors: Partial<StudentDetails> = {};
    
    if (!studentDetails.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!studentDetails.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!studentDetails.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(studentDetails.email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!studentDetails.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[0-9]{10}$/.test(studentDetails.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Phone number must be 10 digits';
    }
    if (!studentDetails.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Partial<StudentDetails> = {};
    
    if (!studentDetails.education.trim()) newErrors.education = 'Education is required';
    if (!studentDetails.userId.trim()) {
      newErrors.userId = 'User ID is required';
    } else if (studentDetails.userId.length < 4) {
      newErrors.userId = 'User ID must be at least 4 characters';
    }
    if (!studentDetails.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (studentDetails.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    if (studentDetails.password !== studentDetails.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    } else if (step === 2 && validateStep2()) {
      setStep(3);
    } else if (step === 3) {
      handleRegistrationSubmit();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };



  const handleRegistrationSubmit = async () => {
    if (!validateStep2()) return;
    
    setIsLoading(true);
    
    try {
      // Prepare registration data for backend
      const registrationData = {
        firstName: studentDetails.firstName,
        lastName: studentDetails.lastName,
        email: studentDetails.email,
        phone: studentDetails.phone,
        password: studentDetails.password,
        dateOfBirth: studentDetails.dateOfBirth,
        address: {
          street: '123 Main St', // Default values - you can add form fields for these
          city: 'City',
          state: 'State',
          zipCode: '12345',
          country: 'United States'
        },
        selectedCourse: {
          courseId: selectedCourse?.id || courseId || 'FRONTEND-BEGINNER'
        },
        paymentDetails: {
          amount: selectedCourse?.finalPrice || parseFloat(coursePrice || '199'),
          discountCode: selectedCourse?.discountCode || null,
          discountAmount: selectedCourse ? (selectedCourse.originalPrice - selectedCourse.finalPrice) : 0,
          method: 'pending', // Will be updated after payment
          transactionId: 'pending' // Will be updated after payment
        }
      };

      // Call backend API to register student
      const response = await fetch('http://localhost:5000/api/students/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData)
      });

      const result = await response.json();

      if (result.success) {
        console.log('Student registered successfully in database:', result.data);
        
        // Store user data locally for immediate access
        const userData = {
          ...result.data.student,
          isAuthenticated: false,
          token: result.data.token
        };
        localStorage.setItem('currentUser', JSON.stringify(userData));
        
        setRegistrationComplete(true);
        setStep(4); // Move to payment step
      } else {
        console.error('Registration failed:', result.message);
        setErrors({ email: result.message || 'Registration failed. Please try again.' });
      }
    } catch (err) {
      console.error('Registration error:', err);
      setErrors({ email: 'Unable to connect to server. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handlePayment = () => {
    if (!selectedCourse) {
      alert('No course selected for payment');
      return;
    }

    setPaymentProcessing(true);
    
    // Get course price (remove ₹ symbol and convert to number)
    const coursePrice = selectedCourse.finalPrice || selectedCourse.originalPrice;
    const numericPrice = typeof coursePrice === 'string' 
      ? parseInt(coursePrice.replace('₹', '').replace(',', ''))
      : coursePrice;

    const options = {
      key: 'rzp_test_NyLZPzYHIYtxqW', // Razorpay test key
      amount: numericPrice * 100, // Amount in paise
      currency: 'INR',
      name: 'Jasnav It Solutions',
      description: selectedCourse.title,
      handler: async function (response: any) {
        try {
          // Get current user data
          const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
          
          // Add to purchased courses
          const existingPurchased = JSON.parse(localStorage.getItem('purchasedCourses') || '[]');
          const updatedPurchased = [...existingPurchased, selectedCourse.id];
          localStorage.setItem('purchasedCourses', JSON.stringify(updatedPurchased));
          
          // Prepare payment data for backend
          const paymentData = {
            paymentId: response.razorpay_payment_id,
            studentId: currentUser.id || 'temp-student-id',
            courseId: selectedCourse.id,
            courseName: selectedCourse.title,
            amount: numericPrice,
            originalAmount: selectedCourse.originalPrice,
            studentName: `${currentUser.firstName} ${currentUser.lastName}`,
            studentEmail: currentUser.email,
            discountCode: selectedCourse.discountCode || null,
            discountAmount: (selectedCourse.originalPrice - numericPrice) || 0,
            metadata: {
              razorpayPaymentId: response.razorpay_payment_id,
              purchaseSource: 'registration'
            }
          };
          
          // Send payment data to backend
          try {
            const backendResponse = await fetch('http://localhost:5000/api/payments', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(paymentData)
            });
            
            const result = await backendResponse.json();
            
            if (result.success) {
              console.log('Payment recorded in database successfully');
            } else {
              console.error('Failed to record payment in database:', result.message);
            }
          } catch (backendError) {
            console.error('Error sending payment to backend:', backendError);
          }
          
          // Store payment details in localStorage as backup
          const localPaymentData = {
            courseId: selectedCourse.id,
            courseName: selectedCourse.title,
            amount: numericPrice,
            paymentId: response.razorpay_payment_id,
            purchaseDate: new Date().toISOString()
          };
          
          const existingPayments = JSON.parse(localStorage.getItem('coursePayments') || '[]');
          localStorage.setItem('coursePayments', JSON.stringify([...existingPayments, localPaymentData]));
          
          // Set payment success state instead of direct redirect
          setPaymentSuccess(true);
          setStep(5); // Move to payment success step
        } catch (error) {
          console.error('Payment processing error:', error);
          alert('Payment successful but there was an error processing your enrollment. Please contact support.');
        }
      },
      prefill: {
        name: `${studentDetails.firstName} ${studentDetails.lastName}`,
        email: studentDetails.email,
        contact: studentDetails.phone
      },
      theme: {
        color: '#3B82F6'
      },
      modal: {
        ondismiss: function() {
          setPaymentProcessing(false);
        }
      }
    };

    if (window.Razorpay) {
      const rzp = new window.Razorpay(options);
      rzp.open();
    } else {
      alert('Payment gateway not loaded. Please refresh and try again.');
      setPaymentProcessing(false);
    }
  };



  const renderStep1 = () => (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            First Name *
          </label>
          <input
            type="text"
            value={studentDetails.firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
            className={`w-full px-4 py-3 bg-gray-800/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 transition-colors ${
              errors.firstName ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-600 focus:border-blue-500 focus:ring-blue-500'
            }`}
            placeholder="Enter your first name"
          />
          {errors.firstName && <p className="mt-1 text-sm text-red-400">{errors.firstName}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Last Name *
          </label>
          <input
            type="text"
            value={studentDetails.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            className={`w-full px-4 py-3 bg-gray-800/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 transition-colors ${
              errors.lastName ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-600 focus:border-blue-500 focus:ring-blue-500'
            }`}
            placeholder="Enter your last name"
          />
          {errors.lastName && <p className="mt-1 text-sm text-red-400">{errors.lastName}</p>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Email Address *
        </label>
        <input
          type="email"
          value={studentDetails.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          className={`w-full px-4 py-3 bg-gray-800/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 transition-colors ${
            errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-600 focus:border-blue-500 focus:ring-blue-500'
          }`}
          placeholder="Enter your email address"
        />
        {errors.email && <p className="mt-1 text-sm text-red-400">{errors.email}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Phone Number *
        </label>
        <input
          type="tel"
          value={studentDetails.phone}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          className={`w-full px-4 py-3 bg-gray-800/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 transition-colors ${
            errors.phone ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-600 focus:border-blue-500 focus:ring-blue-500'
          }`}
          placeholder="Enter your phone number"
        />
        {errors.phone && <p className="mt-1 text-sm text-red-400">{errors.phone}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Date of Birth *
        </label>
        <input
          type="date"
          value={studentDetails.dateOfBirth}
          onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
          className={`w-full px-4 py-3 bg-gray-800/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 transition-colors ${
            errors.dateOfBirth ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-600 focus:border-blue-500 focus:ring-blue-500'
          }`}
        />
        {errors.dateOfBirth && <p className="mt-1 text-sm text-red-400">{errors.dateOfBirth}</p>}
      </div>
    </motion.div>
  );

  const renderStep2 = () => (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Education *
        </label>
        <select
          value={studentDetails.education}
          onChange={(e) => handleInputChange('education', e.target.value)}
          className={`w-full px-4 py-3 bg-gray-800/50 border rounded-lg text-white focus:outline-none focus:ring-1 transition-colors ${
            errors.education ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-600 focus:border-blue-500 focus:ring-blue-500'
          }`}
        >
          <option value="">Select your education level</option>
          <option value="high-school">High School</option>
          <option value="diploma">Diploma</option>
          <option value="bachelors">Bachelor's Degree</option>
          <option value="masters">Master's Degree</option>
          <option value="phd">PhD</option>
          <option value="other">Other</option>
        </select>
        {errors.education && <p className="mt-1 text-sm text-red-400">{errors.education}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Experience Level
        </label>
        <select
          value={studentDetails.experience}
          onChange={(e) => handleInputChange('experience', e.target.value)}
          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
        >
          <option value="">Select your experience level</option>
          <option value="beginner">Beginner (0-1 years)</option>
          <option value="intermediate">Intermediate (1-3 years)</option>
          <option value="advanced">Advanced (3+ years)</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          User ID *
        </label>
        <input
          type="text"
          value={studentDetails.userId}
          onChange={(e) => handleInputChange('userId', e.target.value)}
          className={`w-full px-4 py-3 bg-gray-800/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 transition-colors ${
            errors.userId ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-600 focus:border-blue-500 focus:ring-blue-500'
          }`}
          placeholder="Create a unique user ID"
        />
        {errors.userId && <p className="mt-1 text-sm text-red-400">{errors.userId}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Password *
        </label>
        <input
          type="password"
          value={studentDetails.password}
          onChange={(e) => handleInputChange('password', e.target.value)}
          className={`w-full px-4 py-3 bg-gray-800/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 transition-colors ${
            errors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-600 focus:border-blue-500 focus:ring-blue-500'
          }`}
          placeholder="Create a password"
        />
        {errors.password && <p className="mt-1 text-sm text-red-400">{errors.password}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Confirm Password *
        </label>
        <input
          type="password"
          value={studentDetails.confirmPassword}
          onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
          className={`w-full px-4 py-3 bg-gray-800/50 border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-1 transition-colors ${
            errors.confirmPassword ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-600 focus:border-blue-500 focus:ring-blue-500'
          }`}
          placeholder="Confirm your password"
        />
        {errors.confirmPassword && <p className="mt-1 text-sm text-red-400">{errors.confirmPassword}</p>}
      </div>
    </motion.div>
  );

  const renderStep3 = () => (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center">
        <div className="text-6xl mb-4">🎉</div>
        <h3 className="text-2xl font-bold text-white mb-4">Registration Complete!</h3>
        <p className="text-gray-300 mb-8">
          Welcome to our learning platform! Your account has been created successfully.
        </p>
        
        {selectedCourse && (
          <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 mb-8">
            <h4 className="text-lg font-semibold text-white mb-2">Selected Course</h4>
            <p className="text-blue-400 font-medium">{selectedCourse.title}</p>
            <p className="text-gray-300 text-sm mt-2">
              Click "Proceed to Payment" to complete your course enrollment.
            </p>
          </div>
        )}
        
        {!selectedCourse && (
          <p className="text-gray-400 mb-8">
            You can browse and purchase courses from your student portal.
          </p>
        )}
      </div>
    </motion.div>
  );

  const renderStep4 = () => (
    <motion.div
      className="space-y-6"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="text-center">
        <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        
        <h3 className="text-2xl font-bold text-white mb-4">Complete Your Purchase</h3>
        
        {selectedCourse ? (
          <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 mb-8">
            <h4 className="text-lg font-semibold text-white mb-4">Course Details</h4>
            <div className="space-y-3 text-gray-300">
              <p><span className="font-medium">Course:</span> {selectedCourse.title}</p>
              {selectedCourse.originalPrice !== selectedCourse.finalPrice && (
                <p><span className="font-medium">Original Price:</span> <span className="line-through text-gray-500">₹{selectedCourse.originalPrice}</span></p>
              )}
              <p><span className="font-medium">Final Price:</span> <span className="text-green-400 font-bold">₹{selectedCourse.finalPrice || selectedCourse.originalPrice}</span></p>
              {selectedCourse.discountCode && (
                <p><span className="font-medium">Discount Code:</span> <span className="text-blue-400">{selectedCourse.discountCode}</span></p>
              )}
            </div>
          </div>
        ) : (
          <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 mb-8">
            <p className="text-gray-300">No course selected for purchase.</p>
          </div>
        )}
        
        <p className="text-gray-300 mb-8">
          Click the button below to proceed with secure payment via Razorpay.
        </p>
        
        <div className="flex gap-4 justify-center">
          <motion.button
            onClick={() => navigate('/student-portal')}
            className="px-6 py-3 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Skip Payment
          </motion.button>
          
          {selectedCourse && (
            <motion.button
              onClick={handlePayment}
              disabled={paymentProcessing}
              className="px-8 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-300 shadow-lg shadow-green-500/25 disabled:opacity-50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {paymentProcessing ? 'Processing...' : `Pay ₹${selectedCourse.finalPrice || selectedCourse.originalPrice}`}
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              Student Registration
            </h1>
            <p className="text-xl text-gray-300">Join our learning community</p>
          </motion.div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-8">
            {[1, 2, 3, 4, 5].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${
                  step >= stepNumber ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-400'
                }`}>
                  {stepNumber}
                </div>
                {stepNumber < 5 && (
                  <div className={`w-16 h-1 mx-2 transition-colors ${
                    step > stepNumber ? 'bg-blue-600' : 'bg-gray-700'
                  }`}></div>
                )}
              </div>
            ))}
          </div>

          {/* Form */}
          <motion.div
            className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {step === 1 && (
              <>
                <h2 className="text-2xl font-bold text-white mb-6">Personal Information</h2>
                {renderStep1()}
                

              </>
            )}
            
            {step === 2 && (
              <>
                <h2 className="text-2xl font-bold text-white mb-6">Account Details</h2>
                {renderStep2()}
              </>
            )}
            
            {step === 3 && renderStep3()}
            
            {step === 4 && renderStep4()}
            
            {step === 5 && (
              <motion.div
                className="text-center space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                
                <h3 className="text-3xl font-bold text-white mb-4">Payment Successful!</h3>
                
                <div className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 mb-8">
                  <p className="text-gray-300 text-lg mb-4">
                    Thank you for your purchase! Your payment has been processed successfully.
                  </p>
                  {selectedCourse && (
                    <div className="text-gray-300">
                      <p className="mb-2"><span className="font-medium">Course:</span> {selectedCourse.title}</p>
                      <p><span className="font-medium">Amount Paid:</span> <span className="text-green-400 font-bold">₹{selectedCourse.finalPrice || selectedCourse.originalPrice}</span></p>
                    </div>
                  )}
                </div>
                
                <p className="text-gray-300 mb-8">
                  You can now login to your student portal to start learning!
                </p>
                
                <motion.button
                  onClick={() => navigate('/student-login')}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-blue-500/25"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Go to Student Login
                </motion.button>
              </motion.div>
            )}

            {/* Navigation Buttons */}
            {step < 3 && (
              <div className="flex justify-between mt-8">
                <motion.button
                  onClick={handleBack}
                  disabled={step === 1}
                  className="px-6 py-3 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Back
                </motion.button>
                
                <motion.button
                  onClick={handleNext}
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-blue-500/25"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {step === 2 ? 'Complete Registration' : 'Next'}
                </motion.button>
              </div>
            )}
            
            {/* Step 3 Navigation */}
            {step === 3 && (
              <div className="flex justify-between mt-8">
                <motion.button
                  onClick={handleBack}
                  className="px-6 py-3 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Back
                </motion.button>
                
                <div className="flex gap-4">
                  <motion.button
                    onClick={() => navigate('/student-portal')}
                    className="px-6 py-3 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Go to Portal
                  </motion.button>
                  
                  {selectedCourse && (
                    <motion.button
                      onClick={() => setStep(4)}
                      className="px-8 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-300 shadow-lg shadow-green-500/25"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Proceed to Payment
                    </motion.button>
                  )}
                </div>
              </div>
            )}
            
            {/* Step 4 Navigation */}
             {step === 4 && (
               <div className="flex justify-center mt-8">
                 <motion.button
                   onClick={() => setStep(3)}
                   className="px-6 py-3 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600 transition-colors"
                   whileHover={{ scale: 1.02 }}
                   whileTap={{ scale: 0.98 }}
                 >
                   Back to Registration
                 </motion.button>
               </div>
             )}

            {/* Login Link */}
            <div className="mt-8 text-center">
              <p className="text-gray-400">
                Already have an account?{' '}
                <button
                  onClick={() => navigate('/student-login')}
                  className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
                >
                  Sign in here
                </button>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default StudentRegistration;