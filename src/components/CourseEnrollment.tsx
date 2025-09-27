import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from './Header';
import { ArrowLeft, Clock, Award, CheckCircle, BookOpen, Target, Zap } from 'lucide-react';

interface CourseModule {
  title: string;
  duration: string;
  topics: string[];
}

interface Course {
  id: string;
  title: string;
  category: string;
  level: string;
  description: string;
  detailedDescription: string;
  technologies: string[];
  price: number;
  duration: string;
  projects: number;
  modules: CourseModule[];
  prerequisites: string[];
  whatYouWillLearn: string[];
}

// RAZORPAY DECLARATION COMMENTED OUT FOR TESTING
/*
declare global {
  interface Window {
    Razorpay: any;
  }
}
*/

const CourseEnrollment: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [referralCode, setReferralCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const courses: Course[] = [
    {
      id: 'ai-tools-mastery',
      title: 'A.I Tools Mastery',
      category: 'ai',
      level: 'intermediate',
      description: 'Master the latest AI tools and technologies to boost productivity and automate workflows',
      detailedDescription: 'This comprehensive course will teach you how to leverage cutting-edge AI tools like ChatGPT, Midjourney, and other AI platforms to enhance your productivity and create innovative solutions.',
      technologies: ['ChatGPT', 'Midjourney', 'AI APIs', 'Automation Tools'],
      price: 12000,
      duration: '12 weeks',
      projects: 8,
      modules: [
        {
          title: 'AI Fundamentals',
          duration: '3 weeks',
          topics: ['Introduction to AI', 'Machine Learning Basics', 'AI Ethics', 'AI Applications']
        },
        {
          title: 'ChatGPT & Language Models',
          duration: '3 weeks',
          topics: ['Prompt Engineering', 'Advanced ChatGPT Techniques', 'API Integration', 'Custom GPT Creation']
        },
        {
          title: 'AI Image & Video Tools',
          duration: '3 weeks',
          topics: ['Midjourney Mastery', 'DALL-E', 'Stable Diffusion', 'AI Video Generation']
        },
        {
          title: 'AI Automation & Workflows',
          duration: '3 weeks',
          topics: ['AI-Powered Automation', 'Workflow Integration', 'Business Applications', 'Future of AI']
        }
      ],
      prerequisites: ['Basic computer skills', 'Interest in AI technology'],
      whatYouWillLearn: [
        'Master popular AI tools and platforms',
        'Create efficient AI-powered workflows',
        'Understand AI ethics and best practices',
        'Build AI-integrated business solutions',
        'Automate repetitive tasks with AI',
        'Generate content using AI tools'
      ]
    },
    {
      id: 'frontend-beginner',
      title: 'Frontend Development - Beginner',
      category: 'frontend',
      level: 'beginner',
      description: 'Master the fundamentals of web development with HTML, CSS, JavaScript, and MongoDB basics',
      detailedDescription: 'This comprehensive beginner course will take you from zero to building interactive websites. You\'ll learn the core technologies that power the modern web including HTML structure, CSS styling, JavaScript programming fundamentals, and MongoDB database basics.',
      technologies: ['HTML', 'CSS', 'JavaScript', 'MongoDB'],
      price: 1200,
      duration: '8 weeks',
      projects: 3,
      modules: [
        {
          title: 'HTML Fundamentals',
          duration: '2 weeks',
          topics: ['HTML Structure', 'Semantic HTML', 'Forms and Input', 'HTML5 Features']
        },
        {
          title: 'CSS Styling',
          duration: '3 weeks',
          topics: ['CSS Selectors', 'Box Model', 'Flexbox', 'Grid Layout', 'Responsive Design']
        },
        {
          title: 'JavaScript Basics',
          duration: '3 weeks',
          topics: ['Variables and Data Types', 'Functions', 'DOM Manipulation', 'Event Handling']
        }
      ],
      prerequisites: ['Basic computer skills', 'No prior coding experience required'],
      whatYouWillLearn: [
        'Build responsive websites from scratch',
        'Master HTML5 semantic elements',
        'Style websites with CSS3',
        'Program with JavaScript fundamentals',
        'Create interactive web elements',
        'Deploy websites to the internet'
      ]
    },
    {
      id: 'frontend-advanced',
      title: 'Frontend Development - Advanced',
      category: 'frontend',
      level: 'advanced',
      description: 'Master advanced frontend concepts including performance optimization and state management',
      detailedDescription: 'Take your frontend development skills to the expert level with advanced React patterns, performance optimization techniques, complex state management, and modern development workflows.',
      technologies: ['React', 'TypeScript', 'Redux', 'Webpack', 'Testing'],
      price: 2500,
      duration: '12 weeks',
      projects: 6,
      modules: [
        {
          title: 'Advanced React Patterns',
          duration: '3 weeks',
          topics: ['Context API', 'Custom Hooks', 'Higher-Order Components', 'Render Props']
        },
        {
          title: 'State Management',
          duration: '3 weeks',
          topics: ['Redux Toolkit', 'Zustand', 'React Query', 'Global State Patterns']
        },
        {
          title: 'Performance Optimization',
          duration: '3 weeks',
          topics: ['Code Splitting', 'Lazy Loading', 'Memoization', 'Bundle Analysis']
        },
        {
          title: 'Advanced Tooling',
          duration: '3 weeks',
          topics: ['Webpack Configuration', 'TypeScript', 'Testing Strategies', 'CI/CD']
        }
      ],
      prerequisites: ['Intermediate React knowledge', 'JavaScript ES6+', 'Basic TypeScript'],
      whatYouWillLearn: [
        'Implement advanced React patterns and architectures',
        'Optimize application performance and bundle size',
        'Master complex state management solutions',
        'Build scalable and maintainable applications',
        'Implement comprehensive testing strategies',
        'Deploy production-ready applications'
      ]
    },
    {
      id: 'devops-beginner',
      title: 'DevOps - Beginner',
      category: 'devops',
      level: 'beginner',
      description: 'Learn the fundamentals of DevOps with Docker, CI/CD, and cloud deployment basics',
      detailedDescription: 'Start your DevOps journey with this comprehensive beginner course. Learn essential tools and practices including version control, containerization, automation, and cloud deployment fundamentals.',
      technologies: ['Docker', 'Git', 'Linux', 'CI/CD', 'AWS'],
      price: 1000,
      duration: '8 weeks',
      projects: 4,
      modules: [
        {
          title: 'DevOps Fundamentals',
          duration: '2 weeks',
          topics: ['DevOps Culture', 'Version Control with Git', 'Linux Basics', 'Command Line']
        },
        {
          title: 'Basic Automation',
          duration: '2 weeks',
          topics: ['Shell Scripting', 'Basic CI/CD', 'Automated Testing', 'Build Tools']
        },
        {
          title: 'Deployment Basics',
          duration: '2 weeks',
          topics: ['Server Management', 'Basic Docker', 'Environment Configuration']
        },
        {
          title: 'Monitoring & Logging',
          duration: '2 weeks',
          topics: ['Basic Monitoring', 'Log Management', 'Performance Metrics']
        }
      ],
      prerequisites: ['Basic computer skills', 'Understanding of software development'],
      whatYouWillLearn: [
        'Understand DevOps culture and practices',
        'Master version control with Git',
        'Learn Linux command line basics',
        'Implement basic CI/CD pipelines',
        'Deploy applications to cloud platforms',
        'Monitor and troubleshoot applications'
      ]
    },
    {
      id: 'devops-advanced',
      title: 'DevOps - Advanced',
      category: 'devops',
      level: 'advanced',
      description: 'Master advanced DevOps practices with Kubernetes and infrastructure as code',
      detailedDescription: 'Take your DevOps skills to the expert level with advanced container orchestration, infrastructure automation, monitoring strategies, and enterprise-grade deployment practices.',
      technologies: ['Kubernetes', 'Terraform', 'Jenkins', 'Prometheus', 'Grafana'],
      price: 1400,
      duration: '14 weeks',
      projects: 7,
      modules: [
        {
          title: 'Container Orchestration',
          duration: '4 weeks',
          topics: ['Kubernetes Architecture', 'Pod Management', 'Services & Ingress', 'Scaling Strategies']
        },
        {
          title: 'Infrastructure as Code',
          duration: '3 weeks',
          topics: ['Terraform', 'Ansible', 'CloudFormation', 'Infrastructure Automation']
        },
        {
          title: 'Advanced CI/CD',
          duration: '4 weeks',
          topics: ['Jenkins Advanced', 'GitLab CI', 'Blue-Green Deployment', 'Canary Releases']
        },
        {
          title: 'Monitoring & Security',
          duration: '3 weeks',
          topics: ['Prometheus & Grafana', 'ELK Stack', 'Security Best Practices', 'Compliance Automation']
        }
      ],
      prerequisites: ['DevOps Beginner knowledge', 'Linux experience', 'Basic networking'],
      whatYouWillLearn: [
        'Master Kubernetes container orchestration',
        'Implement infrastructure as code with Terraform',
        'Build advanced CI/CD pipelines',
        'Set up comprehensive monitoring and alerting',
        'Implement security best practices',
        'Manage enterprise-scale deployments'
      ]
    }
  ];

  useEffect(() => {
    const foundCourse = courses.find(c => c.id === courseId);
    if (foundCourse) {
      setCourse(foundCourse);
      setFinalPrice(foundCourse.price);
    } else {
      navigate('/courses');
    }
  }, [courseId, navigate]);

  const applyReferralCode = async () => {
    if (!course || !referralCode.trim()) return;
    
    console.log('Applying referral code:', referralCode.trim());
    console.log('Course price:', course.price);
    
    try {
      // First try faculty referral codes
      console.log('Calling faculty API...');
      const facultyResponse = await fetch('http://localhost:5000/api/faculty/validate-referral', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          referralCode: referralCode.trim(),
          coursePrice: course.price
        }),
      });
      
      console.log('Faculty response status:', facultyResponse.status);
      const facultyData = await facultyResponse.json();
      console.log('Faculty response data:', facultyData);
      
      if (facultyData.success && facultyData.data) {
        const discountValue = course.price - facultyData.data.finalPrice;
        setDiscountAmount(discountValue);
        setFinalPrice(facultyData.data.finalPrice);
        setDiscountApplied(true);
        const savings = discountValue;
        const discountPercent = Math.round((savings / course.price) * 100);
        alert(`Referral code applied successfully! You saved ₹${savings.toLocaleString()} (${discountPercent}% off)`);
        return;
      }
      
      // If faculty code fails, try general referral codes
      console.log('Faculty code failed, trying general referral codes...');
      const generalResponse = await fetch('http://localhost:5000/api/courses/verify-referral', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          referralCode: referralCode.toUpperCase()
        })
      });
      
      console.log('General response status:', generalResponse.status);
      const generalData = await generalResponse.json();
      console.log('General response data:', generalData);
      
      if (generalData.success && generalData.valid) {
        const discount = generalData.discount;
        const discountValue = (course.price * discount) / 100;
        setDiscountAmount(discountValue);
        setFinalPrice(course.price - discountValue);
        setDiscountApplied(true);
        alert(`Referral code applied successfully! You saved ₹${discountValue.toLocaleString()} (${discount}% off)`);
      } else {
        console.log('Both faculty and general referral codes failed');
        alert('Invalid referral code');
      }
    } catch (error) {
      console.error('Error validating referral code:', error);
      alert('Error validating referral code. Please try again.');
    }
  };

  const handlePayment = async () => {
    if (!course) return;

    setIsProcessingPayment(true);

    try {
      // RAZORPAY TEMPORARILY COMMENTED OUT FOR TESTING
      /*
      // Check if Razorpay is loaded
      if (!window.Razorpay) {
        alert('Payment system is not available. Please refresh the page and try again.');
        setIsProcessingPayment(false);
        return;
      }
      */

      // Get current user from localStorage
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      
      if (!currentUser.email) {
        alert('Please login to enroll in the course');
        navigate('/student-login');
        setIsProcessingPayment(false);
        return;
      }

      // Validate payment amount
      if (finalPrice <= 0) {
        alert('Invalid payment amount. Please refresh the page and try again.');
        setIsProcessingPayment(false);
        return;
      }

      console.log('Initiating direct enrollment for testing:', {
        course: course.title,
        originalPrice: course.price,
        finalPrice: finalPrice,
        discountApplied: discountApplied,
        discountAmount: discountAmount,
        referralCode: referralCode,
        user: currentUser.email
      });

      // DIRECT BACKEND ENROLLMENT FOR TESTING - NO PAYMENT PROCESSING
      try {
        // Prepare enrollment data for backend
        const enrollmentData = {
          courseId: course.id,
          paymentDetails: {
            amount: finalPrice,
            method: 'testing',
            transactionId: `TEST_${Date.now()}` // Mock payment ID for testing
          },
          referralCode: referralCode || null
        };
        console.log(course);
        console.log('Sending enrollment to backend:', enrollmentData);

        // Send enrollment to backend
        const token = JSON.parse(localStorage.getItem('currentUser') || '{}').token;

        const enrollResponse = await fetch(`http://localhost:5000/api/students/${currentUser.id}/enroll`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(enrollmentData)
        });

        const enrollResult = await enrollResponse.json();
        console.log('Backend enrollment response:', enrollResult);

        if (enrollResult.success) {
          // Also update localStorage for immediate UI feedback
          const existingEnrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
          const localEnrollmentData = {
            studentId: currentUser.id,
            studentName: `${currentUser.firstName} ${currentUser.lastName}`,
            studentEmail: currentUser.email,
            courseId: course.id,
            courseName: course.title,
            amount: finalPrice,
            originalPrice: course.price,
            discountApplied: discountApplied,
            discountAmount: discountAmount,
            referralCode: referralCode || null,
            paymentId: `TEST_${Date.now()}`,
            enrollmentDate: new Date().toISOString(),
            status: 'enrolled'
          };
          existingEnrollments.push(localEnrollmentData);
          localStorage.setItem('enrollments', JSON.stringify(existingEnrollments));

          // Add course to purchased courses for StudentPortal
          const existingPurchasedCourses = JSON.parse(localStorage.getItem('purchasedCourses') || '[]');
          if (!existingPurchasedCourses.includes(course.id)) {
            existingPurchasedCourses.push(course.id);
            localStorage.setItem('purchasedCourses', JSON.stringify(existingPurchasedCourses));
          }

          setIsProcessingPayment(false);
          alert('Enrollment successful! You have been enrolled in the course. You can now access it in My Courses.');
          navigate('/student-portal');
        } else {
          throw new Error(enrollResult.message || 'Failed to enroll in course');
        }
      } catch (error) {
        console.error('Error recording enrollment:', error);
        setIsProcessingPayment(false);
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        alert(`There was an error processing your enrollment: ${errorMessage}. Please try again.`);
      }

      /* RAZORPAY CODE COMMENTED OUT FOR TESTING
      const options = {
        key: 'rzp_test_NyLZPzYHIYtxqW', // Your actual Razorpay test key
        amount: finalPrice * 100, // Amount in paise
        currency: 'INR',
        name: 'NW IT Solutions',
        description: `Enrollment for ${course.title}`,
        image: '/logo.png',
        handler: async function (response: any) {
          try {
            console.log('Payment successful:', response);
            console.log('Payment ID:', response.razorpay_payment_id);
            console.log('Final amount paid:', finalPrice);
            
            // Record the enrollment in backend
            const enrollmentData = {
              studentId: currentUser.id,
              studentName: `${currentUser.firstName} ${currentUser.lastName}`,
              studentEmail: currentUser.email,
              courseId: course.id,
              courseName: course.title,
              amount: finalPrice,
              originalPrice: course.price,
              discountApplied: discountApplied,
              discountAmount: discountAmount,
              referralCode: referralCode || null,
              paymentId: response.razorpay_payment_id,
              enrollmentDate: new Date().toISOString(),
              status: 'enrolled'
            };

            // Store enrollment data in localStorage (in a real app, this would be sent to your backend)
            const existingEnrollments = JSON.parse(localStorage.getItem('enrollments') || '[]');
            existingEnrollments.push(enrollmentData);
            localStorage.setItem('enrollments', JSON.stringify(existingEnrollments));

            // Add course to purchased courses for StudentPortal
            const existingPurchasedCourses = JSON.parse(localStorage.getItem('purchasedCourses') || '[]');
            if (!existingPurchasedCourses.includes(course.id)) {
              existingPurchasedCourses.push(course.id);
              localStorage.setItem('purchasedCourses', JSON.stringify(existingPurchasedCourses));
            }

            alert('Payment successful! You have been enrolled in the course. You can now access it in My Courses.');
            navigate('/student-portal');
          } catch (error) {
            console.error('Error recording enrollment:', error);
            alert('Payment successful but there was an error recording your enrollment. Please contact support.');
          }
        },
        modal: {
          ondismiss: function() {
            console.log('Payment modal dismissed');
            setIsProcessingPayment(false);
          }
        },
        prefill: {
          name: `${currentUser.firstName} ${currentUser.lastName}`,
          email: currentUser.email,
          contact: currentUser.phone || ''
        },
        theme: {
          color: '#3B82F6'
        }
      };

      const rzp = new window.Razorpay(options);
      
      rzp.on('payment.failed', function (response: any) {
        console.error('Payment failed:', response.error);
        console.error('Full error response:', response);
        
        let errorMessage = 'Payment failed. Please try again.';
        if (response.error) {
          if (response.error.description) {
            errorMessage = `Payment failed: ${response.error.description}`;
          } else if (response.error.reason) {
            errorMessage = `Payment failed: ${response.error.reason}`;
          }
        }
        
        alert(errorMessage);
        setIsProcessingPayment(false);
      });

      rzp.open();
      */
    } catch (error) {
      console.error('Enrollment error:', error);
      alert('Enrollment failed. Please try again.');
      setIsProcessingPayment(false);
    }
  };


  if (!course) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Header />
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Course not found</h2>
            <button
              onClick={() => navigate('/courses')}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg transition-colors"
            >
              Back to Courses
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate('/courses')}
          className="flex items-center gap-2 text-blue-400 hover:text-blue-300 mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          Back to Courses
        </button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Course Details */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gray-900 rounded-xl p-6 mb-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {course.level}
                </span>
                <span className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm">
                  {course.category}
                </span>
              </div>
              
              <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
              <p className="text-gray-300 text-lg mb-6">{course.description}</p>
              
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <Clock className="text-blue-400" size={20} />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="text-green-400" size={20} />
                  <span>{course.projects} Projects</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="text-yellow-400" size={20} />
                  <span>Certificate</span>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3">Technologies You'll Learn</h3>
                <div className="flex flex-wrap gap-2">
                  {course.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="bg-gray-800 text-blue-400 px-3 py-1 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3">What You'll Learn</h3>
                <ul className="space-y-2">
                  {course.whatYouWillLearn.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="text-green-400 mt-1 flex-shrink-0" size={16} />
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-3">Course Modules</h3>
                <div className="space-y-4">
                  {course.modules.map((module, index) => (
                    <div key={index} className="bg-gray-800 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold">{module.title}</h4>
                        <span className="text-sm text-gray-400">{module.duration}</span>
                      </div>
                      <ul className="text-sm text-gray-300 space-y-1">
                        {module.topics.map((topic, topicIndex) => (
                          <li key={topicIndex} className="flex items-center gap-2">
                            <div className="w-1 h-1 bg-blue-400 rounded-full"></div>
                            {topic}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold mb-3">Prerequisites</h3>
                <ul className="space-y-2">
                  {course.prerequisites.map((prereq, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Target className="text-orange-400 mt-1 flex-shrink-0" size={16} />
                      <span className="text-gray-300">{prereq}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>

          {/* Enrollment Card */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-gray-900 rounded-xl p-6 sticky top-8"
            >
              <h3 className="text-2xl font-bold mb-6">Enroll Now</h3>
              
              {/* Pricing */}
              <div className="mb-6">
                {discountApplied ? (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Original Price:</span>
                      <span className="text-gray-400 line-through">₹{course.price.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-green-400">Discount ({referralCode}):</span>
                      <span className="text-green-400">-₹{discountAmount.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center text-xl font-bold">
                      <span>Final Price:</span>
                      <span className="text-green-400">₹{finalPrice.toLocaleString()}</span>
                    </div>
                    <div className="text-center text-sm text-green-400">
                      You save ₹{discountAmount.toLocaleString()} ({Math.round((discountAmount / course.price) * 100)}%)
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-400">₹{course.price.toLocaleString()}</div>
                    <div className="text-gray-400">One-time payment</div>
                  </div>
                )}
              </div>

              {/* Referral Code */}
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Referral Code (Optional)</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={referralCode}
                    onChange={(e) => setReferralCode(e.target.value)}
                    placeholder="Enter code"
                    className="flex-1 bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                    disabled={discountApplied}
                  />
                  <button
                    onClick={applyReferralCode}
                    disabled={discountApplied || !referralCode.trim()}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed px-4 py-2 rounded-lg transition-colors"
                  >
                    Apply
                  </button>
                </div>
                {discountApplied && (
                  <div className="mt-2 text-green-400 text-sm flex items-center gap-1">
                    <CheckCircle size={16} />
                    Referral code applied successfully!
                  </div>
                )}
              </div>

              {/* Payment Button */}
              <button
                onClick={handlePayment}
                disabled={isProcessingPayment}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
              >
                {isProcessingPayment ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Enrolling...
                  </>
                ) : (
                  <>
                    <Zap size={20} />
                    Enroll Now (Testing Mode)
                  </>
                )}
              </button>

              <div className="mt-4 text-center text-sm text-gray-400">
                <p className="mb-2 text-yellow-400 font-medium">🧪 Testing Mode - No payment required</p>
                <p>✓ Lifetime access to course content</p>
                <p>✓ Certificate of completion</p>
                <p>✓ 24/7 community support</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseEnrollment;