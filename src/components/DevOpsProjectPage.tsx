import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeftIcon, 
  CodeBracketIcon, 
  CheckCircleIcon,
  ExclamationTriangleIcon,
  DocumentTextIcon,
  LinkIcon,
  StarIcon,
  CommandLineIcon
} from '@heroicons/react/24/outline';
import MagnetLines from './MagnetLines';

interface ProjectData {
  id: string;
  title: string;
  description: string;
  requirements: string[];
  technologies: string[];
  estimatedTime: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  deliverables: string[];
  submissionInstructions: string[];
}

const DevOpsProjectPage: React.FC = () => {
  const navigate = useNavigate();
  const { projectId } = useParams<{ projectId: string }>();
  const [submissionUrl, setSubmissionUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Project data based on projectId
  const getProjectData = (id: string): ProjectData | null => {
    const projects: { [key: string]: ProjectData } = {
      'devops-project-1': {
        id: 'devops-project-1',
        title: 'DevOps Foundation Project: Complete CI/CD Pipeline',
        description: '🚀 ENTERPRISE PROJECT: Build a complete DevOps pipeline for a web application including version control, automated testing, containerization, and deployment. Master Git workflows, Docker containerization, CI/CD automation, and infrastructure monitoring.',
        requirements: [
          'Set up Git repository with proper branching strategy',
          'Create Docker containers for application and database',
          'Implement CI/CD pipeline with automated testing',
          'Deploy application to cloud platform (AWS/Azure/GCP)',
          'Set up monitoring and logging for the application',
          'Document the entire DevOps workflow'
        ],
        technologies: ['Git', 'Docker', 'GitHub Actions', 'AWS/Azure', 'Nginx', 'MongoDB/PostgreSQL'],
        estimatedTime: '3-4 weeks',
        difficulty: 'beginner',
        deliverables: [
          'Complete Git repository with proper branching strategy',
          'Dockerized application with multi-stage builds',
          'CI/CD pipeline configuration files',
          'Deployed application with public URL',
          'Monitoring dashboard setup',
          'Comprehensive documentation and README'
        ],
        submissionInstructions: [
          'Create a public GitHub repository for your project',
          'Include all source code, Docker files, and CI/CD configurations',
          'Add a comprehensive README.md with setup instructions',
          'Deploy your application and include the live URL in README',
          'Submit your GitHub repository link below'
        ]
      },
      'devops-project-2': {
        id: 'devops-project-2',
        title: 'Infrastructure as Code Project: Terraform & Kubernetes',
        description: '☁️ ENTERPRISE PROJECT: Design and implement scalable cloud infrastructure using Terraform and Kubernetes. Create automated infrastructure provisioning, container orchestration, and service mesh implementation for enterprise applications.',
        requirements: [
          'Design cloud infrastructure using Terraform',
          'Set up Kubernetes cluster with proper networking',
          'Implement service mesh with Istio or Linkerd',
          'Create automated scaling and load balancing',
          'Set up centralized logging and monitoring',
          'Implement security best practices and RBAC'
        ],
        technologies: ['Terraform', 'Kubernetes', 'Helm', 'Istio', 'Prometheus', 'Grafana'],
        estimatedTime: '4-5 weeks',
        difficulty: 'intermediate',
        deliverables: [
          'Terraform modules for infrastructure provisioning',
          'Kubernetes manifests and Helm charts',
          'Service mesh configuration and policies',
          'Monitoring and alerting setup',
          'Security policies and RBAC configuration',
          'Infrastructure documentation and runbooks'
        ],
        submissionInstructions: [
          'Create a GitHub repository with all Terraform and Kubernetes code',
          'Include Helm charts and service mesh configurations',
          'Add detailed documentation for infrastructure setup',
          'Provide screenshots of deployed infrastructure',
          'Submit your GitHub repository link below'
        ]
      },
      'devops-project-3': {
        id: 'devops-project-3',
        title: 'Microservices DevOps Project: Full Stack Deployment',
        description: '🏗️ ENTERPRISE PROJECT: Build and deploy a complete microservices architecture with automated DevOps pipeline. Implement service discovery, API gateway, distributed tracing, and comprehensive monitoring for enterprise-scale applications.',
        requirements: [
          'Design microservices architecture with API gateway',
          'Implement service discovery and load balancing',
          'Set up distributed tracing and monitoring',
          'Create automated testing for microservices',
          'Implement blue-green deployment strategy',
          'Set up centralized configuration management'
        ],
        technologies: ['Docker Swarm/Kubernetes', 'Kong/Nginx', 'Consul', 'Jaeger', 'ELK Stack', 'Jenkins'],
        estimatedTime: '5-6 weeks',
        difficulty: 'advanced',
        deliverables: [
          'Complete microservices application with API gateway',
          'Service discovery and configuration management',
          'Distributed tracing and monitoring setup',
          'Automated testing and deployment pipeline',
          'Blue-green deployment implementation',
          'Comprehensive architecture documentation'
        ],
        submissionInstructions: [
          'Create a GitHub repository with microservices source code',
          'Include all DevOps configurations and scripts',
          'Add architecture diagrams and documentation',
          'Provide live demo URLs for all services',
          'Submit your GitHub repository link below'
        ]
      }
    };

    return projects[id] || null;
  };

  const projectData = projectId ? getProjectData(projectId) : null;

  const handleSubmission = async () => {
    if (!submissionUrl.trim()) return;

    setIsSubmitting(true);
    
    // Simulate submission process
    try {
      // Validate GitHub URL
      if (!submissionUrl.includes('github.com')) {
        throw new Error('Please provide a valid GitHub repository link');
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSubmissionStatus('success');
      
      // Store submission in localStorage (in real app, this would be sent to backend)
      const submissions = JSON.parse(localStorage.getItem('projectSubmissions') || '{}');
      submissions[projectId!] = {
        url: submissionUrl,
        submittedAt: new Date().toISOString(),
        status: 'submitted'
      };
      localStorage.setItem('projectSubmissions', JSON.stringify(submissions));
      
    } catch (error) {
      setSubmissionStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'intermediate': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'advanced': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  if (!projectData) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-400 mb-4">Project Not Found</h1>
          <p className="text-gray-400 mb-6">The requested project could not be found.</p>
          <button
            onClick={() => navigate('/student-portal')}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg transition-colors"
          >
            Back to Student Portal
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Magnet Lines Background */}
      <MagnetLines
        rows={12}
        columns={20}
        containerSize={{ width: '100vw', height: '100vh' }}
        lineColor="#10b981"
        lineWidth={1}
        lineHeight={40}
        baseAngle={0}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 0,
          opacity: 0.3,
          pointerEvents: 'none'
        }}
      />

      {/* Header */}
      <div className="relative z-10 bg-gray-800/90 backdrop-blur-sm border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/student-portal')}
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
            >
              <ArrowLeftIcon className="h-5 w-5" />
              <span>Back to Student Portal</span>
            </button>
            <div className={`px-3 py-1 rounded-full border text-sm font-medium ${getDifficultyColor(projectData.difficulty)}`}>
              {projectData.difficulty.charAt(0).toUpperCase() + projectData.difficulty.slice(1)}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* Project Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold text-white">{projectData.title}</h1>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">{projectData.description}</p>
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-400">
              <span>⏱️ {projectData.estimatedTime}</span>
              <span>🛠️ {projectData.technologies.length} Technologies</span>
              <span>📋 {projectData.requirements.length} Requirements</span>
            </div>
          </div>

          {/* Project Details Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Requirements */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <DocumentTextIcon className="h-6 w-6 mr-2 text-blue-400" />
                Project Requirements
              </h2>
              <ul className="space-y-3">
                {projectData.requirements.map((req, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircleIcon className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technologies */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <StarIcon className="h-6 w-6 mr-2 text-yellow-400" />
                Technologies & Tools
              </h2>
              <div className="flex flex-wrap gap-2">
                {projectData.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm border border-green-500/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Deliverables */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <CodeBracketIcon className="h-6 w-6 mr-2 text-purple-400" />
                Project Deliverables
              </h2>
              <ul className="space-y-3">
                {projectData.deliverables.map((deliverable, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-purple-400 text-xs font-bold">{index + 1}</span>
                    </div>
                    <span className="text-gray-300">{deliverable}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Submission Instructions */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <LinkIcon className="h-6 w-6 mr-2 text-green-400" />
                Submission Instructions
              </h2>
              <ul className="space-y-3">
                {projectData.submissionInstructions.map((instruction, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-green-400 text-xs font-bold">{index + 1}</span>
                    </div>
                    <span className="text-gray-300">{instruction}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Git Learning Section */}
          <div className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-600">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <CommandLineIcon className="h-6 w-6 mr-2 text-orange-400" />
              Git & GitHub Quick Reference
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-orange-400 mb-3">Essential Git Commands</h3>
                <div className="space-y-2 text-sm">
                  <div className="bg-gray-800 p-2 rounded font-mono">
                    <span className="text-green-400">git init</span> <span className="text-gray-400"># Initialize repository</span>
                  </div>
                  <div className="bg-gray-800 p-2 rounded font-mono">
                    <span className="text-green-400">git add .</span> <span className="text-gray-400"># Stage all changes</span>
                  </div>
                  <div className="bg-gray-800 p-2 rounded font-mono">
                    <span className="text-green-400">git commit -m "message"</span> <span className="text-gray-400"># Commit changes</span>
                  </div>
                  <div className="bg-gray-800 p-2 rounded font-mono">
                    <span className="text-green-400">git push origin main</span> <span className="text-gray-400"># Push to GitHub</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-orange-400 mb-3">Repository Setup</h3>
                <ol className="space-y-2 text-sm text-gray-300">
                  <li>1. Create new repository on GitHub</li>
                  <li>2. Clone or initialize locally</li>
                  <li>3. Add your project files</li>
                  <li>4. Create comprehensive README.md</li>
                  <li>5. Commit and push to GitHub</li>
                  <li>6. Ensure repository is public</li>
                </ol>
              </div>
            </div>
          </div>

          {/* Submission Section */}
          <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 backdrop-blur-sm rounded-xl p-8 border border-green-500/30">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">Submit Your Project</h2>
            
            {submissionStatus === 'idle' && (
              <div className="space-y-6">
                <div>
                  <label htmlFor="submission-url" className="block text-sm font-medium text-gray-300 mb-2">
                    GitHub Repository Link
                  </label>
                  <input
                    type="url"
                    id="submission-url"
                    value={submissionUrl}
                    onChange={(e) => setSubmissionUrl(e.target.value)}
                    placeholder="https://github.com/username/repository-name"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                
                <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-yellow-200">
                      <p className="font-medium mb-1">Important Submission Guidelines:</p>
                      <ul className="space-y-1 text-yellow-300">
                        <li>• Ensure your GitHub repository is public</li>
                        <li>• Include all source code, configurations, and documentation</li>
                        <li>• Add a comprehensive README.md with setup instructions</li>
                        <li>• Include live deployment URLs if applicable</li>
                        <li>• Test that all links and instructions work correctly</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleSubmission}
                  disabled={!submissionUrl.trim() || isSubmitting}
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <CodeBracketIcon className="h-5 w-5" />
                      <span>Submit Project</span>
                    </>
                  )}
                </button>
              </div>
            )}

            {submissionStatus === 'success' && (
              <div className="text-center space-y-4">
                <CheckCircleIcon className="h-16 w-16 text-green-400 mx-auto" />
                <h3 className="text-2xl font-bold text-green-400">Project Submitted Successfully!</h3>
                <p className="text-gray-300">
                  Your DevOps project has been submitted for review. You'll receive feedback within 3-5 business days.
                </p>
                <button
                  onClick={() => navigate('/student-portal')}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                >
                  Back to Student Portal
                </button>
              </div>
            )}

            {submissionStatus === 'error' && (
              <div className="text-center space-y-4">
                <ExclamationTriangleIcon className="h-16 w-16 text-red-400 mx-auto" />
                <h3 className="text-2xl font-bold text-red-400">Submission Failed</h3>
                <p className="text-gray-300">
                  There was an error submitting your project. Please check your GitHub repository link and try again.
                </p>
                <button
                  onClick={() => setSubmissionStatus('idle')}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
                >
                  Try Again
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DevOpsProjectPage;