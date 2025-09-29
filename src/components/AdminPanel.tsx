import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentDetailModal from './StudentDetailModal';
import { PaymentStatusBadge, PaymentStatusType } from './PaymentStatus';

interface Project {
  id: string;
  businessName: string;
  customerName: string;
  email: string;
  phone: string;
  projectType: string;
  budget: string;
  description: string;
  status: string;
  startingDate: string;
  deliveryDate: string;
  createdAt: string;
}

interface Student {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  studentId: string;
  enrolledCourses: Array<{
    courseId: {
      _id: string;
      title: string;
      courseId: string;
      price: number;
    };
    enrollmentDate: string;
    progress: number;
    status: string;
    assignments?: {
      completed: number;
      total: number;
      list?: Array<{
        title: string;
        status: string;
        score?: number;
      }>;
    };
    tests?: {
      completed: number;
      total: number;
      list?: Array<{
        title: string;
        score?: number;
      }>;
    };
    projects?: Array<{
      title: string;
      submittedAt: string;
      status?: string;
      score?: number;
    }>;
  }>;
  paymentHistory: Array<{
    courseId: {
      _id: string;
      title: string;
    };
    amount: number;
    paymentMethod: string;
    transactionId: string;
    paymentDate: string;
    status: string;
    confirmationStatus?: string;
  }>;
  createdAt: string;
  referralCode?: string;
}

interface Payment {
  _id: string;
  paymentId: string;
  studentId: {
    _id: string;
    name: string;
    email: string;
  };
  courseId: {
    _id: string;
    title: string;
    price: number;
  };
  amount: number;
  status: string;
  confirmationStatus: string;
  transactionId: string;
  paymentMethod: string;
  adminConfirmedBy?: string;
  adminConfirmedAt?: string;
  createdAt: string;
}

interface ReferredStudent {
  _id: string;
  name: string;
  email: string;
  phone: string;
  selectedCourse: string;
  amountPaid: number;
  paymentStatus: string;
  referralCode: string;
  createdAt: string;
}

interface Faculty {
  _id: string;
  name: string;
  email: string;
  referralCode: string;
  commissionRate: number;
  isActive: boolean;
  totalCommissionsEarned?: number;
  createdAt: string;
}

