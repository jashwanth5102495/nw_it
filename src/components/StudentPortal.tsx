import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CalendarIcon, 
  HomeIcon,
  AcademicCapIcon,
  UserIcon,
  Bars3Icon,
  XMarkIcon,
  PlayIcon,
  CheckCircleIcon,
  ChevronDownIcon,
  MapPinIcon,
  DocumentTextIcon,
  BellIcon,
  BriefcaseIcon,
  EnvelopeIcon,
  BuildingOfficeIcon,
  Cog6ToothIcon,
  QuestionMarkCircleIcon,
  GlobeAltIcon,
  ClipboardDocumentListIcon
} from '@heroicons/react/24/outline';

interface Course {
  id: string;
  title: string;
  instructor: string;
  progress: number;
  totalLessons: number;
  completedLessons: number;
  duration: string;
  category: string;
  level: string;
  nextLesson?: string;
}

interface StudentProfile {
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
  address?: {
    city: string;
    state: string;
    country: string;
  };
  enrolledCourses?: Array<{
    status: string;
    enrollmentDate: string;
  }>;
  isFirstLogin?: boolean;
}

interface Assignment {
  id: string;
  courseId: string;
  title: string;
  description: string;
  dueDate: string;
  status: 'pending' | 'submitted' | 'graded';
  grade?: number;
  submittedAt?: string;
}

interface AssignmentSubmission {
  assignmentId: string;
  screenRecording: File | null;
  faceRecording: File | null;
  submittedAt: string;
}

