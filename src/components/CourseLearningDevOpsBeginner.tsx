import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import Header from './Header';
import { ArrowLeft, Play, Book, Code, CheckCircle, XCircle, Lightbulb, Clock, Award, Users, Star, Monitor, Send, Sun, Moon, RotateCcw, Terminal, Copy, Download, Upload, Shield, Activity, Cloud, FolderOpen, File } from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  content: string;
  codeExample: string;
  exercises: Exercise[];
  terminalCommands?: string[];
}

interface Exercise {
  id: string;
  question: string;
  initialCode: string;
  solution: string;
  hint: string;
  terminalTask?: string;
}

interface CourseModule {
  id: string;
  title: string;
  lessons: Lesson[];
}

const CourseLearningDevOpsBeginner: React.FC = () => {
  const { courseId, moduleId, lessonId } = useParams();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [currentModule, setCurrentModule] = useState<CourseModule | null>(null);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<'theory' | 'exercise' | 'terminal'>('theory');
  const [currentExerciseId, setCurrentExerciseId] = useState<string | null>(null);
  const [submittedExercises, setSubmittedExercises] = useState<Set<string>>(new Set());
  const [exerciseProgress, setExerciseProgress] = useState<{[key: string]: number}>({});
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const [showFileExplorer, setShowFileExplorer] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  
  // Terminal state
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    'Welcome to DevOps Beginner Terminal!',
    'Type "help" to see available commands.',
    ''
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalRef = useRef<HTMLDivElement>(null);

  // DevOps configuration files
  const fileContents: {[key: string]: string} = {
    'Dockerfile': `# Simple Node.js application Dockerfile
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]`,
    'docker-compose.yml': `version: '3.8'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
    volumes:
      - .:/app
      - /app/node_modules
    depends_on:
      - db

  db:
    image: postgres:13
    environment:
      POSTGRES_DB: myapp
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

volumes:
  postgres_data:`,
    '.gitignore': `# Dependencies
node_modules/
npm-debug.log*

# Environment variables
.env
.env.local

# Build outputs
dist/
build/

# IDE files
.vscode/
.idea/

# OS files
.DS_Store
Thumbs.db

# Docker
.dockerignore`,
    'package.json': `{
  "name": "devops-beginner-app",
  "version": "1.0.0",
  "description": "A simple Node.js app for DevOps learning",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "test": "jest",
    "build": "npm run test"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5"
  },
  "devDependencies": {
    "nodemon": "^3.0.1",
    "jest": "^29.5.0"
  }
}`,
    'index.js': `const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ 
    message: 'Hello DevOps World!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

app.get('/health', (req, res) => {
  res.json({ status: 'healthy', uptime: process.uptime() });
});

// Start server
app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`
  };

  const handleFileClick = (fileName: string) => {
    setSelectedFile(fileName);
    if (fileContents[fileName]) {
      setCode(fileContents[fileName]);
    }
  };

  // DevOps Beginner Course - Module-based
  const courseModules: CourseModule[] = [
    {
      id: 'devops-fundamentals',
      title: 'DevOps Fundamentals',
      lessons: [
        {
          id: 'devops-intro',
          title: 'Introduction to DevOps',
          content: `
            <div style="margin-bottom: 20px; text-align: center;">
              <h3>📹 Video Explanation</h3>
              <div style="width: 100%; max-width: 800px; height: 400px; margin: 0 auto; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; color: white; font-size: 18px; font-weight: bold;">
                📹 Video Explanation Coming Soon
              </div>
              <p style="margin-top: 10px; color: #666; font-size: 14px;">Video explanation coming soon - stay tuned!</p>
            </div>
            
            <h2>🚀 What is DevOps?</h2>
            <p>DevOps is a set of practices that combines software development (Dev) and IT operations (Ops). It aims to shorten the systems development life cycle and provide continuous delivery with high software quality.</p>
            
            <h3>🎯 Key DevOps Principles</h3>
            <ul>
              <li><strong>Collaboration:</strong> Breaking down silos between development and operations teams</li>
              <li><strong>Automation:</strong> Automating repetitive tasks and processes</li>
              <li><strong>Continuous Integration:</strong> Regularly merging code changes</li>
              <li><strong>Continuous Delivery:</strong> Automating the release process</li>
              <li><strong>Monitoring:</strong> Continuous monitoring of applications and infrastructure</li>
            </ul>
            
            <h3>🛠️ DevOps Tools Overview</h3>
            <p>DevOps involves various tools for different stages:</p>
            <ul>
              <li><strong>Version Control:</strong> Git, GitHub, GitLab</li>
              <li><strong>Containerization:</strong> Docker, Kubernetes</li>
              <li><strong>CI/CD:</strong> Jenkins, GitHub Actions, GitLab CI</li>
              <li><strong>Infrastructure:</strong> Terraform, Ansible</li>
              <li><strong>Monitoring:</strong> Prometheus, Grafana</li>
            </ul>
          `,
          codeExample: `# DevOps Pipeline Example
# This represents a typical DevOps workflow

1. Developer commits code to Git repository
2. CI/CD pipeline is triggered automatically
3. Code is built and tested
4. If tests pass, code is deployed to staging
5. After approval, code is deployed to production
6. Monitoring alerts on any issues

# Example CI/CD Pipeline (GitHub Actions)
name: CI/CD Pipeline
on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v2
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
    - run: npm install
    - run: npm test
    
  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
    - name: Deploy to production
      run: echo "Deploying to production..."`,
          exercises: [
            {
              id: 'ex1',
              question: 'Create a simple CI/CD pipeline configuration that runs tests and deploys on the main branch',
              initialCode: '# Create a GitHub Actions workflow\nname: My Pipeline\non:\n  # Add trigger here\n\njobs:\n  # Add jobs here',
              solution: 'name: My Pipeline\non:\n  push:\n    branches: [ main ]\n\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n    - uses: actions/checkout@v2\n    - run: npm test\n  \n  deploy:\n    needs: test\n    runs-on: ubuntu-latest\n    steps:\n    - run: echo "Deploying..."',
              hint: 'Include push trigger, test job, and deploy job that depends on test',
              terminalTask: 'Try running: git status'
            }
          ],
          terminalCommands: ['git status', 'git log --oneline', 'docker --version', 'npm --version']
        },
        {
          id: 'version-control-git',
          title: 'Version Control with Git',
          content: `
            <div style="margin-bottom: 20px; text-align: center;">
              <h3>📹 Video Explanation</h3>
              <div style="width: 100%; max-width: 800px; height: 400px; margin: 0 auto; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; color: white; font-size: 18px; font-weight: bold;">
                📹 Video Explanation Coming Soon
              </div>
              <p style="margin-top: 10px; color: #666; font-size: 14px;">Video explanation coming soon - stay tuned!</p>
            </div>
            
            <h2>📚 Git Version Control</h2>
            <p>Git is a distributed version control system that tracks changes in source code during software development. It's essential for DevOps workflows.</p>
            
            <h3>🔧 Basic Git Commands</h3>
            <ul>
              <li><code>git init</code> - Initialize a new Git repository</li>
              <li><code>git add .</code> - Stage all changes</li>
              <li><code>git commit -m "message"</code> - Commit changes</li>
              <li><code>git push</code> - Push changes to remote repository</li>
              <li><code>git pull</code> - Pull changes from remote repository</li>
              <li><code>git status</code> - Check repository status</li>
              <li><code>git log</code> - View commit history</li>
            </ul>
            
            <h3>🌿 Branching Strategy</h3>
            <p>Branching allows multiple developers to work on different features simultaneously:</p>
            <ul>
              <li><code>git branch feature-name</code> - Create new branch</li>
              <li><code>git checkout feature-name</code> - Switch to branch</li>
              <li><code>git merge feature-name</code> - Merge branch</li>
              <li><code>git branch -d feature-name</code> - Delete branch</li>
            </ul>
          `,
          codeExample: `# Git Workflow Example
# Initialize repository
git init

# Add files to staging
git add .

# Commit changes
git commit -m "Initial commit"

# Add remote repository
git remote add origin https://github.com/username/repo.git

# Push to remote
git push -u origin main

# Create and switch to new branch
git checkout -b feature/new-feature

# Make changes and commit
git add .
git commit -m "Add new feature"

# Push feature branch
git push origin feature/new-feature

# Switch back to main and merge
git checkout main
git merge feature/new-feature

# Delete feature branch
git branch -d feature/new-feature`,
          exercises: [
            {
              id: 'ex2',
              question: 'Write the Git commands to create a new branch called "feature/login", make a commit, and merge it back to main',
              initialCode: '# Create branch, commit, and merge\n# Step 1: Create and switch to new branch\n\n# Step 2: Add and commit changes\n\n# Step 3: Switch back to main and merge\n',
              solution: '# Step 1: Create and switch to new branch\ngit checkout -b feature/login\n\n# Step 2: Add and commit changes\ngit add .\ngit commit -m "Add login feature"\n\n# Step 3: Switch back to main and merge\ngit checkout main\ngit merge feature/login',
              hint: 'Use git checkout -b to create and switch, then add, commit, checkout main, and merge',
              terminalTask: 'Try running: git branch --help'
            }
          ],
          terminalCommands: ['git init', 'git status', 'git add .', 'git commit -m "test"', 'git branch', 'git log --oneline']
        }
      ]
    },
    {
      id: 'containerization',
      title: 'Containerization with Docker',
      lessons: [
        {
          id: 'docker-basics',
          title: 'Docker Fundamentals',
          content: `
            <div style="margin-bottom: 20px; text-align: center;">
              <h3>📹 Video Explanation</h3>
              <div style="width: 100%; max-width: 800px; height: 400px; margin: 0 auto; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; color: white; font-size: 18px; font-weight: bold;">
                📹 Video Explanation Coming Soon
              </div>
              <p style="margin-top: 10px; color: #666; font-size: 14px;">Video explanation coming soon - stay tuned!</p>
            </div>
            
            <h2>🐳 What is Docker?</h2>
            <p>Docker is a platform that uses containerization to package applications and their dependencies into lightweight, portable containers that can run anywhere.</p>
            
            <h3>📦 Key Docker Concepts</h3>
            <ul>
              <li><strong>Container:</strong> A lightweight, standalone package that includes everything needed to run an application</li>
              <li><strong>Image:</strong> A read-only template used to create containers</li>
              <li><strong>Dockerfile:</strong> A text file with instructions to build a Docker image</li>
              <li><strong>Registry:</strong> A service for storing and distributing Docker images (like Docker Hub)</li>
            </ul>
            
            <h3>🛠️ Basic Docker Commands</h3>
            <ul>
              <li><code>docker build -t name .</code> - Build an image from Dockerfile</li>
              <li><code>docker run -p 3000:3000 name</code> - Run a container</li>
              <li><code>docker ps</code> - List running containers</li>
              <li><code>docker images</code> - List available images</li>
              <li><code>docker stop container-id</code> - Stop a container</li>
              <li><code>docker rm container-id</code> - Remove a container</li>
            </ul>
          `,
          codeExample: `# Dockerfile for Node.js application
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]

# Build and run commands:
# docker build -t my-app .
# docker run -p 3000:3000 my-app`,
          exercises: [
            {
              id: 'ex3',
              question: 'Create a Dockerfile for a Python application that uses Python 3.9, installs requirements.txt, and runs app.py',
              initialCode: '# Dockerfile for Python app\nFROM python:3.9\n\n# Set working directory\n\n# Copy and install requirements\n\n# Copy application code\n\n# Run the application\n',
              solution: '# Dockerfile for Python app\nFROM python:3.9\n\n# Set working directory\nWORKDIR /app\n\n# Copy and install requirements\nCOPY requirements.txt .\nRUN pip install -r requirements.txt\n\n# Copy application code\nCOPY . .\n\n# Run the application\nCMD ["python", "app.py"]',
              hint: 'Use WORKDIR, COPY requirements.txt, RUN pip install, COPY ., and CMD',
              terminalTask: 'Try running: docker --version'
            }
          ],
          terminalCommands: ['docker --version', 'docker images', 'docker ps', 'docker build --help']
        }
      ]
    },
    {
      id: 'automation-basics',
      title: 'Basic Automation',
      lessons: [
        {
          id: 'shell-scripting',
          title: 'Shell Scripting Basics',
          content: `
            <div style="margin-bottom: 20px; text-align: center;">
              <h3>📹 Video Explanation</h3>
              <div style="width: 100%; max-width: 800px; height: 400px; margin: 0 auto; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; color: white; font-size: 18px; font-weight: bold;">
                📹 Video Explanation Coming Soon
              </div>
              <p style="margin-top: 10px; color: #666; font-size: 14px;">Video explanation coming soon - stay tuned!</p>
            </div>
            
            <h2>📜 Shell Scripting</h2>
            <p>Shell scripting allows you to automate repetitive tasks by writing scripts that execute multiple commands in sequence.</p>
            
            <h3>🔧 Basic Shell Script Structure</h3>
            <ul>
              <li><code>#!/bin/bash</code> - Shebang line (specifies interpreter)</li>
              <li><code>echo "message"</code> - Print message</li>
              <li><code>read variable</code> - Read user input</li>
              <li><code>if [ condition ]; then ... fi</code> - Conditional statements</li>
              <li><code>for item in list; do ... done</code> - Loops</li>
            </ul>
            
            <h3>📁 File Operations</h3>
            <ul>
              <li><code>ls</code> - List files</li>
              <li><code>mkdir directory</code> - Create directory</li>
              <li><code>cp source dest</code> - Copy files</li>
              <li><code>mv source dest</code> - Move/rename files</li>
              <li><code>rm file</code> - Remove files</li>
              <li><code>chmod +x script.sh</code> - Make script executable</li>
            </ul>
          `,
          codeExample: `#!/bin/bash

# Simple deployment script
echo "Starting deployment..."

# Variables
APP_NAME="my-app"
BUILD_DIR="./build"
DEPLOY_DIR="/var/www/html"

# Check if build directory exists
if [ -d "$BUILD_DIR" ]; then
    echo "Build directory found"
    
    # Copy files to deployment directory
    sudo cp -r $BUILD_DIR/* $DEPLOY_DIR/
    
    # Set permissions
    sudo chmod -R 755 $DEPLOY_DIR
    
    echo "Deployment completed successfully!"
else
    echo "Error: Build directory not found"
    exit 1
fi

# Restart web server
sudo systemctl restart nginx
echo "Web server restarted"`,
          exercises: [
            {
              id: 'ex4',
              question: 'Write a shell script that creates a backup directory, copies all .txt files to it, and prints a success message',
              initialCode: '#!/bin/bash\n\n# Backup script\necho "Starting backup..."\n\n# Create backup directory\n\n# Copy .txt files\n\n# Print success message\n',
              solution: '#!/bin/bash\n\n# Backup script\necho "Starting backup..."\n\n# Create backup directory\nmkdir -p backup\n\n# Copy .txt files\ncp *.txt backup/\n\n# Print success message\necho "Backup completed successfully!"',
              hint: 'Use mkdir -p for directory, cp *.txt for copying, and echo for messages',
              terminalTask: 'Try running: ls -la'
            }
          ],
          terminalCommands: ['ls -la', 'mkdir test', 'echo "Hello World"', 'pwd', 'whoami']
        }
      ]
    }
  ];

  // Terminal command handler
  const handleTerminalCommand = (command: string) => {
    const cmd = command.trim().toLowerCase();
    let response = '';

    switch (cmd) {
      case 'help':
        response = `Available commands:
  help          - Show this help message
  clear         - Clear terminal
  git status    - Show git repository status
  git log       - Show commit history
  docker ps     - List running containers
  docker images - List Docker images
  ls            - List files and directories
  pwd           - Show current directory
  whoami        - Show current user
  date          - Show current date and time
  echo <text>   - Print text to terminal`;
        break;
      case 'clear':
        setTerminalHistory(['Welcome to DevOps Beginner Terminal!', 'Type "help" to see available commands.', '']);
        return;
      case 'git status':
        response = `On branch main
Your branch is up to date with 'origin/main'.

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git checkout -- <file>..." to discard changes in working directory)

        modified:   src/index.js
        modified:   package.json

Untracked files:
  (use "git add <file>..." to include in what will be committed)

        Dockerfile
        docker-compose.yml

no changes added to commit (use "git add" or "git commit -a")`;
        break;
      case 'git log':
      case 'git log --oneline':
        response = `a1b2c3d (HEAD -> main, origin/main) Add Docker configuration
e4f5g6h Update package.json dependencies
i7j8k9l Initial commit with basic app structure
m0n1o2p Add README and documentation`;
        break;
      case 'docker ps':
        response = `CONTAINER ID   IMAGE     COMMAND                  CREATED         STATUS         PORTS                    NAMES
abc123def456   my-app    "docker-entrypoint.s…"   2 minutes ago   Up 2 minutes   0.0.0.0:3000->3000/tcp   my-app-container`;
        break;
      case 'docker images':
        response = `REPOSITORY   TAG       IMAGE ID       CREATED         SIZE
my-app       latest    ghi789jkl012   5 minutes ago   345MB
node         18-alpine mno345pqr678   2 days ago      110MB
postgres     13        stu901vwx234   1 week ago      314MB`;
        break;
      case 'ls':
      case 'ls -la':
        response = `total 24
drwxr-xr-x  8 user user  256 Jan 15 10:30 .
drwxr-xr-x  3 user user   96 Jan 15 09:15 ..
-rw-r--r--  1 user user  123 Jan 15 10:25 .gitignore
-rw-r--r--  1 user user  456 Jan 15 10:30 Dockerfile
-rw-r--r--  1 user user  789 Jan 15 10:28 docker-compose.yml
-rw-r--r--  1 user user  234 Jan 15 10:20 index.js
drwxr-xr-x  2 user user   64 Jan 15 09:30 node_modules
-rw-r--r--  1 user user  567 Jan 15 10:15 package.json`;
        break;
      case 'pwd':
        response = '/home/user/devops-beginner-project';
        break;
      case 'whoami':
        response = 'devops-student';
        break;
      case 'date':
        response = new Date().toString();
        break;
      case 'docker --version':
        response = 'Docker version 24.0.7, build afdd53b';
        break;
      case 'git --version':
        response = 'git version 2.39.2';
        break;
      case 'npm --version':
        response = '9.8.1';
        break;
      default:
        if (cmd.startsWith('echo ')) {
          response = command.substring(5);
        } else if (cmd.startsWith('git ')) {
          response = `git: '${command.substring(4)}' is not a git command. See 'git --help'.`;
        } else if (cmd.startsWith('docker ')) {
          response = `docker: '${command.substring(7)}' is not a docker command. See 'docker --help'.`;
        } else {
          response = `Command not found: ${command}. Type 'help' for available commands.`;
        }
    }

    setTerminalHistory(prev => [...prev, `$ ${command}`, response, '']);
  };

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (terminalInput.trim()) {
      setCommandHistory(prev => [...prev, terminalInput]);
      setHistoryIndex(-1);
      handleTerminalCommand(terminalInput);
      setTerminalInput('');
    }
  };

  const handleTerminalKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setTerminalInput(commandHistory[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= commandHistory.length) {
          setHistoryIndex(-1);
          setTerminalInput('');
        } else {
          setHistoryIndex(newIndex);
          setTerminalInput(commandHistory[newIndex]);
        }
      }
    }
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [terminalHistory]);

  useEffect(() => {
    if (moduleId && lessonId) {
      const module = courseModules.find(m => m.id === moduleId);
      if (module) {
        setCurrentModule(module);
        const lesson = module.lessons.find(l => l.id === lessonId);
        if (lesson) {
          setCurrentLesson(lesson);
          setCode(lesson.codeExample);
        }
      }
    } else if (courseModules.length > 0) {
      setCurrentModule(courseModules[0]);
      setCurrentLesson(courseModules[0].lessons[0]);
      setCode(courseModules[0].lessons[0].codeExample);
    }
  }, [moduleId, lessonId]);

  if (!currentModule || !currentLesson) {
    return <div>Loading...</div>;
  }

  const currentExercise = currentExerciseId 
    ? currentLesson.exercises.find(ex => ex.id === currentExerciseId)
    : null;

  const runCode = () => {
    try {
      setOutput('Code execution simulated successfully!\n\nIn a real DevOps environment, this would:\n- Build your Docker container\n- Run automated tests\n- Deploy to staging environment\n- Execute the deployment pipeline');
    } catch (error) {
      setOutput(`Error: ${error}`);
    }
  };

  const submitExercise = async () => {
    if (!currentExercise) return;
    
    setIsSubmitting(true);
    setSubmissionMessage('Submitting your solution...');
    setShowSubmissionModal(true);
    
    setTimeout(() => {
      setSubmittedExercises(prev => new Set([...prev, currentExercise.id]));
      setExerciseProgress(prev => ({
        ...prev,
        [currentExercise.id]: 100
      }));
      setSubmissionMessage('Great job! Your solution has been submitted successfully.');
      setIsSubmitting(false);
      
      setTimeout(() => {
        setShowSubmissionModal(false);
      }, 2000);
    }, 2000);
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <Header />
      
      <div className="flex h-screen pt-16">
        {/* Sidebar */}
        <div className={`${sidebarOpen ? 'w-80' : 'w-16'} transition-all duration-300 ${theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'} border-r flex flex-col`}>
          <div className="p-4 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <button
                onClick={() => navigate('/courses')}
                className="flex items-center text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                {sidebarOpen && 'Back to Courses'}
              </button>
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <Code className="w-5 h-5" />
              </button>
            </div>
            {sidebarOpen && (
              <div className="mt-4">
                <h3 className="font-semibold text-white mb-2">{currentModule.title}</h3>
                <p className="text-sm text-gray-400">DevOps - Beginner</p>
              </div>
            )}
          </div>
          
          {sidebarOpen && (
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-2">
                {currentModule.lessons.map((lesson, index) => (
                  <button
                    key={lesson.id}
                    onClick={() => navigate(`/course-learning-devops-beginner/devops-beginner/${moduleId}/${lesson.id}`)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      lesson.id === lessonId
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-sm font-bold mr-3">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium">{lesson.title}</div>
                        <div className="text-xs opacity-75">Lesson {index + 1}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-gray-700 rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center">
                  <Award className="w-4 h-4 mr-2" />
                  Progress
                </h4>
                <div className="text-sm text-gray-300">
                  <div>Completed: {submittedExercises.size} exercises</div>
                  <div>Current Module: {currentModule.title}</div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Tab Navigation */}
          <div className={`border-b ${theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
            <div className="flex">
              <button
                onClick={() => setActiveTab('theory')}
                className={`px-6 py-3 font-medium transition-colors ${
                  activeTab === 'theory'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Book className="w-4 h-4 inline mr-2" />
                Theory
              </button>
              <button
                onClick={() => setActiveTab('exercise')}
                className={`px-6 py-3 font-medium transition-colors ${
                  activeTab === 'exercise'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Code className="w-4 h-4 inline mr-2" />
                Exercise
              </button>
              <button
                onClick={() => setActiveTab('terminal')}
                className={`px-6 py-3 font-medium transition-colors ${
                  activeTab === 'terminal'
                    ? 'border-b-2 border-blue-500 text-blue-600'
                    : theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Terminal className="w-4 h-4 inline mr-2" />
                Terminal
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 flex">
            {/* Theory/Exercise Content */}
            <div className={`${showFileExplorer ? 'w-2/3' : 'w-full'} transition-all duration-300`}>
              {activeTab === 'theory' && (
                <div className="h-full overflow-y-auto p-6">
                  <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold mb-6">{currentLesson.title}</h1>
                    <div 
                      className="prose prose-lg max-w-none"
                      dangerouslySetInnerHTML={{ __html: currentLesson.content }}
                    />
                  </div>
                </div>
              )}

              {activeTab === 'exercise' && (
                <div className="h-full flex flex-col">
                  <div className="p-4 border-b border-gray-700">
                    <h2 className="text-xl font-bold mb-4">Practice Exercises</h2>
                    <div className="flex flex-wrap gap-2">
                      {currentLesson.exercises.map((exercise) => (
                        <button
                          key={exercise.id}
                          onClick={() => {
                            setCurrentExerciseId(exercise.id);
                            setCode(exercise.initialCode);
                          }}
                          className={`px-4 py-2 rounded-lg transition-colors ${
                            currentExerciseId === exercise.id
                              ? 'bg-blue-600 text-white'
                              : submittedExercises.has(exercise.id)
                              ? 'bg-green-600 text-white'
                              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          }`}
                        >
                          {submittedExercises.has(exercise.id) && <CheckCircle className="w-4 h-4 inline mr-1" />}
                          Exercise {exercise.id.slice(-1)}
                        </button>
                      ))}
                    </div>
                  </div>

                  {currentExercise && (
                    <div className="flex-1 flex">
                      <div className="w-1/2 p-4 border-r border-gray-700">
                        <h3 className="font-semibold mb-2">Question:</h3>
                        <p className="text-gray-300 mb-4">{currentExercise.question}</p>
                        
                        {currentExercise.terminalTask && (
                          <div className="mb-4 p-3 bg-blue-900 rounded-lg">
                            <h4 className="font-semibold text-blue-300 mb-1">Terminal Task:</h4>
                            <p className="text-blue-200">{currentExercise.terminalTask}</p>
                          </div>
                        )}
                        
                        <div className="mb-4">
                          <button
                            onClick={() => setCode(currentExercise.solution)}
                            className="px-3 py-1 bg-yellow-600 text-white rounded text-sm hover:bg-yellow-700 transition-colors mr-2"
                          >
                            <Lightbulb className="w-4 h-4 inline mr-1" />
                            Show Solution
                          </button>
                          <button
                            onClick={() => setCode(currentExercise.initialCode)}
                            className="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700 transition-colors"
                          >
                            <RotateCcw className="w-4 h-4 inline mr-1" />
                            Reset
                          </button>
                        </div>
                        
                        <div className="text-sm text-gray-400">
                          <strong>Hint:</strong> {currentExercise.hint}
                        </div>
                      </div>

                      <div className="w-1/2 flex flex-col">
                        <div className="flex-1 p-4">
                          <div className="flex justify-between items-center mb-2">
                            <h3 className="font-semibold">Your Solution:</h3>
                            <div className="flex gap-2">
                              <button
                                onClick={runCode}
                                className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors"
                              >
                                <Play className="w-4 h-4 inline mr-1" />
                                Run
                              </button>
                              <button
                                onClick={submitExercise}
                                disabled={submittedExercises.has(currentExercise.id)}
                                className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors disabled:opacity-50"
                              >
                                <Send className="w-4 h-4 inline mr-1" />
                                Submit
                              </button>
                            </div>
                          </div>
                          <textarea
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            className="w-full h-64 p-3 bg-gray-800 text-white font-mono text-sm rounded border border-gray-600 resize-none"
                            placeholder="Write your solution here..."
                          />
                        </div>

                        {output && (
                          <div className="p-4 border-t border-gray-700">
                            <h3 className="font-semibold mb-2">Output:</h3>
                            <pre className="bg-gray-800 p-3 rounded text-sm text-green-400 whitespace-pre-wrap">
                              {output}
                            </pre>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'terminal' && (
                <div className="h-full flex flex-col">
                  <div className="p-4 border-b border-gray-700">
                    <h2 className="text-xl font-bold mb-2">DevOps Terminal</h2>
                    <p className="text-gray-400">Practice Git, Docker, and other DevOps commands</p>
                  </div>
                  
                  <div className="flex-1 flex flex-col bg-black text-green-400 font-mono">
                    <div 
                      ref={terminalRef}
                      className="flex-1 overflow-y-auto p-4 space-y-1"
                    >
                      {terminalHistory.map((line, index) => (
                        <div key={index} className={line.startsWith('$') ? 'text-yellow-400' : 'text-green-400'}>
                          {line}
                        </div>
                      ))}
                    </div>
                    
                    <form onSubmit={handleTerminalSubmit} className="p-4 border-t border-gray-700">
                      <div className="flex items-center">
                        <span className="text-yellow-400 mr-2">$</span>
                        <input
                          type="text"
                          value={terminalInput}
                          onChange={(e) => setTerminalInput(e.target.value)}
                          onKeyDown={handleTerminalKeyDown}
                          className="flex-1 bg-transparent outline-none text-green-400"
                          placeholder="Type a command..."
                          autoFocus
                        />
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>

            {/* File Explorer */}
            {showFileExplorer && (
              <div className="w-1/3 border-l border-gray-700 flex flex-col">
                <div className="p-4 border-b border-gray-700">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Project Files</h3>
                    <button
                      onClick={() => setShowFileExplorer(false)}
                      className="text-gray-400 hover:text-white"
                    >
                      ×
                    </button>
                  </div>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4">
                  <div className="space-y-1">
                    {Object.keys(fileContents).map((fileName) => (
                      <button
                        key={fileName}
                        onClick={() => handleFileClick(fileName)}
                        className={`w-full text-left p-2 rounded hover:bg-gray-700 transition-colors ${
                          selectedFile === fileName ? 'bg-gray-700' : ''
                        }`}
                      >
                        <div className="flex items-center">
                          <File className="w-4 h-4 mr-2 text-blue-400" />
                          <span className="text-sm">{fileName}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Toolbar */}
          <div className={`border-t ${theme === 'dark' ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'} p-4`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowFileExplorer(!showFileExplorer)}
                  className={`flex items-center px-3 py-2 rounded transition-colors ${
                    showFileExplorer 
                      ? 'bg-blue-600 text-white' 
                      : theme === 'dark' ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  <FolderOpen className="w-4 h-4 mr-2" />
                  Files
                </button>
                <button
                  onClick={toggleTheme}
                  className={`p-2 rounded transition-colors ${
                    theme === 'dark' ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>
              </div>
              
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span>DevOps - Beginner</span>
                <span>•</span>
                <span>{currentLesson.title}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Submission Modal */}
      {showSubmissionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 p-6 rounded-lg max-w-md w-full mx-4">
            <div className="text-center">
              {isSubmitting ? (
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              ) : (
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
              )}
              <p className="text-white">{submissionMessage}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseLearningDevOpsBeginner;