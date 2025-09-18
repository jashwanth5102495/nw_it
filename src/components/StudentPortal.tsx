import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  HomeIcon,
  AcademicCapIcon,
  UserIcon,
  BookOpenIcon,
  ClipboardDocumentListIcon,
  GlobeAltIcon,
  Cog6ToothIcon,
  QuestionMarkCircleIcon,
  BellIcon,
  CloudArrowUpIcon,
  LinkIcon
} from '@heroicons/react/24/outline';

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

interface Assignment {
  id: string;
  title: string;
  courseId: string;
  courseName: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'graded';
  description: string;
  grade?: number;
}

interface PurchaseHistory {
  id: string;
  courseId: string;
  courseName: string;
  instructor: string;
  purchaseDate: string;
  amount: number;
  status: 'completed' | 'pending';
}

interface StudentProfile {
  name: string;
  email: string;
  enrolledCourses?: number;
  phone?: string;
  location?: string;
  joinDate?: string;
  studentId?: string;
}

const StudentPortal = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Upload functionality state
  const [selectedAssignmentId, setSelectedAssignmentId] = useState<string | null>(null);
  const [uploadType, setUploadType] = useState<'file' | 'git'>('file');
  const [gitUrl, setGitUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // All available courses from the Courses page
  const allCourses: Course[] = [
    {
      id: 'ai-tools-mastery',
      title: 'A.I Tools Mastery',
      category: 'ai',
      level: 'beginner',
      description: 'Master the most powerful AI tools for productivity, creativity, and business automation',
      technologies: ['ChatGPT', 'Claude', 'Midjourney', 'Notion AI', 'GitHub Copilot'],
      originalPrice: 3333,
      discountPercent: 40,
      discountCode: 'aitools01',
      finalPrice: 2000,
      duration: '6 weeks',
      projects: 8,
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop&crop=center',
      rating: 4.8,
      students: 12543,
      instructor: 'Sarah Johnson',
      modules: [
        {
          title: 'AI Fundamentals & ChatGPT Mastery',
          duration: '1 week',
          topics: ['Understanding AI capabilities', 'Prompt engineering basics', 'ChatGPT advanced techniques', 'Custom GPTs creation']
        },
        {
          title: 'Visual AI & Creative Tools',
          duration: '1 week',
          topics: ['Midjourney mastery', 'DALL-E techniques', 'Stable Diffusion', 'AI video generation']
        },
        {
          title: 'Productivity AI Integration',
          duration: '1 week',
          topics: ['Notion AI workflows', 'AI writing assistants', 'Email automation', 'Calendar optimization']
        },
        {
          title: 'Code AI & Development',
          duration: '1 week',
          topics: ['GitHub Copilot mastery', 'AI debugging', 'Code review automation', 'Documentation generation']
        },
        {
          title: 'Business AI Applications',
          duration: '1 week',
          topics: ['Customer service automation', 'Content marketing AI', 'Data analysis with AI', 'AI strategy planning']
        },
        {
          title: 'Advanced AI Workflows',
          duration: '1 week',
          topics: ['Multi-tool integration', 'Custom AI solutions', 'API integrations', 'Future-proofing strategies']
        }
      ]
    },
    {
      id: 'frontend-beginner',
      title: 'Frontend Development - Beginner',
      category: 'frontend',
      level: 'beginner',
      description: 'Start your web development journey with HTML, CSS, and JavaScript fundamentals',
      technologies: ['HTML', 'CSS', 'JavaScript', 'Git', 'VS Code'],
      originalPrice: 1667,
      discountPercent: 40,
      discountCode: 'frontend01',
      finalPrice: 1000,
      duration: '8 weeks',
      projects: 5,
      image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=250&fit=crop&crop=center',
      rating: 4.6,
      students: 15678,
      instructor: 'Mike Chen',
      modules: [
        {
          title: 'HTML Fundamentals',
          duration: '2 weeks',
          topics: ['HTML structure', 'Semantic elements', 'Forms and inputs', 'Accessibility basics']
        },
        {
          title: 'CSS Styling',
          duration: '2 weeks',
          topics: ['CSS selectors', 'Box model', 'Flexbox', 'Grid layout']
        },
        {
          title: 'JavaScript Basics',
          duration: '3 weeks',
          topics: ['Variables and functions', 'DOM manipulation', 'Events', 'ES6 features']
        },
        {
          title: 'Project Development',
          duration: '1 week',
          topics: ['Portfolio website', 'Responsive design', 'Git workflow', 'Deployment']
        }
      ]
    },
    {
      id: 'frontend-intermediate',
      title: 'Frontend Development - Intermediate',
      category: 'frontend',
      level: 'intermediate',
      description: 'Advance your frontend skills with React, TypeScript, and modern development tools',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'npm'],
      originalPrice: 2500,
      discountPercent: 40,
      discountCode: 'frontend02',
      finalPrice: 1500,
      duration: '10 weeks',
      projects: 6,
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop&crop=center',
      rating: 4.7,
      students: 8765,
      instructor: 'Emma Davis',
      modules: [
        {
          title: 'React Fundamentals',
          duration: '3 weeks',
          topics: ['Components and JSX', 'State and props', 'Hooks', 'Event handling']
        },
        {
          title: 'TypeScript Integration',
          duration: '2 weeks',
          topics: ['Type annotations', 'Interfaces', 'Generic types', 'React with TypeScript']
        },
        {
          title: 'Advanced React',
          duration: '3 weeks',
          topics: ['Context API', 'Custom hooks', 'Performance optimization', 'Testing']
        },
        {
          title: 'Modern Tooling',
          duration: '2 weeks',
          topics: ['Vite setup', 'Tailwind CSS', 'Package management', 'Build optimization']
        }
      ]
    },
    {
      id: 'frontend-advanced',
      title: 'Frontend Development - Advanced',
      category: 'frontend',
      level: 'advanced',
      description: 'Master advanced React patterns, state management, and full-stack integration',
      technologies: ['React', 'Next.js', 'Redux', 'GraphQL', 'TypeScript'],
      originalPrice: 3333,
      discountPercent: 40,
      discountCode: 'frontend03',
      finalPrice: 2000,
      duration: '12 weeks',
      projects: 8,
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop&crop=center',
      rating: 4.9,
      students: 6543,
      instructor: 'James Wilson',
      modules: [
        {
          title: 'Advanced React Patterns',
          duration: '3 weeks',
          topics: ['Higher-order components', 'Render props', 'Compound components', 'Advanced hooks']
        },
        {
          title: 'State Management',
          duration: '3 weeks',
          topics: ['Redux Toolkit', 'Zustand', 'React Query', 'State patterns']
        },
        {
          title: 'Next.js Framework',
          duration: '3 weeks',
          topics: ['SSR and SSG', 'API routes', 'Dynamic routing', 'Performance optimization']
        },
        {
          title: 'Full-stack Integration',
          duration: '3 weeks',
          topics: ['GraphQL integration', 'Authentication', 'Real-time features', 'Deployment strategies']
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

  const categories = ['all', 'frontend', 'ai', 'devops', 'mobile'];
  const filteredCourses = selectedCategory === 'all' 
    ? allCourses 
    : allCourses.filter(course => course.category === selectedCategory);

  // Sample course data matching the screenshot
  const courses: Course[] = [
    {
      id: 'frontend-beginner',
      title: 'Frontend Development - Beginner',
      instructor: 'Rohan Jashvantbhai',
      progress: 75,
      totalLessons: 24,
      completedLessons: 18,
      duration: '6 weeks',
      nextLesson: 'JavaScript DOM Manipulation',
      isStarted: true
    },
    {
      id: 'frontend-intermediate',
      title: 'Frontend Development - Intermediate',
      instructor: 'Rohan Jashvantbhai',
      progress: 45,
      totalLessons: 32,
      completedLessons: 14,
      duration: '8 weeks',
      nextLesson: 'React Components',
      isStarted: true
    }
  ];

  // Available courses for browsing (using allCourses data)
  const availableCourses = allCourses.filter(course => 
    !courses.some(enrolledCourse => enrolledCourse.id === course.id)
  );

  // Sample assignments
  const assignments: Assignment[] = [
    {
      id: 'assignment-1',
      title: 'Build a Responsive Landing Page',
      courseId: 'frontend-beginner',
      courseName: 'Frontend Development - Beginner',
      dueDate: '2024-01-25',
      status: 'pending',
      description: 'Create a responsive landing page using HTML, CSS, and JavaScript'
    },
    {
      id: 'assignment-2',
      title: 'React Component Library',
      courseId: 'frontend-intermediate',
      courseName: 'Frontend Development - Intermediate',
      dueDate: '2024-01-30',
      status: 'submitted',
      description: 'Build a reusable component library with React and TypeScript',
      grade: 85
    },
    {
      id: 'assignment-3',
      title: 'JavaScript Algorithm Challenge',
      courseId: 'frontend-beginner',
      courseName: 'Frontend Development - Beginner',
      dueDate: '2024-01-20',
      status: 'graded',
      description: 'Solve complex algorithms using JavaScript',
      grade: 92
    }
  ];

  // Purchase history
  const purchaseHistory: PurchaseHistory[] = [
    {
      id: 'purchase-1',
      courseId: 'frontend-beginner',
      courseName: 'Frontend Development - Beginner',
      instructor: 'Rohan Jashvantbhai',
      purchaseDate: '2023-12-01T10:30:00Z',
      amount: 199,
      status: 'completed'
    },
    {
      id: 'purchase-2',
      courseId: 'frontend-intermediate',
      courseName: 'Frontend Development - Intermediate',
      instructor: 'Rohan Jashvantbhai',
      purchaseDate: '2023-12-15T14:20:00Z',
      amount: 299,
      status: 'completed'
    }
  ];

  const sidebarItems = [
    { id: 'dashboard', label: 'vStudent Manager', icon: HomeIcon, isActive: true },
    { id: 'courses', label: 'My Courses', icon: BookOpenIcon },
    { id: 'assignments', label: 'Assignments', icon: ClipboardDocumentListIcon },
    { id: 'browse-courses', label: 'Browse Courses', icon: GlobeAltIcon },
    { id: 'profile', label: 'My Profile', icon: UserIcon },
    { id: 'settings', label: 'Settings', icon: Cog6ToothIcon },
    { id: 'history', label: 'History', icon: ClipboardDocumentListIcon },
    { id: 'support', label: 'Support', icon: QuestionMarkCircleIcon },
  ];

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    
    if (!currentUser) {
      navigate('/student-login');
      return;
    }

    const loadStudentData = async () => {
      try {
        const userData = JSON.parse(currentUser);
        if (!userData.isAuthenticated) {
          navigate('/student-login');
          return;
        }

        setStudentProfile({
          name: `${userData.firstName} ${userData.lastName}` || 'undefined undefined',
          email: userData.email || 'student@example.com',
          enrolledCourses: 2,
          phone: '+1 (555) 123-4567',
          location: 'San Francisco, CA',
          joinDate: '2023-12-01',
          studentId: 'STU-2023-001'
        });
      } catch (error) {
        console.error('Error loading student data:', error);
        setStudentProfile({
          name: 'undefined undefined',
          email: 'student@example.com',
          enrolledCourses: 2
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadStudentData();
  }, [navigate]);

  const handleContinueLearning = (courseId: string) => {
    // Navigate to course content/study material based on course ID
    console.log('Navigating to course:', courseId);
    
    // Map course IDs to their respective learning routes
    const courseRoutes: { [key: string]: string } = {
      'frontend-beginner': '/course-learning/frontend-beginner/html-fundamentals/html-structure',
      'frontend-intermediate': '/course-learning-intermediate/frontend-intermediate/advanced-html/semantic-html',
      'frontend-advanced': '/course-learning-advanced/frontend-advanced/advanced-react/performance-optimization',
      'devops-beginner': '/course-learning-devops-beginner/devops-beginner/docker-basics/containerization',
      'devops-advanced': '/course-learning-devops-advanced/devops-advanced/kubernetes/cluster-management',
      'mobile-advanced': '/course-learning-mobile-advanced/mobile-advanced/react-native/navigation',
      'browser-extensions': '/course-learning-browser-extensions/browser-extensions/extension-fundamentals/manifest-files'
    };

    // Navigate to the appropriate course learning page
    const route = courseRoutes[courseId];
    if (route) {
      navigate(route);
    } else {
      // Fallback to general course learning page
      navigate(`/course-learning/${courseId}/module-1/lesson-1`);
    }
  };

  const handlePurchaseCourse = (courseId: string) => {
    // Handle course purchase
    console.log('Purchasing course:', courseId);
    alert(`Purchasing course: ${courseId}`);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check if file is a zip file
      if (file.type === 'application/zip' || file.name.endsWith('.zip')) {
        setSelectedFile(file);
      } else {
        alert('Please select a ZIP file only.');
        event.target.value = '';
      }
    }
  };

  const handleSubmitAssignment = async (assignmentId: string) => {
    if (!selectedFile && !gitUrl.trim()) {
      alert('Please select a file or enter a Git URL.');
      return;
    }

    setIsUploading(true);
    
    try {
      // Simulate upload process
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (uploadType === 'file' && selectedFile) {
        console.log('Uploading file:', selectedFile.name, 'for assignment:', assignmentId);
        alert(`File "${selectedFile.name}" uploaded successfully for assignment!`);
      } else if (uploadType === 'git' && gitUrl.trim()) {
        console.log('Submitting Git URL:', gitUrl, 'for assignment:', assignmentId);
        alert(`Git repository "${gitUrl}" submitted successfully for assignment!`);
      }
      
      // Reset form
      setSelectedFile(null);
      setGitUrl('');
      setSelectedAssignmentId(null);
      
      // Reset file input
      const fileInput = document.getElementById('file-upload') as HTMLInputElement;
      if (fileInput) fileInput.value = '';
      
    } catch (error) {
      console.error('Upload error:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'courses':
        return (
          <div className="space-y-6">
            <h2 className="text-white text-2xl font-bold">My Courses</h2>
            <div className="space-y-4">
              {courses.map((course) => (
                <div key={course.id} className="bg-gray-800 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold text-lg">F</span>
                      </div>
                      <div>
                        <h4 className="text-white text-lg font-semibold">{course.title}</h4>
                        <p className="text-gray-400 text-sm">
                          Instructor: {course.instructor} • Duration: {course.duration}
                        </p>
                        <div className="mt-2">
                          <p className="text-gray-300 text-sm mb-1">Progress</p>
                          <div className="w-96 bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full transition-all duration-300" 
                              style={{width: `${course.progress}%`}}
                            />
                          </div>
                          <p className="text-gray-400 text-sm mt-1">
                            Next: {course.nextLesson}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="text-right flex flex-col items-end space-y-2">
                      <p className="text-white text-sm mb-1">
                        {course.completedLessons} of {course.totalLessons} lessons completed
                      </p>
                      <p className="text-white text-2xl font-bold">{course.progress}%</p>
                      <button
                        onClick={() => handleContinueLearning(course.id)}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                      >
                        {course.isStarted && course.progress > 0 ? 'Continue Learning' : 'Start Learning'}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'assignments':
        return (
          <div className="space-y-6">
            <h2 className="text-white text-2xl font-bold">Assignments</h2>
            <div className="space-y-4">
              {assignments.map((assignment) => (
                <div key={assignment.id} className="bg-gray-800 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-white text-lg font-semibold">{assignment.title}</h4>
                      <p className="text-gray-400 text-sm">{assignment.courseName}</p>
                      <p className="text-gray-300 text-sm mt-2">{assignment.description}</p>
                      <p className="text-gray-400 text-sm mt-1">Due: {new Date(assignment.dueDate).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        assignment.status === 'pending' ? 'bg-yellow-600 text-yellow-100' :
                        assignment.status === 'submitted' ? 'bg-blue-600 text-blue-100' :
                        'bg-green-600 text-green-100'
                      }`}>
                        {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                      </span>
                      {assignment.grade && (
                        <p className="text-white text-lg font-bold mt-2">Grade: {assignment.grade}%</p>
                      )}
                    </div>
                  </div>
                  
                  {/* Upload Section - Only show for pending assignments */}
                  {assignment.status === 'pending' && (
                    <div className="border-t border-gray-700 pt-4">
                      <div className="flex items-center justify-between mb-4">
                        <h5 className="text-white text-md font-medium">Submit Assignment</h5>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setUploadType('file')}
                            className={`px-3 py-1 rounded text-sm ${
                              uploadType === 'file' 
                                ? 'bg-blue-600 text-white' 
                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            }`}
                          >
                            ZIP File
                          </button>
                          <button
                            onClick={() => setUploadType('git')}
                            className={`px-3 py-1 rounded text-sm ${
                              uploadType === 'git' 
                                ? 'bg-blue-600 text-white' 
                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            }`}
                          >
                            Git URL
                          </button>
                        </div>
                      </div>
                      
                      {uploadType === 'file' ? (
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3">
                            <CloudArrowUpIcon className="w-5 h-5 text-gray-400" />
                            <label htmlFor="file-upload" className="text-gray-300 text-sm">
                              Upload ZIP file (max 50MB)
                            </label>
                          </div>
                          <input
                            id="file-upload"
                            type="file"
                            accept=".zip"
                            onChange={handleFileUpload}
                            className="block w-full text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-blue-600 file:text-white hover:file:bg-blue-700 file:cursor-pointer"
                          />
                          {selectedFile && (
                            <p className="text-green-400 text-sm">Selected: {selectedFile.name}</p>
                          )}
                        </div>
                      ) : (
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3">
                            <LinkIcon className="w-5 h-5 text-gray-400" />
                            <label className="text-gray-300 text-sm">
                              Git Repository URL
                            </label>
                          </div>
                          <input
                            type="url"
                            value={gitUrl}
                            onChange={(e) => setGitUrl(e.target.value)}
                            placeholder="https://github.com/username/repository"
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      )}
                      
                      <button
                        onClick={() => handleSubmitAssignment(assignment.id)}
                        disabled={isUploading || (!selectedFile && !gitUrl.trim())}
                        className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center space-x-2"
                      >
                        {isUploading ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            <span>Uploading...</span>
                          </>
                        ) : (
                          <>
                            <CloudArrowUpIcon className="w-4 h-4" />
                            <span>Submit Assignment</span>
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      case 'browse-courses':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-white text-2xl font-bold">Browse Courses</h2>
              <div className="flex space-x-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg capitalize ${
                      selectedCategory === category
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-700 text-white hover:bg-gray-600'
                    }`}
                  >
                    {category === 'all' ? 'All Categories' : category}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <div key={course.id} className="bg-gray-800 rounded-lg p-6 border border-gray-700">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      course.level === 'beginner' ? 'bg-green-100 text-green-800' :
                      course.level === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {course.level}
                    </span>
                    <span className="text-gray-400 text-sm capitalize">{course.category}</span>
                  </div>
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-white font-bold text-lg">{course.title.charAt(0)}</span>
                  </div>
                  <h4 className="text-white text-lg font-semibold mb-2">{course.title}</h4>
                  <p className="text-gray-400 text-sm mb-2">Instructor: {course.instructor}</p>
                  <p className="text-gray-300 text-sm mb-3">{course.description}</p>
                  <div className="mb-4">
                    <p className="text-sm text-gray-400">Duration: {course.duration}</p>
                    <p className="text-sm text-gray-400">Projects: {course.projects}</p>
                    <p className="text-sm text-gray-400">Students: {course.students.toLocaleString()}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-gray-400 text-sm line-through">₹{course.originalPrice.toLocaleString()}</span>
                      <span className="text-white text-xl font-bold ml-2">₹{course.finalPrice.toLocaleString()}</span>
                    </div>
                    <button
                      onClick={() => handlePurchaseCourse(course.id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      Purchase
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'profile':
        return (
          <div className="space-y-6">
            <h2 className="text-white text-2xl font-bold">My Profile</h2>
            <div className="bg-gray-800 rounded-lg p-6">
              <div className="flex items-center space-x-6 mb-6">
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-2xl">{studentProfile?.name?.charAt(0) || 'U'}</span>
                </div>
                <div>
                  <h3 className="text-white text-xl font-semibold">{studentProfile?.name}</h3>
                  <p className="text-gray-400">{studentProfile?.email}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-white font-semibold mb-3">Personal Information</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-gray-400 text-sm">Student ID</label>
                      <p className="text-white">{studentProfile?.studentId}</p>
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm">Phone</label>
                      <p className="text-white">{studentProfile?.phone}</p>
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm">Location</label>
                      <p className="text-white">{studentProfile?.location}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-3">Academic Information</h4>
                  <div className="space-y-3">
                    <div>
                      <label className="text-gray-400 text-sm">Join Date</label>
                      <p className="text-white">{studentProfile?.joinDate ? new Date(studentProfile.joinDate).toLocaleDateString() : 'N/A'}</p>
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm">Enrolled Courses</label>
                      <p className="text-white">{studentProfile?.enrolledCourses}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="space-y-6">
            <h2 className="text-white text-2xl font-bold">Settings</h2>
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-white text-lg font-semibold mb-4">Account Settings</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-white font-medium mb-2">Change Password</h4>
                  <div className="space-y-3">
                    <input
                      type="password"
                      placeholder="Current Password"
                      className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                    />
                    <input
                      type="password"
                      placeholder="New Password"
                      className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                    />
                    <input
                      type="password"
                      placeholder="Confirm New Password"
                      className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                    />
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                      Update Password
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'history':
        return (
          <div className="space-y-6">
            <h2 className="text-white text-2xl font-bold">Purchase History</h2>
            <div className="space-y-4">
              {purchaseHistory.map((purchase) => (
                <div key={purchase.id} className="bg-gray-800 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-white text-lg font-semibold">{purchase.courseName}</h4>
                      <p className="text-gray-400 text-sm">Instructor: {purchase.instructor}</p>
                      <p className="text-gray-300 text-sm mt-1">
                        Purchase Date: {new Date(purchase.purchaseDate).toLocaleDateString()} at {new Date(purchase.purchaseDate).toLocaleTimeString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-white text-xl font-bold">₹{purchase.amount.toLocaleString()}</p>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        purchase.status === 'completed' ? 'bg-green-600 text-green-100' : 'bg-yellow-600 text-yellow-100'
                      }`}>
                        {purchase.status.charAt(0).toUpperCase() + purchase.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'support':
        return (
          <div className="space-y-6">
            <h2 className="text-white text-2xl font-bold">Support</h2>
            <div className="bg-gray-800 rounded-lg p-6">
              <p className="text-gray-400">Get help and support.</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto mb-4"></div>
          <p className="text-white">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 border-r border-gray-700">
        {/* Header */}
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
              <AcademicCapIcon className="w-5 h-5 text-white" />
            </div>
            <span className="text-white text-lg font-semibold">vStudents.com</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="mt-4">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-colors ${
                activeTab === item.id 
                  ? 'bg-green-600 text-white' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-gray-800 border-b border-gray-700 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-white text-xl font-semibold">
                Students / {studentProfile?.name || 'undefined undefined'}
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <BellIcon className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6">
          {activeTab === 'dashboard' ? (
            <>
              {/* Student Profile Section */}
              <div className="bg-gray-800 rounded-lg p-6 mb-6">
                <div className="flex items-start space-x-6">
                  {/* Avatar */}
                  <div className="w-20 h-20 bg-gray-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-2xl font-bold">
                      {studentProfile?.name?.charAt(0) || 'U'}
                    </span>
                  </div>
                  
                  {/* Profile Info */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h2 className="text-white text-2xl font-bold">
                        {studentProfile?.name || 'undefined undefined'}
                      </h2>
                      <span className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm">
                        Active
                      </span>
                    </div>
                    <p className="text-gray-400 mb-2">Frontend Development Student</p>
                    <p className="text-gray-500 text-sm mb-4">📍 Location not specified</p>
                    <div className="flex space-x-2">
                      <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm">
                        Online Learning
                      </span>
                      <span className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm">
                        Part-time
                      </span>
                    </div>
                  </div>

                  {/* Right Side Content */}
                  <div className="w-80">
                    <div className="bg-gray-800 rounded-lg p-4 mb-6">
                      <h3 className="text-white text-lg font-semibold mb-4">Introduction Video</h3>
                      <div className="w-full h-32 bg-gray-700 rounded-lg flex items-center justify-center mb-3">
                        <div className="w-12 h-12 bg-gray-600 rounded-full flex items-center justify-center">
                          <div className="w-0 h-0 border-l-4 border-l-white border-t-2 border-t-transparent border-b-2 border-b-transparent ml-1"></div>
                        </div>
                      </div>
                      <p className="text-gray-400 text-sm text-center mb-3">Upload your introduction video</p>
                      <button className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-600">
                        Choose Video File
                      </button>
                    </div>

                    <div className="bg-gray-800 rounded-lg p-4">
                      <h3 className="text-white text-lg font-semibold mb-4">Documents</h3>
                      <div className="space-y-4">
                        <div>
                          <p className="text-gray-400 text-sm mb-2">Upload your resume:</p>
                          <button className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-600">
                            Choose Resume File
                          </button>
                        </div>
                        
                        <div>
                          <p className="text-gray-400 text-sm mb-3">Course Materials:</p>
                          <div className="space-y-2">
                            <div className="flex items-center space-x-3 p-2 bg-gray-700 rounded">
                              <div className="w-4 h-4 bg-red-500 rounded"></div>
                              <div className="flex-1">
                                <span className="text-gray-300 text-sm">Student CV</span>
                                <p className="text-gray-500 text-xs">PDF File</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-3 p-2 bg-gray-700 rounded">
                              <div className="w-4 h-4 bg-blue-500 rounded"></div>
                              <div className="flex-1">
                                <span className="text-gray-300 text-sm">Course Requirements</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Success Message */}
              <div className="bg-green-600 text-white p-4 rounded-lg mb-6 flex items-center space-x-2">
                <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                  <span className="text-green-600 text-sm">✓</span>
                </div>
                <span>I am currently enrolled in {studentProfile?.enrolledCourses || 2} courses and actively learning new skills.</span>
              </div>

              {/* My Enrolled Courses */}
              <div>
                <h3 className="text-white text-2xl font-bold mb-6">My Enrolled Courses</h3>
                <div className="space-y-4">
                  {courses.map((course) => (
                    <div key={course.id} className="bg-gray-800 rounded-lg p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-lg">F</span>
                          </div>
                          <div>
                            <h4 className="text-white text-lg font-semibold">{course.title}</h4>
                            <p className="text-gray-400 text-sm">
                              Instructor: {course.instructor} • Duration: {course.duration}
                            </p>
                            <div className="mt-2">
                              <p className="text-gray-300 text-sm mb-1">Progress</p>
                              <div className="w-96 bg-gray-700 rounded-full h-2">
                                <div 
                                  className="bg-green-500 h-2 rounded-full transition-all duration-300" 
                                  style={{width: `${course.progress}%`}}
                                />
                              </div>
                              <p className="text-gray-400 text-sm mt-1">
                                Next: {course.nextLesson}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-white text-sm mb-1">
                            {course.completedLessons} of {course.totalLessons} lessons completed
                          </p>
                          <p className="text-white text-2xl font-bold">{course.progress}%</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            renderTabContent()
          )}
        </main>
      </div>
    </div>
  );
};

export default StudentPortal;