const StudentPortal = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<string>('');
  const [uploadedVideo, setUploadedVideo] = useState<File | null>(null);
  const [uploadedResume, setUploadedResume] = useState<File | null>(null);
  const [selectedAssignment, setSelectedAssignment] = useState<string>('');
  const [screenRecording, setScreenRecording] = useState<File | null>(null);
  const [faceRecording, setFaceRecording] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>('');

  // Real course data for Rohan - courses bought by the student
  const courses: Course[] = [
    {
      id: 'frontend-beginner',
      title: 'Frontend Development - Beginner',
      instructor: 'Rohan Jashvantbhai',
      progress: 75,
      totalLessons: 24,
      completedLessons: 18,
      duration: '6 weeks',
      category: 'Frontend',
      level: 'Beginner',
      nextLesson: 'JavaScript DOM Manipulation'
    },
    {
      id: 'frontend-intermediate',
      title: 'Frontend Development - Intermediate',
      instructor: 'Rohan Jashvantbhai',
      progress: 45,
      totalLessons: 32,
      completedLessons: 14,
      duration: '8 weeks',
      category: 'Frontend',
      level: 'Intermediate',
      nextLesson: 'Advanced CSS Grid Layouts'
    }
  ];

  // Sample assignments for purchased courses
  const assignments: Assignment[] = [
    {
      id: 'assignment-1',
      courseId: 'frontend-beginner',
      title: 'Build a Responsive Landing Page',
      description: 'Create a responsive landing page using HTML, CSS, and JavaScript. Include navigation, hero section, features, and contact form.',
      dueDate: '2024-02-15',
      status: 'pending'
    },
    {
      id: 'assignment-2',
      courseId: 'frontend-beginner',
      title: 'JavaScript Calculator Project',
      description: 'Build a functional calculator using vanilla JavaScript with proper error handling and responsive design.',
      dueDate: '2024-02-20',
      status: 'pending'
    },
    {
      id: 'assignment-3',
      courseId: 'frontend-intermediate',
      title: 'React Todo Application',
      description: 'Create a full-featured todo application using React with local storage, filtering, and CRUD operations.',
      dueDate: '2024-02-25',
      status: 'pending'
    },
    {
      id: 'assignment-4',
      courseId: 'frontend-intermediate',
      title: 'API Integration Project',
      description: 'Build a weather app that fetches data from a public API and displays it with proper error handling.',
      dueDate: '2024-03-01',
      status: 'submitted',
      submittedAt: '2024-01-28'
    }
  ];

  // All available courses with availability status and pricing
  const allCourses = [
    { 
      title: 'Frontend Development - Beginner', 
      available: true, 
      enrolled: true,
      originalPrice: 2000,
      discountedPrice: 400,
      discountPercent: 80,
      hasPromoCode: true
    },
    { 
      title: 'Frontend Development - Intermediate', 
      available: true, 
      enrolled: true,
      originalPrice: 3000,
      discountedPrice: 2400,
      discountPercent: 20,
      hasPromoCode: false
    },
    { title: 'Complete JavaScript', available: true, enrolled: false, requiresAccess: true },
    { title: 'Frontend Development - Advanced', available: false, seatsFull: true },
    { title: 'DevOps - Beginner', available: false, seatsFull: true },
    { title: 'DevOps - Advanced', available: false, seatsFull: true },
    { title: 'Mobile App Development - Advanced', available: false, seatsFull: true },
    { title: 'Browser Extensions Development', available: false, seatsFull: true }
  ];

  const sidebarItems = [
    { id: 'dashboard', label: 'vStudent Manager', icon: HomeIcon },
    { id: 'courses', label: 'My Courses', icon: BriefcaseIcon },
    { id: 'assignments', label: 'Assignments', icon: ClipboardDocumentListIcon },
    { id: 'browse-courses', label: 'Browse Courses', icon: GlobeAltIcon },
    { id: 'profile', label: 'My Profile', icon: UserIcon },
    { id: 'settings', label: 'Settings', icon: Cog6ToothIcon },
    { id: 'support', label: 'Support', icon: QuestionMarkCircleIcon },
  ];

  const handleEnrollment = (courseTitle: string) => {
    setSelectedCourse(courseTitle);
    setShowEnrollModal(true);
  };

  const confirmEnrollment = () => {
    // Here you would typically make an API call to enroll the student
    alert(`Enrollment initiated for: ${selectedCourse}\n\nYou will be redirected to the payment gateway.`);
    setShowEnrollModal(false);
    setSelectedCourse('');
  };

  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('video/')) {
      setUploadedVideo(file);
    } else {
      alert('Please select a valid video file.');
    }
  };

  const handleResumeUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && (file.type === 'application/pdf' || file.type.includes('document'))) {
      setUploadedResume(file);
    } else {
      alert('Please select a valid PDF or document file.');
    }
  };

  const handleSubmitDocuments = () => {
    if (uploadedResume) {
      alert('Resume submitted successfully!');
      // Here you would typically upload the file to your server
    } else {
      alert('Please upload your resume first.');
    }
  };

  const handleContinueLearning = (courseId: string) => {
    // Navigate to course learning page based on course ID with proper URL structure
    if (courseId === 'frontend-beginner') {
      navigate('/course-learning/frontend-development-beginner/html-module/html-intro');
    } else if (courseId === 'frontend-intermediate') {
      navigate('/course-learning-intermediate/frontend-development-intermediate/react-module/react-intro');
    }
  };

  const handleScreenRecordingUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('video/')) {
      setScreenRecording(file);
      setUploadStatus('Screen recording uploaded successfully!');
    } else {
      alert('Please select a valid video file for screen recording.');
    }
  };

  const handleFaceRecordingUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('video/')) {
      setFaceRecording(file);
      setUploadStatus('Face recording uploaded successfully!');
    } else {
      alert('Please select a valid video file for face recording.');
    }
  };

  const handleAssignmentSubmit = (assignmentId: string) => {
    if (screenRecording && faceRecording) {
      setUploadStatus('Assignment submitted successfully!');
      // Here you would typically upload the files to your server
      // Reset the form
      setScreenRecording(null);
      setFaceRecording(null);
      setSelectedAssignment('');
    } else {
      alert('Please upload both screen recording and face recording before submitting.');
    }
  };

  const getAssignmentsForCourse = (courseId: string) => {
    return assignments.filter(assignment => assignment.courseId === courseId);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  useEffect(() => {
    // Check if user is authenticated
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
        
        // Try to fetch complete student data from backend
        try {
          const response = await fetch(`http://localhost:5000/api/students/profile/${userData.id || userData.studentId}`, {
            headers: {
              'Authorization': `Bearer ${userData.token || ''}`
            }
          });
          
          if (response.ok) {
            const result = await response.json();
            const studentData = result.data;
            setStudentProfile({
              name: `${studentData.firstName} ${studentData.lastName}`,
              email: studentData.email,
              phone: studentData.phone,
              address: studentData.address,
              enrolledCourses: studentData.enrolledCourses,
              isFirstLogin: !studentData.lastLogin
            });
          } else {
            // Fallback to localStorage data
            setStudentProfile({
              name: `${userData.firstName} ${userData.lastName}` || 'Student',
              email: userData.email || 'student@example.com',
              isFirstLogin: true
            });
          }
        } catch (fetchError) {
          console.error('Error fetching student data from backend:', fetchError);
          // Fallback to localStorage data
          setStudentProfile({
            name: `${userData.firstName} ${userData.lastName}` || 'Student',
            email: userData.email || 'student@example.com',
            isFirstLogin: true
          });
        }
      } catch (error) {
        console.error('Error loading student data:', error);
        setStudentProfile({
          name: 'Student',
          email: 'student@example.com',
          isFirstLogin: true
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    loadStudentData();
  }, [navigate]);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'courses':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">My Purchased Courses</h2>
            <div className="grid gap-4">
              {courses.map((course) => (
                <div key={course.id} className="bg-gray-800 rounded-2xl p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-lg">
                        {course.title.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-lg font-semibold text-white">{course.title}</h4>
                        <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm">
                          Enrolled
                        </span>
                      </div>
                      <p className="text-gray-300 text-sm mb-2">
                        Instructor: {course.instructor} • Duration: {course.duration}
                      </p>
                      <div className="flex justify-between text-sm text-gray-400 mb-2">
                        <span>Progress</span>
                        <span>{course.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2 mb-3">
                        <div 
                          className="bg-green-500 h-2 rounded-full transition-all duration-300" 
                          style={{width: `${course.progress}%`}}
                        ></div>
                      </div>
                      {course.nextLesson && (
                        <p className="text-gray-400 text-sm">
                          Next: {course.nextLesson}
                        </p>
                      )}
                      <button 
                        onClick={() => handleContinueLearning(course.id)}
                        className="mt-3 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                      >
                        {studentProfile?.isFirstLogin || course.progress === 0 ? 'Start Learning' : 'Continue Learning'}
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
            <h2 className="text-2xl font-bold text-white mb-6">Course Assignments</h2>
            <div className="grid gap-6">
              {courses.map((course) => {
                const courseAssignments = getAssignmentsForCourse(course.id);
                if (courseAssignments.length === 0) return null;
                
                return (
                  <div key={course.id} className="bg-gray-800 rounded-2xl p-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-10 h-10 bg-gray-600 rounded-lg flex items-center justify-center">
                        <span className="text-white font-bold">{course.title.charAt(0)}</span>
                      </div>
                      <h3 className="text-xl font-semibold text-white">{course.title}</h3>
                    </div>
                    
                    <div className="space-y-4">
                      {courseAssignments.map((assignment) => (
                        <div key={assignment.id} className="bg-gray-700 rounded-lg p-4 border border-gray-600">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h4 className="text-lg font-medium text-white mb-2">{assignment.title}</h4>
                              <p className="text-gray-300 text-sm mb-2">{assignment.description}</p>
                              <div className="flex items-center space-x-4 text-sm">
                                <span className="text-gray-400">Due: {formatDate(assignment.dueDate)}</span>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  assignment.status === 'pending' ? 'bg-yellow-600 text-yellow-100' :
                                  assignment.status === 'submitted' ? 'bg-black text-gray-100' :
                                  'bg-green-600 text-green-100'
                                }`}>
                                  {assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1)}
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          {assignment.status === 'pending' && (
                            <div className="mt-4 space-y-4">
                              <div className="grid md:grid-cols-2 gap-4">
                                {/* Screen Recording Upload */}
                                <div className="space-y-2">
                                  <label className="block text-sm font-medium text-gray-300">
                                    Screen Recording *
                                  </label>
                                  <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 text-center">
                                    {screenRecording ? (
                                      <div className="space-y-2">
                                        <p className="text-green-400 text-sm">✓ {screenRecording.name}</p>
                                        <button
                                          onClick={() => setScreenRecording(null)}
                                          className="text-red-400 text-xs hover:text-red-300"
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    ) : (
                                      <div>
                                        <input
                                          type="file"
                                          accept="video/*"
                                          onChange={handleScreenRecordingUpload}
                                          className="hidden"
                                          id={`screen-${assignment.id}`}
                                        />
                                        <label
                                          htmlFor={`screen-${assignment.id}`}
                                          className="cursor-pointer text-gray-400 hover:text-white"
                                        >
                                          <div className="space-y-1">
                                            <div className="text-2xl">📹</div>
                                            <p className="text-sm">Upload Screen Recording</p>
                                          </div>
                                        </label>
                                      </div>
                                    )}
                                  </div>
                                </div>
                                
                                {/* Face Recording Upload */}
                                <div className="space-y-2">
                                  <label className="block text-sm font-medium text-gray-300">
                                    Face Recording *
                                  </label>
                                  <div className="border-2 border-dashed border-gray-600 rounded-lg p-4 text-center">
                                    {faceRecording ? (
                                      <div className="space-y-2">
                                        <p className="text-green-400 text-sm">✓ {faceRecording.name}</p>
                                        <button
                                          onClick={() => setFaceRecording(null)}
                                          className="text-red-400 text-xs hover:text-red-300"
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    ) : (
                                      <div>
                                        <input
                                          type="file"
                                          accept="video/*"
                                          onChange={handleFaceRecordingUpload}
                                          className="hidden"
                                          id={`face-${assignment.id}`}
                                        />
                                        <label
                                          htmlFor={`face-${assignment.id}`}
                                          className="cursor-pointer text-gray-400 hover:text-white"
                                        >
                                          <div className="space-y-1">
                                            <div className="text-2xl">🎥</div>
                                            <p className="text-sm">Upload Face Recording</p>
                                          </div>
                                        </label>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                              
                              {uploadStatus && (
                                <p className="text-green-400 text-sm">{uploadStatus}</p>
                              )}
                              
                              <button
                                onClick={() => handleAssignmentSubmit(assignment.id)}
                                disabled={!screenRecording || !faceRecording}
                                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-2 px-4 rounded-lg font-medium transition-colors"
                              >
                                Submit Assignment
                              </button>
                            </div>
                          )}
                          
                          {assignment.status === 'submitted' && assignment.submittedAt && (
                            <div className="mt-4 p-3 bg-black/20 rounded-lg">
                <p className="text-gray-300 text-sm">
                                ✓ Submitted on {formatDate(assignment.submittedAt)}
                              </p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
            
            {assignments.filter(a => courses.some(c => c.id === a.courseId)).length === 0 && (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📝</div>
                <p className="text-gray-400 text-lg">No assignments available</p>
                <p className="text-gray-500 text-sm">Assignments will appear here for your enrolled courses</p>
              </div>
            )}
          </div>
        );
      case 'browse-courses':
        return (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl font-bold text-white">Browse All Courses</h2>
              <div className="text-sm text-gray-400">
                {allCourses.length} courses available
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allCourses.map((course, index) => {
                const CourseCard = (
                  <div className="group relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-6 border border-gray-700/50 hover:border-black/30 transition-all duration-500 hover:shadow-2xl hover:shadow-black/10">
                  {/* Background Gradient Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-black/5 to-gray-800/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Course Header */}
                  <div className="relative z-10 mb-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-black to-gray-800 rounded-xl flex items-center justify-center shadow-lg">
                        <span className="text-white font-bold text-lg">{course.title.charAt(0)}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="px-2 py-1 bg-green-500/20 text-green-400 border border-green-500/30 rounded-full text-xs font-medium">
                            Beginner
                          </span>
                          {course.enrolled && (
                            <span className="px-2 py-1 bg-black/20 text-gray-400 rounded-full text-xs font-medium border border-black/30">
                              ✓ Enrolled
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-3 text-white group-hover:text-gray-100 transition-colors duration-300">
                      {course.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed mb-4">Master modern web development with hands-on projects and real-world applications.</p>
                  </div>

                  {/* Technologies */}
                  <div className="relative z-10 mb-6">
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-black/10 text-gray-300 rounded-lg text-xs font-medium border border-black/20">React</span>
                      <span className="px-3 py-1 bg-black/10 text-gray-300 rounded-lg text-xs font-medium border border-black/20">JavaScript</span>
                      <span className="px-3 py-1 bg-black/10 text-gray-300 rounded-lg text-xs font-medium border border-black/20">CSS</span>
                    </div>
                  </div>

                  {/* Course Stats */}
                  <div className="relative z-10 flex items-center justify-between mb-6 p-4 bg-gray-800/50 rounded-xl border border-gray-700/30">
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                      <span>5 Projects</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Certificate</span>
                    </div>
                  </div>

                  {/* Pricing */}
                  <div className="relative z-10 mb-6">
                    {course.requiresAccess ? (
                      <div className="text-center">
                        <div className="text-lg font-semibold text-blue-400 mb-2">Access Required</div>
                        <p className="text-sm text-gray-400 leading-relaxed">
                          Access is granted based on student's resume.<br/>
                          <span className="text-yellow-400 font-medium">Prerequisites:</span> HTML, CSS, and basic JavaScript
                        </p>
                      </div>
                    ) : course.originalPrice ? (
                      <div>
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-2xl font-bold text-white">₹{course.discountedPrice}</span>
                          <span className="text-lg text-gray-500 line-through">₹{course.originalPrice}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="inline-flex items-center px-3 py-1 bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-400 rounded-full text-sm font-semibold border border-green-500/30">
                            🎉 {course.discountPercent}% OFF
                          </span>
                          {course.hasPromoCode && (
                            <div className="text-xs text-gray-400">
                              With promo code
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-400">Contact for Pricing</div>
                      </div>
                    )}
                  </div>

                  {/* Action Button */}
                  <div className="relative z-10">
                    {course.enrolled ? (
                      <button 
                        className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3 rounded-xl font-bold text-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 shadow-lg shadow-green-500/25 hover:shadow-green-500/40"
                      >
                        <span className="flex items-center justify-center gap-2">
                          Continue Learning
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </span>
                      </button>
                    ) : course.requiresAccess ? (
                      <button 
                        onClick={() => alert('Please submit your resume for access evaluation. Our team will review your qualifications and contact you within 2-3 business days.')}
                        className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
                      >
                        <span className="flex items-center justify-center gap-2">
                          Request Access
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </span>
                      </button>
                    ) : course.seatsFull ? (
                      <button 
                        disabled
                        className="w-full bg-gray-600 text-gray-400 py-3 rounded-xl font-bold text-lg cursor-not-allowed"
                      >
                        <span className="flex items-center justify-center gap-2">
                          Seats Full
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                          </svg>
                        </span>
                      </button>
                    ) : (
                      <button 
                        onClick={() => handleEnrollment(course.title)}
                        className="w-full bg-gradient-to-r from-black to-gray-800 text-white py-3 rounded-xl font-bold text-lg hover:from-gray-900 hover:to-gray-700 transition-all duration-300 shadow-lg shadow-black/25 hover:shadow-black/40"
                      >
                        <span className="flex items-center justify-center gap-2">
                          Buy Now
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </span>
                      </button>
                    )}
                  </div>
                  </div>
                );

                return (
                  <div key={index}>
                    {CourseCard}
                  </div>
                );
              })}
            </div>
          </div>
        );
      case 'profile':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">My Profile</h2>
            <div className="bg-gray-800 rounded-2xl p-6">
              <div className="flex items-center space-x-6 mb-6">
                <div className="w-20 h-20 bg-gray-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">
                    {studentProfile?.name?.charAt(0) || 'S'}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{studentProfile?.name}</h3>
                  <p className="text-gray-400">{studentProfile?.email}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-700 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Enrolled Courses</h4>
                  <p className="text-2xl font-bold text-green-500">{courses.length}</p>
                </div>
                <div className="bg-gray-700 rounded-lg p-4">
                  <h4 className="text-white font-semibold mb-2">Completed Lessons</h4>
                  <p className="text-2xl font-bold text-black">
                    {courses.reduce((total, course) => total + course.completedLessons, 0)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">Settings</h2>
            <div className="bg-gray-800 rounded-2xl p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-700">
                  <span className="text-white">Email Notifications</span>
                  <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm">
                    Enabled
                  </button>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-700">
                  <span className="text-white">Dark Mode</span>
                  <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm">
                    On
                  </button>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-white">Language</span>
                  <button className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-lg text-sm">
                    English
                  </button>
                </div>
              </div>
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
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 flex">
      {/* Left Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 shadow-lg transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-700">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
              <AcademicCapIcon className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">vStudents.com</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md text-gray-300 hover:text-white"
          >
            <XMarkIcon className="w-5 h-5" />
          </button>
        </div>
        
        <nav className="mt-8 px-4">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors duration-200 mb-1 ${
                  activeTab === item.id
                    ? 'bg-green-600 text-white'
                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
        
        {/* AI Assistant Section */}
        <div className="absolute bottom-20 left-4 right-4">
          <div className="bg-green-600 rounded-lg p-4 text-white">
            <div className="text-sm font-medium mb-2">Need Help?</div>
            <div className="text-xs opacity-90 mb-3">
              Let our AI Assistant Help You Achieve Smarter, Faster Learning and Course Management.
            </div>
            <button className="bg-green-500 hover:bg-green-400 text-white text-xs px-3 py-1 rounded transition-colors">
              Try it!
            </button>
          </div>
        </div>
        
        {/* User Profile */}
        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center space-x-3 px-4 py-3 bg-gray-700 rounded-lg">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">
                {studentProfile?.name?.charAt(0) || 'S'}
              </span>
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-white">
                {studentProfile?.name || 'Student User'}
              </div>
            </div>
            <ChevronDownIcon className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        {/* Header */}
        <header className="bg-gray-800 shadow-sm border-b border-gray-700">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md text-gray-300 hover:text-white"
              >
                <Bars3Icon className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  Students / {studentProfile?.name || 'Student Profile'}
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <BellIcon className="w-6 h-6 text-gray-400 hover:text-white cursor-pointer" />
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-6 bg-gray-900 flex">
          {/* Main Content Area */}
          <div className="flex-1 mr-6">
            {activeTab === 'dashboard' ? (
              <>
                {/* Student Profile Header */}
                <div className="bg-gray-800 rounded-2xl p-6 mb-6">
                  <div className="flex items-start space-x-6">
                    <div className="w-20 h-20 bg-gray-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-2xl font-bold">
                        {studentProfile?.name?.charAt(0) || 'S'}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h2 className="text-2xl font-bold text-white">
                          {studentProfile?.name || 'Student Name'}
                        </h2>
                        <span className="bg-black text-white px-3 py-1 rounded-full text-sm">
                          {studentProfile?.enrolledCourses?.[0]?.status?.charAt(0).toUpperCase() + studentProfile?.enrolledCourses?.[0]?.status?.slice(1) || 'Active'}
                        </span>
                      </div>
                      <p className="text-gray-300 text-lg mb-2">
                        {courses.length > 0 ? `${courses[0].category} Development Student` : 'Web Development Student'}
                      </p>
                      <div className="flex items-center space-x-1 text-gray-400 mb-4">
                        <MapPinIcon className="w-4 h-4" />
                        <span>
                          {studentProfile?.address ? 
                            `${studentProfile.address.country}, ${studentProfile.address.state}, ${studentProfile.address.city}` : 
                            'Location not specified'
                          }
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm">
                          Online Learning
                        </span>
                        <span className="bg-black text-white px-3 py-1 rounded-full text-sm">
                          Part-time
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Current Status Card */}
                <div className="bg-green-600 rounded-2xl p-6 mb-6">
                  <div className="flex items-center space-x-3">
                    <CheckCircleIcon className="w-6 h-6 text-white" />
                    <p className="text-white text-lg">
                      I am currently enrolled in {courses.length} courses and actively learning new skills.
                    </p>
                  </div>
                </div>

                {/* Courses Section */}
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-white mb-4">My Enrolled Courses</h3>
                  {courses.map((course) => (
                    <div key={course.id} className="bg-gray-800 rounded-2xl p-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center">
                          <span className="text-white font-bold text-lg">
                            {course.title.charAt(0)}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-lg font-semibold text-white">{course.title}</h4>
                            <span className="text-gray-400 text-sm">
                              {course.completedLessons} of {course.totalLessons} lessons completed
                            </span>
                          </div>
                          <p className="text-gray-300 text-sm mb-2">
                            Instructor: {course.instructor} • Duration: {course.duration}
                          </p>
                          <div className="flex justify-between text-sm text-gray-400 mb-2">
                              <span>Progress</span>
                              <span>{course.progress}%</span>
                            </div>
                          <div className="w-full bg-gray-700 rounded-full h-2 mb-3">
                              <div 
                              className="bg-green-500 h-2 rounded-full transition-all duration-300" 
                                style={{width: `${course.progress}%`}}
                              ></div>
                          </div>
                          {course.nextLesson && (
                            <p className="text-gray-400 text-sm">
                              Next: {course.nextLesson}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              renderTabContent()
            )}
          </div>

          {/* Right Sidebar */}
          <div className="w-80 space-y-6">
            {/* Video Section */}
            <div className="bg-gray-800 rounded-2xl p-6">
              <h3 className="text-white font-semibold mb-4">Introduction Video</h3>
              {uploadedVideo ? (
                <div className="space-y-3">
                  <div className="relative bg-gray-700 rounded-lg h-48 flex items-center justify-center">
                    <video 
                      src={URL.createObjectURL(uploadedVideo)} 
                      controls 
                      className="w-full h-full rounded-lg"
                    />
                  </div>
                  <p className="text-sm text-green-400">✓ Video uploaded: {uploadedVideo.name}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="relative bg-gray-700 rounded-lg h-48 flex flex-col items-center justify-center border-2 border-dashed border-gray-600">
                    <PlayIcon className="w-12 h-12 text-gray-600 mb-2" />
                    <p className="text-gray-400 text-sm text-center">Upload your introduction video</p>
                  </div>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleVideoUpload}
                    className="hidden"
                    id="video-upload"
                  />
                  <label
                    htmlFor="video-upload"
                    className="w-full bg-black hover:bg-gray-800 text-white py-2 px-4 rounded-lg cursor-pointer text-center block transition-colors"
                  >
                    Choose Video File
                  </label>
                </div>
              )}
            </div>

            {/* Documents Section */}
            <div className="bg-gray-800 rounded-2xl p-6">
              <h3 className="text-white font-semibold mb-4">Documents</h3>
              <div className="space-y-4">
                {/* Resume Upload Section */}
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-4">
                  <p className="text-gray-300 text-sm mb-3">Upload your resume:</p>
                  {uploadedResume ? (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-700 rounded-lg">
                        <span className="text-gray-300 text-sm">📄 {uploadedResume.name}</span>
                        <span className="text-green-400 text-xs">✓ Uploaded</span>
                      </div>
                      <button
                        onClick={handleSubmitDocuments}
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors"
                      >
                        Submit Resume
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleResumeUpload}
                        className="hidden"
                        id="resume-upload"
                      />
                      <label
                        htmlFor="resume-upload"
                        className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg cursor-pointer text-center block transition-colors"
                      >
                        Choose Resume File
                      </label>
                    </div>
                  )}
                </div>
                
                {/* Course Materials */}
                <div className="space-y-3">
                  <p className="text-gray-400 text-sm">Course Materials:</p>
                  <div className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg">
                    <DocumentTextIcon className="w-6 h-6 text-red-500" />
                    <div>
                      <p className="text-white text-sm font-medium">Student CV</p>
                      <p className="text-gray-400 text-xs">PDF File</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg">
                    <DocumentTextIcon className="w-6 h-6 text-black" />
                    <div>
                      <p className="text-white text-sm font-medium">Course Requirements</p>
                      <p className="text-gray-400 text-xs">DOCX File</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Upcoming Classes */}
            <div className="bg-gray-800 rounded-2xl p-6">
              <h3 className="text-white font-semibold mb-4">Upcoming Classes</h3>
              <div className="space-y-3">
                <div className="p-3 bg-gray-700 rounded-lg">
                  <div className="text-green-400 font-medium text-sm">Tuesday 22</div>
                  <div className="text-white text-sm">11:00 AM - 12:00 PM</div>
                  <div className="text-gray-400 text-sm">Initial Assessment</div>
                </div>
                <div className="p-3 bg-gray-700 rounded-lg">
                  <div className="text-green-400 font-medium text-sm">Thursday 31</div>
                  <div className="text-white text-sm">11:00 AM - 12:00 PM</div>
                  <div className="text-gray-400 text-sm">Skills Evaluation</div>
                </div>
              </div>
            </div>

            {/* History Section */}
            <div className="bg-gray-800 rounded-2xl p-6">
              <h3 className="text-white font-semibold mb-4">History</h3>
              <div className="text-sm text-gray-400">
                <p>Last 3 updates</p>
                <p className="mt-2">Status has changed: Active 17 Feb, 2024</p>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Enrollment Modal */}
      {showEnrollModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-2xl p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-white mb-4">Confirm Enrollment</h3>
            <p className="text-gray-300 mb-6">
              Are you sure you want to enroll in <span className="font-semibold text-white">{selectedCourse}</span>?
            </p>
            <div className="flex space-x-4">
              <button
                onClick={confirmEnrollment}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Confirm & Pay
              </button>
              <button
                onClick={() => setShowEnrollModal(false)}
                className="flex-1 bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentPortal;