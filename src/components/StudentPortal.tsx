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
  LinkIcon,
  XMarkIcon
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

interface CourseProgress {
  courseId: string;
  progress: number;
  completedLessons: number;
  totalLessons: number;
  lastAccessedAt: string;
  nextLesson: string;
  isStarted: boolean;
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
  studyMaterials?: string[];
  testQuestions?: {
    question: string;
    options: string[];
    correctAnswer: number;
  }[];
}

interface Project {
  id: string;
  title: string;
  courseId: string;
  courseName: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  description: string;
  requirements: string[];
  technologies: string[];
  estimatedTime: string;
  status: 'not_started' | 'in_progress' | 'completed';
  dueDate?: string;
  submissionUrl?: string;
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
  dateOfBirth?: string;
  education?: string;
  experience?: string;
}

interface PaymentModalData {
  course: Course;
  originalPrice: number;
  discountedPrice: number;
  discount: number;
  referralCode: string;
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
  
  // Payment functionality state
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentModalData, setPaymentModalData] = useState<PaymentModalData | null>(null);
  const [referralCode, setReferralCode] = useState('');
  const [purchasedCourses, setPurchasedCourses] = useState<string[]>([]);
  const [enrolledCoursesData, setEnrolledCoursesData] = useState<Course[]>([]);
  const [courseProgress, setCourseProgress] = useState<{ [courseId: string]: CourseProgress }>({});
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  // Git functionality state
  const [showGitTutorialModal, setShowGitTutorialModal] = useState(false);
  const [showProjectSubmissionModal, setShowProjectSubmissionModal] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [projectGitUrl, setProjectGitUrl] = useState('');

  // Assignment course selection state
  const [selectedCourseForAssignments, setSelectedCourseForAssignments] = useState<string | null>(null);
  
  // Project course selection state
  const [selectedCourseForProjects, setSelectedCourseForProjects] = useState<string | null>(null);
  const [selectedStudyMaterials, setSelectedStudyMaterials] = useState<string[]>([]);
  const [selectedTestQuestions, setSelectedTestQuestions] = useState<Assignment['testQuestions']>([]);
  
  // Course details state
  const [selectedCourseForDetails, setSelectedCourseForDetails] = useState<Course | null>(null);
  const [showCourseDetails, setShowCourseDetails] = useState(false);
  const [showStudyMaterialsModal, setShowStudyMaterialsModal] = useState(false);
  const [showTestQuestionsModal, setShowTestQuestionsModal] = useState(false);
  const [currentTestAnswers, setCurrentTestAnswers] = useState<{ [questionIndex: number]: number }>({});
  const [testResults, setTestResults] = useState<{ score: number; total: number } | null>(null);
  
  // Assignment tracking state
  const [assignmentStatuses, setAssignmentStatuses] = useState<{ [assignmentId: string]: Assignment['status'] }>({});
  const [assignmentSubmissions, setAssignmentSubmissions] = useState<{ [assignmentId: string]: { type: 'file' | 'git', content: string, submittedAt: string } }>({});

  // Course ID mapping function to handle inconsistent courseId values
  const getCourseIdMapping = (courseId: string): string[] => {
    const mappings: { [key: string]: string[] } = {
      'ai-tools-mastery': ['1', 'AI-TOOLS-MASTERY'],
      'frontend-beginner': ['frontend-beginner'],
      'frontend-advanced': ['3'],
      'devops-beginner': ['DEVOPS-BEGINNER'],
      'devops-intermediate': ['4'],
      'mobile-core': ['5']
    };
    return mappings[courseId] || [courseId];
  };

  // All available courses from the Courses page
  const allCourses: Course[] = [
    {
      id: 'ai-tools-mastery',
      title: 'A.I Tools Mastery',
      category: 'ai',
      level: 'beginner',
      description: 'Master the most powerful AI tools for productivity, creativity, and business automation',
      technologies: ['ChatGPT', 'Claude', 'Midjourney', 'Notion AI', 'GitHub Copilot'],
      price: 12000,
      duration: '6 weeks',
      projects: 8,
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=250&fit=crop&crop=center',
      rating: 4.8,
      students: 15000,
      maxStudents: 12000,
      instructor: 'Sarah Johnson',
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
      description: 'Start your web development journey with HTML, CSS, and JavaScript fundamentals',
      technologies: ['HTML', 'CSS', 'JavaScript', 'Git', 'VS Code'],
      price: 1200,
      duration: '8 weeks',
      projects: 5,
      image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=250&fit=crop&crop=center',
      rating: 4.6,
      students: 15678,
      maxStudents: 20000,
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
          topics: ['Portfolio website', 'Responsive design', 'Code optimization', 'Deployment']
        }
      ]
    },
    {
      id: 'frontend-advanced',
      title: 'Frontend Development - Advanced',
      category: 'frontend',
      level: 'advanced',
      description: 'Master advanced frontend concepts with Next.js, state management, and performance optimization',
      technologies: ['Next.js', 'Redux Toolkit', 'GraphQL', 'Jest', 'Cypress'],
      price: 2000,
      duration: '12 weeks',
      projects: 8,
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop&crop=center',
      rating: 4.9,
      students: 15000,
      maxStudents: 12000,
      instructor: 'David Kim',
      modules: [
        {
          title: 'Next.js Mastery',
          duration: '4 weeks',
          topics: ['SSR/SSG', 'API routes', 'Performance optimization', 'Deployment']
        },
        {
          title: 'State Management',
          duration: '3 weeks',
          topics: ['Redux Toolkit', 'Zustand', 'Context patterns', 'Data fetching']
        },
        {
          title: 'Testing & Quality',
          duration: '3 weeks',
          topics: ['Unit testing', 'Integration testing', 'E2E testing', 'Code quality']
        },
        {
          title: 'Advanced Topics',
          duration: '2 weeks',
          topics: ['Micro-frontends', 'PWA', 'Web performance', 'Security']
        }
      ]
    },
    {
      id: 'devops-beginner',
      title: 'DevOps - Beginner',
      category: 'devops',
      level: 'beginner',
      description: 'Learn the fundamentals of DevOps, CI/CD, and cloud infrastructure',
      technologies: ['Docker', 'Git', 'Linux', 'AWS', 'Jenkins'],
      price: 1000,
      duration: '8 weeks',
      projects: 4,
      image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=400&h=250&fit=crop&crop=center',
      rating: 4.5,
      students: 8765,
      maxStudents: 20000,
      instructor: 'Alex Thompson',
      modules: [
        {
          title: 'DevOps Fundamentals',
          duration: '2 weeks',
          topics: ['DevOps culture', 'Version control', 'Linux basics', 'Command line']
        },
        {
          title: 'Containerization',
          duration: '2 weeks',
          topics: ['Docker basics', 'Container orchestration', 'Docker Compose', 'Best practices']
        },
        {
          title: 'CI/CD Pipelines',
          duration: '2 weeks',
          topics: ['Jenkins setup', 'Pipeline creation', 'Automated testing', 'Deployment strategies']
        },
        {
          title: 'Cloud Basics',
          duration: '2 weeks',
          topics: ['AWS fundamentals', 'EC2 instances', 'S3 storage', 'Basic networking']
        }
      ]
    },
    {
      id: 'devops-intermediate',
      title: 'DevOps - Intermediate',
      category: 'devops',
      level: 'intermediate',
      description: 'Advanced DevOps practices with Kubernetes, monitoring, and infrastructure as code',
      technologies: ['Kubernetes', 'Terraform', 'Prometheus', 'Grafana', 'Ansible'],
      price: 1400,
      duration: '10 weeks',
      projects: 6,
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=250&fit=crop&crop=center',
      rating: 4.6,
      students: 15000,
      maxStudents: 12000,
      instructor: 'Maria Garcia',
      modules: [
        {
          title: 'Kubernetes Fundamentals',
          duration: '3 weeks',
          topics: ['Cluster setup', 'Pods and Services', 'Deployments', 'ConfigMaps and Secrets']
        },
        {
          title: 'Infrastructure as Code',
          duration: '3 weeks',
          topics: ['Terraform basics', 'State management', 'Modules', 'Best practices']
        },
        {
          title: 'Monitoring & Logging',
          duration: '2 weeks',
          topics: ['Prometheus setup', 'Grafana dashboards', 'Log aggregation', 'Alerting']
        },
        {
          title: 'Automation',
          duration: '2 weeks',
          topics: ['Ansible playbooks', 'Configuration management', 'Deployment automation', 'Security']
        }
      ]
    },
    {
      id: 'mobile-core',
      title: 'Mobile Development - Core',
      category: 'mobile',
      level: 'intermediate',
      description: 'Build cross-platform mobile apps with React Native and modern development practices',
      technologies: ['React Native', 'Expo', 'TypeScript', 'Redux', 'Firebase'],
      price: 3500,
      duration: '14 weeks',
      projects: 10,
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop&crop=center',
      rating: 4.8,
      students: 15000,
      maxStudents: 12000,
      instructor: 'James Wilson',
      modules: [
        {
          title: 'React Native Basics',
          duration: '4 weeks',
          topics: ['Setup and configuration', 'Components', 'Navigation', 'Styling']
        },
        {
          title: 'Advanced Features',
          duration: '4 weeks',
          topics: ['State management', 'API integration', 'Native modules', 'Performance']
        },
        {
          title: 'Backend Integration',
          duration: '3 weeks',
          topics: ['Firebase setup', 'Authentication', 'Database', 'Push notifications']
        },
        {
          title: 'Publishing & Deployment',
          duration: '3 weeks',
          topics: ['App store guidelines', 'Build process', 'Testing', 'Release management']
        }
      ]
    },
    {
      id: 'browser-extensions',
      title: 'Browser Extensions Development',
      category: 'web',
      level: 'intermediate',
      description: 'Create powerful browser extensions for Chrome, Firefox, and Edge',
      technologies: ['JavaScript', 'Chrome APIs', 'WebExtensions', 'Manifest V3', 'React'],
      price: 1500,
      duration: '6 weeks',
      projects: 4,
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop&crop=center',
      rating: 4.4,
      students: 15000,
      maxStudents: 12000,
      instructor: 'Lisa Chen',
      modules: [
        {
          title: 'Extension Fundamentals',
          duration: '2 weeks',
          topics: ['Manifest files', 'Background scripts', 'Content scripts', 'Popup interfaces']
        },
        {
          title: 'Advanced APIs',
          duration: '2 weeks',
          topics: ['Storage API', 'Messaging', 'Permissions', 'Cross-browser compatibility']
        },
        {
          title: 'UI Development',
          duration: '1 week',
          topics: ['React integration', 'Styling', 'User experience', 'Accessibility']
        },
        {
          title: 'Publishing & Distribution',
          duration: '1 week',
          topics: ['Store submission', 'Review process', 'Updates', 'Analytics']
        }
      ]
    }
  ];

  const categories = ['all', 'frontend', 'ai', 'devops', 'mobile'];
  const filteredCourses = selectedCategory === 'all' 
    ? allCourses 
    : allCourses.filter(course => course.category === selectedCategory);

  // Define a summary type for enrolled courses
  interface EnrolledCourseSummary {
    id: string;
    title: string;
    instructor: string;
    progress: number;
    totalLessons: number;
    completedLessons: number;
    duration: string;
    nextLesson: string;
    isStarted: boolean;
  }

  // Generate enrolled courses summary from backend data
  console.log('enrolledCoursesData:', enrolledCoursesData);
  const enrolledCourses: EnrolledCourseSummary[] = enrolledCoursesData.map((course: any) => {
    const progress = courseProgress[course.courseId] || courseProgress[course.id];
    console.log('Processing course:', course);
    
    return {
      id: course.courseId || course.id,
      title: course.title,
      instructor: course.instructor?.name || course.instructor || 'Unknown Instructor',
      progress: progress?.progress || 0,
      totalLessons: progress?.totalLessons || 20,
      completedLessons: progress?.completedLessons || 0,
      duration: course.duration,
      nextLesson: progress?.nextLesson || 'Introduction to Course',
      isStarted: progress?.isStarted || false
    };
  });
  console.log('Final enrolledCourses:', enrolledCourses);

  // Available courses for browsing (using allCourses data)
  const availableCourses = allCourses.filter(course => 
    !enrolledCourses.some(enrolledCourse => enrolledCourse.id === course.id)
  );

  // Sample projects for Frontend Development - Beginner (8 progressive difficulty projects)
  const projects: Project[] = [
    {
      id: 'project-1',
      title: 'Personal Portfolio Website',
      courseId: 'frontend-beginner',
      courseName: 'Frontend Development - Beginner',
      difficulty: 'beginner',
      description: 'Create a simple personal portfolio website using HTML and CSS',
      requirements: [
        'Create an HTML structure with header, about, and contact sections',
        'Style with CSS including colors, fonts, and layout',
        'Make it responsive for mobile devices',
        'Include a profile image and contact information'
      ],
      technologies: ['HTML5', 'CSS3'],
      estimatedTime: '1 week',
      status: 'not_started'
    },
    {
      id: 'project-2',
      title: 'Interactive To-Do List',
      courseId: 'frontend-beginner',
      courseName: 'Frontend Development - Beginner',
      difficulty: 'beginner',
      description: 'Build a functional to-do list application with JavaScript',
      requirements: [
        'Add new tasks with input field',
        'Mark tasks as complete/incomplete',
        'Delete tasks from the list',
        'Store tasks in localStorage',
        'Filter tasks by status (all, active, completed)'
      ],
      technologies: ['HTML5', 'CSS3', 'JavaScript'],
      estimatedTime: '1.5 weeks',
      status: 'in_progress'
    },
    {
      id: 'project-3',
      title: 'Weather Dashboard',
      courseId: 'frontend-beginner',
      courseName: 'Frontend Development - Beginner',
      difficulty: 'beginner',
      description: 'Create a weather dashboard that fetches data from a weather API',
      requirements: [
        'Search for weather by city name',
        'Display current weather conditions',
        'Show 5-day weather forecast',
        'Use weather icons and animations',
        'Handle API errors gracefully'
      ],
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'Weather API'],
      estimatedTime: '2 weeks',
      status: 'not_started'
    },
    {
      id: 'project-4',
      title: 'E-commerce Product Catalog',
      courseId: 'frontend-beginner',
      courseName: 'Frontend Development - Beginner',
      difficulty: 'intermediate',
      description: 'Build a product catalog with filtering and shopping cart functionality',
      requirements: [
        'Display products in a grid layout',
        'Filter products by category and price',
        'Add products to shopping cart',
        'Calculate total price with taxes',
        'Responsive design for all devices'
      ],
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'Local Storage'],
      estimatedTime: '2.5 weeks',
      status: 'not_started'
    },


  ];

  // Comprehensive assignments data - 6 assignments per purchased course
  const assignments: Assignment[] = [
    // Frontend Development - Beginner Course Assignments (Course ID: 'frontend-beginner')
    {
      id: 'frontend-beginner-1',
      title: 'HTML Part 1',
      courseId: 'frontend-beginner',
      courseName: 'Frontend Development - Beginner',
      dueDate: '2024-02-15',
      status: 'pending',
      description: 'Learn HTML basics and document structure.'
    },
    {
      id: 'frontend-beginner-2',
      title: 'HTML Part 2',
      courseId: 'frontend-beginner',
      courseName: 'Frontend Development - Beginner',
      dueDate: '2024-02-20',
      status: 'pending',
      description: 'Master HTML forms and semantic elements.'
    },

    {
      id: 'frontend-beginner-4',
      title: 'CSS Part 1',
      courseId: 'frontend-beginner',
      courseName: 'Frontend Development - Beginner',
      dueDate: '2024-03-01',
      status: 'pending',
      description: 'CSS fundamentals and styling basics.'
    },
    {
      id: 'frontend-beginner-5',
      title: 'CSS Part 2',
      courseId: 'frontend-beginner',
      courseName: 'Frontend Development - Beginner',
      dueDate: '2024-03-06',
      status: 'pending',
      description: 'Advanced CSS layouts and responsive design.'
    },
    {
      id: 'frontend-beginner-6',
      title: 'JavaScript Part 1',
      courseId: 'frontend-beginner',
      courseName: 'Frontend Development - Beginner',
      dueDate: '2024-03-11',
      status: 'pending',
      description: 'JavaScript basics and programming fundamentals.'
    },
    {
      id: 'frontend-beginner-7',
      title: 'JavaScript Part 2',
      courseId: 'frontend-beginner',
      courseName: 'Frontend Development - Beginner',
      dueDate: '2024-03-16',
      status: 'pending',
      description: 'DOM manipulation and interactive web development.'
    }
  ];

  // Purchase history - use enrolledCourses for enrolled courses summary
  // const enrolledCourses = courses; // Now courses contains only enrolled courses from backend

  const purchaseHistory: PurchaseHistory[] = [
    {
      id: '1',
      courseId: 'AI-TOOLS-MASTERY',
      courseName: 'AI Tools Mastery',
      instructor: 'Rohan Sharma',
      purchaseDate: '2024-01-15',
      amount: 4999,
      status: 'completed'
    },
    {
      id: '3',
      courseId: 'DEVOPS-BEGINNER',
      courseName: 'DevOps Fundamentals',
      instructor: 'Rohan Sharma',
      purchaseDate: '2024-03-10',
      amount: 9999,
      status: 'completed'
    }
  ];

  const sidebarItems = [
    { id: 'dashboard', label: 'vStudent Manager', icon: HomeIcon, isActive: true },
    { id: 'courses', label: 'My Courses', icon: BookOpenIcon },
    { id: 'projects', label: 'Projects', icon: ClipboardDocumentListIcon },
    { id: 'assignments', label: 'Assignments', icon: ClipboardDocumentListIcon },
    { id: 'browse-courses', label: 'Browse Courses', icon: GlobeAltIcon },
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

        // Fetch purchased courses from backend
        try {
          console.log('Fetching courses from backend for:', userData.email);
          const response = await fetch(`http://localhost:5000/api/courses/purchased/${userData.email}`);
          if (response.ok) {
            const result = await response.json();
            console.log('Backend response:', result);
            if (result.success && result.data) {
              // Backend now returns full course details with enrollment info
              const enrolledCoursesData = result.data || [];
              console.log('Enrolled courses data:', enrolledCoursesData);
              
              // Set purchased courses (just the IDs for compatibility)
              const courseIds = enrolledCoursesData.map((course: any) => course.courseId || course.id);
              setPurchasedCourses(courseIds);
              
              // Set the full course data for display
              setEnrolledCoursesData(enrolledCoursesData);
              
              // Create course progress from enrollment data
              const progressData = enrolledCoursesData.reduce((acc: any, course: any) => {
                const courseId = course.courseId || course.id;
                acc[courseId] = {
                  courseId: courseId,
                  progress: course.progress || 0,
                  completedLessons: 0, // This should come from enrollment data
                  totalLessons: course.modules?.length * 5 || 20, // Estimate based on modules
                  lastAccessedAt: course.enrollmentDate || new Date().toISOString(),
                  nextLesson: course.progress > 0 ? 'Continue Learning' : 'Start Course',
                  isStarted: course.progress > 0 || course.status === 'active'
                };
                return acc;
              }, {});
              
              setCourseProgress(progressData);
              console.log('Set course progress:', progressData);
            } else {
              console.log('No courses found in backend response');
              setPurchasedCourses([]);
              setCourses([]);
              setCourseProgress({});
            }
          } else {
            console.error('Backend request failed:', response.status);
            setPurchasedCourses([]);
            setCourses([]);
          }
        } catch (error) {
          console.error('Error fetching purchased courses:', error);
          // Set empty data if backend fails
          setPurchasedCourses([]);
          setCourses([]);
          setCourseProgress({});
        }

        // Try to fetch additional student data from backend
        let studentData = userData;
        try {
          const response = await fetch(`http://localhost:5000/api/students/${userData.id}`, {
            headers: {
              'Authorization': `Bearer ${userData.token}`
            }
          });
          
          if (response.ok) {
            const result = await response.json();
            if (result.success) {
              studentData = { ...userData, ...result.data };
            }
          }
        } catch (error) {
          console.log('Could not fetch additional student data from backend, using localStorage data');
        }

        setStudentProfile({
          name: `${studentData.firstName} ${studentData.lastName}` || 'Student Name',
          email: studentData.email || 'student@example.com',
          enrolledCourses: purchasedCourses.length,
          phone: studentData.phone || 'Not provided',
          location: studentData.address ? `${studentData.address.city}, ${studentData.address.state}` : 'Not provided',
          joinDate: studentData.createdAt || new Date().toISOString(),
          studentId: studentData.studentId || 'Not assigned',
          dateOfBirth: studentData.dateOfBirth,
          education: studentData.education,
          experience: studentData.experience
        });
      } catch (error) {
        console.error('Error loading student data:', error);
        setStudentProfile({
          name: 'undefined undefined',
          email: 'student@example.com',
          enrolledCourses: 0
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
    const course = allCourses.find(c => c.id === courseId);
    if (!course) return;

    // Check if already purchased
    if (purchasedCourses.includes(courseId)) {
      alert('You have already purchased this course!');
      return;
    }

    // Navigate to the enrollment page
    navigate(`/course-enrollment/${courseId}`);
  };

  const handleCourseDetails = (course: Course) => {
    setSelectedCourseForDetails(course);
    setShowCourseDetails(true);
  };

  const handleReferralCodeChange = async (code: string) => {
    setReferralCode(code);
    if (paymentModalData) {
      if (code.trim() === '') {
        // Reset to original price if no code
        setPaymentModalData({
          ...paymentModalData,
          discount: 0,
          discountedPrice: paymentModalData.originalPrice,
          referralCode: ''
        });
        return;
      }

      try {
        // Verify referral code with backend
        const response = await fetch('http://localhost:5000/api/courses/verify-referral', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            referralCode: code.toUpperCase()
          })
        });

        if (response.ok) {
          const result = await response.json();
          if (result.success && result.valid) {
            const discount = result.discount;
            const discountedPrice = paymentModalData.originalPrice * (1 - discount / 100);
            setPaymentModalData({
              ...paymentModalData,
              discount,
              discountedPrice,
              referralCode: code.toUpperCase()
            });
          } else {
            // Invalid code - reset to original price
            setPaymentModalData({
              ...paymentModalData,
              discount: 0,
              discountedPrice: paymentModalData.originalPrice,
              referralCode: code.toUpperCase()
            });
          }
        }
      } catch (error) {
        console.error('Error verifying referral code:', error);
        // On error, reset to original price
        setPaymentModalData({
          ...paymentModalData,
          discount: 0,
          discountedPrice: paymentModalData.originalPrice,
          referralCode: code.toUpperCase()
        });
      }
    }
  };

  const processPayment = async () => {
    if (!paymentModalData) return;

    setIsProcessingPayment(true);
    
    try {
      // Initialize Razorpay payment
      const options = {
        key: 'rzp_test_9WsLnHkruf61R1', // Replace with your Razorpay key
        amount: Math.round(paymentModalData.discountedPrice * 100), // Amount in paise
        currency: 'INR',
        name: 'VStudents',
        description: `Purchase ${paymentModalData.course.title}`,
        image: '/logo.png',
        handler: async function (response: any) {
          // Payment successful
          console.log('Payment successful:', response);
          
          try {
            // Record purchase in backend
            const currentUser = localStorage.getItem('currentUser');
            if (currentUser) {
              const userData = JSON.parse(currentUser);
              
              const purchaseResponse = await fetch('http://localhost:5000/api/courses/purchase', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  courseId: paymentModalData.course.id,
                  studentId: userData.email,
                  paymentId: response.razorpay_payment_id,
                  referralCode: paymentModalData.referralCode || null
                })
              });
              
              if (purchaseResponse.ok) {
                const result = await purchaseResponse.json();
                if (result.success) {
                  // Add course to purchased courses
                  setPurchasedCourses(prev => [...prev, paymentModalData.course.id]);
                  
                  // Show success message
                  alert(`Payment successful! You can now access ${paymentModalData.course.title} in your courses.`);
                  
                  // Switch to My Courses tab
                  setActiveTab('courses');
                } else {
                  alert('Payment successful but failed to record purchase. Please contact support.');
                }
              } else {
                alert('Payment successful but failed to record purchase. Please contact support.');
              }
            }
          } catch (error) {
            console.error('Error recording purchase:', error);
            alert('Payment successful but failed to record purchase. Please contact support.');
          }
          
          // Close modal
          setShowPaymentModal(false);
          setPaymentModalData(null);
          setReferralCode('');
        },
        prefill: {
          name: studentProfile?.name || 'Student',
          email: studentProfile?.email || 'student@example.com',
          contact: studentProfile?.phone || '9999999999'
        },
        theme: {
          color: '#3B82F6'
        }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setIsProcessingPayment(false);
    }
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
      
      const submissionData = {
        type: uploadType,
        content: uploadType === 'file' ? selectedFile?.name || '' : gitUrl,
        submittedAt: new Date().toISOString()
      };
      
      // Update assignment status to submitted
      setAssignmentStatuses(prev => ({
        ...prev,
        [assignmentId]: 'submitted'
      }));
      
      // Store submission details
      setAssignmentSubmissions(prev => ({
        ...prev,
        [assignmentId]: submissionData
      }));
      
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
            
            {/* Assignment Information Message */}
            <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm">📚</span>
                </div>
                <div>
                  <h3 className="text-blue-400 font-semibold">Assignment Information</h3>
                  <p className="text-gray-300 text-sm">
                    Assignments will be available after completing the first two modules of each course. 
                    Keep learning to unlock your assignments!
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              {enrolledCourses.map((course) => {
                const progress = courseProgress[course.id] || {
                  progress: 0,
                  completedLessons: 0,
                  totalLessons: 20,
                  nextLesson: 'Introduction to Course',
                  isStarted: false
                };
                
                return (
                  <div key={course.id} className="bg-gray-800 rounded-lg p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold text-lg">{course.title.charAt(0)}</span>
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
                                style={{width: `${progress.progress}%`}}
                              />
                            </div>
                            <p className="text-gray-400 text-sm mt-1">
                              Next: {progress.nextLesson}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="text-right flex flex-col items-end space-y-2">
                        <p className="text-white text-sm mb-1">
                          {progress.completedLessons} of {progress.totalLessons} lessons completed
                        </p>
                        <p className="text-white text-2xl font-bold">{progress.progress}%</p>
                        <button
                          onClick={() => handleContinueLearning(course.id)}
                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                        >
                          {progress.isStarted && progress.progress > 0 ? 'Continue Learning' : 'Start Learning'}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      case 'assignments':
        return (
          <div className="space-y-6">
            <h2 className="text-white text-2xl font-bold">Assignments</h2>
            
            {/* Course Selection */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-white text-lg font-semibold mb-4">Select Course</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {allCourses
                  .filter(course => purchasedCourses.includes(course.id))
                  .map(course => (
                    <div
                      key={course.id}
                      onClick={() => setSelectedCourseForAssignments(course.id)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedCourseForAssignments === course.id
                          ? 'border-blue-500 bg-blue-900/30'
                          : 'border-gray-600 hover:border-gray-500 bg-gray-700'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                          <BookOpenIcon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-white">{course.title}</h4>
                          <p className="text-sm text-gray-400">{course.instructor}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-xs bg-gray-600 text-gray-300 px-2 py-1 rounded">
                              {course.level}
                            </span>
                            <span className="text-xs text-gray-400">{course.duration}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
              
              {purchasedCourses.length === 0 && (
                <div className="text-center py-8">
                  <BookOpenIcon className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-400">No enrolled courses found. Please enroll in a course to view assignments.</p>
                </div>
              )}
            </div>

            {/* Assignment Progress Summary */}
            {selectedCourseForAssignments && (
              <div className="bg-gray-800 rounded-lg p-6 mb-6">
                <h3 className="text-white text-lg font-semibold mb-4">Assignment Progress</h3>
                {(() => {
                  const mappedIds = getCourseIdMapping(selectedCourseForAssignments);
                  const courseAssignments = assignments.filter(assignment => 
                    mappedIds.includes(assignment.courseId)
                  );
                  const totalAssignments = courseAssignments.length;
                  const completedAssignments = courseAssignments.filter(a => (assignmentStatuses[a.id] || a.status) === 'graded').length;
                  const submittedAssignments = courseAssignments.filter(a => (assignmentStatuses[a.id] || a.status) === 'submitted').length;
                  const pendingAssignments = courseAssignments.filter(a => (assignmentStatuses[a.id] || a.status) === 'pending').length;
                  const progressPercentage = totalAssignments > 0 ? (completedAssignments / totalAssignments) * 100 : 0;
                  
                  return (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="bg-gray-700 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-white">{totalAssignments}</div>
                        <div className="text-gray-400 text-sm">Total Assignments</div>
                      </div>
                      <div className="bg-green-600/20 border border-green-600/30 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-green-400">{completedAssignments}</div>
                        <div className="text-gray-400 text-sm">Completed</div>
                      </div>
                      <div className="bg-blue-600/20 border border-blue-600/30 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-blue-400">{submittedAssignments}</div>
                        <div className="text-gray-400 text-sm">Submitted</div>
                      </div>
                      <div className="bg-yellow-600/20 border border-yellow-600/30 rounded-lg p-4 text-center">
                        <div className="text-2xl font-bold text-yellow-400">{pendingAssignments}</div>
                        <div className="text-gray-400 text-sm">Pending</div>
                      </div>
                    </div>
                  );
                })()}
                
                {/* Progress Bar */}
                {(() => {
                  const mappedIds = getCourseIdMapping(selectedCourseForAssignments);
                  const courseAssignments = assignments.filter(assignment => 
                    mappedIds.includes(assignment.courseId)
                  );
                  const totalAssignments = courseAssignments.length;
                  const completedAssignments = courseAssignments.filter(a => (assignmentStatuses[a.id] || a.status) === 'graded').length;
                  const progressPercentage = totalAssignments > 0 ? (completedAssignments / totalAssignments) * 100 : 0;
                  
                  return (
                    <div className="mt-4">
                      <div className="flex justify-between text-sm text-gray-400 mb-2">
                        <span>Overall Progress</span>
                        <span>{Math.round(progressPercentage)}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${progressPercentage}%` }}
                        ></div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* Assignments List */}
            {selectedCourseForAssignments && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {assignments
                .filter(assignment => {
                  const mappedIds = getCourseIdMapping(selectedCourseForAssignments);
                  return mappedIds.includes(assignment.courseId);
                })
                .map((assignment) => (
                <button
                  key={assignment.id}
                  onClick={() => navigate(`/assignment/${assignment.id}`)}
                  className="bg-gray-800 rounded-lg p-6 border border-gray-700 hover:border-blue-500 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20 text-left"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-white text-lg font-semibold">{assignment.title}</h4>
                      <p className="text-gray-400 text-sm">{assignment.courseName}</p>
                      <p className="text-gray-300 text-sm mt-2">{assignment.description}</p>
                      <p className="text-gray-400 text-sm mt-1">Due: {new Date(assignment.dueDate).toLocaleDateString()}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      (assignmentStatuses[assignment.id] || assignment.status) === 'pending' ? 'bg-yellow-600 text-yellow-100' :
                      (assignmentStatuses[assignment.id] || assignment.status) === 'submitted' ? 'bg-blue-600 text-blue-100' :
                      'bg-green-600 text-green-100'
                    }`}>
                      {((assignmentStatuses[assignment.id] || assignment.status).charAt(0).toUpperCase() + (assignmentStatuses[assignment.id] || assignment.status).slice(1))}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                      <BookOpenIcon className="w-4 h-4" />
                      <span>Study & Test</span>
                    </div>
                    <div className="text-blue-400 text-sm">Click to start →</div>
                  </div>
                </button>
              ))}
              </div>
            )}
          
          {!selectedCourseForAssignments && (
            <div className="text-center text-gray-400 py-8">
              <ClipboardDocumentListIcon className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>Select a course to view its assignments</p>
            </div>
          )}
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
                    className={`px-4 py-2 rounded-lg capitalize transition-colors ${
                      selectedCategory === category
                        ? 'bg-green-600 text-white'
                        : 'bg-black/50 text-white hover:bg-gray-800 border border-gray-700'
                    }`}
                  >
                    {category === 'all' ? 'All Categories' : category}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course, index) => (
                <div 
                  key={course.id} 
                  className="bg-gray-900 rounded-lg overflow-hidden border border-gray-700 hover:border-blue-500 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/20 cursor-pointer"
                  onClick={() => handleCourseDetails(course)}
                >
                  {/* Course Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        course.level === 'beginner' 
                          ? 'bg-green-500 text-white' 
                          : course.level === 'intermediate' 
                          ? 'bg-yellow-500 text-white' 
                          : 'bg-red-500 text-white'
                      }`}>
                        {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
                      </span>
                    </div>
                  </div>

                  {/* Course Content */}
                  <div className="p-6">
                    {/* Course Title */}
                    <h3 className="text-white text-lg font-semibold mb-2 line-clamp-2">
                      {course.title}
                    </h3>
                    
                    {/* Instructor */}
                    <p className="text-gray-400 text-sm mb-3">
                      By {course.instructor}
                    </p>

                    {/* Rating and Students */}
                    <div className="flex items-center gap-1 text-sm mb-3">
                      <span className="text-yellow-500">★</span>
                      <span className="font-medium text-white">{course.rating}</span>
                      <span className="text-gray-400">({course.students.toLocaleString()} students)</span>
                    </div>

                    {/* Duration and Projects */}
                    <div className="text-sm mb-4 text-gray-400">
                      {course.duration} • {course.projects} projects
                    </div>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-1 mb-4">
                      {course.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 rounded text-xs font-medium bg-gray-700 text-gray-300"
                        >
                          {tech}
                        </span>
                      ))}
                      {course.technologies.length > 3 && (
                        <span className="text-xs text-gray-400">
                          +{course.technologies.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Referral Code Message */}
                    <div className="mb-4 p-2 bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded">
                      <div className="flex items-center gap-2">
                        <span className="text-green-400 text-sm">🎯</span>
                        <span className="text-xs font-medium text-green-400">
                          Use referral code for 60% OFF!
                        </span>
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="mb-4">
                      <span className="text-2xl font-bold text-white">
                        ₹{course.price.toLocaleString()}
                      </span>
                    </div>

                    {/* Purchase Button */}
                    {course.students >= course.maxStudents ? (
                       <button 
                         disabled
                         className="w-full bg-gray-600 text-gray-300 py-3 px-4 rounded-lg font-medium cursor-not-allowed"
                       >
                         Slots Closed
                       </button>
                    ) : (
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePurchaseCourse(course.id);
                        }}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200"
                      >
                        Enroll Now
                      </button>
                    )}
                  </div>
                </div>
              ))}
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
      
      case 'projects':
        return (
          <div className="space-y-6">
            <h2 className="text-white text-2xl font-bold">Projects</h2>
            
            {/* Course Selection */}
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="text-white text-lg font-semibold mb-4">Select Course</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {allCourses
                  .filter(course => purchasedCourses.includes(course.id))
                  .map(course => (
                    <div
                      key={course.id}
                      onClick={() => setSelectedCourseForProjects(course.id)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedCourseForProjects === course.id
                          ? 'border-blue-500 bg-blue-900/30'
                          : 'border-gray-600 hover:border-gray-500 bg-gray-700'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-600 rounded-lg flex items-center justify-center">
                          <GlobeAltIcon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-white">{course.title}</h4>
                          <p className="text-sm text-gray-400">{course.instructor}</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-xs bg-gray-600 text-gray-300 px-2 py-1 rounded">
                              {course.level}
                            </span>
                            <span className="text-xs text-gray-400">{course.duration}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
              
              {purchasedCourses.length === 0 && (
                <div className="text-center py-8">
                  <GlobeAltIcon className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-400">No enrolled courses found. Please enroll in a course to view projects.</p>
                </div>
              )}
            </div>

            {/* Project Progress Summary */}
            {selectedCourseForProjects && (
              <div className="bg-gray-800 rounded-lg p-6 mb-6">
                <h3 className="text-white text-lg font-semibold mb-4">Project Progress</h3>
                {(() => {
                  const mappedIds = getCourseIdMapping(selectedCourseForProjects);
                  const courseProjects = projects.filter(project => 
                    mappedIds.includes(project.courseId)
                  );
                  const totalProjects = courseProjects.length;
                  const completedProjects = courseProjects.filter(p => p.status === 'completed').length;
                  const inProgressProjects = courseProjects.filter(p => p.status === 'in_progress').length;
                  const notStartedProjects = courseProjects.filter(p => p.status === 'not_started').length;
                  const progressPercentage = totalProjects > 0 ? (completedProjects / totalProjects) * 100 : 0;
                  
                  return (
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="bg-gray-700 rounded-lg p-4 text-center">
                        <p className="text-2xl font-bold text-white">{totalProjects}</p>
                        <p className="text-gray-400 text-sm">Total Projects</p>
                      </div>
                      <div className="bg-green-600/20 rounded-lg p-4 text-center">
                        <p className="text-2xl font-bold text-green-400">{completedProjects}</p>
                        <p className="text-gray-400 text-sm">Completed</p>
                      </div>
                      <div className="bg-blue-600/20 rounded-lg p-4 text-center">
                        <p className="text-2xl font-bold text-blue-400">{inProgressProjects}</p>
                        <p className="text-gray-400 text-sm">In Progress</p>
                      </div>
                      <div className="bg-gray-600/20 rounded-lg p-4 text-center">
                        <p className="text-2xl font-bold text-gray-400">{notStartedProjects}</p>
                        <p className="text-gray-400 text-sm">Not Started</p>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            {/* Projects List */}
            {selectedCourseForProjects && (
              <div className="space-y-4">
              {projects
                .filter(project => {
                  const mappedIds = getCourseIdMapping(selectedCourseForProjects);
                  return mappedIds.includes(project.courseId);
                })
                .map((project) => (
                <div key={project.id} className="bg-gray-800 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        project.difficulty === 'beginner' ? 'bg-green-600' :
                        project.difficulty === 'intermediate' ? 'bg-yellow-600' : 'bg-red-600'
                      }`}>
                        <span className="text-white font-bold text-lg">{project.title.charAt(0)}</span>
                      </div>
                      <div>
                        <h4 className="text-white text-lg font-semibold">{project.title}</h4>
                        <p className="text-gray-400 text-sm">{project.courseName}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`px-2 py-1 rounded text-xs font-medium ${
                            project.difficulty === 'beginner' ? 'bg-green-500/20 text-green-400' :
                            project.difficulty === 'intermediate' ? 'bg-yellow-500/20 text-yellow-400' : 
                            'bg-red-500/20 text-red-400'
                          }`}>
                            {project.difficulty.charAt(0).toUpperCase() + project.difficulty.slice(1)}
                          </span>
                          <span className="text-gray-400 text-xs">• {project.estimatedTime}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        project.status === 'completed' ? 'bg-green-600 text-green-100' :
                        project.status === 'in_progress' ? 'bg-blue-600 text-blue-100' :
                        'bg-gray-600 text-gray-100'
                      }`}>
                        {project.status === 'not_started' ? 'Not Started' :
                         project.status === 'in_progress' ? 'In Progress' : 'Completed'}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-4">{project.description}</p>
                  
                  <div className="mb-4">
                    <h5 className="text-white font-medium mb-2">Requirements:</h5>
                    <ul className="text-gray-300 text-sm space-y-1">
                      {project.requirements.map((req, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-blue-400 mt-1">•</span>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="mb-4">
                    <h5 className="text-white font-medium mb-2">Technologies:</h5>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="px-2 py-1 rounded text-xs font-medium bg-blue-600/20 text-blue-400">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {project.status !== 'completed' && (
                    <div className="space-y-3">
                      {/* Git URL Upload Field */}
                      <div className="space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-2">
                            Git Repository URL
                          </label>
                          <input
                            type="url"
                            value={projectGitUrl}
                            onChange={(e) => setProjectGitUrl(e.target.value)}
                            placeholder="https://github.com/username/project-name"
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                          <p className="text-gray-400 text-xs mt-1">
                            Enter your GitHub repository URL to submit your project
                          </p>
                        </div>
                        
                        <div className="flex gap-3">
                          <button 
                            onClick={() => {
                              if (projectGitUrl.trim()) {
                                console.log('Starting project with Git URL:', projectGitUrl, 'for project:', project.id);
                                alert(`Project started with repository: ${projectGitUrl}`);
                                setProjectGitUrl('');
                              } else {
                                alert('Please enter a valid Git repository URL');
                              }
                            }}
                            disabled={!projectGitUrl.trim()}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-colors"
                          >
                            {project.status === 'not_started' ? 'Start Project' : 'Update Repository'}
                          </button>
                          {project.status === 'in_progress' && (
                            <button 
                              onClick={() => {
                                setSelectedProjectId(project.id);
                                setShowProjectSubmissionModal(true);
                              }}
                              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
                            >
                              Submit Project
                            </button>
                          )}
                        </div>
                      </div>
                      
                      {/* Git Learning Section */}
                      <div className="bg-gray-700/50 rounded-lg p-3 border border-gray-600">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-white text-sm font-medium">Need help with Git?</p>
                            <p className="text-gray-400 text-xs">Learn how to create repositories and submit your projects</p>
                          </div>
                          <button
                            onClick={() => setShowGitTutorialModal(true)}
                            className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded text-sm transition-colors"
                          >
                            Learn Git
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {project.status === 'completed' && project.grade && (
                    <div className="bg-green-600/20 border border-green-600/30 rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <span className="text-green-400 font-medium">Project Completed</span>
                        <span className="text-green-400 font-bold">Grade: {project.grade}%</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            )}

            {!selectedCourseForProjects && (
              <div className="text-center py-12">
                <GlobeAltIcon className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                <h3 className="text-white text-lg font-medium mb-2">Select a Course</h3>
                <p className="text-gray-400">Choose a course above to view and work on its projects.</p>
              </div>
            )}
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
            <span className="text-white text-lg font-semibold">VStudents</span>
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
                    <p className="text-gray-500 text-sm mb-4">📍 {studentProfile?.location || 'Location not specified'}</p>
                    
                    {/* Detailed Profile Information */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-gray-400 text-sm">Email</p>
                        <p className="text-white">{studentProfile?.email || 'Not provided'}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Student ID</p>
                        <p className="text-white">{studentProfile?.studentId || 'STU001'}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Phone</p>
                        <p className="text-white">{studentProfile?.phone || 'Not provided'}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Join Date</p>
                        <p className="text-white">{studentProfile?.joinDate || 'January 2024'}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Education Level</p>
                        <p className="text-white">{studentProfile?.education || 'Bachelor\'s Degree'}</p>
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Experience Level</p>
                        <p className="text-white">{studentProfile?.experience || 'Beginner'}</p>
                      </div>
                    </div>
                    
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
                  {enrolledCourses.map((course) => (
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

      {/* Payment Modal */}
      {showPaymentModal && paymentModalData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-lg p-6 max-w-md w-full mx-4 border border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">Complete Purchase</h3>
              <button
                onClick={() => {
                  setShowPaymentModal(false);
                  setPaymentModalData(null);
                  setReferralCode('');
                }}
                className="text-gray-400 hover:text-white"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="mb-4">
              <img
                src={paymentModalData.course.image}
                alt={paymentModalData.course.title}
                className="w-full h-32 object-cover rounded-lg mb-3"
              />
              <h4 className="text-lg font-semibold text-white mb-2">
                {paymentModalData.course.title}
              </h4>
              <p className="text-gray-400 text-sm mb-3">
                {paymentModalData.course.description}
              </p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Referral Code (Optional)
              </label>
              <input
                type="text"
                value={referralCode}
                onChange={(e) => handleReferralCodeChange(e.target.value)}
                placeholder="Enter SAVE60 for 60% off"
                className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {referralCode.toUpperCase() === 'SAVE60' && (
                <p className="text-green-400 text-sm mt-1">
                  ✓ 60% discount applied!
                </p>
              )}
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300">Original Price:</span>
                <span className="text-gray-300">₹{paymentModalData.originalPrice.toLocaleString()}</span>
              </div>
              {paymentModalData.discount > 0 && (
                <div className="flex justify-between items-center mb-2">
                  <span className="text-green-400">Discount ({paymentModalData.discount}%):</span>
                  <span className="text-green-400">-₹{(paymentModalData.originalPrice - paymentModalData.discountedPrice).toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between items-center text-lg font-bold border-t border-gray-600 pt-2">
                <span className="text-white">Total:</span>
                <span className="text-blue-400">₹{Math.round(paymentModalData.discountedPrice).toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={processPayment}
              disabled={isProcessingPayment}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
            >
              {isProcessingPayment ? 'Processing...' : 'Pay with Razorpay'}
            </button>

            <p className="text-xs text-gray-400 text-center mt-3">
              Secure payment powered by Razorpay
            </p>
          </div>
        </div>
      )}

      {/* Project Submission Modal */}
      {showProjectSubmissionModal && selectedProjectId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Submit Project</h3>
              <button
                onClick={() => {
                  setShowProjectSubmissionModal(false);
                  setSelectedProjectId(null);
                  setProjectGitUrl('');
                }}
                className="text-gray-400 hover:text-white"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="mb-4">
              <p className="text-gray-300 text-sm mb-4">
                Submit your project by providing the Git repository URL. Make sure your repository is public so instructors can review your code.
              </p>
              
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Git Repository URL *
              </label>
              <input
                type="url"
                value={projectGitUrl}
                onChange={(e) => setProjectGitUrl(e.target.value)}
                placeholder="https://github.com/username/project-name"
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
              <p className="text-gray-400 text-xs mt-1">
                Example: https://github.com/yourusername/your-project
              </p>
            </div>

            <div className="bg-blue-600/20 border border-blue-600/30 rounded-lg p-3 mb-4">
              <p className="text-blue-400 text-sm">
                💡 <strong>Tip:</strong> Don't know how to use Git? Click the "Learn Git" button in your project to get started with step-by-step instructions!
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowProjectSubmissionModal(false);
                  setSelectedProjectId(null);
                  setProjectGitUrl('');
                }}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (projectGitUrl.trim()) {
                    // Here you would typically send the submission to your backend
                    console.log('Submitting project:', selectedProjectId, 'with Git URL:', projectGitUrl);
                    alert('Project submitted successfully! Your instructor will review it soon.');
                    setShowProjectSubmissionModal(false);
                    setSelectedProjectId(null);
                    setProjectGitUrl('');
                  }
                }}
                disabled={!projectGitUrl.trim()}
                className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Submit Project
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Git Tutorial Modal */}
      {showGitTutorialModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">Learn Git - Complete Guide</h3>
              <button
                onClick={() => setShowGitTutorialModal(false)}
                className="text-gray-400 hover:text-white"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </div>

            <div className="space-y-6">
              {/* Introduction */}
              <div className="bg-gray-700/50 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-white mb-2">What is Git?</h4>
                <p className="text-gray-300 text-sm">
                  Git is a version control system that helps you track changes in your code and collaborate with others. 
                  GitHub is a platform that hosts Git repositories online.
                </p>
              </div>

              {/* Step 1: Install Git */}
              <div className="bg-gray-700/50 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-white mb-3">Step 1: Install Git</h4>
                <p className="text-gray-300 text-sm mb-2">Download and install Git from:</p>
                <div className="bg-gray-800 rounded p-2 mb-2">
                  <code className="text-green-400">https://git-scm.com/downloads</code>
                </div>
                <p className="text-gray-300 text-sm">Verify installation by running:</p>
                <div className="bg-gray-800 rounded p-2">
                  <code className="text-green-400">git --version</code>
                </div>
              </div>

              {/* Step 2: Configure Git */}
              <div className="bg-gray-700/50 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-white mb-3">Step 2: Configure Git (First Time Setup)</h4>
                <p className="text-gray-300 text-sm mb-2">Set your name and email:</p>
                <div className="space-y-2">
                  <div className="bg-gray-800 rounded p-2">
                    <code className="text-green-400">git config --global user.name "Your Name"</code>
                  </div>
                  <div className="bg-gray-800 rounded p-2">
                    <code className="text-green-400">git config --global user.email "your.email@example.com"</code>
                  </div>
                </div>
                <p className="text-gray-300 text-sm mt-2">Check your configuration:</p>
                <div className="bg-gray-800 rounded p-2">
                  <code className="text-green-400">git config --list</code>
                </div>
              </div>

              {/* Step 3: Create Repository */}
              <div className="bg-gray-700/50 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-white mb-3">Step 3: Create a Repository</h4>
                
                <div className="mb-4">
                  <h5 className="text-white font-medium mb-2">Option A: Create on GitHub first (Recommended)</h5>
                  <ol className="text-gray-300 text-sm space-y-1 list-decimal list-inside">
                    <li>Go to <span className="text-blue-400">github.com</span> and sign in</li>
                    <li>Click "New repository" or the "+" icon</li>
                    <li>Enter repository name (e.g., "my-project")</li>
                    <li>Make it <strong>Public</strong> so instructors can see it</li>
                    <li>Check "Add a README file"</li>
                    <li>Click "Create repository"</li>
                  </ol>
                </div>

                <div>
                  <h5 className="text-white font-medium mb-2">Option B: Create locally first</h5>
                  <div className="space-y-2">
                    <div className="bg-gray-800 rounded p-2">
                      <code className="text-green-400">mkdir my-project</code>
                    </div>
                    <div className="bg-gray-800 rounded p-2">
                      <code className="text-green-400">cd my-project</code>
                    </div>
                    <div className="bg-gray-800 rounded p-2">
                      <code className="text-green-400">git init</code>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 4: Clone Repository */}
              <div className="bg-gray-700/50 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-white mb-3">Step 4: Clone Repository (If created on GitHub)</h4>
                <p className="text-gray-300 text-sm mb-2">Copy the repository to your computer:</p>
                <div className="bg-gray-800 rounded p-2 mb-2">
                  <code className="text-green-400">git clone https://github.com/username/repository-name.git</code>
                </div>
                <div className="bg-gray-800 rounded p-2">
                  <code className="text-green-400">cd repository-name</code>
                </div>
              </div>

              {/* Step 5: Basic Git Workflow */}
              <div className="bg-gray-700/50 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-white mb-3">Step 5: Basic Git Workflow</h4>
                
                <div className="space-y-4">
                  <div>
                    <h5 className="text-white font-medium mb-2">1. Check status of your files:</h5>
                    <div className="bg-gray-800 rounded p-2">
                      <code className="text-green-400">git status</code>
                    </div>
                  </div>

                  <div>
                    <h5 className="text-white font-medium mb-2">2. Add files to staging area:</h5>
                    <div className="space-y-2">
                      <div className="bg-gray-800 rounded p-2">
                        <code className="text-green-400">git add filename.txt</code>
                        <span className="text-gray-400 ml-2"># Add specific file</span>
                      </div>
                      <div className="bg-gray-800 rounded p-2">
                        <code className="text-green-400">git add .</code>
                        <span className="text-gray-400 ml-2"># Add all files</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h5 className="text-white font-medium mb-2">3. Commit your changes:</h5>
                    <div className="bg-gray-800 rounded p-2">
                      <code className="text-green-400">git commit -m "Your commit message"</code>
                    </div>
                    <p className="text-gray-300 text-xs mt-1">Example: "Add project files" or "Fix login bug"</p>
                  </div>

                  <div>
                    <h5 className="text-white font-medium mb-2">4. Push to GitHub:</h5>
                    <div className="bg-gray-800 rounded p-2">
                      <code className="text-green-400">git push origin main</code>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 6: Connect Local to Remote */}
              <div className="bg-gray-700/50 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-white mb-3">Step 6: Connect Local Repository to GitHub</h4>
                <p className="text-gray-300 text-sm mb-2">If you created the repository locally first:</p>
                <div className="space-y-2">
                  <div className="bg-gray-800 rounded p-2">
                    <code className="text-green-400">git remote add origin https://github.com/username/repository-name.git</code>
                  </div>
                  <div className="bg-gray-800 rounded p-2">
                    <code className="text-green-400">git branch -M main</code>
                  </div>
                  <div className="bg-gray-800 rounded p-2">
                    <code className="text-green-400">git push -u origin main</code>
                  </div>
                </div>
              </div>

              {/* Common Commands */}
              <div className="bg-gray-700/50 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-white mb-3">Common Git Commands</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="text-white font-medium mb-2">View Information:</h5>
                    <div className="space-y-1 text-sm">
                      <div className="bg-gray-800 rounded p-2">
                        <code className="text-green-400">git status</code>
                        <span className="text-gray-400 block text-xs">Check file status</span>
                      </div>
                      <div className="bg-gray-800 rounded p-2">
                        <code className="text-green-400">git log</code>
                        <span className="text-gray-400 block text-xs">View commit history</span>
                      </div>
                      <div className="bg-gray-800 rounded p-2">
                        <code className="text-green-400">git diff</code>
                        <span className="text-gray-400 block text-xs">See changes</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="text-white font-medium mb-2">Undo Changes:</h5>
                    <div className="space-y-1 text-sm">
                      <div className="bg-gray-800 rounded p-2">
                        <code className="text-green-400">git reset filename</code>
                        <span className="text-gray-400 block text-xs">Unstage file</span>
                      </div>
                      <div className="bg-gray-800 rounded p-2">
                        <code className="text-green-400">git checkout -- filename</code>
                        <span className="text-gray-400 block text-xs">Discard changes</span>
                      </div>
                      <div className="bg-gray-800 rounded p-2">
                        <code className="text-green-400">git pull</code>
                        <span className="text-gray-400 block text-xs">Get latest changes</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Start Guide */}
              <div className="bg-blue-600/20 border border-blue-600/30 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-blue-400 mb-3">🚀 Quick Start for Your Project</h4>
                <ol className="text-gray-300 text-sm space-y-2 list-decimal list-inside">
                  <li>Create a new repository on GitHub (make it <strong>public</strong>)</li>
                  <li>Clone it: <code className="bg-gray-800 px-1 rounded text-green-400">git clone [your-repo-url]</code></li>
                  <li>Add your project files to the folder</li>
                  <li>Stage files: <code className="bg-gray-800 px-1 rounded text-green-400">git add .</code></li>
                  <li>Commit: <code className="bg-gray-800 px-1 rounded text-green-400">git commit -m "Initial project submission"</code></li>
                  <li>Push: <code className="bg-gray-800 px-1 rounded text-green-400">git push origin main</code></li>
                  <li>Copy the repository URL and submit it in your project!</li>
                </ol>
              </div>

              {/* Tips */}
              <div className="bg-yellow-600/20 border border-yellow-600/30 rounded-lg p-4">
                <h4 className="text-lg font-semibold text-yellow-400 mb-3">💡 Important Tips</h4>
                <ul className="text-gray-300 text-sm space-y-1 list-disc list-inside">
                  <li>Always make your repository <strong>public</strong> so instructors can access it</li>
                  <li>Write clear commit messages describing what you changed</li>
                  <li>Include a README.md file explaining your project</li>
                  <li>Don't commit sensitive information (passwords, API keys)</li>
                  <li>Commit frequently with small, logical changes</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={() => setShowGitTutorialModal(false)}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
              >
                Got it! Close Tutorial
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Study Materials Modal */}
      {showStudyMaterialsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white">Study Materials</h3>
                <button
                  onClick={() => setShowStudyMaterialsModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                {selectedStudyMaterials.map((material, index) => (
                  <div key={index} className="bg-gray-800 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <BookOpenIcon className="w-5 h-5 text-green-400" />
                      <span className="text-white font-medium">Study Material {index + 1}</span>
                    </div>
                    <p className="text-gray-300 mt-2">{material}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 text-center">
                <button
                  onClick={() => setShowStudyMaterialsModal(false)}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Test Questions Modal */}
      {showTestQuestionsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white">Practice Test</h3>
                <button
                  onClick={() => setShowTestQuestionsModal(false)}
                  className="text-gray-400 hover:text-white"
                >
                  <XMarkIcon className="w-6 h-6" />
                </button>
              </div>
              
              {!testResults ? (
                <div className="space-y-6">
                  {selectedTestQuestions?.map((question, questionIndex) => (
                    <div key={questionIndex} className="bg-gray-800 rounded-lg p-6">
                      <h4 className="text-white text-lg font-semibold mb-4">
                        Question {questionIndex + 1}: {question.question}
                      </h4>
                      <div className="space-y-3">
                        {question.options.map((option, optionIndex) => (
                          <label key={optionIndex} className="flex items-center space-x-3 cursor-pointer">
                            <input
                              type="radio"
                              name={`question-${questionIndex}`}
                              value={optionIndex}
                              checked={currentTestAnswers[questionIndex] === optionIndex}
                              onChange={() => setCurrentTestAnswers(prev => ({
                                ...prev,
                                [questionIndex]: optionIndex
                              }))}
                              className="text-purple-600"
                            />
                            <span className="text-gray-300">{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                  
                  <div className="text-center">
                    <button
                      onClick={() => {
                        const score = selectedTestQuestions?.reduce((acc, question, index) => {
                          return acc + (currentTestAnswers[index] === question.correctAnswer ? 1 : 0);
                        }, 0) || 0;
                        setTestResults({ score, total: selectedTestQuestions?.length || 0 });
                      }}
                      disabled={Object.keys(currentTestAnswers).length !== selectedTestQuestions?.length}
                      className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-8 py-3 rounded-lg transition-colors"
                    >
                      Submit Test
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <div className="bg-gray-800 rounded-lg p-8 mb-6">
                    <h4 className="text-2xl font-bold text-white mb-4">Test Results</h4>
                    <div className="text-6xl font-bold mb-4">
                      <span className={testResults.score >= testResults.total * 0.7 ? 'text-green-400' : 'text-red-400'}>
                        {Math.round((testResults.score / testResults.total) * 100)}%
                      </span>
                    </div>
                    <p className="text-gray-300 text-lg">
                      You scored {testResults.score} out of {testResults.total} questions correctly
                    </p>
                    {testResults.score >= testResults.total * 0.7 ? (
                      <p className="text-green-400 mt-2">Great job! You passed the test!</p>
                    ) : (
                      <p className="text-red-400 mt-2">Keep studying and try again!</p>
                    )}
                  </div>
                  
                  <div className="space-x-4">
                    <button
                      onClick={() => {
                        setCurrentTestAnswers({});
                        setTestResults(null);
                      }}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
                    >
                      Retake Test
                    </button>
                    <button
                      onClick={() => setShowTestQuestionsModal(false)}
                      className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Course Details Modal */}
      {showCourseDetails && selectedCourseForDetails && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-2xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-gray-700">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-white">{selectedCourseForDetails.title}</h3>
              <button
                onClick={() => setShowCourseDetails(false)}
                className="text-gray-400 hover:text-white transition-colors text-2xl"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {/* Course Header */}
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium">
                      {selectedCourseForDetails.level.charAt(0).toUpperCase() + selectedCourseForDetails.level.slice(1)}
                    </span>
                    <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm font-medium">
                      {selectedCourseForDetails.category.charAt(0).toUpperCase() + selectedCourseForDetails.category.slice(1)}
                    </span>
                  </div>
                  
                  <p className="text-gray-300 mb-4">
                    {selectedCourseForDetails.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-2">
                      <span>⏱️</span>
                      <span>{selectedCourseForDetails.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>📚</span>
                      <span>{selectedCourseForDetails.modules?.length || 0} Modules</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>🚀</span>
                      <span>{selectedCourseForDetails.projects} Projects</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>⭐</span>
                      <span>{selectedCourseForDetails.rating} ({selectedCourseForDetails.students.toLocaleString()} students)</span>
                    </div>
                  </div>
                </div>

                {/* Technologies */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-3">Technologies You'll Learn</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedCourseForDetails.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Course Modules */}
                {selectedCourseForDetails.modules && selectedCourseForDetails.modules.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-white mb-3">Course Curriculum</h3>
                    <div className="space-y-3">
                      {selectedCourseForDetails.modules.map((module, index) => (
                        <div key={index} className="border border-gray-700 rounded-lg p-4">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="text-blue-400 font-medium">
                              Module {index + 1}: {module.title}
                            </h4>
                            <span className="text-sm text-gray-400">{module.duration}</span>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {module.topics.map((topic, topicIndex) => (
                              <div key={topicIndex} className="flex items-center gap-2 text-gray-300 text-sm">
                                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                                <span>{topic}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Enrollment Card */}
              <div className="lg:col-span-1">
                <div className="sticky top-6 bg-gray-800 border border-gray-700 rounded-lg p-6">
                  {/* Course Image */}
                  <div className="mb-4">
                    <img
                      src={selectedCourseForDetails.image}
                      alt={selectedCourseForDetails.title}
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  </div>

                  {/* Pricing */}
                  <div className="mb-4">
                    <div className="text-2xl font-bold text-green-400 mb-1">
                      ₹{selectedCourseForDetails.price.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-400">
                      One-time payment • Lifetime access
                    </div>
                  </div>

                  {/* Course Info */}
                  <div className="mb-4 space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-400">Instructor</span>
                      <span className="text-white">{selectedCourseForDetails.instructor}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-400">Duration</span>
                      <span className="text-white">{selectedCourseForDetails.duration}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-400">Level</span>
                      <span className="text-white capitalize">{selectedCourseForDetails.level}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-400">Projects</span>
                      <span className="text-white">{selectedCourseForDetails.projects}</span>
                    </div>
                  </div>

                  {/* Referral Code Message */}
                  <div className="mb-4 p-3 bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded">
                    <div className="flex items-center gap-2">
                      <span className="text-green-400 text-sm">🎯</span>
                      <span className="text-xs font-medium text-green-400">
                        Use referral code for 60% OFF!
                      </span>
                    </div>
                  </div>

                  {/* Enroll Button */}
                  {selectedCourseForDetails.students >= selectedCourseForDetails.maxStudents ? (
                    <button 
                      disabled
                      className="w-full bg-gray-600 text-gray-300 py-3 px-4 rounded-lg font-medium cursor-not-allowed mb-4"
                    >
                      Slots Closed
                    </button>
                  ) : (
                    <button 
                      onClick={() => {
                        setShowCourseDetails(false);
                        handlePurchaseCourse(selectedCourseForDetails.id);
                      }}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200 mb-4"
                    >
                      Enroll Now
                    </button>
                  )}

                  {/* Features */}
                  <div className="pt-4 border-t border-gray-700">
                    <h4 className="font-medium text-white mb-3">What's Included:</h4>
                    <ul className="space-y-2 text-sm text-gray-300">
                      <li className="flex items-center gap-2">
                        <span className="text-green-400">✓</span>
                        Lifetime access to course content
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-green-400">✓</span>
                        {selectedCourseForDetails.projects} hands-on projects
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
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentPortal;

// Sets the enrolled courses data (used for compatibility with legacy code)
function setCourses(courses: Course[]) {
  setEnrolledCoursesData(courses);
}

function setEnrolledCoursesData(courses: Course[]) {
  // This function updates the enrolled courses state.
  // In the component, setEnrolledCoursesData is a useState setter, so just call the setter.
  // If you want to keep compatibility with legacy code, you can update the state here.
  // But since setEnrolledCoursesData is already a useState setter, this is a no-op.
  // You can remove this function and use setEnrolledCoursesData directly, or keep it for compatibility.
  // For now, just call the setter.
  // @ts-ignore
  setEnrolledCoursesData(courses);
}

