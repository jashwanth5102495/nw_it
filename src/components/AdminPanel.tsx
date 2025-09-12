import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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
  name: string;
  email: string;
  phone: string;
  selectedCourse: string;
  amountPaid: number;
  paymentStatus: string;
  createdAt: string;
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

const AdminPanel: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'projects' | 'courses' | 'payments'>('projects');
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
              <div className="space-y-4">
                {students.map(student => (
                  <div key={student._id} className="bg-white/5 rounded-lg p-4 border border-white/10 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-lg">{student.name.charAt(0).toUpperCase()}</span>
                      </div>
                      <div>
                        <div className="text-white font-medium">{student.name}</div>
                        <div className="text-white/60 text-sm">{student.email}</div>
                        <div className="text-white/40 text-xs mt-1">
                          {student.loginMethod === 'google' ? (
                            <span className="inline-flex items-center px-2 py-1 rounded-full bg-red-500/20 text-red-300">
                              <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24">
                                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                              </svg>
                              Google Login
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2 py-1 rounded-full bg-blue-500/20 text-blue-300">
                              <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                              </svg>
                              Email/Password
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white/80 text-sm">{student.selectedCourse || 'Course N/A'}</div>
                      <div className="text-green-400 font-semibold">₹{student.amountPaid ? student.amountPaid.toLocaleString() : 'N/A'}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
