import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeftIcon, 
  CloudArrowUpIcon, 
  CheckCircleIcon,
  ExclamationTriangleIcon,
  DocumentTextIcon,
  LinkIcon,
  StarIcon
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

const AIToolsProjectPage: React.FC = () => {
  const navigate = useNavigate();
  const { projectId } = useParams<{ projectId: string }>();
  const [submissionUrl, setSubmissionUrl] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Project data based on projectId
  const getProjectData = (id: string): ProjectData | null => {
    const projects: { [key: string]: ProjectData } = {
      'ai-tools-project-1': {
        id: 'ai-tools-project-1',
        title: 'Module 1 Project: AI Image Generation Portfolio',
        description: '🎯 ENTERPRISE PROJECT: Create a complete brand identity package for a Fortune 500 client using DALL-E 3, Midjourney, and Stable Diffusion. Master enterprise-grade prompt engineering with Promptly AI. Deliverables: Logo suite, brand guidelines, marketing materials, and client presentation deck.',
        requirements: [
          'Generate 50+ professional images using different AI tools',
          'Use Promptly AI to optimize and perfect prompts',
          'Create themed collections (business, art, photography)',
          'Build a responsive web gallery to showcase work',
          'Document prompt engineering techniques used'
        ],
        technologies: ['DALL-E 3', 'Midjourney', 'Stable Diffusion', 'Promptly AI', 'HTML/CSS/JS'],
        estimatedTime: '2-3 weeks',
        difficulty: 'intermediate',
        deliverables: [
          'Complete brand identity package with 50+ AI-generated images',
          'Professional web gallery showcasing your work',
          'Detailed prompt engineering documentation',
          'Brand guidelines document',
          'Client presentation deck (PowerPoint/PDF)'
        ],
        submissionInstructions: [
          'Create a Google Drive folder with all project deliverables',
          'Ensure the folder is publicly accessible (Anyone with the link can view)',
          'Include a README.txt file with project overview and file descriptions',
          'Submit the Google Drive folder link below'
        ]
      },
      'ai-tools-project-2': {
        id: 'ai-tools-project-2',
        title: 'Module 2 Project: AI Video Production Studio',
        description: '🎬 ENTERPRISE PROJECT: Produce a complete video marketing campaign for a Fortune 500 client using Runway ML, Synthesia, Luma AI Dream Machine, and Pika Labs. Create corporate training videos, product launches, and executive presentations. Deliverables: 15+ professional video assets, production timeline, and client presentation.',
        requirements: [
          'Create video content using Runway ML and Synthesia',
          'Generate AI avatars and voiceovers',
          'Use Luma AI for cinematic sequences',
          'Edit and post-process with professional tools',
          'Create a complete video production pipeline'
        ],
        technologies: ['Runway ML', 'Synthesia', 'Luma AI', 'Pika Labs', 'DaVinci Resolve'],
        estimatedTime: '3-4 weeks',
        difficulty: 'advanced',
        deliverables: [
          '15+ professional video assets for marketing campaign',
          'Complete video production pipeline documentation',
          'AI avatar and voiceover samples',
          'Production timeline and workflow guide',
          'Client presentation with campaign overview'
        ],
        submissionInstructions: [
          'Upload all video files to Google Drive folder',
          'Ensure the folder is publicly accessible (Anyone with the link can view)',
          'Include a production notes document with technical details',
          'Submit the Google Drive folder link below'
        ]
      },
      'ai-tools-project-3': {
        id: 'ai-tools-project-3',
        title: 'Module 3 Project: Image-to-Video Animation Suite',
        description: '🎨 ENTERPRISE PROJECT: Transform static brand assets into dynamic video content for a luxury brand campaign using Runway Gen-2, Stable Video Diffusion, and Pika Labs. Create product showcases, architectural walkthroughs, and brand storytelling videos. Deliverables: 20+ animated assets, motion design guidelines, and campaign presentation.',
        requirements: [
          'Convert 20+ static images to animated videos',
          'Master motion brush and camera movement controls',
          'Create seamless transitions and effects',
          'Build an automated batch processing workflow',
          'Produce a final compilation showcase video'
        ],
        technologies: ['Runway Gen-2', 'Stable Video Diffusion', 'Pika Labs', 'Motion Brush', 'FFmpeg'],
        estimatedTime: '2-3 weeks',
        difficulty: 'intermediate',
        deliverables: [
          '20+ animated video assets from static images',
          'Motion design guidelines document',
          'Automated batch processing workflow',
          'Final compilation showcase video',
          'Technical documentation of animation techniques'
        ],
        submissionInstructions: [
          'Upload all animated videos to Google Drive folder',
          'Organize files by animation technique and category',
          'Include motion design guidelines as PDF',
          'Submit the Google Drive folder link below'
        ]
      },
      'ai-tools-project-4': {
        id: 'ai-tools-project-4',
        title: 'Module 4 Project: JSON-Powered AI Data Generator',
        description: '⚙️ ENTERPRISE PROJECT: Build an automated data processing system for a multinational corporation using advanced JSON prompt engineering. Create structured data pipelines, API integrations, and enterprise-grade automation workflows. Deliverables: Complete data system, API documentation, and scalability report.',
        requirements: [
          'Design JSON schemas for different data types',
          'Create automated data generation workflows',
          'Build API integrations for data processing',
          'Implement data validation and quality control',
          'Generate sample datasets for e-commerce, CRM, and analytics'
        ],
        technologies: ['JSON Schema', 'OpenAI API', 'Node.js', 'MongoDB', 'Data Validation'],
        estimatedTime: '3-4 weeks',
        difficulty: 'advanced',
        deliverables: [
          'Complete automated data processing system',
          'JSON schemas for multiple data types',
          'API integration documentation',
          'Sample datasets (e-commerce, CRM, analytics)',
          'Scalability and performance report'
        ],
        submissionInstructions: [
          'Upload source code and documentation to Google Drive',
          'Include API documentation and usage examples',
          'Provide sample datasets in organized folders',
          'Submit the Google Drive folder link below'
        ]
      },
      'ai-tools-project-5': {
        id: 'ai-tools-project-5',
        title: 'Module 5 Project: Multi-Platform AI Agent Network',
        description: '🤖 ENTERPRISE PROJECT: Design and deploy an intelligent business automation ecosystem for a Fortune 500 company using n8n, Zapier, Make.com, and custom AI agents. Automate complex workflows, integrate enterprise systems, and optimize business processes. Deliverables: Complete automation suite, ROI analysis, and deployment guide.',
        requirements: [
          'Design multi-step automation workflows',
          'Integrate AI decision-making capabilities',
          'Connect multiple platforms and APIs',
          'Implement error handling and monitoring',
          'Create a dashboard for workflow management'
        ],
        technologies: ['n8n', 'Zapier', 'Make.com', 'OpenAI API', 'Webhook Integration'],
        estimatedTime: '4-5 weeks',
        difficulty: 'advanced',
        deliverables: [
          'Complete business automation ecosystem',
          'Multi-platform workflow integrations',
          'AI agent network with decision-making capabilities',
          'ROI analysis and business impact report',
          'Deployment guide and maintenance documentation'
        ],
        submissionInstructions: [
          'Document all automation workflows with screenshots',
          'Upload configuration files and setup guides to Google Drive',
          'Include ROI analysis and business impact report',
          'Submit the Google Drive folder link below'
        ]
      },
      'ai-tools-project-6': {
        id: 'ai-tools-project-6',
        title: 'Module 6 Project: Claude AI Enterprise Application',
        description: '🚀 CAPSTONE PROJECT: Build a complete enterprise AI application using Claude AI for a Fortune 500 client. Develop custom solutions with advanced API integration, implement enterprise security, and create scalable AI-powered business applications. Deliverables: Full-stack AI application, technical documentation, and deployment strategy.',
        requirements: [
          'Build a full-stack application with Claude API integration',
          'Implement advanced prompt engineering techniques',
          'Create custom Claude workflows and automations',
          'Add enterprise features (user management, analytics)',
          'Deploy with proper security and scaling considerations'
        ],
        technologies: ['Claude API', 'React/Next.js', 'Node.js', 'PostgreSQL', 'Docker', 'AWS/Azure'],
        estimatedTime: '5-6 weeks',
        difficulty: 'advanced',
        deliverables: [
          'Complete full-stack enterprise AI application',
          'Advanced Claude API integration with custom workflows',
          'Enterprise security and user management system',
          'Technical documentation and API reference',
          'Deployment strategy and scaling guide'
        ],
        submissionInstructions: [
          'Upload complete source code to Google Drive',
          'Include deployment instructions and environment setup',
          'Provide technical documentation and API reference',
          'Submit the Google Drive folder link below'
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
      // Validate Google Drive URL
      if (!submissionUrl.includes('drive.google.com') && !submissionUrl.includes('docs.google.com')) {
        throw new Error('Please provide a valid Google Drive link');
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
        lineColor="#3b82f6"
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
                    className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm border border-blue-500/30"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Deliverables */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <CloudArrowUpIcon className="h-6 w-6 mr-2 text-purple-400" />
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

          {/* Submission Section */}
          <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 backdrop-blur-sm rounded-xl p-8 border border-blue-500/30">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">Submit Your Project</h2>
            
            {submissionStatus === 'idle' && (
              <div className="space-y-6">
                <div>
                  <label htmlFor="submission-url" className="block text-sm font-medium text-gray-300 mb-2">
                    Google Drive Folder Link
                  </label>
                  <input
                    type="url"
                    id="submission-url"
                    value={submissionUrl}
                    onChange={(e) => setSubmissionUrl(e.target.value)}
                    placeholder="https://drive.google.com/drive/folders/..."
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-yellow-200">
                      <p className="font-medium mb-1">Important Submission Guidelines:</p>
                      <ul className="space-y-1 text-yellow-300">
                        <li>• Ensure your Google Drive folder is set to "Anyone with the link can view"</li>
                        <li>• Include all required deliverables in organized subfolders</li>
                        <li>• Add a README.txt file with project overview and file descriptions</li>
                        <li>• Double-check that all files are accessible before submitting</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleSubmission}
                  disabled={!submissionUrl.trim() || isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <CloudArrowUpIcon className="h-5 w-5" />
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
                  Your project has been submitted for review. You'll receive feedback within 3-5 business days.
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
                  There was an error submitting your project. Please check your Google Drive link and try again.
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

export default AIToolsProjectPage;