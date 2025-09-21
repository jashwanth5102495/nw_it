import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentDetailModal from './StudentDetailModal';

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
    };
    enrollmentDate: string;
    progress: number;
    status: string;
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
  createdAt: string;
}

interface ReferredStudent {
  name: string;
  course: string;
  amountPaid: number;
  purchaseDate: string;
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
      const response = await fetch('http://localhost:5000/api/students');
      if (response.ok) {
        const result = await response.json();
        const data = result.data || result;
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
        setPayments(data.payments || []);
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
      // Filter students who used this referral code
      const studentsWithReferral = students.filter(student => 
        student.referralCode === referralCode
      );
      setReferredStudents(studentsWithReferral);
    } catch (error) {
      console.error('Error fetching referred students:', error);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Header */}
      <div className="bg-black/50 backdrop-blur-lg border-b border-white/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
              <p className="text-white/70 mt-1">Manage projects and track student progress</p>
            </div>
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors duration-200"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex space-x-1 bg-gray-900 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('projects')}
            className={`flex-1 py-3 px-6 rounded-md font-medium transition-all duration-200 ${
              activeTab === 'projects'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            📊 Projects
          </button>
          <button
            onClick={() => setActiveTab('courses')}
            className={`flex-1 py-3 px-6 rounded-md font-medium transition-all duration-200 ${
              activeTab === 'courses'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            🎓 Student Courses
          </button>
          <button
            onClick={() => setActiveTab('payments')}
            className={`flex-1 py-3 px-6 rounded-md font-medium transition-all duration-200 ${
              activeTab === 'payments'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            💳 Payments
          </button>
          <button
            onClick={() => setActiveTab('referral')}
            className={`flex-1 py-3 px-6 rounded-md font-medium transition-all duration-200 ${
              activeTab === 'referral'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            🤝 Faculty & Referral
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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
            <h2 className="text-2xl font-bold text-white mb-6">Student Enrollments ({students.length})</h2>
            
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
                      <div className="text-right">
                        <div className="text-white/60 text-sm">Joined</div>
                        <div className="text-white text-sm">
                          {new Date(student.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>

                    {/* Enrolled Courses */}
                    {student.enrolledCourses && student.enrolledCourses.length > 0 && (
                      <div className="mb-4">
                        <h4 className="text-white font-medium mb-3">Enrolled Courses ({student.enrolledCourses.length})</h4>
                        <div className="space-y-2">
                          {student.enrolledCourses.map((enrollment, index) => (
                            <div key={index} className="bg-black/30 rounded-lg p-3 border border-white/10">
                              <div className="flex items-center justify-between">
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
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Payment History */}
                    {student.paymentHistory && student.paymentHistory.length > 0 && (
                      <div>
                        <h4 className="text-white font-medium mb-3">Payment History ({student.paymentHistory.length})</h4>
                        <div className="space-y-2">
                          {student.paymentHistory.map((payment, index) => (
                            <div key={index} className="bg-black/30 rounded-lg p-3 border border-white/10">
                              <div className="flex items-center justify-between">
                                <div>
                                  <div className="text-white font-medium">
                                    {payment.courseId?.title || 'Course N/A'}
                                  </div>
                                  <div className="text-white/60 text-sm">
                                    {payment.paymentMethod} • {payment.transactionId}
                                  </div>
                                  <div className="text-white/40 text-xs">
                                    {new Date(payment.paymentDate).toLocaleDateString()}
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="text-green-400 font-semibold">
                                    ₹{payment.amount.toLocaleString()}
                                  </div>
                                  <span className={`px-2 py-1 rounded-full text-xs ${
                                    payment.status === 'completed' ? 'bg-green-500/20 text-green-300' :
                                    payment.status === 'pending' ? 'bg-yellow-500/20 text-yellow-300' :
                                    payment.status === 'failed' ? 'bg-red-500/20 text-red-300' :
                                    'bg-gray-500/20 text-gray-300'
                                  }`}>
                                    {payment.status}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* No courses or payments */}
                    {(!student.enrolledCourses || student.enrolledCourses.length === 0) && 
                     (!student.paymentHistory || student.paymentHistory.length === 0) && (
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
                        placeholder="Enter referral code"
                        required
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-white/60">
                      📝 Enter a unique referral code for the faculty member
                    </p>
                    <p className="text-sm text-white/60 mt-1">
                      💰 Commission rate is set to 60% for all faculty members
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
      </div>

      {/* Student Detail Modal */}
      <StudentDetailModal
        student={selectedStudent}
        isOpen={showStudentModal}
        onClose={handleCloseStudentModal}
      />
    </div>
  );
};

export default AdminPanel;
