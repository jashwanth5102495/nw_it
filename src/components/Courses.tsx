import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import { useTheme } from '../contexts/ThemeContext';

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
  price: number;
  duration: string;
  projects: number;
  modules: CourseModule[];
  image: string;
  rating: number;
  students: number;
  maxStudents: number;
  instructor: string;
}

const Courses = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedDuration, setSelectedDuration] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<string>('all');
  const [showFilters, setShowFilters] = useState<boolean>(false);

  const courses: Course[] = [
    {
      id: 'ai-tools',
      title: 'A.I Tools Mastery',
      category: 'ai',
      level: 'intermediate',
      description: 'Master the latest AI tools including ChatGPT, Claude, Midjourney, and more. Learn to leverage AI for productivity, creativity, and business growth.',
      technologies: ['ChatGPT', 'Claude', 'Midjourney', 'GitHub Copilot', 'Notion AI'],
      price: 12000,
      duration: '12 weeks',
      projects: 8,
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop&crop=center',
      rating: 4.9,
      students: 15000,
      maxStudents: 12000,
      instructor: 'Dr. Sarah Chen',
      modules: [
        {
          title: 'AI Fundamentals',
          duration: '3 weeks',
          topics: ['Understanding AI', 'AI Ethics', 'Tool Selection', 'Best Practices']
        },
        {
          title: 'Text Generation AI',
          duration: '3 weeks',
          topics: ['ChatGPT Mastery', 'Claude Advanced', 'Prompt Engineering', 'Content Creation']
        },
        {
          title: 'Visual AI Tools',
          duration: '3 weeks',
          topics: ['Midjourney', 'DALL-E', 'Stable Diffusion', 'Image Enhancement']
        },
        {
          title: 'AI for Business',
          duration: '3 weeks',
          topics: ['Workflow Automation', 'AI Integration', 'ROI Measurement', 'Future Trends']
        }
      ]
    },
    {
      id: 'frontend-beginner',
      title: 'Frontend Development - Beginner',
      category: 'frontend',
      level: 'beginner',
      description: 'Master the fundamentals of web development with HTML, CSS, JavaScript, and MongoDB basics',
      technologies: ['HTML', 'CSS', 'JavaScript', 'MongoDB'],
      price: 1200,
      duration: '8 weeks',
      projects: 3,
      image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=250&fit=crop&crop=center',
      rating: 4.6,
      students: 12543,
      maxStudents: 20000,
      instructor: 'John Smith',
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
      ]
    },
    {
      id: 'frontend-advanced',
      title: 'Frontend Development - Advanced',
      category: 'frontend',
      level: 'advanced',
      description: 'Master advanced frontend concepts including performance optimization and state management',
      technologies: ['React', 'TypeScript', 'Redux', 'Webpack', 'Testing'],
      price: 2500,
      duration: '12 weeks',
      projects: 6,
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=250&fit=crop&crop=center',
      rating: 4.8,
      students: 15000,
      maxStudents: 12000,
      instructor: 'Michael Brown',
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
      ]
    },
    {
      id: 'devops-beginner',
      title: 'DevOps - Beginner',
      category: 'devops',
      level: 'beginner',
      description: 'Learn the fundamentals of DevOps with Docker, CI/CD, and cloud deployment basics',
      technologies: ['Docker', 'Git', 'Linux', 'CI/CD', 'AWS'],
      price: 1000,
      duration: '8 weeks',
      projects: 4,
      image: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=400&h=250&fit=crop&crop=center',
      rating: 4.5,
      students: 6789,
      maxStudents: 20000,
      instructor: 'David Wilson',
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
      ]
    },
    {
      id: 'devops-advanced',
      title: 'DevOps - Advanced',
      category: 'devops',
      level: 'advanced',
      description: 'Master advanced DevOps practices with Kubernetes and infrastructure as code',
      technologies: ['Kubernetes', 'Terraform', 'Jenkins', 'Prometheus', 'Grafana'],
      price: 1400,
      duration: '14 weeks',
      projects: 7,
      image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=400&h=250&fit=crop&crop=center',
      rating: 4.9,
      students: 3456,
      maxStudents: 20000,
      instructor: 'Lisa Garcia',
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
      ]
    }
  ];

  const categories = [
    { id: 'all', name: 'All Courses', count: courses.length },
    { id: 'ai', name: 'AI & Machine Learning', count: courses.filter(c => c.category === 'ai').length },
    { id: 'frontend', name: 'Frontend Development', count: courses.filter(c => c.category === 'frontend').length },
    { id: 'devops', name: 'DevOps & Cloud', count: courses.filter(c => c.category === 'devops').length },
  ];

  // Filter courses based on selected filters
  const filteredCourses = courses.filter(course => {
    // Category filter
    if (selectedCategory !== 'all' && course.category !== selectedCategory) {
      return false;
    }

    // Level filter
    if (selectedLevel !== 'all' && course.level !== selectedLevel) {
      return false;
    }

    // Duration filter
    if (selectedDuration !== 'all') {
      const durationWeeks = parseInt(course.duration.split(' ')[0]);
      if (selectedDuration === 'short' && durationWeeks > 8) return false;
      if (selectedDuration === 'medium' && (durationWeeks <= 8 || durationWeeks > 12)) return false;
      if (selectedDuration === 'long' && durationWeeks <= 12) return false;
    }

    // Price filter
    if (priceRange !== 'all') {
      if (priceRange === 'low' && course.price > 1500) return false;
      if (priceRange === 'medium' && (course.price <= 1500 || course.price > 5000)) return false;
      if (priceRange === 'high' && course.price <= 5000) return false;
    }

    return true;
  });

  const handleCourseClick = (courseId: string) => {
    navigate('/student-registration');
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' ? 'bg-black text-white' : 'bg-gray-50 text-gray-900'
    }`}>
      <Header />
      

      
      <div className="pt-20">
        {/* Header Section */}
        <div className={`border-b ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'} pb-8`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className={`text-3xl font-bold mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Courses
              </h1>
              <p className={`text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {filteredCourses.length} results for all courses
              </p>
            </motion.div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex gap-8">
            {/* Sidebar Filters */}
            <motion.div
              className={`w-80 flex-shrink-0 ${
                theme === 'dark' ? 'bg-gray-900' : 'bg-white'
              } rounded-lg p-6 h-fit sticky top-24 border ${
                theme === 'dark' ? 'border-gray-800' : 'border-gray-200'
              }`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h3 className={`text-lg font-semibold mb-6 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Filters
              </h3>

              {/* Subject Filter */}
              <div className="mb-8">
                <h4 className={`text-sm font-medium mb-4 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Subject
                </h4>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <label key={category.id} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        value={category.id}
                        checked={selectedCategory === category.id}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className={`ml-3 text-sm ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {category.name}
                      </span>
                      <span className={`ml-auto text-xs ${
                        theme === 'dark' ? 'text-gray-500' : 'text-gray-500'
                      }`}>
                        ({category.count})
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Level Filter */}
              <div className="mb-8">
                <h4 className={`text-sm font-medium mb-4 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Level
                </h4>
                <div className="space-y-3">
                  {['all', 'beginner', 'intermediate', 'advanced'].map((level) => (
                    <label key={level} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="level"
                        value={level}
                        checked={selectedLevel === level}
                        onChange={(e) => setSelectedLevel(e.target.value)}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className={`ml-3 text-sm capitalize ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {level === 'all' ? 'All Levels' : level}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Duration Filter */}
              <div className="mb-8">
                <h4 className={`text-sm font-medium mb-4 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Duration
                </h4>
                <div className="space-y-3">
                  {[
                    { value: 'all', label: 'Any Duration' },
                    { value: 'short', label: '1-6 weeks' },
                    { value: 'medium', label: '7-12 weeks' },
                    { value: 'long', label: '13+ weeks' }
                  ].map((duration) => (
                    <label key={duration.value} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="duration"
                        value={duration.value}
                        checked={selectedDuration === duration.value}
                        onChange={(e) => setSelectedDuration(e.target.value)}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className={`ml-3 text-sm ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {duration.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Filter */}
              <div className="mb-8">
                <h4 className={`text-sm font-medium mb-4 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  Price
                </h4>
                <div className="space-y-3">
                  {[
                    { value: 'all', label: 'Any Price' },
                    { value: 'free', label: 'Free' },
                    { value: 'low', label: '₹1 - ₹1,500' },
                    { value: 'medium', label: '₹1,501 - ₹5,000' },
                    { value: 'high', label: '₹5,000+' }
                  ].map((price) => (
                    <label key={price.value} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="price"
                        value={price.value}
                        checked={priceRange === price.value}
                        onChange={(e) => setPriceRange(e.target.value)}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className={`ml-3 text-sm ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>
                        {price.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSelectedLevel('all');
                  setSelectedDuration('all');
                  setPriceRange('all');
                }}
                className={`w-full py-2 px-4 text-sm font-medium rounded-lg border transition-colors ${
                  theme === 'dark'
                    ? 'border-gray-600 text-gray-300 hover:bg-gray-800'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Clear all
              </button>
            </motion.div>

            {/* Main Content Area */}
            <div className="flex-1">
              {/* Results Header */}
              <div className="flex items-center justify-between mb-6">
                <p className={`text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Showing {filteredCourses.length} results
                </p>
              </div>

              {/* Courses Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredCourses.map((course, index) => (
                  <motion.div
                    key={course.id}
                    className={`rounded-lg overflow-hidden border transition-all duration-200 hover:shadow-lg cursor-pointer ${
                      theme === 'dark'
                        ? 'bg-gray-900 border-gray-800 hover:border-gray-700'
                        : 'bg-white border-gray-200 hover:border-gray-300 shadow-sm'
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.05 }}
                    onClick={() => handleCourseClick(course.id)}
                  >
                    {/* Course Image */}
                    <div className="relative h-40 overflow-hidden">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 left-3">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          course.level === 'beginner' 
                            ? 'bg-green-100 text-green-800' 
                            : course.level === 'intermediate' 
                            ? 'bg-yellow-100 text-yellow-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
                        </span>
                      </div>
                    </div>

                    {/* Course Content */}
                    <div className="p-4">
                      {/* Course Title */}
                      <h3 className={`text-lg font-semibold mb-2 line-clamp-2 ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        {course.title}
                      </h3>
                      
                      {/* Instructor */}
                      <p className={`text-sm mb-3 ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        By {course.instructor}
                      </p>

                      {/* Rating and Students */}
                      <div className={`flex items-center gap-4 text-sm mb-3 ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        <div className="flex items-center gap-1">
                          <span className="text-yellow-500">★</span>
                          <span className="font-medium">{course.rating}</span>
                          <span>({course.students.toLocaleString()} students)</span>
                        </div>
                      </div>

                      {/* Duration */}
                      <div className={`text-sm mb-4 ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {course.duration} • 3 projects
                      </div>

                      {/* Technologies */}
                      <div className="flex flex-wrap gap-1 mb-4">
                        {course.technologies.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              theme === 'dark'
                                ? 'bg-gray-800 text-gray-300'
                                : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {tech}
                          </span>
                        ))}
                        {course.technologies.length > 3 && (
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            theme === 'dark' ? 'bg-gray-800 text-gray-400' : 'bg-gray-100 text-gray-500'
                          }`}>
                            +{course.technologies.length - 3} more
                          </span>
                        )}
                      </div>

                      {/* Referral Code Message */}
                      <div className="mb-3 p-2 bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-lg">
                        <div className="flex items-center gap-2">
                          <span className="text-green-400 text-sm">🎯</span>
                          <span className={`text-sm font-medium ${
                            theme === 'dark' ? 'text-green-400' : 'text-green-600'
                          }`}>
                            Use referral code for 60% OFF!
                          </span>
                        </div>
                      </div>

                      {/* Pricing and Enroll Button */}
                      <div className="flex items-center justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-2">
                          <span className={`text-xl font-bold ${
                            theme === 'dark' ? 'text-white' : 'text-gray-900'
                          }`}>
                            ₹{course.price.toLocaleString()}
                          </span>
                        </div>
                        {course.students >= course.maxStudents ? (
                          <button 
                            disabled
                            className={`px-4 py-2 rounded font-medium text-sm transition-colors cursor-not-allowed ${
                              theme === 'dark'
                                ? 'bg-gray-600 text-gray-400'
                                : 'bg-gray-400 text-gray-600'
                            }`}>
                            Slots Closed
                          </button>
                        ) : (
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate('/student-registration');
                            }}
                            className={`px-4 py-2 rounded font-medium text-sm transition-colors ${
                            theme === 'dark'
                              ? 'bg-blue-600 text-white hover:bg-blue-700'
                              : 'bg-blue-600 text-white hover:bg-blue-700'
                          }`}>
                            Enroll Now
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

          {/* No Results */}
          {filteredCourses.length === 0 && (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold mb-2">No courses found</h3>
              <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                Try adjusting your filters to see more results
              </p>
            </motion.div>
          )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;