const mongoose = require('mongoose');
const Course = require('../models/Course');
require('dotenv').config();

// Updated courses data as requested
const coursesData = [
  {
    courseId: 'FRONTEND-BEGINNER',
    title: 'Frontend Development - Beginner',
    description: 'Learn the fundamentals of frontend development with HTML, CSS, and JavaScript. Perfect for beginners who want to start their web development journey.',
    category: 'Frontend Development',
    level: 'Beginner',
    price: 299,
    discountPrice: 199,
    discountCode: 'FRONTEND20',
    duration: '8 weeks',
    modules: [
      {
        title: 'HTML Fundamentals',
        duration: '2 weeks',
        topics: ['HTML Structure', 'Semantic HTML', 'Forms and Input', 'HTML5 Features']
      },
      {
        title: 'CSS Styling',
        duration: '3 weeks',
        topics: ['CSS Selectors', 'Box Model', 'Flexbox', 'Grid Layout', 'Responsive Design']
      },
      {
        title: 'JavaScript Basics',
        duration: '3 weeks',
        topics: ['Variables and Data Types', 'Functions', 'DOM Manipulation', 'Event Handling']
      }
    ],
    prerequisites: ['Basic computer skills', 'Text editor familiarity'],
    learningOutcomes: [
      'Build responsive websites with HTML and CSS',
      'Create interactive web pages with JavaScript',
      'Understand modern web development practices',
      'Deploy websites to the internet'
    ],
    instructor: {
      name: 'Sarah Johnson',
      bio: 'Senior Frontend Developer with 8+ years of experience in building modern web applications.',
      experience: '8+ years in Frontend Development, worked at Google and Microsoft'
    }
  },
  {
    courseId: 'FRONTEND-INTERMEDIATE',
    title: 'Frontend Development - Intermediate',
    description: 'Advance your frontend skills with modern frameworks, advanced CSS techniques, and JavaScript ES6+ features.',
    category: 'Frontend Development',
    level: 'Intermediate',
    price: 399,
    discountPrice: 299,
    discountCode: 'FRONTEND25',
    duration: '10 weeks',
    modules: [
      {
        title: 'Advanced CSS',
        duration: '2 weeks',
        topics: ['CSS Grid Advanced', 'Animations', 'Preprocessors', 'CSS-in-JS']
      },
      {
        title: 'Modern JavaScript',
        duration: '3 weeks',
        topics: ['ES6+ Features', 'Async/Await', 'Modules', 'Build Tools']
      },
      {
        title: 'React Fundamentals',
        duration: '3 weeks',
        topics: ['Components', 'State Management', 'Hooks', 'Routing']
      },
      {
        title: 'Project Development',
        duration: '2 weeks',
        topics: ['Full Application Build', 'Testing', 'Deployment']
      }
    ],
    prerequisites: ['HTML, CSS, JavaScript basics', 'Completed Frontend Beginner or equivalent'],
    learningOutcomes: [
      'Build modern web applications with React',
      'Master advanced CSS techniques and animations',
      'Implement modern JavaScript patterns',
      'Deploy production-ready applications'
    ],
    instructor: {
      name: 'Emily Rodriguez',
      bio: 'React specialist and UI/UX expert with extensive experience in modern frontend development.',
      experience: '6+ years in Frontend Development, Senior Developer at Airbnb'
    }
  },
  {
    courseId: 'FRONTEND-ADVANCED',
    title: 'Frontend Development - Advanced',
    description: 'Master advanced frontend concepts including performance optimization, advanced state management, and modern development workflows.',
    category: 'Frontend Development',
    level: 'Advanced',
    price: 599,
    discountPrice: 449,
    discountCode: 'FRONTEND30',
    duration: '12 weeks',
    modules: [
      {
        title: 'Advanced React Patterns',
        duration: '3 weeks',
        topics: ['Context API', 'Custom Hooks', 'Higher-Order Components', 'Render Props']
      },
      {
        title: 'State Management',
        duration: '3 weeks',
        topics: ['Redux Toolkit', 'Zustand', 'React Query', 'Global State Patterns']
      },
      {
        title: 'Performance Optimization',
        duration: '3 weeks',
        topics: ['Code Splitting', 'Lazy Loading', 'Memoization', 'Bundle Analysis']
      },
      {
        title: 'Advanced Tooling',
        duration: '3 weeks',
        topics: ['Webpack Configuration', 'TypeScript', 'Testing Strategies', 'CI/CD']
      }
    ],
    prerequisites: ['React experience', 'Completed Frontend Intermediate or equivalent'],
    learningOutcomes: [
      'Architect scalable frontend applications',
      'Optimize application performance',
      'Implement advanced React patterns',
      'Lead frontend development teams'
    ],
    instructor: {
      name: 'Michael Chen',
      bio: 'Senior Frontend Architect with expertise in large-scale application development.',
      experience: '10+ years in Frontend Development, Lead Engineer at Netflix'
    }
  },
  {
    courseId: 'DEVOPS-BEGINNER',
    title: 'DevOps - Beginner',
    description: 'Introduction to DevOps practices, version control, basic automation, and deployment fundamentals.',
    category: 'DevOps',
    level: 'Beginner',
    price: 349,
    discountPrice: 249,
    discountCode: 'DEVOPS20',
    duration: '8 weeks',
    modules: [
      {
        title: 'DevOps Fundamentals',
        duration: '2 weeks',
        topics: ['DevOps Culture', 'Version Control with Git', 'Linux Basics', 'Command Line']
      },
      {
        title: 'Basic Automation',
        duration: '2 weeks',
        topics: ['Shell Scripting', 'Basic CI/CD', 'Automated Testing', 'Build Tools']
      },
      {
        title: 'Deployment Basics',
        duration: '2 weeks',
        topics: ['Server Management', 'Basic Docker', 'Environment Configuration']
      },
      {
        title: 'Monitoring & Logging',
        duration: '2 weeks',
        topics: ['Basic Monitoring', 'Log Management', 'Performance Metrics']
      }
    ],
    prerequisites: ['Basic programming knowledge', 'Familiarity with command line'],
    learningOutcomes: [
      'Understand DevOps principles and practices',
      'Set up basic CI/CD pipelines',
      'Deploy applications to cloud platforms',
      'Implement basic monitoring and logging'
    ],
    instructor: {
      name: 'David Kumar',
      bio: 'DevOps engineer with experience in automation and cloud infrastructure.',
      experience: '7+ years in DevOps, Senior Engineer at Amazon'
    }
  },
  {
    courseId: 'DEVOPS-ADVANCED',
    title: 'DevOps - Advanced',
    description: 'Master advanced DevOps practices with Kubernetes, infrastructure as code, and enterprise-level automation.',
    category: 'DevOps',
    level: 'Advanced',
    price: 599,
    discountPrice: 449,
    discountCode: 'DEVOPS30',
    duration: '14 weeks',
    modules: [
      {
        title: 'Container Orchestration',
        duration: '4 weeks',
        topics: ['Kubernetes Architecture', 'Pod Management', 'Services & Ingress', 'Scaling Strategies']
      },
      {
        title: 'Infrastructure as Code',
        duration: '3 weeks',
        topics: ['Terraform', 'Ansible', 'CloudFormation', 'Infrastructure Automation']
      },
      {
        title: 'Advanced CI/CD',
        duration: '4 weeks',
        topics: ['Jenkins Advanced', 'GitLab CI', 'Blue-Green Deployment', 'Canary Releases']
      },
      {
        title: 'Enterprise DevOps',
        duration: '3 weeks',
        topics: ['Security Integration', 'Compliance', 'Multi-Cloud Strategies', 'Team Scaling']
      }
    ],
    prerequisites: ['DevOps fundamentals', 'Docker experience', 'Cloud platform knowledge'],
    learningOutcomes: [
      'Design enterprise-level DevOps architectures',
      'Implement advanced container orchestration',
      'Automate infrastructure provisioning',
      'Lead DevOps transformation initiatives'
    ],
    instructor: {
      name: 'Alex Thompson',
      bio: 'Principal DevOps Engineer with expertise in large-scale system architecture.',
      experience: '12+ years in DevOps, Principal Engineer at Google'
    }
  },
  {
    courseId: 'MOBILE-ADVANCED',
    title: 'Mobile App Development - Advanced',
    description: 'Master advanced mobile app development with React Native, native modules, and performance optimization.',
    category: 'Mobile Development',
    level: 'Advanced',
    price: 549,
    discountPrice: 399,
    discountCode: 'MOBILE25',
    duration: '12 weeks',
    modules: [
      {
        title: 'Advanced React Native',
        duration: '3 weeks',
        topics: ['Native Modules', 'Bridge Communication', 'Performance Optimization', 'Memory Management']
      },
      {
        title: 'Native Integration',
        duration: '3 weeks',
        topics: ['iOS Native Code', 'Android Native Code', 'Platform-Specific Features']
      },
      {
        title: 'Advanced Features',
        duration: '3 weeks',
        topics: ['Push Notifications', 'Background Tasks', 'Offline Functionality', 'Security']
      },
      {
        title: 'Production & Distribution',
        duration: '3 weeks',
        topics: ['App Store Optimization', 'Code Signing', 'Continuous Deployment', 'Analytics']
      }
    ],
    prerequisites: ['React Native experience', 'Mobile development fundamentals', 'JavaScript proficiency'],
    learningOutcomes: [
      'Build high-performance mobile applications',
      'Integrate native device features',
      'Optimize apps for production deployment',
      'Implement advanced mobile architectures'
    ],
    instructor: {
      name: 'Lisa Wang',
      bio: 'Mobile development specialist with apps used by millions of users worldwide.',
      experience: '9+ years in Mobile Development, Senior Developer at Uber'
    }
  },
  {
    courseId: 'BROWSER-EXTENSIONS',
    title: 'Browser Extensions Development',
    description: 'Learn to build powerful browser extensions for Chrome, Firefox, and other browsers using modern web technologies.',
    category: 'Frontend Development',
    level: 'Intermediate',
    price: 399,
    discountPrice: 299,
    discountCode: 'EXTENSION20',
    duration: '8 weeks',
    modules: [
      {
        title: 'Extension Fundamentals',
        duration: '2 weeks',
        topics: ['Manifest Files', 'Extension Architecture', 'Permissions', 'Browser APIs']
      },
      {
        title: 'Content Scripts & Background',
        duration: '2 weeks',
        topics: ['Content Script Injection', 'Background Scripts', 'Message Passing', 'Storage APIs']
      },
      {
        title: 'UI Development',
        duration: '2 weeks',
        topics: ['Popup Interfaces', 'Options Pages', 'Context Menus', 'Browser Action']
      },
      {
        title: 'Publishing & Distribution',
        duration: '2 weeks',
        topics: ['Chrome Web Store', 'Firefox Add-ons', 'Extension Security', 'Updates & Maintenance']
      }
    ],
    prerequisites: ['JavaScript proficiency', 'HTML/CSS knowledge', 'Basic web development experience'],
    learningOutcomes: [
      'Build and publish browser extensions',
      'Integrate with browser APIs and web pages',
      'Implement secure extension architectures',
      'Distribute extensions across multiple browsers'
    ],
    instructor: {
      name: 'James Rodriguez',
      bio: 'Browser extension specialist with multiple successful extensions in various app stores.',
      experience: '6+ years in Extension Development, Creator of popular productivity extensions'
    }
  }
];

async function seedCourses() {
  try {
    // Connect to MongoDB
    const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/jasnav_projects';
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ Connected to MongoDB');
    
    // Clear existing courses
    await Course.deleteMany({});
    console.log('🗑️  Cleared existing courses (including DATASCIENCE-INTERMEDIATE)');
    
    // Insert new courses
    const insertedCourses = await Course.insertMany(coursesData);
    console.log(`✅ Inserted ${insertedCourses.length} courses`);
    
    // Display inserted courses
    insertedCourses.forEach(course => {
      console.log(`   - ${course.courseId}: ${course.title}`);
    });
    
    console.log('\n🎉 Course seeding completed successfully!');
    console.log('📚 Available courses:');
    console.log('   1. Frontend Development - Beginner');
    console.log('   2. Frontend Development - Intermediate');
    console.log('   3. Frontend Development - Advanced');
    console.log('   4. DevOps - Beginner');
    console.log('   5. DevOps - Advanced');
    console.log('   6. Mobile App Development - Advanced');
    console.log('   7. Browser Extensions Development');
    
  } catch (error) {
    console.error('❌ Error seeding courses:', error);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
}

// Run the seeding function
if (require.main === module) {
  seedCourses();
}

module.exports = { seedCourses, coursesData };