const AdminPanel: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'projects' | 'courses' | 'payments' | 'referral' | 'faculty'>('projects');
  const [projects, setProjects] = useState<Project[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [showAddProject, setShowAddProject] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [statusNotes, setStatusNotes] = useState('');
  const [newProject, setNewProject] = useState({
    businessName: '',
    customerName: '',
    email: '',
    phone: '',
    projectType: '',
    budget: '',
    description: '',
    startingDate: '',
    deliveryDate: ''
  });

  // Faculty Management States
  const [facultyList, setFacultyList] = useState<Faculty[]>([]);
  const [showAddFaculty, setShowAddFaculty] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState<Faculty | null>(null);
  const [referredStudents, setReferredStudents] = useState<Student[]>([]);
  const [newFaculty, setNewFaculty] = useState({
    name: '',
    email: '',
    referralCode: ''
  });

  // Student Detail Modal States
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showStudentModal, setShowStudentModal] = useState(false);

  // Delete Student States
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<Student | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Payment Status Update States
  const [pendingPaymentChanges, setPendingPaymentChanges] = useState<{[key: string]: {studentId: string, paymentIndex: number, newStatus: string, paymentId?: string}}>({});
  const [savingPayments, setSavingPayments] = useState<{[key: string]: boolean}>({});

  // Collapsible Sections States
  const [expandedStudents, setExpandedStudents] = useState<{[key: string]: {courses: boolean, payments: boolean}}>({});

  // Toggle functions for collapsible sections
  const toggleStudentSection = (studentId: string, section: 'courses' | 'payments') => {
    setExpandedStudents(prev => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [section]: !prev[studentId]?.[section]
      }
    }));
  };

  // Helper function to get payments for a specific student
  const getStudentPayments = (studentId: string): Payment[] => {
    return payments.filter(payment => payment.studentId._id === studentId);
  };

  const projectPhases = [
    'Planning & Analysis',
    'Design & Wireframing',
    'Development - Frontend',
    'Development - Backend',
    'Testing & QA',
    'Deployment',
    'Completed'
  ];

  useEffect(() => {
    fetchProjects();
    fetchStudents();
    fetchPayments();
    fetchFaculty();
  }, []);

  const refreshAllData = async () => {
    console.log('🔄 Refreshing all data...');
    await Promise.all([
      fetchProjects(),
      fetchStudents(),
      fetchPayments(),
      fetchFaculty()
    ]);
    console.log('✅ All data refreshed');
  };

  const fetchProjects = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/projects');
      if (response.ok) {
        const result = await response.json();
        const data = result.data || result;
        setProjects(Array.isArray(data) ? data : []);
      } else {
        console.error('Failed to fetch projects:', response.status);
        setProjects([]);
      }
    } catch (error) {
      console.error('Error fetching projects:', error);
      setProjects([]);
    }
  };

  const fetchStudents = async () => {
    try {
      console.log('🔍 Fetching students...');
      const response = await fetch('http://localhost:5000/api/students');
      if (response.ok) {
        const result = await response.json();
        const data = result.data || result;
        console.log('📊 Students API response:', result);
        console.log('📊 Students data:', data);
        
        // Check if course prices are populated
        if (Array.isArray(data) && data.length > 0) {
          const firstStudent = data[0];
          console.log('📊 First student sample:', firstStudent);
          if (firstStudent.enrolledCourses && firstStudent.enrolledCourses.length > 0) {
            console.log('📊 First enrolled course:', firstStudent.enrolledCourses[0]);
            console.log('📊 Course price:', firstStudent.enrolledCourses[0].courseId?.price);
          }
        }
        
        setStudents(Array.isArray(data) ? data : []);
      } else {
        console.error('Failed to fetch students:', response.status);
        setStudents([]);
      }
    } catch (error) {
      console.error('Error fetching students:', error);
      setStudents([]);
    }
  };

  const fetchPayments = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/payments');
      if (response.ok) {
        const data = await response.json();
        console.log('Payments API response:', data); // Debug log
        setPayments(data.data?.payments || []);
      }
    } catch (error) {
      console.error('Error fetching payments:', error);
    }
  };

  const handleAddProject = async () => {
    try {
      const projectData = {
        ...newProject,
        id: `PRJ-${Date.now()}`,
        status: 'Planning & Analysis',
        createdAt: new Date().toISOString()
      };

      const response = await fetch('http://localhost:5000/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(projectData),
      });

      if (response.ok) {
        fetchProjects();
        setNewProject({
          businessName: '',
          customerName: '',
          email: '',
          phone: '',
          projectType: '',
          budget: '',
          description: '',
          startingDate: '',
          deliveryDate: ''
        });
        setShowAddProject(false);
      }
    } catch (error) {
      console.error('Error adding project:', error);
    }
  };

  const updateProjectStatus = async (projectId: string, newStatus: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/projects/${projectId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus, notes: statusNotes }),
      });

      if (response.ok) {
        fetchProjects();
        setStatusNotes('');
      }
    } catch (error) {
      console.error('Error updating project status:', error);
    }
  };

  const getStatusColor = (status: string) => {
    const colors: { [key: string]: string } = {
      'Planning & Analysis': 'bg-blue-500',
      'Design & Wireframing': 'bg-purple-500',
      'Development - Frontend': 'bg-yellow-500',
      'Development - Backend': 'bg-orange-500',
      'Testing & QA': 'bg-red-500',
      'Deployment': 'bg-indigo-500',
      'Completed': 'bg-green-500'
    };
    return colors[status] || 'bg-gray-500';
  };

  // Faculty Management Functions
  const fetchFaculty = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/faculty/all');
      const data = await response.json();
      
      if (data.success) {
        setFacultyList(data.data);
      } else {
        console.error('Failed to fetch faculty:', data.message);
      }
    } catch (error) {
      console.error('Error fetching faculty:', error);
    }
  };

  const generateReferralCode = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setNewFaculty({...newFaculty, referralCode: result});
  };

  const handleAddFaculty = async () => {
    if (!newFaculty.name || !newFaculty.email || !newFaculty.referralCode) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/faculty/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newFaculty.name,
          email: newFaculty.email,
          referralCode: newFaculty.referralCode,
          commissionRate: 0.60 // Set to 60% as per your requirement
        }),
      });

      const data = await response.json();

      if (data.success) {
        alert('Faculty member created successfully!');
        setNewFaculty({
           name: '',
           email: '',
           referralCode: ''
         });
        setShowAddFaculty(false);
        fetchFaculty(); // Refresh the faculty list
      } else {
        alert(data.message || 'Failed to create faculty member');
      }
    } catch (error) {
      console.error('Error creating faculty:', error);
      alert('Error creating faculty member');
    }
  };

  const handleDeleteFaculty = (facultyId: string) => {
    if (confirm('Are you sure you want to delete this faculty member?')) {
      // Note: Backend doesn't have delete endpoint, so we'll just mark as inactive
      // For now, we'll just remove from local state
      setFacultyList(facultyList.filter(faculty => faculty._id !== facultyId));
      if (selectedFaculty && selectedFaculty._id === facultyId) {
        setSelectedFaculty(null);
      }
    }
  };

  const fetchReferredStudents = async (referralCode: string) => {
    try {
      // Fetch students who used this referral code from the backend
      const response = await fetch(`http://localhost:5000/api/students/by-referral/${referralCode}`);
      if (response.ok) {
        const result = await response.json();
        if (result.success) {
          setReferredStudents(result.data);
        } else {
          console.error('Failed to fetch referred students:', result.message);
          setReferredStudents([]);
        }
      } else {
        console.error('Failed to fetch referred students:', response.statusText);
        setReferredStudents([]);
      }
    } catch (error) {
      console.error('Error fetching referred students:', error);
      setReferredStudents([]);
    }
  };

  // Student Detail Modal Handlers
  const handleStudentClick = (student: Student) => {
    setSelectedStudent(student);
    setShowStudentModal(true);
  };

  const handleCloseStudentModal = () => {
    setShowStudentModal(false);
    setSelectedStudent(null);
  };

  // Delete Student Handlers
  const handleDeleteStudent = (student: Student) => {
    setStudentToDelete(student);
    setShowDeleteConfirm(true);
  };

  const handleConfirmDelete = async () => {
    if (!studentToDelete) return;

    setIsDeleting(true);
    try {
      const response = await fetch(`http://localhost:5000/api/students/${studentToDelete._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Remove student from local state
        setStudents(prevStudents => 
          prevStudents.filter(student => student._id !== studentToDelete._id)
        );
        
        // Close confirmation dialog
        setShowDeleteConfirm(false);
        setStudentToDelete(null);
        
        // Show success message (you can add a toast notification here)
        console.log('Student deleted successfully');
      } else {
        const errorData = await response.json();
        console.error('Failed to delete student:', errorData.message);
        alert('Failed to delete student: ' + errorData.message);
      }
    } catch (error) {
      console.error('Error deleting student:', error);
      alert('Error deleting student. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirm(false);
    setStudentToDelete(null);
  };

  const handlePaymentStatusUpdate = (studentId: string, paymentId: string, newStatus: string, courseId?: string) => {
    // Check if this is an existing payment or a new one
    const existingPayment = payments.find(p => p.paymentId === paymentId);
    
    if (existingPayment) {
      // Update existing payment in local state immediately for better UX
      setPayments(prevPayments => 
        prevPayments.map(payment => {
          if (payment.paymentId === paymentId) {
            return {
              ...payment,
              confirmationStatus: newStatus
            };
          }
          return payment;
        })
      );
    }

    // Track the pending change
    const changeKey = `${studentId}-${paymentId}`;
    
    console.log('handlePaymentStatusUpdate - studentId:', studentId);
    console.log('handlePaymentStatusUpdate - paymentId:', paymentId);
    console.log('handlePaymentStatusUpdate - newStatus:', newStatus);
    console.log('handlePaymentStatusUpdate - courseId:', courseId);
    console.log('handlePaymentStatusUpdate - isNewPayment:', !existingPayment);

    setPendingPaymentChanges(prev => ({
       ...prev,
       [changeKey]: {
         studentId,
         paymentId,
         newStatus,
         courseId,
         isNewPayment: !existingPayment
       }
     }));
  };

  const refreshStudentData = async () => {
    console.log('Refreshing student data...');
    await fetchStudents();
    await fetchPayments();
    console.log('Student data refreshed');
  };

  const savePaymentStatusChange = async (changeKey: string) => {
    const change = pendingPaymentChanges[changeKey];
    console.log('Save attempt - changeKey:', changeKey);
    console.log('Save attempt - change:', change);
    
    if (!change) {
      console.log('No change found for key:', changeKey);
      return;
    }
    
    if (!change.paymentId) {
      console.log('No paymentId found in change:', change);
      alert('Error: Payment ID not found. Please refresh the page and try again.');
      return;
    }

    setSavingPayments(prev => ({ ...prev, [changeKey]: true }));

    try {
      let response;
      let responseData;

      if (change.isNewPayment) {
        // Create a new payment record first
        const student = students.find(s => s._id === change.studentId);
        const course = student?.enrolledCourses.find(e => e.courseId._id === change.courseId)?.courseId;
        
        if (!student || !course) {
          alert('Error: Student or course information not found.');
          setSavingPayments(prev => ({ ...prev, [changeKey]: false }));
          return;
        }

        // Generate a proper transaction ID for the new payment
        const actualTransactionId = `ADMIN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        
        // Get course price with fallback
        const coursePrice = course.price || 0;
        if (coursePrice === 0) {
          console.warn('Course price is 0 or undefined:', course);
        }
        
        const paymentData = {
          transactionId: actualTransactionId,
          studentId: change.studentId,
          courseId: change.courseId,
          courseName: course.title || 'Unknown Course',
          amount: coursePrice,
          originalAmount: coursePrice,
          studentName: `${student.firstName} ${student.lastName}`,
          studentEmail: student.email,
          paymentMethod: 'admin_manual',
          metadata: { createdByAdmin: true, adminEmail: 'admin@jasnav.com' }
        };

        console.log('=== PAYMENT DATA DEBUG ===');
        console.log('Student:', student);
        console.log('Course:', course);
        console.log('Payment Data being sent:', paymentData);
        console.log('Required fields check:');
        console.log('- transactionId:', paymentData.transactionId);
        console.log('- studentId:', paymentData.studentId);
        console.log('- courseId:', paymentData.courseId);
        console.log('- courseName:', paymentData.courseName);
        console.log('- amount:', paymentData.amount);
        console.log('- studentName:', paymentData.studentName);
        console.log('- studentEmail:', paymentData.studentEmail);
        console.log('- paymentMethod:', paymentData.paymentMethod);
        console.log('========================');

        console.log('Creating new payment with data:', paymentData);
        
        response = await fetch('http://localhost:5000/api/payments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(paymentData)
        });

        responseData = await response.json();
        console.log('Create payment response:', responseData);

        if (response.ok && responseData.data) {
          // Now update the confirmation status
          const confirmResponse = await fetch(`http://localhost:5000/api/payments/${responseData.data.paymentId}/confirm`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              confirmationStatus: change.newStatus,
              adminEmail: 'admin@jasnav.com'
            })
          });

          const confirmData = await confirmResponse.json();
          console.log('Confirm payment response:', confirmData);

          if (confirmResponse.ok) {
            response = confirmResponse;
            responseData = confirmData;
          }
        }
      } else {
        // Update existing payment
        console.log('Making API call to:', `http://localhost:5000/api/payments/${change.paymentId}/confirm`);
        console.log('Request body:', {
          confirmationStatus: change.newStatus,
          adminEmail: 'admin@jasnav.com'
        });
        
        response = await fetch(`http://localhost:5000/api/payments/${change.paymentId}/confirm`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            confirmationStatus: change.newStatus,
            adminEmail: 'admin@jasnav.com'
          })
        });

        responseData = await response.json();
      }

      console.log('Response status:', response.status);
      console.log('Response data:', responseData);

      if (response.ok) {
        // Remove from pending changes
        setPendingPaymentChanges(prev => {
          const newChanges = { ...prev };
          delete newChanges[changeKey];
          return newChanges;
        });
        
        // Refresh the payments list
        fetchPayments();
        fetchStudents();
        
        alert(`Payment status ${change.isNewPayment ? 'created and ' : ''}updated to "${change.newStatus}" successfully!`);
      } else {
        console.error('API Error Response:', response.status, responseData);
        alert(`Failed to ${change.isNewPayment ? 'create and ' : ''}save payment status change: ${responseData?.message || 'Unknown error'}`);
        // Refresh data to revert any local changes
        fetchPayments();
      }
    } catch (error) {
      console.error('Error saving payment status:', error);
      alert('Error saving payment status change');
    } finally {
      setSavingPayments(prev => ({ ...prev, [changeKey]: false }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex">
      {/* Side Navigation */}
      <div className="w-64 bg-black/50 backdrop-blur-lg border-r border-white/20 flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
              <p className="text-white/70 text-sm mt-1">Management Portal</p>
            </div>
            <button
              onClick={refreshAllData}
              className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
              title="Refresh Data"
            >
              <span className="text-xl">🔄</span>
            </button>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => setActiveTab('projects')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
              activeTab === 'projects'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <span className="text-xl">📊</span>
            <span>Projects</span>
          </button>
          
          <button
            onClick={() => setActiveTab('courses')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
              activeTab === 'courses'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <span className="text-xl">🎓</span>
            <span>Student Courses</span>
          </button>
          
          <button
            onClick={() => setActiveTab('payments')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
              activeTab === 'payments'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <span className="text-xl">💳</span>
            <span>Payments</span>
          </button>
          
          <button
            onClick={() => setActiveTab('referral')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${
              activeTab === 'referral'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            <span className="text-xl">🤝</span>
            <span>Faculty & Referral</span>
          </button>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-white/20">
          <button
            onClick={() => navigate('/')}
            className="w-full px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-200 text-sm"
          >
            Back to Home
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <div className="bg-black/30 backdrop-blur-lg border-b border-white/20 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">
                {activeTab === 'projects' && '📊 Projects Management'}
                {activeTab === 'courses' && '🎓 Student Courses'}
                {activeTab === 'payments' && '💳 Payment Records'}
                {activeTab === 'referral' && '🤝 Faculty & Referral System'}
              </h2>
              <p className="text-white/70 mt-1">
                {activeTab === 'projects' && 'Manage and track all client projects'}
                {activeTab === 'courses' && 'Monitor student progress and assignments'}
                {activeTab === 'payments' && 'View payment history and transactions'}
                {activeTab === 'referral' && 'Track referral codes and commission earnings'}
              </p>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-6 overflow-auto">
        {activeTab === 'projects' && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Add New Project Section */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Add New Project</h2>
                <button
                  onClick={() => setShowAddProject(!showAddProject)}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg font-medium transition-colors duration-200"
                >
                  {showAddProject ? 'Cancel' : 'Add Project'}
                </button>
              </div>

              {showAddProject && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        Business Name
                      </label>
                      <input
                        type="text"
                        value={newProject.businessName}
                        onChange={(e) => setNewProject({...newProject, businessName: e.target.value})}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter business name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        Customer Name
                      </label>
                      <input
                        type="text"
                        value={newProject.customerName}
                        onChange={(e) => setNewProject({...newProject, customerName: e.target.value})}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter customer name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={newProject.email}
                        onChange={(e) => setNewProject({...newProject, email: e.target.value})}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter email"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        value={newProject.phone}
                        onChange={(e) => setNewProject({...newProject, phone: e.target.value})}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter phone number"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        Project Type
                      </label>
                      <select
                        value={newProject.projectType}
                        onChange={(e) => setNewProject({...newProject, projectType: e.target.value})}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select project type</option>
                        <option value="Website Development">Website Development</option>
                        <option value="Mobile App">Mobile App</option>
                        <option value="E-commerce">E-commerce</option>
                        <option value="Custom Software">Custom Software</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        Budget
                      </label>
                      <input
                        type="text"
                        value={newProject.budget}
                        onChange={(e) => setNewProject({...newProject, budget: e.target.value})}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter budget"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        Starting Date
                      </label>
                      <input
                        type="date"
                        value={newProject.startingDate}
                        onChange={(e) => setNewProject({...newProject, startingDate: e.target.value})}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        Delivery Date
                      </label>
                      <input
                        type="date"
                        value={newProject.deliveryDate}
                        onChange={(e) => setNewProject({...newProject, deliveryDate: e.target.value})}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-white/80 mb-2">
                      Description
                    </label>
                    <textarea
                      value={newProject.description}
                      onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter project description"
                      rows={3}
                    />
                  </div>

                  <button
                    onClick={handleAddProject}
                    className="w-full py-3 bg-green-500 hover:bg-green-600 rounded-lg font-medium transition-colors duration-200"
                  >
                    Create Project
                  </button>
                </div>
              )}
            </div>

            {/* Project Status Update Section */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-6">Update Project Status</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-white/80 mb-2">
                    Select Project
                  </label>
                  <select
                    value={selectedProject?.id || ''}
                    onChange={(e) => {
                      const project = projects.find(p => p.id === e.target.value);
                      setSelectedProject(project || null);
                    }}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Choose a project...</option>
                    {projects.map(project => (
                      <option key={project.id} value={project.id}>
                        {project.id} - {project.businessName}
                      </option>
                    ))}
                  </select>
                </div>

                {selectedProject && (
                  <>
                    <div className="bg-white/5 rounded-lg p-4">
                      <h3 className="font-medium text-white mb-2">Project Details:</h3>
                      <p className="text-sm text-white/70">Business: {selectedProject.businessName}</p>
                      <p className="text-sm text-white/70">Customer: {selectedProject.customerName}</p>
                      <p className="text-sm text-white/70">Current Status: {selectedProject.status}</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        New Status
                      </label>
                      <select
                        onChange={(e) => {
                          if (e.target.value) {
                            updateProjectStatus(selectedProject.id, e.target.value);
                          }
                        }}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="">Select new status...</option>
                        {projectPhases.map(phase => (
                          <option key={phase} value={phase}>
                            {phase}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">
                        Status Notes (Optional)
                      </label>
                      <textarea
                        value={statusNotes}
                        onChange={(e) => setStatusNotes(e.target.value)}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Add notes about this status update..."
                        rows={3}
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
            </div>

            {/* Project ID Information */}
            <div className="mt-8 bg-blue-500/10 backdrop-blur-lg rounded-2xl p-6 border border-blue-500/20">
            <div className="flex items-center space-x-3 mb-4">
              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-bold text-blue-400">Project ID - Customer Access Key</h3>
            </div>
            <p className="text-white/80 mb-3">
              The Project ID is the <strong>primary key</strong> that customers use to track their project status. 
              You can create your own custom Project ID format (e.g., PRJ-001, WEB-2024-001, or any format you prefer).
            </p>
            <p className="text-white/60 text-sm">
              💡 <strong>Tip:</strong> Share this Project ID with your customers so they can track their project progress 
              on your website's project tracking page.
            </p>
          </div>



            {/* Projects List */}
          <div className="mt-8 bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-6">All Projects ({projects.length})</h2>
            
            {projects.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📋</div>
                <p className="text-white/60 text-lg">No projects yet</p>
                <p className="text-white/40 text-sm">Add your first project to get started</p>
              </div>
            ) : (
              <div className="space-y-4">
                {projects.map(project => (
                  <div key={project.id} className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-white text-lg">{project.businessName}</h3>
                        <p className="text-white/60 text-sm">ID: {project.id}</p>
                      </div>
                      <div className="text-right">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${getStatusColor(project.status)}`}>
                          {project.status}
                        </span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-white/60">Customer:</span>
                        <p className="text-white font-medium">{project.customerName}</p>
                      </div>
                      <div>
                        <span className="text-white/60">Type:</span>
                        <p className="text-white font-medium">{project.projectType}</p>
                      </div>
                      <div>
                        <span className="text-white/60">Budget:</span>
                        <p className="text-white font-medium">{project.budget}</p>
                      </div>
                      <div>
                        <span className="text-white/60">Start Date:</span>
                        <p className="text-white font-medium">{new Date(project.startingDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <span className="text-white/60">Delivery:</span>
                        <p className="text-white font-medium">{new Date(project.deliveryDate).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <span className="text-white/60">Contact:</span>
                        <p className="text-white font-medium">{project.email}</p>
                      </div>
                    </div>
                    
                    {project.description && (
                      <div className="mt-3 pt-3 border-t border-white/10">
                        <span className="text-white/60 text-sm">Description:</span>
                        <p className="text-white/80 text-sm mt-1">{project.description}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
          </>
        )}

        {/* Student Courses Tab */}
        {activeTab === 'courses' && (
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Student Enrollments ({students.length})</h2>
              <button
                onClick={() => {
                  fetchStudents();
                  fetchPayments();
                }}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200"
                title="Refresh student and payment data"
              >
                <span>🔄</span>
                <span>Refresh</span>
              </button>
            </div>
            
            {students.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🎓</div>
                <p className="text-white/60 text-lg">No student enrollments yet</p>
                <p className="text-white/40 text-sm">Students will appear here after course purchases</p>
              </div>
            ) : (
              <div className="space-y-6">
                {students.map(student => (
                  <div key={student._id} className="bg-white/5 rounded-lg p-6 border border-white/10">
                    {/* Student Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold text-lg">
                            {student.firstName ? student.firstName.charAt(0).toUpperCase() : 'S'}
                          </span>
                        </div>
                        <div>
                          <div 
                            className="text-white font-medium cursor-pointer hover:text-blue-400 transition-colors duration-200"
                            onClick={() => handleStudentClick(student)}
                          >
                            {student.firstName} {student.lastName}
                          </div>
                          <div className="text-white/60 text-sm">{student.email}</div>
                          <div className="text-white/40 text-xs mt-1">
                            Student ID: {student.studentId}
                            {student.referralCode && (
                              <span className="ml-2 px-2 py-1 bg-orange-500/20 text-orange-300 rounded-full text-xs">
                                Referral: {student.referralCode}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="text-white/60 text-sm">Joined</div>
                          <div className="text-white text-sm">
                            {new Date(student.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                        <button
                          onClick={() => handleDeleteStudent(student)}
                          className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors duration-200 flex items-center space-x-2"
                          title="Delete Student"
                        >
                          <span>🗑️</span>
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>

                    {/* Enrolled Courses */}
                    {student.enrolledCourses && student.enrolledCourses.length > 0 && (
                      <div className="mb-4">
                        <div 
                          className="flex items-center justify-between cursor-pointer hover:bg-white/5 rounded-lg p-2 -m-2 transition-colors duration-200"
                          onClick={() => toggleStudentSection(student._id, 'courses')}
                        >
                          <h4 className="text-white font-medium">Enrolled Courses ({student.enrolledCourses.length})</h4>
                          <span className="text-white/60 text-lg">
                            {expandedStudents[student._id]?.courses ? '▼' : '▶'}
                          </span>
                        </div>
                        {expandedStudents[student._id]?.courses && (
                          <div className="space-y-3 mt-3">
                          {student.enrolledCourses.map((enrollment, index) => (
                            <div key={index} className="bg-black/30 rounded-lg p-4 border border-white/10">
                              <div className="flex items-center justify-between mb-3">
                                <div>
                                  <div className="text-white font-medium">
                                    {enrollment.courseId?.title || 'Course Title N/A'}
                                  </div>
                                  <div className="text-white/60 text-sm">
                                    Enrolled: {new Date(enrollment.enrollmentDate).toLocaleDateString()}
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="text-white/60 text-sm">Progress</div>
                                  <div className="text-green-400 font-semibold">
                                    {enrollment.progress || 0}%
                                  </div>
                                  <span className={`px-2 py-1 rounded-full text-xs ${
                                    enrollment.status === 'active' ? 'bg-green-500/20 text-green-300' :
                                    enrollment.status === 'completed' ? 'bg-blue-500/20 text-blue-300' :
                                    enrollment.status === 'paused' ? 'bg-yellow-500/20 text-yellow-300' :
                                    'bg-gray-500/20 text-gray-300'
                                  }`}>
                                    {enrollment.status || 'active'}
                                  </span>
                                </div>
                              </div>

                              {/* Assignments Section */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
                                <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg p-3 border border-blue-500/30">
                                  <h5 className="text-white font-medium mb-2 flex items-center">
                                    📝 Assignments
                                    <span className="ml-2 px-2 py-1 bg-blue-600 text-white text-xs rounded-full">
                                      {enrollment.assignments?.completed || 0}/{enrollment.assignments?.total || 0}
                                    </span>
                                  </h5>
                                  <div className="space-y-2">
                                    {enrollment.assignments?.list?.map((assignment, idx) => (
                                      <div key={idx} className="flex items-center justify-between text-sm">
                                        <span className="text-white/80">{assignment.title}</span>
                                        <div className="flex items-center gap-2">
                                          <span className={`px-2 py-1 rounded-full text-xs ${
                                            assignment.status === 'completed' ? 'bg-green-600 text-white' :
                                            assignment.status === 'submitted' ? 'bg-yellow-600 text-white' :
                                            'bg-gray-600 text-white'
                                          }`}>
                                            {assignment.status || 'pending'}
                                          </span>
                                          {assignment.score && (
                                            <span className="text-green-400 font-medium">
                                              {assignment.score}%
                                            </span>
                                          )}
                                        </div>
                                      </div>
                                    )) || (
                                      <p className="text-white/60 text-sm">No assignments available</p>
                                    )}
                                  </div>
                                </div>

                                <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg p-3 border border-purple-500/30">
                                  <h5 className="text-white font-medium mb-2 flex items-center">
                                    🧪 Test Results
                                    <span className="ml-2 px-2 py-1 bg-purple-600 text-white text-xs rounded-full">
                                      {enrollment.tests?.completed || 0}/{enrollment.tests?.total || 0}
                                    </span>
                                  </h5>
                                  <div className="space-y-2">
                                    {enrollment.tests?.list?.map((test, idx) => (
                                      <div key={idx} className="flex items-center justify-between text-sm">
                                        <span className="text-white/80">{test.title}</span>
                                        <div className="flex items-center gap-2">
                                          <span className={`px-2 py-1 rounded-full text-xs ${
                                            test.score >= 80 ? 'bg-green-600 text-white' :
                                            test.score >= 60 ? 'bg-yellow-600 text-white' :
                                            test.score ? 'bg-red-600 text-white' :
                                            'bg-gray-600 text-white'
                                          }`}>
                                            {test.score ? `${test.score}%` : 'pending'}
                                          </span>
                                        </div>
                                      </div>
                                    )) || (
                                      <p className="text-white/60 text-sm">No tests available</p>
                                    )}
                                  </div>
                                </div>
                              </div>

                              {/* Project Submissions */}
                              {enrollment.projects && enrollment.projects.length > 0 && (
                                <div className="mt-3 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg p-3 border border-green-500/30">
                                  <h5 className="text-white font-medium mb-2 flex items-center">
                                    🚀 Project Submissions
                                    <span className="ml-2 px-2 py-1 bg-green-600 text-white text-xs rounded-full">
                                      {enrollment.projects.length}
                                    </span>
                                  </h5>
                                  <div className="space-y-2">
                                    {enrollment.projects.map((project, idx) => (
                                      <div key={idx} className="bg-black/30 rounded-lg p-2 border border-white/10">
                                        <div className="flex items-center justify-between">
                                          <div>
                                            <span className="text-white/80 text-sm font-medium">{project.title}</span>
                                            <div className="text-white/60 text-xs mt-1">
                                              Submitted: {new Date(project.submittedAt).toLocaleDateString()}
                                            </div>
                                          </div>
                                          <div className="flex items-center gap-2">
                                            {project.gitUrl && (
                                              <a
                                                href={project.gitUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="px-2 py-1 bg-gray-700 hover:bg-gray-600 text-white text-xs rounded-lg transition-colors duration-200"
                                              >
                                                🔗 GitHub
                                              </a>
                                            )}
                                            <span className={`px-2 py-1 rounded-full text-xs ${
                                              project.status === 'approved' ? 'bg-green-600 text-white' :
                                              project.status === 'reviewed' ? 'bg-blue-600 text-white' :
                                              project.status === 'rejected' ? 'bg-red-600 text-white' :
                                              'bg-yellow-600 text-white'
                                            }`}>
                                              {project.status || 'pending'}
                                            </span>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}

                              {/* Payment Status Management */}
                              <div className="mt-4 space-y-3">
                                {(() => {
                                  // Check if there's a confirmed payment for this course using Payment model data
                                  const studentPayments = getStudentPayments(student._id);
                                  const coursePayment = studentPayments.find(payment => 
                                    payment.courseId._id === enrollment.courseId._id
                                  );
                                  const hasConfirmedPayment = coursePayment?.confirmationStatus === 'confirmed';
                                  
                                  return (
                                    <>
                                      {/* Payment Status Badge */}
                                      <div className="flex justify-center">
                                        <span className={`px-4 py-2 rounded-lg text-sm font-medium ${
                                          hasConfirmedPayment
                                            ? 'bg-green-500/20 text-green-300 border border-green-500/30'
                                            : 'bg-gray-600/20 text-gray-400 border border-gray-600/30'
                                        }`}>
                                          {hasConfirmedPayment ? '✅ Payment Confirmed' : '🔒 Payment Pending'}
                                        </span>
                                      </div>
                                      
                                      {/* Payment Status Dropdown */}
                                      <div className="flex justify-center items-center space-x-2">
                                        <label className="text-white/60 text-sm">Payment Status:</label>
                                        <select
                                           value={(() => {
                                             const paymentId = coursePayment?.paymentId || `new_payment_${student._id}_${enrollment.courseId._id}`;
                                             const changeKey = `${student._id}-${paymentId}`;
                                             const pendingChange = pendingPaymentChanges[changeKey];
                                             return pendingChange?.newStatus || coursePayment?.confirmationStatus || 'pending';
                                           })()}
                                           onChange={(e) => {
                                             let paymentId;
                                             if (coursePayment) {
                                               paymentId = coursePayment.paymentId;
                                             } else {
                                               // Use a consistent paymentId for new payments based on student and course
                                               paymentId = `new_payment_${student._id}_${enrollment.courseId._id}`;
                                             }
                                             handlePaymentStatusUpdate(student._id, paymentId, e.target.value, enrollment.courseId._id);
                                           }}
                                          className="bg-black/50 border border-white/20 rounded px-3 py-1 text-sm text-white focus:outline-none focus:border-blue-500"
                                        >
                                          <option value="pending">Pending</option>
                                          <option value="error">Error</option>
                                          <option value="confirmed">Confirmed</option>
                                        </select>
                                        {(() => {
                                          // Find the pending change for this student and payment
                                          const paymentId = coursePayment?.paymentId || `new_payment_${student._id}_${enrollment.courseId._id}`;
                                          const changeKey = `${student._id}-${paymentId}`;
                                          const hasPendingChange = pendingPaymentChanges[changeKey];
                                          const isSaving = savingPayments[changeKey];
                                          
                                          if (!hasPendingChange) return null;
                                          
                                          return (
                                            <button
                                              onClick={() => savePaymentStatusChange(changeKey)}
                                              disabled={isSaving}
                                              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                                            >
                                              {isSaving ? 'Saving...' : 'Save'}
                                            </button>
                                          );
                                        })()}
                                      </div>
                                    </>
                                  );
                                })()}
                              </div>
                            </div>
                          ))}
                          </div>
                        )}
                      </div>
                    )}

                    {/* Payment History */}
                    {(() => {
                      const studentPayments = getStudentPayments(student._id);
                      return studentPayments.length > 0 && (
                        <div>
                          <div 
                            className="flex items-center justify-between cursor-pointer hover:bg-white/5 rounded-lg p-2 -m-2 transition-colors duration-200"
                            onClick={() => toggleStudentSection(student._id, 'payments')}
                          >
                            <h4 className="text-white font-medium">Payment History ({studentPayments.length})</h4>
                            <span className="text-white/60 text-lg">
                              {expandedStudents[student._id]?.payments ? '▼' : '▶'}
                            </span>
                          </div>
                          {expandedStudents[student._id]?.payments && (
                            <div className="space-y-2 mt-3">
                            {studentPayments.map((payment, index) => (
                              <div key={payment.paymentId} className="bg-black/30 rounded-lg p-3 border border-white/10">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <div className="text-white font-medium">
                                      {payment.courseId?.title || 'Course N/A'}
                                    </div>
                                    <div className="text-white/60 text-sm">
                                      {payment.paymentMethod} • {payment.transactionId}
                                    </div>
                                    <div className="text-white/40 text-xs">
                                      {new Date(payment.createdAt).toLocaleDateString()}
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <div className="text-green-400 font-semibold">
                                      ₹{payment.amount.toLocaleString()}
                                    </div>
                                    <div className="flex flex-col space-y-2">
                                      <span className={`px-2 py-1 rounded-full text-xs ${
                                        payment.status === 'completed' ? 'bg-green-500/20 text-green-300' :
                                        payment.status === 'pending' ? 'bg-yellow-500/20 text-yellow-300' :
                                        payment.status === 'failed' ? 'bg-red-500/20 text-red-300' :
                                        'bg-gray-500/20 text-gray-300'
                                      }`}>
                                        {payment.status}
                                      </span>
                                      <div className="flex items-center space-x-2">
                                        <select
                                          value={payment.confirmationStatus || 'pending'}
                                          onChange={(e) => handlePaymentStatusUpdate(student._id, payment.paymentId, e.target.value)}
                                          className="bg-black/50 border border-white/20 rounded px-2 py-1 text-xs text-white focus:outline-none focus:border-blue-500"
                                        >
                                          <option value="pending">Pending</option>
                                          <option value="error">Error</option>
                                          <option value="confirmed">Confirmed</option>
                                        </select>
                                        {(() => {
                                          const changeKey = `${student._id}-${payment.paymentId}`;
                                          const hasPendingChange = pendingPaymentChanges[changeKey];
                                          const isSaving = savingPayments[changeKey];
                                          
                                          return hasPendingChange ? (
                                            <button
                                              onClick={() => savePaymentStatusChange(changeKey)}
                                              disabled={isSaving}
                                              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white px-2 py-1 rounded text-xs font-medium transition-colors"
                                            >
                                              {isSaving ? 'Saving...' : 'Save'}
                                            </button>
                                          ) : null;
                                        })()}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                            </div>
                          )}
                        </div>
                      );
                    })()}

                    {/* No courses or payments */}
                    {(!student.enrolledCourses || student.enrolledCourses.length === 0) && 
                     (getStudentPayments(student._id).length === 0) && (
                      <div className="text-center py-6">
                        <div className="text-white/40 text-sm">No course enrollments or payments yet</div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Referral Tab */}
        {activeTab === 'referral' && (
          <div className="space-y-8">
            {/* Faculty Management Header */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">👨‍🏫 Faculty Referral Management</h2>
                <button
                  onClick={() => setShowAddFaculty(!showAddFaculty)}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg font-medium transition-colors duration-200"
                >
                  {showAddFaculty ? 'Cancel' : '+ Add Faculty'}
                </button>
              </div>

              {/* Add Faculty Form */}
              {showAddFaculty && (
                <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl p-6 border border-green-500/30 mb-6">
                  <h3 className="text-xl font-bold text-white mb-4">Add New Faculty</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">Faculty Name *</label>
                      <input
                        type="text"
                        value={newFaculty.name}
                        onChange={(e) => setNewFaculty({...newFaculty, name: e.target.value})}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Enter faculty name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">Email *</label>
                      <input
                        type="email"
                        value={newFaculty.email}
                        onChange={(e) => setNewFaculty({...newFaculty, email: e.target.value})}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Enter email address"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/80 mb-2">Referral Code *</label>
                      <input
                        type="text"
                        value={newFaculty.referralCode}
                        onChange={(e) => setNewFaculty({...newFaculty, referralCode: e.target.value.toUpperCase()})}
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Enter referral code (e.g., JASH)"
                        required
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-white/60">
                      📝 Enter a unique referral code for the faculty member (e.g., JASH, ROHAN, etc.)
                    </p>
                    <p className="text-sm text-white/60 mt-1">
                      💰 Commission rate is set to 10% for all faculty members
                    </p>
                    <p className="text-sm text-yellow-400 mt-1">
                      ⚠️ Students will use this code during course purchase to link their enrollment
                    </p>
                  </div>
                  <div className="flex gap-4 mt-6">
                    <button
                      onClick={handleAddFaculty}
                      className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-medium transition-colors duration-200"
                    >
                      Add Faculty
                    </button>
                    <button
                      onClick={() => setShowAddFaculty(false)}
                      className="px-6 py-3 bg-gray-600 hover:bg-gray-700 rounded-lg font-medium transition-colors duration-200"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Faculty Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl p-6 border border-purple-500/30">
                  <h3 className="text-lg font-bold text-white mb-2">Total Faculty</h3>
                  <p className="text-3xl font-bold text-purple-400">{facultyList.length}</p>
                </div>
                <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl p-6 border border-blue-500/30">
                  <h3 className="text-lg font-bold text-white mb-2">Active Faculty</h3>
                  <p className="text-3xl font-bold text-blue-400">{facultyList.filter(faculty => faculty.isActive).length}</p>
                </div>
                <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl p-6 border border-green-500/30">
                  <h3 className="text-lg font-bold text-white mb-2">Total Commissions</h3>
                  <p className="text-3xl font-bold text-green-400">₹{facultyList.reduce((sum, faculty) => sum + (faculty.totalCommissionsEarned || 0), 0).toLocaleString()}</p>
                </div>
              </div>

              {/* Faculty List */}
              <div>
                <h3 className="text-xl font-bold text-white mb-4">Faculty List</h3>
                {facultyList.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">👨‍🏫</div>
                    <p className="text-white/60 text-lg">No faculty added yet</p>
                    <p className="text-white/40 text-sm">Add faculty members to start managing referrals</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {facultyList.map((faculty) => (
                      <div key={faculty._id} className="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-white/20 transition-colors duration-200">
                        <div className="flex items-center justify-between mb-4">
                          <h4 
                            className="text-lg font-bold text-white cursor-pointer hover:text-blue-400 transition-colors duration-200"
                            onClick={() => {
                              setSelectedFaculty(faculty);
                              fetchReferredStudents(faculty.referralCode);
                            }}
                          >
                            {faculty.name}
                          </h4>
                          <div className="flex items-center gap-2">
                            <span className="px-3 py-1 bg-blue-600 text-white text-xs rounded-full font-medium">
                              {faculty.referralCode}
                            </span>
                            <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                              faculty.isActive 
                                ? 'bg-green-600 text-white' 
                                : 'bg-gray-600 text-white'
                            }`}>
                              {faculty.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </div>
                        </div>
                        <div className="space-y-2 text-sm">
                          <p className="text-white/70">📧 {faculty.email}</p>
                          <p className="text-white/70">💼 {faculty.commissionRate}% commission</p>
                          <p className="text-white/70">💰 ₹{(faculty.totalCommissionsEarned || 0).toLocaleString()} earned</p>
                          <p className="text-white/70">📅 Joined {new Date(faculty.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div className="flex gap-2 mt-4">
                          <button
                            onClick={() => {
                              setSelectedFaculty(faculty);
                              fetchReferredStudents(faculty.referralCode);
                            }}
                            className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors duration-200"
                          >
                            View Details
                          </button>
                          <button
                            onClick={() => handleDeleteFaculty(faculty._id)}
                            className="px-3 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-medium transition-colors duration-200"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Selected Faculty Details */}
            {selectedFaculty && (
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-white">
                    Faculty Details - {selectedFaculty.name}
                  </h3>
                  <button
                    onClick={() => setSelectedFaculty(null)}
                    className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg font-medium transition-colors duration-200"
                  >
                    Close
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl p-6 border border-blue-500/30">
                    <h4 className="text-lg font-bold text-white mb-4">Contact Information</h4>
                    <div className="space-y-3">
                      <p className="text-white/80"><span className="font-medium">Email:</span> {selectedFaculty.email}</p>
                      <p className="text-white/80"><span className="font-medium">Referral Code:</span> {selectedFaculty.referralCode}</p>
                      <p className="text-white/80"><span className="font-medium">Status:</span> 
                        <span className={`ml-2 px-2 py-1 text-xs rounded-full font-medium ${
                          selectedFaculty.isActive 
                            ? 'bg-green-600 text-white' 
                            : 'bg-gray-600 text-white'
                        }`}>
                          {selectedFaculty.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl p-6 border border-green-500/30">
                    <h4 className="text-lg font-bold text-white mb-4">Commission Details</h4>
                    <div className="space-y-3">
                      <p className="text-white/80"><span className="font-medium">Commission Rate:</span> {selectedFaculty.commissionRate}%</p>
                      <p className="text-white/80"><span className="font-medium">Total Earned:</span> ₹{(selectedFaculty.totalCommissionsEarned || 0).toLocaleString()}</p>
                      <p className="text-white/80"><span className="font-medium">Joined:</span> {new Date(selectedFaculty.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl p-6 border border-purple-500/30 mb-6">
                  <h4 className="text-lg font-bold text-white mb-4">Referral Information</h4>
                  <div className="text-center py-8">
                    <div className="text-4xl mb-4">🔗</div>
                    <p className="text-white/80 mb-2">Share this referral code with students:</p>
                    <div className="bg-black/30 rounded-lg p-4 font-mono text-lg text-blue-400 border border-blue-500/30">
                      {selectedFaculty.referralCode}
                    </div>
                    <p className="text-white/60 text-sm mt-2">Students can use this code during registration to link their enrollment to this faculty member.</p>
                  </div>
                </div>

                {/* Referred Students Section */}
                <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl p-6 border border-orange-500/30">
                  <h4 className="text-lg font-bold text-white mb-4">
                    Students Using This Referral Code ({referredStudents.length})
                  </h4>
                  {referredStudents.length === 0 ? (
                    <div className="text-center py-8">
                      <div className="text-4xl mb-4">👥</div>
                      <p className="text-white/60">No students have used this referral code yet</p>
                      <p className="text-white/40 text-sm mt-1">Students will appear here when they register using the referral code</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {referredStudents.map((student) => (
                        <div key={student._id} className="bg-black/30 rounded-lg p-4 border border-white/10">
                          <div className="flex items-center justify-between mb-2">
                            <h5 
                              className="text-white font-medium cursor-pointer hover:text-blue-400 transition-colors duration-200"
                              onClick={() => handleStudentClick(student)}
                            >
                              {student.name}
                            </h5>
                            <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                              student.paymentStatus === 'completed' 
                                ? 'bg-green-600 text-white' 
                                : 'bg-yellow-600 text-white'
                            }`}>
                              {student.paymentStatus}
                            </span>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-white/70">
                            <p>📧 {student.email}</p>
                            <p>📱 {student.phone}</p>
                            <p>📚 {student.selectedCourse}</p>
                            <p>💰 ₹{student.amountPaid.toLocaleString()}</p>
                            <p>📅 Enrolled: {new Date(student.createdAt).toLocaleDateString()}</p>
                            <p>🔗 Used code: {student.referralCode}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Payments Tab */}
        {activeTab === 'payments' && (
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Payment Confirmations ({payments.length})</h2>
              <div className="text-white/60 text-sm">
                Last updated: {new Date().toLocaleString()}
              </div>
            </div>
            
            {payments.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">💳</div>
                <p className="text-white/60 text-lg">No payment records found</p>
                <p className="text-white/40 text-sm">Student payment submissions will appear here for admin confirmation</p>
                <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                  <p className="text-blue-300 text-sm">
                    💡 <strong>Note:</strong> When students submit payments via QR code, they will appear here for manual verification and approval.
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Filter buttons */}
                <div className="flex flex-wrap gap-2 mb-6">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">All Payments</button>
                  <button className="px-4 py-2 bg-yellow-600/20 text-yellow-300 rounded-lg text-sm hover:bg-yellow-600/30">Waiting for Confirmation</button>
                  <button className="px-4 py-2 bg-green-600/20 text-green-300 rounded-lg text-sm hover:bg-green-600/30">Confirmed</button>
                  <button className="px-4 py-2 bg-red-600/20 text-red-300 rounded-lg text-sm hover:bg-red-600/30">Rejected</button>
                </div>

                {payments.map(payment => {
                  const createdDate = new Date(payment.createdAt);
                  const confirmedDate = payment.adminConfirmedAt ? new Date(payment.adminConfirmedAt) : null;
                  const timeSinceCreated = Math.floor((Date.now() - createdDate.getTime()) / (1000 * 60)); // minutes
                  
                  const formatTimeAgo = (minutes: number) => {
                    if (minutes < 60) return `${minutes}m ago`;
                    const hours = Math.floor(minutes / 60);
                    if (hours < 24) return `${hours}h ago`;
                    const days = Math.floor(hours / 24);
                    return `${days}d ago`;
                  };

                  return (
                    <div key={payment._id} className="bg-white/5 rounded-lg p-6 border border-white/10">
                      {/* Payment Header */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-lg">💳</span>
                          </div>
                          <div>
                            <div className="text-white font-medium">
                              {payment.studentId?.name || 'Unknown Student'}
                            </div>
                            <div className="text-white/60 text-sm">{payment.studentId?.email}</div>
                            <div className="text-white/40 text-xs mt-1">
                              Payment ID: {payment.paymentId}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-green-400 font-bold text-lg">
                            ₹{payment.amount.toLocaleString()}
                          </div>
                          <div className="text-white/60 text-sm">
                            {createdDate.toLocaleDateString('en-IN', { 
                              day: '2-digit', 
                              month: '2-digit', 
                              year: 'numeric' 
                            })}
                          </div>
                          <div className="text-white/40 text-xs">
                            {formatTimeAgo(timeSinceCreated)}
                          </div>
                        </div>
                      </div>

                      {/* Payment Details */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                        <div className="bg-black/30 rounded-lg p-3">
                          <div className="text-white/60 text-sm">Course</div>
                          <div className="text-white font-medium">{payment.courseId?.title || 'Unknown Course'}</div>
                        </div>
                        <div className="bg-black/30 rounded-lg p-3">
                          <div className="text-white/60 text-sm">Transaction ID</div>
                          <div className="text-white font-medium font-mono text-xs">{payment.transactionId}</div>
                        </div>
                        <div className="bg-black/30 rounded-lg p-3">
                          <div className="text-white/60 text-sm">Payment Method</div>
                          <div className="text-white font-medium">{payment.paymentMethod || 'manual_qr'}</div>
                        </div>
                      </div>

                      {/* Timing Information */}
                      <div className="bg-black/20 rounded-lg p-3 mb-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="text-white/60">Submitted</div>
                            <div className="text-white">
                              {createdDate.toLocaleString('en-IN', {
                                day: '2-digit',
                                month: '2-digit', 
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                                hour12: true
                              })} ({formatTimeAgo(timeSinceCreated)})
                            </div>
                          </div>
                          {confirmedDate && (
                            <div>
                              <div className="text-white/60">
                                {payment.confirmationStatus === 'confirmed' ? 'Confirmed' : 'Rejected'}
                              </div>
                              <div className="text-white">
                                {confirmedDate.toLocaleString('en-IN', {
                                  day: '2-digit',
                                  month: '2-digit',
                                  year: 'numeric', 
                                  hour: '2-digit',
                                  minute: '2-digit',
                                  hour12: true
                                })}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Status Display Only */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <PaymentStatusBadge 
                            status={
                              payment.confirmationStatus === 'confirmed' ? 'confirmed' :
                              payment.confirmationStatus === 'rejected' ? 'rejected' :
                              payment.confirmationStatus === 'waiting_for_confirmation' ? 'pending' :
                              'unknown'
                            }
                            description={true}
                          />
                          
                          {payment.adminConfirmedBy && (
                            <div className="text-white/60 text-sm">
                              by {payment.adminConfirmedBy}
                            </div>
                          )}
                        </div>
                        
                        <div className="text-white/60 text-sm">
                          Payment Details Only
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
        </div>
      </div>

      {/* Student Detail Modal */}
      <StudentDetailModal
        student={selectedStudent}
        isOpen={showStudentModal}
        onClose={handleCloseStudentModal}
      />

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && studentToDelete && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-white/20 rounded-2xl p-6 max-w-md w-full mx-4">
            <div className="text-center">
              <div className="text-6xl mb-4">⚠️</div>
              <h3 className="text-xl font-bold text-white mb-2">Delete Student</h3>
              <p className="text-white/70 mb-6">
                Are you sure you want to delete{' '}
                <span className="font-semibold text-white">
                  {studentToDelete.firstName} {studentToDelete.lastName}
                </span>
                ? This action cannot be undone.
              </p>
              
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 mb-6">
                <p className="text-red-300 text-sm">
                  This will permanently delete:
                </p>
                <ul className="text-red-300 text-sm mt-2 space-y-1">
                  <li>• Student profile and account</li>
                  <li>• All course enrollments</li>
                  <li>• Payment history</li>
                  <li>• Progress and assignments</li>
                </ul>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={handleCancelDelete}
                  disabled={isDeleting}
                  className="flex-1 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors duration-200 disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  disabled={isDeleting}
                  className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200 disabled:opacity-50 flex items-center justify-center space-x-2"
                >
                  {isDeleting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Deleting...</span>
                    </>
                  ) : (
                    <>
                      <span>🗑️</span>
                      <span>Delete Student</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
