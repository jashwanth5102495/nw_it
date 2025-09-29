import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpenIcon, 
  PlayIcon, 
  DocumentTextIcon, 
  AcademicCapIcon,
  ChevronRightIcon,
  StarIcon,
  ClockIcon,
  UserGroupIcon,
  CheckCircleIcon,
  ArrowLeftIcon,
  LightBulbIcon,
  CodeBracketIcon
} from '@heroicons/react/24/outline';
import MagnetLines from './MagnetLines';
import StarBorder from './StarBorder';
import LogoLoop from './LogoLoop';

const AIStudyMaterial = () => {
  const navigate = useNavigate();
  const [activeModule, setActiveModule] = useState(0);
  const [isStudying, setIsStudying] = useState(false);
  const [currentTopic, setCurrentTopic] = useState(0);
  const [moduleProgress, setModuleProgress] = useState<{[key: number]: {completed: boolean, progress: number}}>({});

  // Function to mark module as complete
  const markModuleComplete = (moduleId: number) => {
    setModuleProgress(prev => ({
      ...prev,
      [moduleId]: { completed: true, progress: 100 }
    }));
  };

  // Function to get module progress
  const getModuleProgress = (moduleId: number) => {
    return moduleProgress[moduleId] || { completed: false, progress: 0 };
  };

  // Function to calculate overall progress
  const calculateOverallProgress = () => {
    const completedModules = modules.filter(module => getModuleProgress(module.id).completed).length;
    const totalModules = modules.length;
    return Math.round((completedModules / totalModules) * 100);
  };

  // Function to get completed modules count
  const getCompletedModulesCount = () => {
    return modules.filter(module => getModuleProgress(module.id).completed).length;
  };

  const modules = [
    {
      id: 1,
      title: 'Module 1: Professional Image Creation & Brand Design',
      duration: '4 weeks',
      description: 'Master enterprise-grade AI image generation tools for professional brand design',
      topics: [
        'DALL-E 3 Enterprise Techniques & Commercial Applications',
        'Midjourney Professional Brand Workflow Masterclass',
        'Stable Diffusion Custom Model Training for Business',
        'Promptly AI Advanced Optimization & Enterprise Setup',
        'Commercial Image Enhancement & Professional Editing',
        'Copyright, Licensing & Legal Compliance for AI-Generated Content',
        'Client Presentation Techniques & Portfolio Development',
        'Brand Identity Design Principles for AI Artists'
      ],
      completed: false,
      progress: 0
    },
    {
      id: 2,
      title: 'Module 2: Cinematic Video Production & AI Storytelling',
      duration: '4 weeks',
      description: 'Create professional videos using cutting-edge AI video generation tools',
      topics: [
        'Runway ML Professional Video Generation',
        'Synthesia Enterprise AI Avatars & Brand Alignment',
        'Luma AI Dream Machine Advanced Cinematography',
        'Pika Labs Professional Animation & Motion Graphics',
        'Enterprise Video Editing Workflows & Quality Standards',
        'Corporate Video Production Pipeline & Project Management',
        'AI Cinematography for Business Applications',
        'Video ROI Analytics & Performance Measurement'
      ],
      completed: false,
      progress: 0
    },
    {
      id: 3,
      title: 'Module 3: Advanced Animation & Motion Graphics',
      duration: '4 weeks',
      description: 'Transform static images into dynamic animations with AI-powered tools',
      topics: [
        'Image-to-Video Animation Mastery',
        'Motion Brush & Camera Movement Controls',
        'Seamless Transitions & Professional Effects',
        'Automated Batch Processing Workflows',
        'Advanced Animation Techniques',
        'Professional Motion Graphics Design',
        'Client Animation Projects',
        'Animation Portfolio Development'
      ],
      completed: false,
      progress: 0
    },
    {
      id: 4,
      title: 'Module 4: Enterprise JSON Prompts & Automated Data Systems',
      duration: '4 weeks',
      description: 'Build scalable data generation systems using structured JSON prompts',
      topics: [
        'Enterprise JSON Prompt Engineering & Schema Design',
        'Advanced Structured Data Generation for Business Intelligence',
        'Enterprise API Integration Patterns & Security',
        'Scalable Schema Design for Large-Scale AI Applications',
        'Automated Batch Processing & Enterprise Workflows',
        'Data Validation, Quality Control & Compliance Standards',
        'Enterprise Data Pipeline Architecture',
        'JSON-Based AI System Integration & Deployment'
      ],
      completed: false,
      progress: 0
    },
    {
      id: 5,
      title: 'Module 5: Multi-Platform AI Agent Networks',
      duration: '4 weeks',
      description: 'Create intelligent automation networks using enterprise AI platforms',
      topics: [
        'n8n Advanced Workflow Design & Custom Node Development',
        'Zapier Enterprise Integration & Advanced Automation',
        'Make.com Professional Scenario Building & Optimization',
        'Multi-Platform Integration Architecture & Security',
        'Enterprise Business Process Automation & Optimization',
        'AI Agent Deployment & Monitoring in Production',
        'Workflow Performance Analytics & ROI Measurement',
        'Enterprise Integration Security & Compliance'
      ],
      completed: false,
      progress: 0
    },
    {
      id: 6,
      title: 'Module 6: Enterprise Claude AI Mastery',
      duration: '4 weeks',
      description: 'Develop enterprise applications using Claude AI with advanced integrations',
      topics: [
        'Claude AI Enterprise Features & Advanced Capabilities',
        'Claude API Advanced Integration & Authentication',
        'Professional Claude Prompting & Optimization Techniques',
        'Building Production Applications with Claude API',
        'Claude Enterprise Security & Compliance Implementation',
        'Custom Claude Workflows & Enterprise Automation',
        'Claude API Performance Optimization & Scaling',
        'Enterprise AI Application Deployment & Monitoring'
      ],
      completed: false,
      progress: 0
    }
  ];

  // Study material content with examples for each module
  const studyMaterials = {
    0: { // Module 1: Professional Image Creation & Brand Design
      title: 'Professional Image Creation & Brand Design',
      lessons: [
        {
          title: 'DALL-E 3 Enterprise Techniques & Commercial Applications',
          content: `
            <h3>Understanding DALL-E 3 for Professional Use</h3>
            <p>DALL-E 3 is OpenAI's most advanced image generation model, designed for creating high-quality, photorealistic images from text descriptions.</p>
            
            <h4>Key Features:</h4>
            <ul>
              <li>High-resolution output (1024x1024, 1792x1024, 1024x1792)</li>
              <li>Better text rendering within images</li>
              <li>Improved prompt adherence</li>
              <li>Commercial usage rights</li>
            </ul>

            <h4>Professional Prompt Examples:</h4>
            
            <div class="bg-gray-800 p-4 rounded-lg my-4">
              <p><strong>Brand Logo Design:</strong></p>
              <div class="mb-3">
                <code class="text-sm">"A minimalist logo for a tech startup called 'CloudSync', featuring a stylized cloud with interconnected nodes, modern sans-serif typography, blue and white color scheme, vector style, professional, clean background"</code>
              </div>
              <div class="mt-4 p-4 bg-white rounded-lg">
                <p class="text-gray-600 text-sm mb-2">Result:</p>
                <img src="/src/components/examples/cloudsync-logo.svg" alt="CloudSync Logo Example" class="mx-auto" />
              </div>
            </div>

            <div class="bg-gray-800 p-4 rounded-lg my-4">
              <p><strong>Product Photography:</strong></p>
              <div class="mb-3">
                <code class="text-sm">"Professional product photography of a sleek wireless headphone, studio lighting, white background, commercial photography style, high-end marketing material, 4K quality"</code>
              </div>
              <div class="mt-4 p-4 bg-white rounded-lg">
                <p class="text-gray-600 text-sm mb-2">Result:</p>
                <img src="/src/components/examples/wireless-headphones.svg" alt="Wireless Headphones Example" class="mx-auto max-w-xs" />
              </div>
            </div>

            <h4>Best Practices:</h4>
            <ul>
              <li>Be specific about style, lighting, and composition</li>
              <li>Include technical specifications (resolution, format)</li>
              <li>Specify the intended use (web, print, social media)</li>
              <li>Use professional photography terminology</li>
            </ul>


          `,
          examples: [
            'Creating brand logos with specific color schemes',
            'Generating product mockups for e-commerce',
            'Designing social media graphics with consistent branding'
          ]
        },
        {
          title: 'Midjourney Professional Brand Workflow Masterclass',
          content: `
            <h3>Midjourney for Enterprise Brand Development</h3>
            <p>Midjourney excels at creating artistic and stylized imagery perfect for brand identity and marketing materials.</p>
            
            <h4>Professional Parameters:</h4>
            <ul>
              <li><code>--ar 16:9</code> for social media banners</li>
              <li><code>--ar 1:1</code> for Instagram posts</li>
              <li><code>--ar 3:2</code> for website headers</li>
              <li><code>--quality 2</code> for highest quality output</li>
              <li><code>--stylize 100</code> for more artistic interpretation</li>
            </ul>

            <h4>Brand Consistency Techniques:</h4>
            <div class="bg-gray-800 p-4 rounded-lg my-4">
              <p><strong>Style Reference Example:</strong></p>
              <code>/imagine modern corporate office space, glass walls, natural lighting, professional atmosphere --ar 16:9 --style raw --quality 2</code>
            </div>

            <h4>Advanced Workflow:</h4>
            <ol>
              <li>Create style guides using reference images</li>
              <li>Develop consistent color palettes</li>
              <li>Use remix mode for variations</li>
              <li>Implement batch processing for campaigns</li>
            </ol>
          `,
          examples: [
            'Creating consistent brand imagery across platforms',
            'Developing visual style guides',
            'Generating campaign-specific graphics'
          ]
        }
      ]
    },
    1: { // Module 2: Cinematic Video Production & AI Storytelling
      title: 'Cinematic Video Production & AI Storytelling',
      lessons: [
        {
          title: 'Runway ML Professional Video Generation',
          content: `
            <h3>Runway ML for Professional Video Content</h3>
            <p>Runway ML offers cutting-edge AI video generation tools perfect for creating professional marketing content, explainer videos, and cinematic sequences.</p>
            
            <h4>Key Features:</h4>
            <ul>
              <li>Text-to-video generation</li>
              <li>Image-to-video animation</li>
              <li>Video-to-video style transfer</li>
              <li>Motion brush for precise control</li>
            </ul>

            <h4>Professional Use Cases:</h4>
            <div class="bg-gray-800 p-4 rounded-lg my-4">
              <p><strong>Product Demo Video:</strong></p>
              <code>"A sleek smartphone rotating slowly on a white background, professional product photography lighting, smooth 360-degree rotation, commercial quality"</code>
            </div>

            <div class="bg-gray-800 p-4 rounded-lg my-4">
              <p><strong>Corporate Intro:</strong></p>
              <code>"Modern office building exterior, camera slowly panning upward, golden hour lighting, professional corporate atmosphere, cinematic quality"</code>
            </div>

            <h4>Technical Specifications:</h4>
            <ul>
              <li>Output resolution: Up to 1280x768</li>
              <li>Duration: 4-16 seconds per generation</li>
              <li>Frame rate: 24 FPS</li>
              <li>Export formats: MP4, GIF</li>
            </ul>


          `,
          examples: [
            'Creating product demonstration videos',
            'Generating background footage for presentations',
            'Producing social media video content'
          ]
        },
        {
          title: 'Synthesia Enterprise AI Avatars & Brand Alignment',
          content: `
            <h3>Professional AI Avatar Creation with Synthesia</h3>
            <p>Synthesia enables creation of professional AI presenters for corporate communications, training videos, and customer-facing content.</p>
            
            <h4>Enterprise Features:</h4>
            <ul>
              <li>Custom avatar creation</li>
              <li>Multi-language support (120+ languages)</li>
              <li>Brand-consistent backgrounds</li>
              <li>Professional voice synthesis</li>
            </ul>

            <h4>Script Writing Best Practices:</h4>
            <div class="bg-gray-800 p-4 rounded-lg my-4">
              <p><strong>Corporate Training Example:</strong></p>
              <code>"Welcome to our quarterly safety training. Today we'll cover three essential protocols that ensure workplace safety. First, let's discuss emergency evacuation procedures..."</code>
            </div>

            <h4>Production Workflow:</h4>
            <ol>
              <li>Script development and approval</li>
              <li>Avatar selection and customization</li>
              <li>Background and branding setup</li>
              <li>Voice and pacing optimization</li>
              <li>Quality review and export</li>
            </ol>
          `,
          examples: [
            'Creating training and onboarding videos',
            'Developing multilingual marketing content',
            'Producing consistent corporate communications'
          ]
        }
      ]
    },
    2: { // Module 3: Advanced Animation & Motion Graphics
      title: 'Advanced Animation & Motion Graphics',
      lessons: [
        {
          title: 'AI-Powered Animation Fundamentals',
          content: `
            <h3>Transform Static Images into Dynamic Animations</h3>
            <p>Learn to create professional animations using AI-powered tools that bring static designs to life with smooth, engaging motion.</p>
            
            <h4>Key Animation Principles:</h4>
            <ul>
              <li>Timing and spacing for natural movement</li>
              <li>Easing functions for realistic motion</li>
              <li>Keyframe optimization</li>
              <li>Motion path planning</li>
            </ul>

            <h4>Professional Tools & Techniques:</h4>
            <div class="bg-gray-800 p-4 rounded-lg my-4">
              <p><strong>Logo Animation Example:</strong></p>
              <code>"Animate a corporate logo with a smooth fade-in effect, followed by a subtle scale animation, professional timing, 3-second duration"</code>
            </div>

            <div class="bg-gray-800 p-4 rounded-lg my-4">
              <p><strong>Product Showcase Animation:</strong></p>
              <code>"Create a 360-degree product rotation animation, smooth camera movement, professional lighting, 5-second loop"</code>
            </div>

            <h4>Animation Formats & Export:</h4>
            <ul>
              <li>MP4 for web and social media</li>
              <li>GIF for lightweight animations</li>
              <li>WebM for web optimization</li>
              <li>MOV for professional video editing</li>
            </ul>


          `,
          examples: [
            'Creating animated logos and brand elements',
            'Developing product showcase animations',
            'Building interactive web animations'
          ]
        },
        {
          title: 'Motion Graphics for Marketing',
          content: `
            <h3>Professional Motion Graphics for Business</h3>
            <p>Master the art of creating compelling motion graphics that drive engagement and communicate complex ideas effectively.</p>
            
            <h4>Marketing Animation Types:</h4>
            <ul>
              <li>Explainer video animations</li>
              <li>Social media motion graphics</li>
              <li>Product feature highlights</li>
              <li>Data visualization animations</li>
            </ul>

            <h4>Brand Consistency in Motion:</h4>
            <div class="bg-gray-800 p-4 rounded-lg my-4">
              <p><strong>Brand Guidelines Integration:</strong></p>
              <ul class="text-sm">
                <li>Use consistent color palettes throughout animations</li>
                <li>Maintain typography hierarchy in motion</li>
                <li>Apply brand-specific timing and easing</li>
                <li>Ensure logo animations follow brand standards</li>
              </ul>
            </div>

            <h4>Performance Optimization:</h4>
            <ul>
              <li>Optimize file sizes for web delivery</li>
              <li>Choose appropriate frame rates</li>
              <li>Compress animations without quality loss</li>
              <li>Test across different devices and platforms</li>
            </ul>
          `,
          examples: [
            'Creating animated infographics',
            'Developing social media story animations',
            'Building interactive presentation elements'
          ]
        }
      ]
    },
    3: { // Module 4: Enterprise JSON Prompts & Automated Data Systems
      title: 'Enterprise JSON Prompts & Automated Data Systems',
      lessons: [
        {
          title: 'Structured JSON Prompt Engineering',
          content: `
            <h3>Build Scalable Data Generation Systems</h3>
            <p>Learn to create sophisticated JSON-based prompt systems that generate consistent, structured data for enterprise applications.</p>
            
            <h4>JSON Prompt Structure:</h4>
            <div class="bg-gray-800 p-4 rounded-lg my-4">
              <p><strong>Basic JSON Prompt Template:</strong></p>
              <pre class="text-sm"><code>{
  "task": "generate_product_description",
  "parameters": {
    "product_type": "software",
    "tone": "professional",
    "length": "150-200 words",
    "include_features": true,
    "target_audience": "enterprise"
  },
  "output_format": {
    "title": "string",
    "description": "string",
    "key_features": ["array of strings"],
    "call_to_action": "string"
  }
}</code></pre>
            </div>

            <h4>Advanced Prompt Patterns:</h4>
            <ul>
              <li>Conditional logic in prompts</li>
              <li>Dynamic parameter injection</li>
              <li>Multi-step prompt chains</li>
              <li>Error handling and validation</li>
            </ul>

            <h4>Enterprise Use Cases:</h4>
            <div class="bg-gray-800 p-4 rounded-lg my-4">
              <p><strong>Customer Support Automation:</strong></p>
              <pre class="text-sm"><code>{
  "task": "generate_support_response",
  "context": {
    "customer_tier": "premium",
    "issue_category": "technical",
    "urgency": "high"
  },
  "response_guidelines": {
    "tone": "empathetic_professional",
    "include_steps": true,
    "escalation_path": "technical_team"
  }
}</code></pre>
            </div>


          `,
          examples: [
            'Building automated content generation systems',
            'Creating structured data extraction workflows',
            'Developing API-driven prompt systems'
          ]
        },
        {
          title: 'Automated Data Processing Workflows',
          content: `
            <h3>Enterprise-Scale Data Automation</h3>
            <p>Implement robust automated systems that process and generate data at scale using AI-powered JSON prompts.</p>
            
            <h4>Workflow Architecture:</h4>
            <ul>
              <li>Input validation and sanitization</li>
              <li>Prompt template management</li>
              <li>Batch processing capabilities</li>
              <li>Output formatting and validation</li>
            </ul>

            <h4>Quality Assurance:</h4>
            <div class="bg-gray-800 p-4 rounded-lg my-4">
              <p><strong>Validation Pipeline:</strong></p>
              <ul class="text-sm">
                <li>Schema validation for JSON outputs</li>
                <li>Content quality scoring</li>
                <li>Automated testing frameworks</li>
                <li>Human-in-the-loop review processes</li>
              </ul>
            </div>

            <h4>Monitoring & Analytics:</h4>
            <ul>
              <li>Performance metrics tracking</li>
              <li>Cost optimization strategies</li>
              <li>Error rate monitoring</li>
              <li>Usage analytics and reporting</li>
            </ul>
          `,
          examples: [
            'Setting up automated report generation',
            'Building data transformation pipelines',
            'Creating quality assurance workflows'
          ]
        }
      ]
    },
    4: { // Module 5: Multi-Platform AI Agent Networks
      title: 'Multi-Platform AI Agent Networks',
      lessons: [
        {
          title: 'AI Agent Architecture & Design',
          content: `
            <h3>Create Intelligent Automation Networks</h3>
            <p>Design and implement sophisticated AI agent networks that work across multiple platforms to automate complex business processes.</p>
            
            <h4>Agent Network Components:</h4>
            <ul>
              <li>Central orchestration hub</li>
              <li>Specialized task agents</li>
              <li>Communication protocols</li>
              <li>State management systems</li>
            </ul>

            <h4>Platform Integration:</h4>
            <div class="bg-gray-800 p-4 rounded-lg my-4">
              <p><strong>Multi-Platform Agent Example:</strong></p>
              <pre class="text-sm"><code>{
  "agent_network": {
    "coordinator": "central_hub",
    "agents": [
      {
        "name": "content_creator",
        "platform": "openai_gpt4",
        "role": "content_generation"
      },
      {
        "name": "image_processor", 
        "platform": "dall_e_3",
        "role": "visual_content"
      },
      {
        "name": "data_analyzer",
        "platform": "claude_3",
        "role": "data_analysis"
      }
    ]
  }
}</code></pre>
            </div>

            <h4>Communication Patterns:</h4>
            <ul>
              <li>Event-driven messaging</li>
              <li>Request-response protocols</li>
              <li>Publish-subscribe systems</li>
              <li>Workflow orchestration</li>
            </ul>


          `,
          examples: [
            'Building cross-platform automation workflows',
            'Creating intelligent content distribution systems',
            'Developing multi-agent customer service networks'
          ]
        },
        {
          title: 'Enterprise Integration & Scaling',
          content: `
            <h3>Scale AI Agent Networks for Enterprise</h3>
            <p>Learn to deploy and scale AI agent networks in enterprise environments with proper security, monitoring, and governance.</p>
            
            <h4>Enterprise Requirements:</h4>
            <ul>
              <li>Security and compliance frameworks</li>
              <li>Scalability and performance optimization</li>
              <li>Monitoring and observability</li>
              <li>Disaster recovery and failover</li>
            </ul>

            <h4>Deployment Strategies:</h4>
            <div class="bg-gray-800 p-4 rounded-lg my-4">
              <p><strong>Cloud-Native Architecture:</strong></p>
              <ul class="text-sm">
                <li>Containerized agent deployment</li>
                <li>Kubernetes orchestration</li>
                <li>Auto-scaling based on demand</li>
                <li>Load balancing and traffic management</li>
              </ul>
            </div>

            <h4>Governance & Compliance:</h4>
            <ul>
              <li>Agent behavior auditing</li>
              <li>Data privacy protection</li>
              <li>Regulatory compliance monitoring</li>
              <li>Access control and permissions</li>
            </ul>
          `,
          examples: [
            'Implementing enterprise-grade agent networks',
            'Setting up monitoring and alerting systems',
            'Creating compliance and audit frameworks'
          ]
        }
      ]
    },
    5: { // Module 6: Enterprise Claude AI Mastery
      title: 'Enterprise Claude AI Mastery',
      lessons: [
        {
          title: 'Advanced Claude AI Integration',
          content: `
            <h3>Develop Enterprise Applications with Claude AI</h3>
            <p>Master advanced Claude AI capabilities for building sophisticated enterprise applications with enhanced reasoning and analysis.</p>
            
            <h4>Claude AI Capabilities:</h4>
            <ul>
              <li>Advanced reasoning and analysis</li>
              <li>Long-form content generation</li>
              <li>Code analysis and generation</li>
              <li>Complex problem solving</li>
            </ul>

            <h4>Enterprise Integration Patterns:</h4>
            <div class="bg-gray-800 p-4 rounded-lg my-4">
              <p><strong>API Integration Example:</strong></p>
              <pre class="text-sm"><code>{
  "model": "claude-3-opus-20240229",
  "max_tokens": 4000,
  "messages": [
    {
      "role": "system",
      "content": "You are an enterprise AI assistant specialized in business analysis and strategic planning."
    },
    {
      "role": "user", 
      "content": "Analyze the quarterly sales data and provide strategic recommendations."
    }
  ],
  "temperature": 0.3
}</code></pre>
            </div>

            <h4>Advanced Use Cases:</h4>
            <ul>
              <li>Business intelligence and analytics</li>
              <li>Document analysis and summarization</li>
              <li>Code review and optimization</li>
              <li>Strategic planning assistance</li>
            </ul>


          `,
          examples: [
            'Building intelligent document processing systems',
            'Creating AI-powered business analytics tools',
            'Developing advanced chatbot applications'
          ]
        },
        {
          title: 'Production Deployment & Optimization',
          content: `
            <h3>Deploy Claude AI in Production Environments</h3>
            <p>Learn best practices for deploying Claude AI applications in production with proper monitoring, optimization, and maintenance.</p>
            
            <h4>Production Considerations:</h4>
            <ul>
              <li>Rate limiting and quota management</li>
              <li>Error handling and retry logic</li>
              <li>Response caching strategies</li>
              <li>Cost optimization techniques</li>
            </ul>

            <h4>Performance Optimization:</h4>
            <div class="bg-gray-800 p-4 rounded-lg my-4">
              <p><strong>Optimization Strategies:</strong></p>
              <ul class="text-sm">
                <li>Prompt engineering for efficiency</li>
                <li>Response streaming for better UX</li>
                <li>Intelligent caching mechanisms</li>
                <li>Load balancing across regions</li>
              </ul>
            </div>

            <h4>Monitoring & Analytics:</h4>
            <ul>
              <li>Usage tracking and analytics</li>
              <li>Performance metrics monitoring</li>
              <li>Cost analysis and optimization</li>
              <li>User experience measurement</li>
            </ul>
          `,
          examples: [
            'Setting up production monitoring systems',
            'Implementing cost optimization strategies',
            'Creating performance dashboards'
          ]
        }
      ]
    }
    // Additional modules would be added here...
  };

  const resources = [
    {
      type: 'video',
      title: 'AI Tools Mastery Introduction',
      duration: '15 min',
      description: 'Overview of the complete AI Tools Mastery program'
    },
    {
      type: 'document',
      title: 'Course Handbook & Guidelines',
      duration: '30 min read',
      description: 'Complete guide to course structure and requirements'
    },
    {
      type: 'video',
      title: 'Setting Up Your AI Toolkit',
      duration: '45 min',
      description: 'Step-by-step setup for all AI tools and platforms'
    },
    {
      type: 'document',
      title: 'Enterprise AI Best Practices',
      duration: '20 min read',
      description: 'Professional guidelines for AI tool usage in business'
    }
  ];

  // Study Material View Component
  const StudyMaterialView = () => {
    const currentModule = studyMaterials[activeModule];
    const currentLesson = currentModule?.lessons[currentTopic];

    if (!currentModule || !currentLesson) {
      return (
        <div className="text-center text-white">
          <p>Study material not available for this module yet.</p>
          <button 
            onClick={() => setIsStudying(false)}
            className="mt-4 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
          >
            Back to Modules
          </button>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-black relative overflow-hidden">
        {/* MagnetLines Background */}
        <div className="fixed inset-0 z-0">
          <MagnetLines 
            rows={12}
            columns={12}
            containerSize="100vw"
            lineColor="#666666"
            lineWidth="0.5vmin"
            lineHeight="4vmin"
            baseAngle={0}
            style={{ 
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              opacity: 0.3
            }}
          />
        </div>

        {/* Study Material Header */}
        <div className="relative z-10 bg-black/40 backdrop-blur-sm border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsStudying(false)}
                  className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2"
                >
                  <ArrowLeftIcon className="h-5 w-5" />
                  <span>Back to Modules</span>
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-white">{currentModule.title}</h1>
                  <p className="text-gray-300">{currentLesson.title}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-400">
                  Lesson {currentTopic + 1} of {currentModule.lessons.length}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Study Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-black/60 backdrop-blur-sm rounded-xl p-8 border border-gray-800">
                <div className="prose prose-invert max-w-none">
                  <div 
                    dangerouslySetInnerHTML={{ __html: currentLesson.content }}
                    className="text-gray-300 leading-relaxed"
                    style={{
                      fontSize: '16px',
                      lineHeight: '1.7'
                    }}
                  />
                </div>

                {/* Practical Examples Section */}
                <div className="mt-8 p-6 bg-gray-900/60 rounded-lg border border-gray-700">
                  <div className="flex items-center space-x-2 mb-4">
                    <LightBulbIcon className="h-6 w-6 text-yellow-400" />
                    <h3 className="text-xl font-semibold text-white">Practical Examples</h3>
                  </div>
                  <div className="space-y-3">
                    {currentLesson.examples.map((example, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-300">{example}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Navigation */}
                <div className="mt-8 flex justify-between items-center">
                  <button
                    onClick={() => setCurrentTopic(Math.max(0, currentTopic - 1))}
                    disabled={currentTopic === 0}
                    className="bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-500 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
                  >
                    <ArrowLeftIcon className="h-4 w-4" />
                    <span>Previous Lesson</span>
                  </button>
                  
                  <div className="text-center">
                    <div className="text-sm text-gray-400 mb-2">Progress</div>
                    <div className="w-48 bg-gray-800 rounded-full h-2">
                      <div 
                        className="bg-gray-600 h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${((currentTopic + 1) / currentModule.lessons.length) * 100}%` }}
                      ></div>
                    </div>
                  </div>

                  <button
                    onClick={() => setCurrentTopic(Math.min(currentModule.lessons.length - 1, currentTopic + 1))}
                    disabled={currentTopic === currentModule.lessons.length - 1}
                    className="bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-500 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
                  >
                    <span>Next Lesson</span>
                    <ChevronRightIcon className="h-4 w-4" />
                  </button>
                </div>

                {/* Mark as Complete Button */}
                {currentTopic === currentModule.lessons.length - 1 && !getModuleProgress(currentModule.id).completed && (
                  <div className="mt-6 text-center">
                    <button
                      onClick={() => markModuleComplete(currentModule.id)}
                      className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors flex items-center space-x-2 mx-auto"
                    >
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Mark Module as Complete</span>
                    </button>
                  </div>
                )}

                {/* Module Completed Message */}
                {getModuleProgress(currentModule.id).completed && (
                  <div className="mt-6 text-center">
                    <div className="bg-green-900/40 border border-green-700 rounded-lg p-4">
                      <div className="flex items-center justify-center space-x-2 text-green-400">
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-semibold">Module Completed!</span>
                      </div>
                      <p className="text-green-300 text-sm mt-2">Great job! You've successfully completed this module.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-black/60 backdrop-blur-sm rounded-xl p-6 border border-gray-800 sticky top-8 min-w-[350px]">
                <h3 className="text-lg font-semibold text-white mb-4">Module Lessons</h3>
                <div className="space-y-2">
                  {currentModule.lessons.map((lesson, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentTopic(index)}
                      className={`w-full text-left p-3 rounded-lg transition-colors ${
                        currentTopic === index
                          ? 'bg-gray-700 text-white'
                          : 'bg-gray-900/40 text-gray-400 hover:bg-gray-800/40 hover:text-white'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0 mt-0.5 ${
                          currentTopic === index ? 'bg-white text-black' : 'bg-gray-700 text-gray-300'
                        }`}>
                          {index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium leading-tight">{lesson.title}</div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Try It Now Section */}
                <div className="mt-6 p-4 bg-blue-900/30 border border-blue-500/30 rounded-lg">
                  <h4 className="text-blue-300 font-semibold mb-3">🚀 Try It Now!</h4>
                  <p className="text-gray-300 text-sm mb-4">Ready to create your own professional content? Try these cutting-edge AI tools:</p>
                  
                  {/* Image Generation Tools */}
                  <div className="mb-4">
                    <h5 className="text-blue-200 text-xs font-medium mb-2 uppercase tracking-wide">🎨 Image Generation</h5>
                    <div className="flex flex-col gap-2">
                      <StarBorder 
                        as="a" 
                        href="https://openai.com/dall-e-3" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block text-center"
                        color="cyan"
                        speed="5s"
                      >
                        <div className="flex items-center justify-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                          </svg>
                          Try DALL-E 3
                        </div>
                      </StarBorder>
                      <StarBorder 
                        as="a" 
                        href="https://www.midjourney.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block text-center"
                        color="purple"
                        speed="5s"
                      >
                        <div className="flex items-center justify-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                          </svg>
                          Try Midjourney
                        </div>
                      </StarBorder>
                    </div>
                  </div>

                  {/* Video Generation Tools */}
                  <div className="mb-4">
                    <h5 className="text-green-200 text-xs font-medium mb-2 uppercase tracking-wide">🎬 Video Generation</h5>
                    <div className="flex flex-col gap-2">
                      <StarBorder 
                        as="a" 
                        href="https://veo.google" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block text-center"
                        color="green"
                        speed="5s"
                      >
                        <div className="flex items-center justify-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                          </svg>
                          Try Veo 3 (Google)
                        </div>
                      </StarBorder>
                      <StarBorder 
                        as="a" 
                        href="https://klingai.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block text-center"
                        color="orange"
                        speed="5s"
                      >
                        <div className="flex items-center justify-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                          </svg>
                          Try Kling AI
                        </div>
                      </StarBorder>
                      <StarBorder 
                        as="a" 
                        href="https://runwayml.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block text-center"
                        color="pink"
                        speed="5s"
                      >
                        <div className="flex items-center justify-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                          </svg>
                          Try Runway ML
                        </div>
                      </StarBorder>
                    </div>
                  </div>

                  {/* Automation Tools */}
                  <div>
                    <h5 className="text-yellow-200 text-xs font-medium mb-2 uppercase tracking-wide">⚡ Automation & Workflows</h5>
                    <div className="flex flex-col gap-2">
                      <StarBorder 
                        as="a" 
                        href="https://n8n.io" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block text-center"
                        color="yellow"
                        speed="5s"
                      >
                        <div className="flex items-center justify-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                          </svg>
                          Try n8n Automation
                        </div>
                      </StarBorder>
                      <StarBorder 
                        as="a" 
                        href="https://zapier.com" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block text-center"
                        color="indigo"
                        speed="5s"
                      >
                        <div className="flex items-center justify-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                          </svg>
                          Try Zapier
                        </div>
                      </StarBorder>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // If studying, show study material view
  if (isStudying) {
    return <StudyMaterialView />;
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* MagnetLines Background */}
      <div className="fixed inset-0 z-0">
        <MagnetLines 
          rows={12}
          columns={12}
          containerSize="100vw"
          lineColor="#666666"
          lineWidth="0.5vmin"
          lineHeight="4vmin"
          baseAngle={0}
          style={{ 
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            opacity: 0.3
          }}
        />
      </div>

      {/* Logo Loop - Left Side */}
      <div className="fixed left-6 top-1/2 transform -translate-y-1/2 z-20 hidden lg:block">
        <LogoLoop 
          direction="up"
          speed={25}
          height="500px"
          width="80px"
          logoHeight={60}
          gap={30}
          pauseOnHover={true}
          scaleOnHover={true}
          fadeOut={true}
          fadeOutColor="rgba(0, 0, 0, 0.9)"
          logos={[
            { 
              node: (
                <div className="w-14 h-14 bg-white rounded-lg flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-10 h-10" fill="#10a37f">
                    <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142-.0852 4.783-2.7582a.7712.7712 0 0 0 .7806 0l5.8428 3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"/>
                  </svg>
                </div>
              ),
              title: "OpenAI DALL-E 3", 
              href: "https://openai.com/dall-e-3" 
            },
            { 
              node: (
                <div className="w-14 h-14 bg-white rounded-lg flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-10 h-10" fill="#000">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.568 8.16c-.169 1.858-.896 3.433-2.043 4.568-.686.68-1.509 1.154-2.415 1.395-.906.24-1.857.24-2.763 0-.906-.241-1.729-.715-2.415-1.395C6.785 11.593 6.058 10.018 5.889 8.16c-.084-.927-.084-1.857 0-2.784.169-1.858.896-3.433 2.043-4.568C8.618.128 9.441-.346 10.347-.587c.906-.24 1.857-.24 2.763 0 .906.241 1.729.715 2.415 1.395 1.147 1.135 1.874 2.71 2.043 4.568.084.927.084 1.857 0 2.784z"/>
                  </svg>
                </div>
              ),
              title: "Midjourney", 
              href: "https://www.midjourney.com" 
            },
            { 
              node: (
                <div className="w-14 h-14 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">R</span>
                </div>
              ),
              title: "Runway ML", 
              href: "https://runwayml.com" 
            },
            { 
              node: (
                <div className="w-14 h-14 bg-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">S</span>
                </div>
              ),
              title: "Synthesia", 
              href: "https://www.synthesia.io" 
            },
            { 
              node: (
                <div className="w-14 h-14 bg-orange-500 rounded-lg flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-10 h-10 text-white" fill="currentColor">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </div>
              ),
              title: "Claude AI", 
              href: "https://console.anthropic.com" 
            },
            { 
              node: (
                <div className="w-14 h-14 bg-orange-400 rounded-lg flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-10 h-10 text-white" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
              ),
              title: "Zapier", 
              href: "https://zapier.com" 
            },
            { 
              node: (
                <div className="w-14 h-14 bg-red-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">n8n</span>
                </div>
              ),
              title: "n8n", 
              href: "https://n8n.io" 
            },
            { 
              node: (
                <div className="w-14 h-14 bg-blue-600 rounded-lg flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-10 h-10 text-white" fill="currentColor">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                </div>
              ),
              title: "ChatGPT", 
              href: "https://chat.openai.com" 
            }
          ]}
        />
      </div>

      {/* Header */}
      <div className="relative z-10 bg-black/40 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/student-portal')}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ← Back to Portal
              </button>
              <div>
                <h1 className="text-3xl font-bold text-white">A.I Tools Mastery</h1>
                <p className="text-gray-300">Professional Certification Program</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">24</div>
                <div className="text-sm text-gray-400">Weeks</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">50+</div>
                <div className="text-sm text-gray-400">AI Tools</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">12</div>
                <div className="text-sm text-gray-400">Projects</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Overview */}
            <div className="bg-black/60 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
              <h2 className="text-2xl font-bold text-white mb-4">Course Overview</h2>
              <p className="text-gray-300 mb-6">
                Master 50+ cutting-edge AI tools with hands-on industry projects. From DALL-E 3 & Midjourney to Claude API & enterprise automation. 
                Includes 1-on-1 mentorship, portfolio development, job placement assistance, and lifetime access to updates.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-800/60 rounded-lg p-4 text-center border border-gray-700">
                  <AcademicCapIcon className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                  <div className="text-white font-semibold">Professional Certification</div>
                  <div className="text-sm text-gray-400">Industry-Recognized</div>
                </div>
                <div className="bg-gray-800/60 rounded-lg p-4 text-center border border-gray-700">
                  <UserGroupIcon className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                  <div className="text-white font-semibold">1-on-1 Mentorship</div>
                  <div className="text-sm text-gray-400">Weekly Sessions</div>
                </div>
                <div className="bg-gray-800/60 rounded-lg p-4 text-center border border-gray-700">
                  <StarIcon className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                  <div className="text-white font-semibold">Lifetime Access</div>
                  <div className="text-sm text-gray-400">Course Updates</div>
                </div>
              </div>
            </div>

            {/* Course Modules */}
            <div className="bg-black/60 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
              <h2 className="text-2xl font-bold text-white mb-6">Course Modules</h2>
              <div className="space-y-4">
                {modules.map((module, index) => (
                  <div
                    key={module.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      activeModule === index
                        ? 'border-gray-600 bg-gray-800/60'
                        : 'border-gray-800 bg-gray-900/40 hover:bg-gray-800/40'
                    }`}
                    onClick={() => setActiveModule(index)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          module.completed ? 'bg-gray-600' : 'bg-gray-700'
                        }`}>
                          {getModuleProgress(module.id).completed ? (
                            <CheckCircleIcon className="h-6 w-6 text-green-400" />
                          ) : (
                            <span className="text-white font-semibold">{module.id}</span>
                          )}
                        </div>
                        <div>
                          <h3 className="text-white font-semibold">{module.title}</h3>
                          <p className="text-gray-400 text-sm">{module.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="text-sm text-gray-400">{module.duration}</div>
                          <div className="text-xs text-gray-500">{getModuleProgress(module.id).progress}% Complete</div>
                        </div>
                        <ChevronRightIcon className="h-5 w-5 text-gray-500" />
                      </div>
                    </div>
                    
                    {activeModule === index && (
                      <div className="mt-4 pt-4 border-t border-gray-800">
                        <h4 className="text-white font-medium mb-3">Topics Covered:</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {module.topics.map((topic, topicIndex) => (
                            <div key={topicIndex} className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
                              <span className="text-gray-400 text-sm">{topic}</span>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 flex space-x-3">
                          <button 
                            onClick={() => {
                              setIsStudying(true);
                              setCurrentTopic(0);
                            }}
                            className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2"
                          >
                            <PlayIcon className="h-4 w-4" />
                            <span>Start Module</span>
                          </button>
                          <button className="bg-gray-800/60 hover:bg-gray-700/60 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-gray-700">
                            View Materials
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Resources */}
            <div className="bg-black/60 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
              <h3 className="text-xl font-bold text-white mb-4">Quick Resources</h3>
              <div className="space-y-3">
                {resources.map((resource, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-gray-900/40 rounded-lg hover:bg-gray-800/40 transition-colors cursor-pointer border border-gray-800">
                    {resource.type === 'video' ? (
                      <PlayIcon className="h-5 w-5 text-gray-400" />
                    ) : (
                      <DocumentTextIcon className="h-5 w-5 text-gray-400" />
                    )}
                    <div className="flex-1">
                      <div className="text-white text-sm font-medium">{resource.title}</div>
                      <div className="text-gray-500 text-xs">{resource.duration}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress Overview */}
            <div className="bg-black/60 backdrop-blur-sm rounded-xl p-6 border border-gray-800">
              <h3 className="text-xl font-bold text-white mb-4">Your Progress</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Overall Progress</span>
                    <span className="text-white">{calculateOverallProgress()}%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full transition-all duration-300" style={{ width: `${calculateOverallProgress()}%` }}></div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-white">{getCompletedModulesCount()}</div>
                    <div className="text-sm text-gray-400">Modules Completed</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-white">{modules.length}</div>
                    <div className="text-sm text-gray-400">Total Modules</div>
                  </div>
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>
    </div>
  );
};

export default AIStudyMaterial;