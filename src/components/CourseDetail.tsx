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
  originalPrice: number;
  discountPercent: number;
  discountCode: string;
  finalPrice: number;
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
  const [discountCodeInput, setDiscountCodeInput] = useState('');
  const [isValidCode, setIsValidCode] = useState(false);
  const [showPayment, setShowPayment] = useState(false);

  const courses: Course[] = [
    {
      id: 'frontend-beginner',
      title: 'Frontend Development - Beginner',
      category: 'frontend',
      level: 'beginner',
      description: 'Master the fundamentals of web development with HTML, CSS, JavaScript, and MongoDB basics',
      detailedDescription: 'This comprehensive beginner course will take you from zero to building interactive websites. You\'ll learn the core technologies that power the modern web including HTML structure, CSS styling, JavaScript programming fundamentals, and MongoDB database basics.',
      technologies: ['HTML', 'CSS', 'JavaScript', 'MongoDB'],
      originalPrice: 2000,
      discountPercent: 40,
      discountCode: 'use code for offer',
      finalPrice: 1200,
      duration: '6 weeks',
      projects: 3,
      modules: [
        {
          title: 'HTML Fundamentals',
          duration: '1 week',
          topics: ['HTML Structure', 'Semantic HTML', 'Forms and Input', 'HTML5 Features']
        },
        {
          title: 'CSS Styling',
          duration: '2 weeks',
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
      technologies: ['HTML', 'CSS', 'JavaScript', 'MongoDB'],
      originalPrice: 3333,
      discountPercent: 40,
      discountCode: 'use code for offer',
      finalPrice: 2000,
      duration: '8 weeks',
      projects: 5,
      modules: [
        {
          title: 'Advanced CSS Techniques',
          duration: '2 weeks',
          topics: ['CSS Grid Advanced', 'Flexbox Mastery', 'CSS Animations', 'Transitions']
        },
        {
          title: 'JavaScript Intermediate',
          duration: '3 weeks',
          topics: ['ES6+ Features', 'Async Programming', 'API Integration', 'Error Handling']
        },
        {
          title: 'Modern CSS Frameworks',
          duration: '2 weeks',
          topics: ['Advanced Tailwind CSS', 'Component Styling', 'Responsive Utilities']
        },
        {
          title: 'Project Development',
          duration: '1 week',
          topics: ['Interactive Web Applications', 'Performance Optimization', 'Deployment']
        }
      ],
      prerequisites: ['Basic HTML & CSS knowledge', 'Completion of beginner course or equivalent'],
      whatYouWillLearn: [
        'Create complex layouts with CSS Grid',
        'Add interactivity with JavaScript',
        'Build animated user interfaces',
        'Master advanced Tailwind features',
        'Optimize website performance',
        'Work with APIs and external data'
      ]
    },
    {
      id: 'frontend-advanced',
      title: 'Frontend Development - Advanced',
      category: 'frontend',
      level: 'advanced',
      description: 'Master advanced frontend concepts with HTML, CSS, JavaScript, MongoDB, and modern frameworks',
      detailedDescription: 'Take your frontend expertise to the professional level with advanced React concepts, TypeScript integration, MongoDB database management, and modern development practices.',
      technologies: ['HTML', 'CSS', 'JavaScript', 'MongoDB', 'React', 'TypeScript'],
      originalPrice: 4167,
      discountPercent: 40,
      discountCode: 'use code for offer',
      finalPrice: 2500,
      duration: '10 weeks',
      projects: 7,
      modules: [
        {
          title: 'React Advanced Concepts',
          duration: '3 weeks',
          topics: ['Advanced React Hooks', 'Context API', 'Custom Hooks', 'Performance Patterns']
        },
        {
          title: 'TypeScript Integration',
          duration: '2 weeks',
          topics: ['TypeScript Basics', 'React with TypeScript', 'Type Safety', 'Advanced Types']
        },
        {
          title: 'Database Management',
          duration: '2 weeks',
          topics: ['MongoDB Integration', 'Database Design', 'CRUD Operations', 'Data Modeling']
        },
        {
          title: 'State Management',
          duration: '2 weeks',
          topics: ['Redux Toolkit', 'State Architecture', 'Middleware', 'Async Actions']
        },
        {
          title: 'Production Ready Development',
          duration: '1 week',
          topics: ['Performance Optimization', 'Testing Strategies', 'Deployment', 'Full-Stack Project']
        }
      ],
      prerequisites: ['Intermediate frontend knowledge', 'JavaScript proficiency'],
      whatYouWillLearn: [
        'Build complex React applications',
        'Master TypeScript for type safety',
        'Integrate MongoDB databases',
        'Implement advanced state management',
        'Optimize application performance',
        'Deploy production-ready applications'
      ]
    },
    {
      id: 'devops-beginner',
      title: 'DevOps - Beginner',
      category: 'devops',
      level: 'beginner',
      description: 'Learn the fundamentals of DevOps with Docker, CI/CD, and cloud deployment basics',
      detailedDescription: 'This comprehensive beginner course introduces you to DevOps practices and tools. You\'ll learn containerization with Docker, version control with Git, basic Linux administration, CI/CD pipelines, and cloud deployment fundamentals.',
      technologies: ['Docker', 'Git', 'Linux', 'CI/CD', 'AWS'],
      originalPrice: 1667,
      discountPercent: 40,
      discountCode: 'stuops01',
      finalPrice: 1000,
      duration: '8 weeks',
      projects: 4,
      modules: [
        {
          title: 'DevOps Fundamentals',
          duration: '1 week',
          topics: ['DevOps Culture', 'Collaboration Practices', 'Tool Overview', 'Best Practices']
        },
        {
          title: 'Version Control & Linux',
          duration: '2 weeks',
          topics: ['Git Fundamentals', 'Branching Strategies', 'Linux Command Line', 'Shell Scripting']
        },
        {
          title: 'Containerization',
          duration: '2 weeks',
          topics: ['Docker Basics', 'Container Management', 'Docker Compose', 'Registry Management']
        },
        {
          title: 'CI/CD & Cloud Deployment',
          duration: '2 weeks',
          topics: ['Pipeline Basics', 'AWS Fundamentals', 'Automated Deployment', 'Monitoring']
        },
        {
          title: 'Project Implementation',
          duration: '1 week',
          topics: ['End-to-End Pipeline', 'Best Practices', 'Troubleshooting', 'Documentation']
        }
      ],
      prerequisites: ['Basic computer skills', 'Basic understanding of software development'],
      whatYouWillLearn: [
        'Understand DevOps principles and practices',
        'Master Git for version control',
        'Work with Linux command line',
        'Create and manage Docker containers',
        'Build basic CI/CD pipelines',
        'Deploy applications to AWS cloud'
      ]
    },
    {
      id: 'devops-advanced',
      title: 'DevOps - Advanced',
      category: 'devops',
      level: 'advanced',
      description: 'Master advanced DevOps practices with Kubernetes, Terraform, and enterprise deployment strategies',
      detailedDescription: 'Take your DevOps expertise to the enterprise level with advanced orchestration, infrastructure as code, monitoring, and security practices. Learn Kubernetes, Terraform, Jenkins, and advanced AWS services.',
      technologies: ['Kubernetes', 'Terraform', 'Jenkins', 'AWS', 'Monitoring'],
      originalPrice: 2333,
      discountPercent: 40,
      discountCode: 'stuops02',
      finalPrice: 1400,
      duration: '12 weeks',
      projects: 6,
      modules: [
        {
          title: 'Container Orchestration',
          duration: '3 weeks',
          topics: ['Kubernetes Architecture', 'Pod Management', 'Services & Ingress', 'Helm Charts']
        },
        {
          title: 'Infrastructure as Code',
          duration: '2 weeks',
          topics: ['Terraform Basics', 'State Management', 'Modules', 'Best Practices']
        },
        {
          title: 'Advanced CI/CD',
          duration: '2 weeks',
          topics: ['Jenkins Pipelines', 'GitOps', 'Blue-Green Deployment', 'Canary Releases']
        },
        {
          title: 'Monitoring & Security',
          duration: '3 weeks',
          topics: ['Prometheus & Grafana', 'Log Management', 'DevSecOps', 'Compliance']
        },
        {
          title: 'Enterprise Implementation',
          duration: '2 weeks',
          topics: ['Multi-Cloud Strategies', 'Scalability', 'Enterprise Pipeline', 'Documentation']
        }
      ],
      prerequisites: ['DevOps beginner knowledge', 'Experience with Docker and basic cloud services'],
      whatYouWillLearn: [
        'Orchestrate containers with Kubernetes',
        'Manage infrastructure with Terraform',
        'Implement advanced CI/CD pipelines',
        'Set up comprehensive monitoring',
        'Apply DevSecOps security practices',
        'Design scalable deployment architectures'
      ]
    },
    // Add other courses here...
  ];

  useEffect(() => {
    const foundCourse = courses.find(c => c.id === courseId);
    if (foundCourse) {
      setCourse(foundCourse);
    } else {
      navigate('/courses');
    }
  }, [courseId, navigate]);

  useEffect(() => {
    if (course && discountCodeInput.toLowerCase() === course.discountCode.toLowerCase()) {
      setIsValidCode(true);
    } else {
      setIsValidCode(false);
    }
  }, [discountCodeInput, course]);

  const handleEnrollNow = () => {
    if (!course) return;
    // Navigate to student registration with course pre-selected
    navigate(`/student-registration/${course.id}`);
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
      
      <div className="pt-24 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Course Content */}
            <div className="lg:col-span-2">
              {/* Course Header */}
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    course.level === 'beginner' ? 'bg-green-500/20 text-green-400' :
                    course.level === 'intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {course.level.toUpperCase()}
                  </span>
                  <span className="text-gray-400">{course.category}</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                  {course.title}
                </h1>
                <p className="text-xl text-gray-300 mb-6">{course.detailedDescription}</p>
                
                {/* Course Stats */}
                <div className="flex flex-wrap gap-6 text-sm text-gray-400">
                  <div className="flex items-center gap-2">
                    <span>⏱️</span>
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>📚</span>
                    <span>{course.projects} Projects</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>🎯</span>
                    <span>{course.modules.length} Modules</span>
                  </div>
                </div>
              </motion.div>

              {/* Technologies */}
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h2 className="text-2xl font-bold mb-4">Technologies You'll Learn</h2>
                <div className="flex flex-wrap gap-3">
                  {course.technologies.map((tech) => (
                    <span key={tech} className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg font-semibold">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* What You'll Learn */}
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="text-2xl font-bold mb-4">What You'll Learn</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {course.whatYouWillLearn.map((item, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <span className="text-green-400 mt-1">✓</span>
                      <span className="text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Course Modules */}
              <motion.div
                className="mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h2 className="text-2xl font-bold mb-4">Course Modules</h2>
                <div className="space-y-4">
                  {course.modules.map((module, index) => (
                    <div key={index} className="p-6 bg-gray-900/50 rounded-lg border border-gray-700">
                      <div className="flex items-center gap-4 mb-3">
                        <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
                          {index + 1}
                        </span>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-white">{module.title}</h3>
                          <p className="text-sm text-gray-400">{module.duration}</p>
                        </div>
                      </div>
                      <div className="ml-12">
                        <div className="flex flex-wrap gap-2">
                          {module.topics.map((topic, topicIndex) => (
                            <span key={topicIndex} className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Prerequisites */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <h2 className="text-2xl font-bold mb-4">Prerequisites</h2>
                <div className="space-y-2">
                  {course.prerequisites.map((prereq, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <span className="text-yellow-400 mt-1">•</span>
                      <span className="text-gray-300">{prereq}</span>
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
                      ₹{isValidCode ? course.finalPrice : course.originalPrice}
                    </span>
                    {!isValidCode && (
                      <span className="text-lg text-gray-500 line-through">₹{course.originalPrice}</span>
                    )}
                  </div>
                  {!isValidCode && (
                    <div className="text-sm text-yellow-400">
                      Save ₹{course.originalPrice - course.finalPrice} with discount code!
                    </div>
                  )}
                </div>

                {/* Discount Code */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold mb-2">Discount Code</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={discountCodeInput}
                      onChange={(e) => setDiscountCodeInput(e.target.value)}
                      placeholder={`Try: ${course.discountCode}`}
                      className="flex-1 px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                    />
                    {isValidCode && (
                      <div className="flex items-center justify-center w-10 h-10 bg-green-500/20 rounded-lg">
                        <span className="text-green-400">✓</span>
                      </div>
                    )}
                  </div>
                  {isValidCode && (
                    <div className="text-sm text-green-400 mt-2">
                      {course.discountPercent}% discount applied!
                    </div>
                  )}
                </div>

                {/* Course Features */}
                <div className="mb-6 space-y-3">
                  <div className="flex items-center gap-3 text-sm text-gray-300">
                    <span className="text-green-400">✓</span>
                    <span>Lifetime access</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-300">
                    <span className="text-green-400">✓</span>
                    <span>Certificate of completion</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-300">
                    <span className="text-green-400">✓</span>
                    <span>24/7 support</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-300">
                    <span className="text-green-400">✓</span>
                    <span>Practical projects</span>
                  </div>
                </div>

                {/* Enroll Button */}
                <motion.button
                  onClick={handleEnrollNow}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Enroll Now - ₹{isValidCode ? course.finalPrice : course.originalPrice}
                </motion.button>

                <div className="text-xs text-gray-400 text-center mt-4">
                  30-day money-back guarantee
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;