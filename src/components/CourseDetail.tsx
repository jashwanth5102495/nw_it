import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from './Header';

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

const CourseDetail = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [referralCode, setReferralCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountedPrice, setDiscountedPrice] = useState(0);
  const [isValidatingCode, setIsValidatingCode] = useState(false);

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
      id: 'frontend-intermediate',
      title: 'Frontend Development - Intermediate',
      category: 'frontend',
      level: 'intermediate',
      description: 'Advance your frontend skills with modern CSS techniques, JavaScript, and MongoDB',
      detailedDescription: 'Take your frontend skills to the next level with advanced CSS techniques, JavaScript fundamentals, MongoDB database integration, and modern development workflows.',
      technologies: ['HTML', 'CSS', 'JavaScript', 'React', 'MongoDB'],
      price: 1500,
      duration: '10 weeks',
      projects: 5,
      modules: [
        {
          title: 'Advanced CSS Techniques',
          duration: '2 weeks',
          topics: ['CSS Grid Advanced', 'Flexbox Mastery', 'CSS Animations', 'Transitions']
        },
        {
          title: 'Modern JavaScript',
          duration: '3 weeks',
          topics: ['ES6+ Features', 'Async/Await', 'Modules', 'Build Tools']
        },
        {
          title: 'React Fundamentals',
          duration: '3 weeks',
          topics: ['Components', 'State Management', 'Hooks', 'Routing']
        },
        {
          title: 'Project Development',
          duration: '2 weeks',
          topics: ['Full Application Build', 'Testing', 'Deployment']
        }
      ],
      prerequisites: ['HTML, CSS, JavaScript basics', 'Completed Frontend Beginner or equivalent'],
      whatYouWillLearn: [
        'Build modern web applications with React',
        'Master advanced CSS techniques and animations',
        'Implement modern JavaScript patterns',
        'Deploy production-ready applications',
        'Work with APIs and databases',
        'Create responsive user interfaces'
      ]
    },
    {
      id: 'frontend-advanced',
      title: 'Frontend Development - Advanced',
      category: 'frontend',
      level: 'advanced',
      description: 'Master advanced frontend concepts including performance optimization and state management',
      detailedDescription: 'This advanced course covers sophisticated frontend development techniques including performance optimization, advanced state management, and modern development workflows.',
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
      prerequisites: ['React experience', 'Completed Frontend Intermediate or equivalent'],
      whatYouWillLearn: [
        'Architect scalable frontend applications',
        'Optimize application performance',
        'Implement advanced React patterns',
        'Lead frontend development teams',
        'Master TypeScript for large applications',
        'Set up comprehensive testing strategies'
      ]
    },
    {
      id: 'devops-beginner',
      title: 'DevOps - Beginner',
      category: 'devops',
      level: 'beginner',
      description: 'Introduction to DevOps practices, version control, and basic automation',
      detailedDescription: 'Learn the fundamentals of DevOps including version control, basic automation, deployment practices, and monitoring.',
      technologies: ['Git', 'Docker', 'Linux', 'CI/CD', 'AWS'],
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
      prerequisites: ['Basic programming knowledge', 'Familiarity with command line'],
      whatYouWillLearn: [
        'Understand DevOps principles and practices',
        'Set up basic CI/CD pipelines',
        'Deploy applications to cloud platforms',
        'Implement basic monitoring and logging',
        'Automate repetitive tasks',
        'Manage server environments'
      ]
    },
    {
      id: 'devops-advanced',
      title: 'DevOps - Advanced',
      category: 'devops',
      level: 'advanced',
      description: 'Master advanced DevOps practices with Kubernetes and infrastructure as code',
      detailedDescription: 'Advanced DevOps course covering Kubernetes, infrastructure as code, advanced CI/CD, and enterprise-level automation.',
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
          title: 'Enterprise DevOps',
          duration: '3 weeks',
          topics: ['Security Integration', 'Compliance', 'Multi-Cloud Strategies', 'Team Scaling']
        }
      ],
      prerequisites: ['DevOps fundamentals', 'Docker experience', 'Cloud platform knowledge'],
      whatYouWillLearn: [
        'Design enterprise-level DevOps architectures',
        'Implement advanced container orchestration',
        'Automate infrastructure provisioning',
        'Lead DevOps transformation initiatives',
        'Implement security best practices',
        'Scale DevOps across organizations'
      ]
    }
  ];

  useEffect(() => {
    const foundCourse = courses.find(c => c.id === courseId);
    if (foundCourse) {
      setCourse(foundCourse);
    } else {
      navigate('/courses');
    }
  }, [courseId, navigate]);

  const handleEnrollNow = () => {
    navigate(`/course-enrollment/${courseId}`);
  };

  const validateReferralCode = async () => {
    if (!referralCode.trim()) return;
    
    setIsValidatingCode(true);
    
    try {
      const response = await fetch('http://localhost:5000/api/faculty/validate-referral', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          referralCode: referralCode.trim(),
          coursePrice: course.price
        }),
      });
      
      const data = await response.json();
      
      if (data.success && data.data) {
        setDiscountApplied(true);
        setDiscountedPrice(data.data.finalPrice);
        // Show success message with discount details
        const savings = course.price - data.data.finalPrice;
        const discountPercent = Math.round((savings / course.price) * 100);
        alert(`Referral code applied successfully! You saved ₹${savings.toLocaleString()} (${discountPercent}% off)`);
      } else {
        alert(data.message || 'Invalid referral code');
        setDiscountApplied(false);
        setDiscountedPrice(0);
      }
    } catch (error) {
      console.error('Error validating referral code:', error);
      alert('Error validating referral code. Please try again.');
      setDiscountApplied(false);
      setDiscountedPrice(0);
    } finally {
      setIsValidatingCode(false);
    }
  };

  const removeDiscount = () => {
    setDiscountApplied(false);
    setDiscountedPrice(0);
    setReferralCode('');
  };

  if (!course) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-xl">Loading course details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      <div className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Course Header */}
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium">
                    {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
                  </span>
                  <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium">
                    {course.category.charAt(0).toUpperCase() + course.category.slice(1)}
                  </span>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  {course.title}
                </h1>
                
                <p className="text-xl text-gray-300 mb-6">
                  {course.description}
                </p>
                
                <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <span>⏱️</span>
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>📚</span>
                    <span>{course.modules.length} Modules</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>🚀</span>
                    <span>{course.projects} Projects</span>
                  </div>
                </div>
              </motion.div>

              {/* Course Description */}
              <motion.div
                className="mb-8 p-6 bg-gray-900/50 border border-gray-700 rounded-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h2 className="text-2xl font-bold mb-4">About This Course</h2>
                <p className="text-gray-300 leading-relaxed">
                  {course.detailedDescription}
                </p>
              </motion.div>

              {/* Technologies */}
              <motion.div
                className="mb-8 p-6 bg-gray-900/50 border border-gray-700 rounded-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="text-2xl font-bold mb-4">Technologies You'll Learn</h2>
                <div className="flex flex-wrap gap-3">
                  {course.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Course Modules */}
              <motion.div
                className="mb-8 p-6 bg-gray-900/50 border border-gray-700 rounded-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h2 className="text-2xl font-bold mb-6">Course Curriculum</h2>
                <div className="space-y-4">
                  {course.modules.map((module, index) => (
                    <div key={index} className="border border-gray-700 rounded-lg p-4">
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="text-lg font-semibold text-blue-400">
                          Module {index + 1}: {module.title}
                        </h3>
                        <span className="text-sm text-gray-400">{module.duration}</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {module.topics.map((topic, topicIndex) => (
                          <div key={topicIndex} className="flex items-center gap-2 text-gray-300">
                            <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                            <span className="text-sm">{topic}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Prerequisites */}
              <motion.div
                className="mb-8 p-6 bg-gray-900/50 border border-gray-700 rounded-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h2 className="text-2xl font-bold mb-4">Prerequisites</h2>
                <ul className="space-y-2">
                  {course.prerequisites.map((prereq, index) => (
                    <li key={index} className="flex items-center gap-2 text-gray-300">
                      <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
                      {prereq}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* What You'll Learn */}
              <motion.div
                className="mb-8 p-6 bg-gray-900/50 border border-gray-700 rounded-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
              >
                <h2 className="text-2xl font-bold mb-4">What You'll Learn</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {course.whatYouWillLearn.map((item, index) => (
                    <div key={index} className="flex items-start gap-2 text-gray-300">
                      <span className="w-2 h-2 bg-green-400 rounded-full mt-2"></span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Enrollment Card */}
            <div className="lg:col-span-1">
              <motion.div
                className="sticky top-24 bg-gray-900/50 border border-gray-700 rounded-2xl p-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {/* Pricing */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-3xl font-bold text-green-400">
                      ₹{course.price.toLocaleString()}
                    </span>
                  </div>
                  <div className="text-sm text-gray-400">
                    One-time payment • Lifetime access
                  </div>
                </div>

                {/* Course Info */}
                <div className="mb-6 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Duration</span>
                    <span className="text-white">{course.duration}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Level</span>
                    <span className="text-white capitalize">{course.level}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Projects</span>
                    <span className="text-white">{course.projects}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Modules</span>
                    <span className="text-white">{course.modules.length}</span>
                  </div>
                </div>

                {/* Enroll Button */}
                <button
                  onClick={handleEnrollNow}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  Enroll Now
                </button>

                {/* Features */}
                <div className="mt-6 pt-6 border-t border-gray-700">
                  <h3 className="font-semibold mb-3">What's Included:</h3>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <li className="flex items-center gap-2">
                      <span className="text-green-400">✓</span>
                      Lifetime access to course content
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-400">✓</span>
                      {course.projects} hands-on projects
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-400">✓</span>
                      Certificate of completion
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-400">✓</span>
                      24/7 community support
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-green-400">✓</span>
                      Regular content updates
                    </li>
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPayment && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <motion.div
            className="bg-gray-900 rounded-2xl p-6 w-full max-w-md border border-gray-700"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-white">Complete Purchase</h3>
              <button
                onClick={() => setShowPayment(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              {/* Course Info */}
              <div className="bg-gray-800 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-3">{course.title}</h4>
                
                {/* Pricing Display */}
                {discountApplied ? (
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Original Price:</span>
                      <span className="font-bold line-through text-gray-500">
                        ₹{course.price.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Discounted Price:</span>
                      <span className="font-bold text-green-400 text-xl">
                        ₹{discountedPrice.toLocaleString()}
                      </span>
                    </div>
                    <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-2 mt-2">
                      <div className="flex justify-between items-center">
                        <span className="text-green-400 text-sm font-medium">You Save:</span>
                        <span className="text-green-400 font-bold">
                          ₹{(course.price - discountedPrice).toLocaleString()} 
                          ({Math.round(((course.price - discountedPrice) / course.price) * 100)}% OFF)
                        </span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Course Price:</span>
                    <span className="font-bold text-green-400 text-xl">
                      ₹{course.price.toLocaleString()}
                    </span>
                  </div>
                )}
              </div>

              {/* Referral Code Section */}
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-white font-medium">Have a referral code?</label>
                  <span className="text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded">
                    60% OFF
                  </span>
                </div>
                
                {!discountApplied ? (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={referralCode}
                      onChange={(e) => setReferralCode(e.target.value)}
                      placeholder="Enter referral code"
                      className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                    />
                    <button
                      onClick={validateReferralCode}
                      disabled={!referralCode.trim() || isValidatingCode}
                      className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                      {isValidatingCode ? '...' : 'Apply'}
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between bg-green-400/10 border border-green-400/20 rounded-lg p-3">
                    <div className="flex items-center gap-2">
                      <span className="text-green-400">✓</span>
                      <span className="text-white">Code "{referralCode}" applied!</span>
                    </div>
                    <button
                      onClick={removeDiscount}
                      className="text-red-400 hover:text-red-300 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>

              {/* Total */}
              <div className="bg-gray-800 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-white">Total Amount:</span>
                  <span className="text-2xl font-bold text-green-400">
                    ₹{(discountApplied ? discountedPrice : course.price).toLocaleString()}
                  </span>
                </div>
                {discountApplied && (
                  <div className="text-sm text-green-400 text-right mt-1">
                    You saved ₹{(course.price - discountedPrice).toLocaleString()}!
                  </div>
                )}
              </div>

              {/* Payment Button */}
              <button
                onClick={async () => {
                  try {
                    // Get student info from localStorage
                    const studentData = localStorage.getItem('currentUser');
                    if (!studentData) {
                      alert('Please log in to enroll in courses');
                      navigate('/login');
                      return;
                    }

                    const student = JSON.parse(studentData);
                    const finalPrice = discountApplied ? discountedPrice : course.price;

                    // Initialize Razorpay payment
                    const options = {
                      key: 'rzp_test_9WsLnHkruf61R1', // Replace with your Razorpay key
                      amount: Math.round(finalPrice * 100), // Amount in paise
                      currency: 'INR',
                      name: 'VStudents',
                      description: `Enroll in ${course.title}`,
                      image: '/logo.png',
                      handler: async function (response: any) {
                        // Payment successful
                        console.log('Payment successful:', response);
                        
                        try {
                          // Record enrollment in backend
                          const enrollmentResponse = await fetch('http://localhost:5000/api/courses/purchase', {
                            method: 'POST',
                            headers: {
                              'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                              courseId: course.id,
                              studentId: student.email,
                              paymentId: response.razorpay_payment_id,
                              amount: finalPrice,
                              referralCode: discountApplied ? referralCode : null,
                              originalPrice: course.price,
                              discountApplied: discountApplied,
                              savings: discountApplied ? (course.price - finalPrice) : 0
                            })
                          });
                          
                          if (enrollmentResponse.ok) {
                            const result = await enrollmentResponse.json();
                            if (result.success) {
                              // Show success message
                              const successMessage = discountApplied 
                                ? `Payment successful! You enrolled in ${course.title} and saved ₹${(course.price - finalPrice).toLocaleString()} with referral code "${referralCode}"!`
                                : `Payment successful! You are now enrolled in ${course.title}!`;
                              
                              alert(successMessage);
                              
                              // Close payment modal and redirect
                              setShowPayment(false);
                              navigate('/student-portal');
                            } else {
                              alert('Payment successful but failed to record enrollment. Please contact support.');
                            }
                          } else {
                            alert('Payment successful but failed to record enrollment. Please contact support.');
                          }
                        } catch (error) {
                          console.error('Error recording enrollment:', error);
                          alert('Payment successful but failed to record enrollment. Please contact support.');
                        }
                      },
                      prefill: {
                        name: student.name || 'Student',
                        email: student.email || 'student@example.com',
                        contact: student.phone || '9999999999'
                      },
                      theme: {
                        color: '#3B82F6'
                      },
                      modal: {
                        ondismiss: function() {
                          console.log('Payment modal closed');
                        }
                      }
                    };

                    // Check if Razorpay is loaded
                    if (typeof (window as any).Razorpay === 'undefined') {
                      alert('Payment gateway not loaded. Please refresh the page and try again.');
                      return;
                    }

                    const rzp = new (window as any).Razorpay(options);
                    rzp.open();
                  } catch (error) {
                    console.error('Payment error:', error);
                    alert('Error initializing payment. Please try again.');
                  }
                }}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isValidatingCode}
              >
                {isValidatingCode ? 'Validating...' : 'Pay with Razorpay'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default CourseDetail;