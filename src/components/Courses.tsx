import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
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
  technologies: string[];
  originalPrice: number;
  discountPercent: number;
  discountCode: string;
  finalPrice: number;
  duration: string;
  projects: number;
  modules: CourseModule[];
}

const Courses = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');

  const courses: Course[] = [
    {
      id: 'frontend-beginner',
      title: 'Frontend Development - Beginner',
      category: 'frontend',
      level: 'beginner',
      description: 'Master the fundamentals of web development with HTML, CSS, JavaScript, and MongoDB basics',
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
      ]
    },
    {
      id: 'frontend-intermediate',
      title: 'Frontend Development - Intermediate',
      category: 'frontend',
      level: 'intermediate',
      description: 'Advance your frontend skills with modern CSS techniques, JavaScript, and MongoDB',
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
          topics: ['CSS Grid Advanced', 'Animations', 'Preprocessors', 'Modern CSS']
        },
        {
          title: 'Advanced JavaScript',
          duration: '3 weeks',
          topics: ['ES6+ Features', 'Async Programming', 'Modules', 'Advanced DOM']
        },
        {
          title: 'MongoDB Integration',
          duration: '2 weeks',
          topics: ['Database Design', 'CRUD Operations', 'Aggregation', 'Performance']
        },
        {
          title: 'Project Development',
          duration: '1 week',
          topics: ['Full Stack Integration', 'Testing', 'Deployment', 'Best Practices']
        }
      ]
    },
    {
      id: 'frontend-advanced',
      title: 'Frontend Development - Advanced',
      category: 'frontend',
      level: 'advanced',
      description: 'Master advanced frontend concepts with HTML, CSS, JavaScript, MongoDB, and modern frameworks',
      technologies: ['HTML', 'CSS', 'JavaScript', 'MongoDB', 'React', 'Node.js'],
      originalPrice: 4167,
      discountPercent: 40,
      discountCode: 'use code for offer',
      finalPrice: 2500,
      duration: '10 weeks',
      projects: 7,
      modules: [
        {
          title: 'Modern Framework Mastery',
          duration: '3 weeks',
          topics: ['React Advanced', 'State Management', 'Component Patterns', 'Performance']
        },
        {
          title: 'Full Stack Integration',
          duration: '3 weeks',
          topics: ['Node.js', 'API Development', 'Authentication', 'Real-time Features']
        },
        {
          title: 'Advanced Database',
          duration: '2 weeks',
          topics: ['MongoDB Advanced', 'Data Modeling', 'Optimization', 'Scaling']
        },
        {
          title: 'Production Deployment',
          duration: '2 weeks',
          topics: ['CI/CD', 'Cloud Deployment', 'Monitoring', 'Security']
        }
      ]
    },
    {
      id: 'devops-beginner',
      title: 'DevOps - Beginner',
      category: 'devops',
      level: 'beginner',
      description: 'Learn the fundamentals of DevOps with Docker, CI/CD, and cloud deployment basics',
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
          duration: '2 weeks',
          topics: ['DevOps Culture', 'Version Control', 'Git Workflows', 'Linux Basics']
        },
        {
          title: 'Containerization',
          duration: '2 weeks',
          topics: ['Docker Basics', 'Containers', 'Images', 'Docker Compose']
        },
        {
          title: 'CI/CD Basics',
          duration: '2 weeks',
          topics: ['Continuous Integration', 'Automated Testing', 'Deployment Pipelines', 'GitHub Actions']
        },
        {
          title: 'Cloud Deployment',
          duration: '2 weeks',
          topics: ['AWS Basics', 'EC2', 'S3', 'Basic Monitoring']
        }
      ]
    },
    {
      id: 'devops-advanced',
      title: 'DevOps - Advanced',
      category: 'devops',
      level: 'advanced',
      description: 'Master advanced DevOps practices with Kubernetes, Terraform, and enterprise deployment strategies',
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
          topics: ['Kubernetes Architecture', 'Pods & Services', 'Deployments', 'Helm Charts']
        },
        {
          title: 'Infrastructure as Code',
          duration: '3 weeks',
          topics: ['Terraform Basics', 'AWS Resources', 'State Management', 'Modules']
        },
        {
          title: 'Advanced CI/CD',
          duration: '3 weeks',
          topics: ['Jenkins Pipelines', 'Multi-environment Deployment', 'Security Scanning', 'Rollback Strategies']
        },
        {
          title: 'Monitoring & Observability',
          duration: '3 weeks',
          topics: ['Prometheus', 'Grafana', 'Log Management', 'Alerting']
        }
      ]
    },
    {
      id: 'mobile-advanced',
      title: 'Mobile App Development - Advanced',
      category: 'mobile',
      level: 'advanced',
      description: 'Build cross-platform mobile applications for Android and iOS using React Native with Expo',
      technologies: ['React Native', 'Expo', 'JavaScript', 'TypeScript', 'Firebase'],
      originalPrice: 5833,
      discountPercent: 40,
      discountCode: 'mobcore01',
      finalPrice: 3500,
      duration: '14 weeks',
      projects: 5,
      modules: [
        {
          title: 'React Native Fundamentals',
          duration: '3 weeks',
          topics: ['Components', 'Navigation', 'State Management', 'Platform APIs']
        },
        {
          title: 'Advanced Features',
          duration: '4 weeks',
          topics: ['Native Modules', 'Camera Integration', 'Push Notifications', 'Offline Storage']
        },
        {
          title: 'TypeScript Integration',
          duration: '3 weeks',
          topics: ['Type Safety', 'Advanced Types', 'React Native Types', 'Testing']
        },
        {
          title: 'Backend Integration',
          duration: '2 weeks',
          topics: ['Firebase Setup', 'Authentication', 'Real-time Database', 'Cloud Functions']
        },
        {
          title: 'Publishing & Deployment',
          duration: '2 weeks',
          topics: ['App Store Submission', 'Google Play', 'Code Push', 'Analytics']
        }
      ]
    },
    {
      id: 'browser-extensions',
      title: 'Browser Extensions Development',
      category: 'frontend',
      level: 'intermediate',
      description: 'Learn to build powerful browser extensions for Chrome, Firefox, and Edge using modern web technologies',
      technologies: ['JavaScript', 'HTML', 'CSS', 'Web APIs', 'Manifest V3'],
      originalPrice: 2500,
      discountPercent: 40,
      discountCode: 'browserext01',
      finalPrice: 1500,
      duration: '8 weeks',
      projects: 4,
      modules: [
        {
          title: 'Extension Fundamentals',
          duration: '2 weeks',
          topics: ['Manifest Files', 'Extension Architecture', 'Permissions', 'Content Scripts']
        },
        {
          title: 'Web APIs Integration',
          duration: '2 weeks',
          topics: ['Chrome APIs', 'Storage API', 'Tabs API', 'Messaging']
        },
        {
          title: 'Advanced Features',
          duration: '2 weeks',
          topics: ['Background Scripts', 'Context Menus', 'Options Pages', 'Popup Interfaces']
        },
        {
          title: 'Cross-browser Development',
          duration: '2 weeks',
          topics: ['Firefox Extensions', 'Edge Extensions', 'Publishing', 'Distribution']
        }
      ]
    }
  ];

  const categories = [
    { id: 'all', name: 'All Courses' },
    { id: 'frontend', name: 'Frontend' },
    { id: 'backend', name: 'Backend' },
    { id: 'fullstack', name: 'Full Stack' },
    { id: 'mobile', name: 'Mobile' },
    { id: 'devops', name: 'DevOps' }
  ];

  const levels = [
    { id: 'all', name: 'All Levels' },
    { id: 'beginner', name: 'Beginner' },
    { id: 'intermediate', name: 'Intermediate' },
    { id: 'advanced', name: 'Advanced' }
  ];

  const filteredCourses = courses.filter(course => {
    const categoryMatch = selectedCategory === 'all' || course.category === selectedCategory;
    const levelMatch = selectedLevel === 'all' || course.level === selectedLevel;
    return categoryMatch && levelMatch;
  });

  const handleEnrollNow = (course: Course) => {
    navigate(`/student-registration/${course.id}`, { state: { selectedCourse: course } });
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header hideDock={true} />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Master the Future of Technology
          </motion.h1>
          <motion.p
            className="text-xl text-gray-300 max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Transform your career with industry-leading courses designed by experts. 
            Learn cutting-edge technologies and build real-world projects.
          </motion.p>

          {/* Filters */}
          <div className="flex flex-col lg:flex-row gap-8 justify-center items-center mb-16">
            {/* Category Filter */}
            <div className="flex flex-col items-center">
              <h3 className="text-lg font-semibold mb-4 text-gray-300">Category</h3>
              <div className="flex flex-wrap gap-3 justify-center">
                {categories.map((category) => (
                  <motion.button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`relative px-6 py-3 rounded-full border-2 font-medium transition-all duration-300 ${
                      selectedCategory === category.id
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 border-transparent text-white shadow-lg shadow-blue-500/25'
                        : 'border-gray-600 text-gray-300 hover:border-blue-500/50 hover:bg-blue-500/10'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {category.name}
                    {selectedCategory === category.id && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-full"
                        layoutId="categoryHighlight"
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Level Filter */}
            <div className="flex flex-col items-center">
              <h3 className="text-lg font-semibold mb-4 text-gray-300">Level</h3>
              <div className="flex flex-wrap gap-3 justify-center">
                {levels.map((level) => (
                  <motion.button
                    key={level.id}
                    onClick={() => setSelectedLevel(level.id)}
                    className={`relative px-8 py-3 rounded-full border-2 font-medium transition-all duration-300 ${
                      selectedLevel === level.id
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 border-transparent text-white shadow-lg shadow-purple-500/25'
                        : 'border-gray-600 text-gray-300 hover:border-purple-500/50 hover:bg-purple-500/10'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {level.name}
                    {selectedLevel === level.id && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full"
                        layoutId="levelHighlight"
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Grid */}
      <section className="px-4 sm:px-6 lg:px-8 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2
              className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Choose Your Learning Path
            </motion.h2>
            <motion.p
              className="text-gray-400 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''} available in your selected category
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course.id}
                className="group relative bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-sm border border-gray-700/50 rounded-3xl p-8 hover:border-blue-500/50 transition-all duration-500 overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider ${
                      course.level === 'beginner' ? 'bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 border border-green-500/30' :
                      course.level === 'intermediate' ? 'bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-400 border border-yellow-500/30' :
                      'bg-gradient-to-r from-red-500/20 to-pink-500/20 text-red-400 border border-red-500/30'
                    }`}>
                      {course.level}
                    </span>
                    <div className="flex items-center gap-2 text-xs text-gray-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {course.duration}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-blue-100 transition-colors duration-300">
                    {course.title}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed mb-6">{course.description}</p>
                </div>

                <div className="relative z-10 mb-6">
                  <div className="flex flex-wrap gap-2">
                    {course.technologies.slice(0, 4).map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-blue-500/10 text-blue-300 rounded-lg text-xs font-medium border border-blue-500/20">
                        {tech}
                      </span>
                    ))}
                    {course.technologies.length > 4 && (
                      <span className="px-3 py-1 bg-gray-500/10 text-gray-400 rounded-lg text-xs font-medium border border-gray-500/20">
                        +{course.technologies.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="relative z-10 flex items-center justify-between mb-6 p-4 bg-gray-800/50 rounded-xl border border-gray-700/30">
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                    <span>{course.projects} Projects</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Certificate</span>
                  </div>
                </div>

                <div className="relative z-10 mb-8">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl font-bold text-white">₹{course.finalPrice.toLocaleString()}</span>
                    <span className="text-lg text-gray-500 line-through">₹{course.originalPrice.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 rounded-full text-sm font-semibold border border-green-500/30">
                      🎉 {course.discountPercent}% OFF
                    </span>
                    <div className="text-xs text-gray-400">
                      Code: <span className="text-yellow-400 font-mono bg-yellow-400/10 px-2 py-1 rounded">{course.discountCode}</span>
                    </div>
                  </div>
                </div>

                <motion.button
                  onClick={() => handleEnrollNow(course)}
                  className="relative z-10 w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="flex items-center justify-center gap-2">
                    Buy Now
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </motion.button>
              </motion.div>
            ))}
          </div>
          
          {filteredCourses.length === 0 && (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-300 mb-2">No courses found</h3>
              <p className="text-gray-500">Try adjusting your filters to see more courses.</p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Courses;