import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import { useTheme } from '../contexts/ThemeContext';
import ThemeToggle from './ThemeToggle';

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
  image: string;
  rating: number;
  students: number;
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
      originalPrice: 15000,
      discountPercent: 20,
      discountCode: 'AITOOLS20',
      finalPrice: 12000,
      duration: '6 weeks',
      projects: 8,
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop&crop=center',
      rating: 4.9,
      students: 2847,
      instructor: 'Dr. Sarah Chen',
      modules: [
        {
          title: 'AI Fundamentals',
          duration: '1 week',
          topics: ['Understanding AI', 'AI Ethics', 'Tool Selection', 'Best Practices']
        },
        {
          title: 'Text Generation AI',
          duration: '2 weeks',
          topics: ['ChatGPT Mastery', 'Claude Advanced', 'Prompt Engineering', 'Content Creation']
        },
        {
          title: 'Visual AI Tools',
          duration: '2 weeks',
          topics: ['Midjourney', 'DALL-E', 'Stable Diffusion', 'Image Enhancement']
        },
        {
          title: 'AI for Business',
          duration: '1 week',
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
      originalPrice: 2000,
      discountPercent: 40,
      discountCode: 'use code for offer',
      finalPrice: 1200,
      duration: '6 weeks',
      projects: 3,
      image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=250&fit=crop&crop=center',
      rating: 4.6,
      students: 12543,
      instructor: 'John Smith',
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
      image: 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=400&h=250&fit=crop&crop=center',
      rating: 4.7,
      students: 8932,
      instructor: 'Emily Johnson',
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
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop&crop=center',
      rating: 4.8,
      students: 6421,
      instructor: 'Michael Chen',
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
      image: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=400&h=250&fit=crop&crop=center',
      rating: 4.5,
      students: 9876,
      instructor: 'David Wilson',
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
      image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=400&h=250&fit=crop&crop=center',
      rating: 4.9,
      students: 5432,
      instructor: 'Lisa Rodriguez',
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
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop&crop=center',
      rating: 4.7,
      students: 4321,
      instructor: 'Alex Thompson',
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
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop&crop=center',
      rating: 4.6,
      students: 3210,
      instructor: 'Rachel Green',
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
    { id: 'all', name: 'All Courses', count: courses.length },
    { id: 'ai', name: 'Artificial Intelligence', count: courses.filter(c => c.category === 'ai').length },
    { id: 'frontend', name: 'Frontend Development', count: courses.filter(c => c.category === 'frontend').length },
    { id: 'backend', name: 'Backend Development', count: courses.filter(c => c.category === 'backend').length },
    { id: 'fullstack', name: 'Full Stack', count: courses.filter(c => c.category === 'fullstack').length },
    { id: 'mobile', name: 'Mobile Development', count: courses.filter(c => c.category === 'mobile').length },
    { id: 'devops', name: 'DevOps & Cloud', count: courses.filter(c => c.category === 'devops').length }
  ];

  const levels = [
    { id: 'all', name: 'All Levels' },
    { id: 'beginner', name: 'Beginner' },
    { id: 'intermediate', name: 'Intermediate' },
    { id: 'advanced', name: 'Advanced' }
  ];

  const durations = [
    { id: 'all', name: 'Any Duration' },
    { id: 'short', name: '1-6 weeks' },
    { id: 'medium', name: '7-12 weeks' },
    { id: 'long', name: '13+ weeks' }
  ];

  const priceRanges = [
    { id: 'all', name: 'Any Price' },
    { id: 'free', name: 'Free' },
    { id: 'low', name: 'Under ₹2,000' },
    { id: 'medium', name: '₹2,000 - ₹5,000' },
    { id: 'high', name: 'Above ₹5,000' }
  ];

  const filteredCourses = courses.filter(course => {
    const categoryMatch = selectedCategory === 'all' || course.category === selectedCategory;
    const levelMatch = selectedLevel === 'all' || course.level === selectedLevel;
    
    let durationMatch = true;
    if (selectedDuration === 'short') {
      const weeks = parseInt(course.duration.split(' ')[0]);
      durationMatch = weeks <= 6;
    } else if (selectedDuration === 'medium') {
      const weeks = parseInt(course.duration.split(' ')[0]);
      durationMatch = weeks >= 7 && weeks <= 12;
    } else if (selectedDuration === 'long') {
      const weeks = parseInt(course.duration.split(' ')[0]);
      durationMatch = weeks >= 13;
    }

    let priceMatch = true;
    if (priceRange === 'free') {
      priceMatch = course.finalPrice === 0;
    } else if (priceRange === 'low') {
      priceMatch = course.finalPrice < 2000;
    } else if (priceRange === 'medium') {
      priceMatch = course.finalPrice >= 2000 && course.finalPrice <= 5000;
    } else if (priceRange === 'high') {
      priceMatch = course.finalPrice > 5000;
    }

    return categoryMatch && levelMatch && durationMatch && priceMatch;
  });

  const handleEnrollNow = (course: Course) => {
    navigate(`/student-registration/${course.id}`, { state: { selectedCourse: course } });
  };

  const clearAllFilters = () => {
    setSelectedCategory('all');
    setSelectedLevel('all');
    setSelectedDuration('all');
    setPriceRange('all');
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-black text-white' 
        : 'bg-gray-50 text-gray-900'
    }`}>
      <Header hideDock={true} />
      
      {/* Header Section */}
      <div className={`border-b pt-20 transition-colors duration-300 ${
        theme === 'dark' 
          ? 'bg-gray-900 border-gray-700' 
          : 'bg-white border-gray-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className={`text-3xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>Courses</h1>
              <p className={`mt-2 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>{filteredCourses.length} results for all courses</p>
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`lg:hidden px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200 ${
                  theme === 'dark'
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Left Sidebar - Filters */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-80 space-y-6`}>
            <div className={`rounded-lg border p-6 transition-colors duration-300 ${
              theme === 'dark' 
                ? 'bg-gray-900 border-gray-700' 
                : 'bg-white border-gray-200'
            }`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-lg font-semibold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>Filters</h3>
                <button
                  onClick={clearAllFilters}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors duration-200"
                >
                  Clear all
                </button>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h4 className={`font-medium mb-3 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>Subject</h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category.id} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="category"
                        value={category.id}
                        checked={selectedCategory === category.id}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className={`w-4 h-4 text-blue-600 focus:ring-blue-500 ${
                          theme === 'dark' 
                            ? 'border-gray-600 bg-gray-800' 
                            : 'border-gray-300 bg-white'
                        }`}
                      />
                      <span className={`ml-3 text-sm flex-1 ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>{category.name}</span>
                      <span className={`text-xs ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`}>({category.count})</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Level */}
              <div className="mb-6">
                <h4 className={`font-medium mb-3 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>Level</h4>
                <div className="space-y-2">
                  {levels.map((level) => (
                    <label key={level.id} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="level"
                        value={level.id}
                        checked={selectedLevel === level.id}
                        onChange={(e) => setSelectedLevel(e.target.value)}
                        className={`w-4 h-4 text-blue-600 focus:ring-blue-500 ${
                          theme === 'dark' 
                            ? 'border-gray-600 bg-gray-800' 
                            : 'border-gray-300 bg-white'
                        }`}
                      />
                      <span className={`ml-3 text-sm ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>{level.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Duration */}
              <div className="mb-6">
                <h4 className={`font-medium mb-3 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>Duration</h4>
                <div className="space-y-2">
                  {durations.map((duration) => (
                    <label key={duration.id} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="duration"
                        value={duration.id}
                        checked={selectedDuration === duration.id}
                        onChange={(e) => setSelectedDuration(e.target.value)}
                        className={`w-4 h-4 text-blue-600 focus:ring-blue-500 ${
                          theme === 'dark' 
                            ? 'border-gray-600 bg-gray-800' 
                            : 'border-gray-300 bg-white'
                        }`}
                      />
                      <span className={`ml-3 text-sm ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>{duration.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h4 className={`font-medium mb-3 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>Price</h4>
                <div className="space-y-2">
                  {priceRanges.map((range) => (
                    <label key={range.id} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="price"
                        value={range.id}
                        checked={priceRange === range.id}
                        onChange={(e) => setPriceRange(e.target.value)}
                        className={`w-4 h-4 text-blue-600 focus:ring-blue-500 ${
                          theme === 'dark' 
                            ? 'border-gray-600 bg-gray-800' 
                            : 'border-gray-300 bg-white'
                        }`}
                      />
                      <span className={`ml-3 text-sm ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                      }`}>{range.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Courses Grid */}
          <div className="flex-1">
            {filteredCourses.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className={`text-2xl font-bold mb-2 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>No courses found</h3>
                <p className={`${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>Try adjusting your filters to see more courses.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredCourses.map((course, index) => (
                  <motion.div
                    key={course.id}
                    className={`rounded-lg border overflow-hidden hover:shadow-lg transition-all duration-300 ${
                      theme === 'dark' 
                        ? 'bg-gray-900 border-gray-700 hover:shadow-gray-900/20' 
                        : 'bg-white border-gray-200 hover:shadow-gray-200/50'
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    {/* Course Image */}
                    <div className="relative h-48 bg-gray-200">
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 left-3">
                        <span className={`px-2 py-1 rounded text-xs font-semibold text-white ${
                          course.level === 'beginner' ? 'bg-green-500' :
                          course.level === 'intermediate' ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}>
                          {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
                        </span>
                      </div>
                    </div>

                    {/* Course Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-4 h-4 ${i < Math.floor(course.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className={`text-sm ${
                          theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                        }`}>
                          {course.rating} ({course.students.toLocaleString()} students)
                        </span>
                      </div>

                      <h3 className={`text-lg font-semibold mb-2 line-clamp-2 ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        {course.title}
                      </h3>
                      
                      <p className={`text-sm mb-3 line-clamp-2 ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {course.description}
                      </p>

                      <p className={`text-sm mb-4 ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        By {course.instructor}
                      </p>

                      <div className={`flex items-center gap-2 mb-4 text-sm ${
                        theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{course.duration}</span>
                        <span>•</span>
                        <span>{course.projects} projects</span>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {course.technologies.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className={`px-2 py-1 rounded text-xs ${
                              theme === 'dark' 
                                ? 'bg-gray-800 text-gray-300' 
                                : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {tech}
                          </span>
                        ))}
                        {course.technologies.length > 3 && (
                          <span className={`px-2 py-1 rounded text-xs ${
                            theme === 'dark' 
                              ? 'bg-gray-800 text-gray-300' 
                              : 'bg-gray-100 text-gray-700'
                          }`}>
                            +{course.technologies.length - 3} more
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className={`text-2xl font-bold ${
                            theme === 'dark' ? 'text-white' : 'text-gray-900'
                          }`}>
                            ₹{course.finalPrice.toLocaleString()}
                          </span>
                          {course.discountPercent > 0 && (
                            <span className={`text-sm line-through ${
                              theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                            }`}>
                              ₹{course.originalPrice.toLocaleString()}
                            </span>
                          )}
                        </div>
                        {course.discountPercent > 0 && (
                          <span className={`text-xs font-semibold px-2 py-1 rounded ${
                            theme === 'dark' 
                              ? 'bg-green-900 text-green-300' 
                              : 'bg-green-100 text-green-800'
                          }`}>
                            {course.discountPercent}% OFF
                          </span>
                        )}
                      </div>

                      <motion.button
                        onClick={() => handleEnrollNow(course)}
                        className={`w-full mt-4 py-3 rounded-lg font-semibold transition-colors duration-200 ${
                          theme === 'dark'
                            ? 'bg-blue-600 hover:bg-blue-700 text-white'
                            : 'bg-blue-600 hover:bg-blue-700 text-white'
                        }`}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Enroll Now
                      </motion.button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Courses;