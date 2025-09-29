import React, { useState, useEffect } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Play, 
  RotateCcw, 
  CheckCircle, 
  Clock, 
  Star, 
  Book, 
  Code, 
  Terminal, 
  Target, 
  Lightbulb, 
  Eye, 
  Copy, 
  Send, 
  Sun, 
  Moon,
  Server,
  GitBranch,
  Container,
  Shield,
  Monitor,
  Settings,
  Award,
  TrendingUp,
  Users,
  Zap
} from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  content: string;
  codeExample: string;
  exercises: Exercise[];
  completed: boolean;
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  progress: number;
  estimatedTime: string;
  icon: React.ReactNode;
  terminalCommands?: string[];
}

interface Exercise {
  question: string;
  hint: string;
  solution: string;
  points: number;
  terminalTask?: string;
}

interface CourseModule {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  icon: React.ReactNode;
  progress: number;
  estimatedTime: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  isExpanded: boolean;
}

const CourseLearningDevOpsBeginner: React.FC = () => {
  const [selectedModuleId, setSelectedModuleId] = useState<string>('devops-fundamentals');
  const [selectedLessonId, setSelectedLessonId] = useState<string>('intro-devops');
  const [activeTab, setActiveTab] = useState<'theory' | 'exercise' | 'terminal'>('theory');
  const [code, setCode] = useState<string>('');
  const [output, setOutput] = useState<string>('');
  const [showHint, setShowHint] = useState<boolean>(false);
  const [showSolution, setShowSolution] = useState<boolean>(false);
  const [terminalInput, setTerminalInput] = useState<string>('');
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    '🚀 Welcome to DevOps Professional Terminal',
    '💡 Type "help" for available commands',
    '📚 Practice DevOps commands in a safe environment',
    ''
  ]);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  const modules: CourseModule[] = [
    {
      id: 'devops-fundamentals',
      title: 'DevOps Fundamentals',
      description: 'Core concepts and principles of DevOps culture',
      icon: <Server className="w-5 h-5" />,
      progress: 75,
      estimatedTime: '2 hours',
      difficulty: 'beginner',
      isExpanded: true,
      lessons: [
        {
          id: 'intro-devops',
          title: 'Introduction to DevOps',
          duration: '30 min',
          difficulty: 'beginner',
          progress: 100,
          estimatedTime: '30 minutes',
          icon: <Book className="w-4 h-4" />,
          completed: true,
          content: `
            <h2 className="text-2xl font-bold text-white mb-6">What is DevOps?</h2>
            <p className="text-gray-300 mb-4 leading-relaxed">DevOps is a set of practices that combines software development (Dev) and IT operations (Ops) to shorten the development lifecycle and provide continuous delivery with high software quality.</p>
            
            <h3 className="text-xl font-semibold text-blue-400 mb-4">Core Principles:</h3>
            <ul className="list-disc list-inside text-gray-300 space-y-2 mb-6">
              <li><strong className="text-white">Collaboration:</strong> Breaking down silos between development and operations teams</li>
              <li><strong className="text-white">Automation:</strong> Automating repetitive tasks to reduce errors and increase efficiency</li>
              <li><strong className="text-white">Continuous Integration:</strong> Regularly merging code changes into a central repository</li>
              <li><strong className="text-white">Continuous Delivery:</strong> Ensuring code is always in a deployable state</li>
              <li><strong className="text-white">Monitoring:</strong> Continuous monitoring of applications and infrastructure</li>
            </ul>

            <h3 className="text-xl font-semibold text-green-400 mb-4">DevOps Culture</h3>
            <p className="text-gray-300 mb-4">DevOps is not just about tools and processes; it's about culture. It emphasizes:</p>
            <ul className="list-disc list-inside text-gray-300 space-y-2 mb-6">
              <li>Shared responsibility for the entire application lifecycle</li>
              <li>Rapid feedback loops and learning from failures</li>
              <li>Continuous improvement and experimentation</li>
              <li>Customer-centric approach to software delivery</li>
            </ul>

            <h3 className="text-xl font-semibold text-purple-400 mb-4">Benefits of DevOps</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/50">
                <h4 className="text-green-400 font-semibold mb-2">Faster Time to Market:</h4>
                <p className="text-gray-300 text-sm">Reduced deployment time from months to minutes</p>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/50">
                <h4 className="text-blue-400 font-semibold mb-2">Improved Quality:</h4>
                <p className="text-gray-300 text-sm">Automated testing and continuous monitoring</p>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/50">
                <h4 className="text-yellow-400 font-semibold mb-2">Better Collaboration:</h4>
                <p className="text-gray-300 text-sm">Enhanced communication between teams</p>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/50">
                <h4 className="text-red-400 font-semibold mb-2">Increased Reliability:</h4>
                <p className="text-gray-300 text-sm">More stable and predictable deployments</p>
              </div>
            </div>
          `,
          codeExample: `# DevOps Workflow Example
# 1. Version Control
git clone https://github.com/company/app.git
git checkout -b feature/new-feature
git add .
git commit -m "Add new feature"
git push origin feature/new-feature

# 2. Continuous Integration
# .github/workflows/ci.yml
name: CI Pipeline
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Run tests
        run: npm test
      - name: Build application
        run: npm run build

# 3. Deployment
kubectl apply -f deployment.yaml
kubectl rollout status deployment/app`,
          terminalCommands: [
            'git --version',
            'docker --version',
            'kubectl version --client',
            'terraform --version'
          ],
          exercises: [
            {
              question: 'Create a simple DevOps workflow that includes version control, testing, and deployment steps. Write a basic shell script that demonstrates these concepts.',
              hint: 'Think about the three main stages: code management (git), quality assurance (testing), and delivery (deployment). Use comments to explain each step.',
              solution: `#!/bin/bash
# DevOps Workflow Script

echo "🚀 Starting DevOps Workflow..."

# 1. Version Control
echo "📝 Step 1: Version Control"
git status
git add .
git commit -m "Automated commit: \\$(date)"

# 2. Testing
echo "🧪 Step 2: Running Tests"
npm test || echo "Tests completed"

# 3. Build
echo "🔨 Step 3: Building Application"
npm run build || echo "Build completed"

# 4. Deploy
echo "🚀 Step 4: Deployment"
echo "Deploying to production..."
kubectl apply -f deployment.yaml

echo "✅ DevOps workflow completed successfully!"`,
              points: 100,
              terminalTask: 'chmod +x devops-workflow.sh && ./devops-workflow.sh'
            }
          ]
        },
        {
          id: 'devops-lifecycle',
          title: 'DevOps Lifecycle',
          duration: '45 min',
          difficulty: 'beginner',
          progress: 60,
          estimatedTime: '45 minutes',
          icon: <TrendingUp className="w-4 h-4" />,
          completed: false,
          content: `
            <h2 className="text-2xl font-bold text-white mb-6">The DevOps Lifecycle</h2>
            <p className="text-gray-300 mb-6 leading-relaxed">The DevOps lifecycle is a continuous process that integrates development and operations through various phases.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/30 p-4 rounded-lg border border-blue-500/30">
                <h3 className="text-blue-400 font-semibold mb-2">Plan</h3>
                <p className="text-gray-300 text-sm">Define requirements and plan the development process</p>
              </div>
              <div className="bg-gradient-to-br from-green-900/30 to-green-800/30 p-4 rounded-lg border border-green-500/30">
                <h3 className="text-green-400 font-semibold mb-2">Code</h3>
                <p className="text-gray-300 text-sm">Write and version control the application code</p>
              </div>
              <div className="bg-gradient-to-br from-yellow-900/30 to-yellow-800/30 p-4 rounded-lg border border-yellow-500/30">
                <h3 className="text-yellow-400 font-semibold mb-2">Build</h3>
                <p className="text-gray-300 text-sm">Compile and package the application</p>
              </div>
              <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/30 p-4 rounded-lg border border-purple-500/30">
                <h3 className="text-purple-400 font-semibold mb-2">Test</h3>
                <p className="text-gray-300 text-sm">Automated testing and quality assurance</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-gradient-to-br from-red-900/30 to-red-800/30 p-4 rounded-lg border border-red-500/30">
                <h3 className="text-red-400 font-semibold mb-2">Release</h3>
                <p className="text-gray-300 text-sm">Prepare for deployment to production</p>
              </div>
              <div className="bg-gradient-to-br from-indigo-900/30 to-indigo-800/30 p-4 rounded-lg border border-indigo-500/30">
                <h3 className="text-indigo-400 font-semibold mb-2">Deploy</h3>
                <p className="text-gray-300 text-sm">Deploy to production environment</p>
              </div>
              <div className="bg-gradient-to-br from-pink-900/30 to-pink-800/30 p-4 rounded-lg border border-pink-500/30">
                <h3 className="text-pink-400 font-semibold mb-2">Operate</h3>
                <p className="text-gray-300 text-sm">Manage and maintain the production system</p>
              </div>
              <div className="bg-gradient-to-br from-teal-900/30 to-teal-800/30 p-4 rounded-lg border border-teal-500/30">
                <h3 className="text-teal-400 font-semibold mb-2">Monitor</h3>
                <p className="text-gray-300 text-sm">Continuous monitoring and feedback</p>
              </div>
            </div>
          `,
          codeExample: `# DevOps Lifecycle Implementation

# 1. PLAN - Project setup
mkdir my-devops-project
cd my-devops-project
git init

# 2. CODE - Development
echo "console.log('Hello DevOps!');" > app.js
git add app.js
git commit -m "Initial commit"

# 3. BUILD - Compilation/Packaging
npm init -y
npm install --save-dev webpack
npm run build

# 4. TEST - Automated testing
npm install --save-dev jest
npm test

# 5. RELEASE - Version tagging
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0

# 6. DEPLOY - Production deployment
docker build -t my-app:v1.0.0 .
docker push registry/my-app:v1.0.0
kubectl set image deployment/my-app app=registry/my-app:v1.0.0

# 7. OPERATE - Production management
kubectl get pods
kubectl logs deployment/my-app

# 8. MONITOR - Continuous monitoring
kubectl top pods
curl -f http://my-app/health || echo "Health check failed"`,
          terminalCommands: [
            'git init',
            'npm init -y',
            'docker build -t my-app .',
            'kubectl get deployments'
          ],
          exercises: [
            {
              question: 'Design a complete DevOps lifecycle for a web application. Include all 8 phases and provide specific commands or tools for each phase.',
              hint: 'Consider each phase of the lifecycle: Plan, Code, Build, Test, Release, Deploy, Operate, and Monitor. Think about what tools and commands would be used in each phase.',
              solution: `# Complete DevOps Lifecycle for Web Application

# 1. PLAN
echo "Planning phase: Requirements gathering and sprint planning"
# Tools: Jira, Trello, Azure DevOps

# 2. CODE
git clone https://github.com/company/web-app.git
git checkout -b feature/user-authentication
# Development work here
git add .
git commit -m "Add user authentication feature"
git push origin feature/user-authentication

# 3. BUILD
npm install
npm run build
docker build -t web-app:latest .

# 4. TEST
npm run test:unit
npm run test:integration
npm run test:e2e
sonar-scanner # Code quality analysis

# 5. RELEASE
git tag -a v2.1.0 -m "Release v2.1.0 with authentication"
git push origin v2.1.0
docker tag web-app:latest web-app:v2.1.0

# 6. DEPLOY
docker push registry/web-app:v2.1.0
kubectl apply -f k8s/deployment.yaml
kubectl rollout status deployment/web-app

# 7. OPERATE
kubectl get pods -l app=web-app
kubectl logs -f deployment/web-app
kubectl scale deployment web-app --replicas=3

# 8. MONITOR
kubectl top pods
curl -f https://web-app.com/health
# Prometheus/Grafana monitoring
# ELK stack for logging`,
              points: 150,
              terminalTask: 'Create a script implementing all 8 DevOps lifecycle phases'
            }
          ]
        }
      ]
    },
    {
      id: 'cicd-pipelines',
      title: 'CI/CD Pipelines',
      description: 'Continuous Integration and Continuous Deployment',
      icon: <GitBranch className="w-5 h-5" />,
      progress: 45,
      estimatedTime: '3 hours',
      difficulty: 'intermediate',
      isExpanded: false,
      lessons: [
        {
          id: 'ci-fundamentals',
          title: 'CI Fundamentals',
          duration: '60 min',
          difficulty: 'intermediate',
          progress: 80,
          estimatedTime: '60 minutes',
          icon: <Zap className="w-4 h-4" />,
          completed: false,
          content: `
            <h2 className="text-2xl font-bold text-white mb-6">Continuous Integration Fundamentals</h2>
            <p className="text-gray-300 mb-6 leading-relaxed">Continuous Integration (CI) is a development practice where developers integrate code into a shared repository frequently, preferably several times a day.</p>
            
            <h3 className="text-xl font-semibold text-blue-400 mb-4">Key CI Principles:</h3>
            <ul className="list-disc list-inside text-gray-300 space-y-2 mb-6">
              <li>Frequent code integration (multiple times per day)</li>
              <li>Automated build process</li>
              <li>Automated testing suite</li>
              <li>Fast feedback on integration issues</li>
              <li>Maintain a single source repository</li>
            </ul>

            <h3 className="text-xl font-semibold text-green-400 mb-4">CI Pipeline Stages:</h3>
            <div className="space-y-4 mb-6">
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/50">
                <h4 className="text-yellow-400 font-semibold mb-2">1. Source Code Management</h4>
                <p className="text-gray-300 text-sm">Code is committed to version control system (Git)</p>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/50">
                <h4 className="text-blue-400 font-semibold mb-2">2. Build Trigger</h4>
                <p className="text-gray-300 text-sm">Automated build is triggered by code changes</p>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/50">
                <h4 className="text-green-400 font-semibold mb-2">3. Automated Testing</h4>
                <p className="text-gray-300 text-sm">Unit tests, integration tests, and code quality checks</p>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/50">
                <h4 className="text-purple-400 font-semibold mb-2">4. Feedback</h4>
                <p className="text-gray-300 text-sm">Results are reported back to the development team</p>
              </div>
            </div>
          `,
          codeExample: `# GitHub Actions CI Pipeline
name: CI Pipeline
on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        node-version: [14.x, 16.x, 18.x]
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Use Node.js \${{ matrix.node-version }}
      uses: actions/setup-node@v3
      with:
        node-version: \${{ matrix.node-version }}
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run linting
      run: npm run lint
    
    - name: Run tests
      run: npm run test:coverage
    
    - name: Upload coverage reports
      uses: codecov/codecov-action@v3
    
    - name: Build application
      run: npm run build
    
    - name: Run security audit
      run: npm audit --audit-level high`,
          terminalCommands: [
            'git add .',
            'git commit -m "Add CI pipeline"',
            'git push origin main',
            'gh workflow run ci.yml'
          ],
          exercises: [
            {
              question: 'Create a comprehensive CI pipeline configuration that includes linting, testing, security scanning, and build steps for a Node.js application.',
              hint: 'Think about the different stages of CI: code quality checks, automated testing, security scanning, and building. Consider using GitHub Actions or similar CI tools.',
              solution: `# .github/workflows/comprehensive-ci.yml
name: Comprehensive CI Pipeline

on:
  push:
    branches: [ main, develop, 'feature/*' ]
  pull_request:
    branches: [ main, develop ]

env:
  NODE_VERSION: '18.x'
  REGISTRY: ghcr.io
  IMAGE_NAME: \${{ github.repository }}

jobs:
  code-quality:
    name: Code Quality Checks
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v3
      with:
        fetch-depth: 0
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: \${{ env.NODE_VERSION }}
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run ESLint
      run: npm run lint
    
    - name: Run Prettier check
      run: npm run format:check
    
    - name: Run TypeScript check
      run: npm run type-check
    
    - name: SonarCloud Scan
      uses: SonarSource/sonarcloud-github-action@master
      env:
        GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
        SONAR_TOKEN: \${{ secrets.SONAR_TOKEN }}

  security:
    name: Security Scanning
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: \${{ env.NODE_VERSION }}
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run npm audit
      run: npm audit --audit-level high
    
    - name: Run Snyk security scan
      uses: snyk/actions/node@master
      env:
        SNYK_TOKEN: \${{ secrets.SNYK_TOKEN }}

  test:
    name: Test Suite
    runs-on: ubuntu-latest
    
    strategy:
      matrix:
        node-version: [16.x, 18.x, 20.x]
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v3
    
    - name: Setup Node.js \${{ matrix.node-version }}
      uses: actions/setup-node@v3
      with:
        node-version: \${{ matrix.node-version }}
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run unit tests
      run: npm run test:unit -- --coverage
    
    - name: Run integration tests
      run: npm run test:integration
    
    - name: Upload coverage to Codecov
      uses: codecov/codecov-action@v3
      with:
        file: ./coverage/lcov.info
        flags: unittests
        name: codecov-umbrella

  build:
    name: Build Application
    runs-on: ubuntu-latest
    needs: [code-quality, security, test]
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: \${{ env.NODE_VERSION }}
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build application
      run: npm run build
    
    - name: Upload build artifacts
      uses: actions/upload-artifact@v3
      with:
        name: build-files
        path: dist/
    
    - name: Build Docker image
      run: |
        docker build -t \${{ env.REGISTRY }}/\${{ env.IMAGE_NAME }}:\${{ github.sha }} .
        docker build -t \${{ env.REGISTRY }}/\${{ env.IMAGE_NAME }}:latest .
    
    - name: Log in to Container Registry
      if: github.event_name != 'pull_request'
      uses: docker/login-action@v2
      with:
        registry: \${{ env.REGISTRY }}
        username: \${{ github.actor }}
        password: \${{ secrets.GITHUB_TOKEN }}
    
    - name: Push Docker image
      if: github.event_name != 'pull_request'
      run: |
        docker push \${{ env.REGISTRY }}/\${{ env.IMAGE_NAME }}:\${{ github.sha }}
        docker push \${{ env.REGISTRY }}/\${{ env.IMAGE_NAME }}:latest`,
              points: 200,
              terminalTask: 'Create and configure a complete CI pipeline with all quality gates'
            }
          ]
        }
      ]
    },
    {
      id: 'containerization',
      title: 'Containerization & Docker',
      description: 'Container technologies and orchestration',
      icon: <Container className="w-5 h-5" />,
      progress: 30,
      estimatedTime: '4 hours',
      difficulty: 'intermediate',
      isExpanded: false,
      lessons: [
        {
          id: 'docker-basics',
          title: 'Docker Fundamentals',
          duration: '90 min',
          difficulty: 'intermediate',
          progress: 40,
          estimatedTime: '90 minutes',
          icon: <Container className="w-4 h-4" />,
          completed: false,
          content: `
            <h2 className="text-2xl font-bold text-white mb-6">Docker Fundamentals</h2>
            <p className="text-gray-300 mb-6 leading-relaxed">Docker is a platform that uses containerization technology to package applications and their dependencies into lightweight, portable containers.</p>
            
            <h3 className="text-xl font-semibold text-blue-400 mb-4">Key Docker Concepts:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/50">
                <h4 className="text-green-400 font-semibold mb-2">Images</h4>
                <p className="text-gray-300 text-sm">Read-only templates used to create containers</p>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/50">
                <h4 className="text-blue-400 font-semibold mb-2">Containers</h4>
                <p className="text-gray-300 text-sm">Running instances of Docker images</p>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/50">
                <h4 className="text-yellow-400 font-semibold mb-2">Dockerfile</h4>
                <p className="text-gray-300 text-sm">Text file with instructions to build images</p>
              </div>
              <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700/50">
                <h4 className="text-purple-400 font-semibold mb-2">Registry</h4>
                <p className="text-gray-300 text-sm">Storage and distribution system for images</p>
              </div>
            </div>
          `,
          codeExample: `# Dockerfile for Node.js Application
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application code
COPY . .

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Change ownership of the app directory
RUN chown -R nextjs:nodejs /app
USER nextjs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \\
  CMD curl -f http://localhost:3000/health || exit 1

# Start application
CMD ["npm", "start"]

# Docker Commands
# Build image
docker build -t my-app:latest .

# Run container
docker run -d -p 3000:3000 --name my-app-container my-app:latest

# View logs
docker logs my-app-container

# Execute commands in container
docker exec -it my-app-container /bin/sh`,
          terminalCommands: [
            'docker --version',
            'docker images',
            'docker ps',
            'docker build -t test-app .'
          ],
          exercises: [
            {
              question: 'Create a multi-stage Dockerfile for a React application that includes development dependencies for building and a production-ready final image.',
              hint: 'Use multi-stage builds to separate the build environment from the production environment. The first stage should install all dependencies and build the app, while the second stage should only contain the production files.',
              solution: `# Multi-stage Dockerfile for React Application

# Stage 1: Build stage
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install all dependencies (including dev dependencies)
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Production stage
FROM nginx:alpine AS production

# Install curl for health checks
RUN apk add --no-cache curl

# Copy built application from builder stage
COPY --from=builder /app/build /usr/share/nginx/html

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Create non-root user
RUN addgroup -g 1001 -S nginx-user
RUN adduser -S nginx-user -u 1001

# Change ownership of nginx directories
RUN chown -R nginx-user:nginx-user /usr/share/nginx/html
RUN chown -R nginx-user:nginx-user /var/cache/nginx
RUN chown -R nginx-user:nginx-user /var/log/nginx
RUN chown -R nginx-user:nginx-user /etc/nginx/conf.d
RUN touch /var/run/nginx.pid
RUN chown -R nginx-user:nginx-user /var/run/nginx.pid

# Switch to non-root user
USER nginx-user

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \\
  CMD curl -f http://localhost:80/ || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

# Build commands:
# docker build -t react-app:latest .
# docker run -d -p 8080:80 --name react-container react-app:latest`,
              points: 180,
              terminalTask: 'docker build -t react-app . && docker run -p 8080:80 react-app'
            }
          ]
        }
      ]
    },
    {
      id: 'infrastructure-as-code',
      title: 'Infrastructure as Code',
      description: 'Terraform, CloudFormation, and infrastructure automation',
      icon: <Settings className="w-5 h-5" />,
      progress: 20,
      estimatedTime: '5 hours',
      difficulty: 'advanced',
      isExpanded: false,
      lessons: [
        {
          id: 'terraform-basics',
          title: 'Terraform Fundamentals',
          duration: '120 min',
          difficulty: 'advanced',
          progress: 25,
          estimatedTime: '120 minutes',
          icon: <Settings className="w-4 h-4" />,
          completed: false,
          content: `
            <h2 className="text-2xl font-bold text-white mb-6">Infrastructure as Code with Terraform</h2>
            <p className="text-gray-300 mb-6 leading-relaxed">Terraform is an open-source infrastructure as code software tool that enables you to safely and predictably create, change, and improve infrastructure.</p>
          `,
          codeExample: `# Terraform AWS Infrastructure Example
terraform {
  required_version = ">= 1.0"
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

# VPC
resource "aws_vpc" "main" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name = "main-vpc"
  }
}

# Internet Gateway
resource "aws_internet_gateway" "main" {
  vpc_id = aws_vpc.main.id

  tags = {
    Name = "main-igw"
  }
}

# Public Subnet
resource "aws_subnet" "public" {
  vpc_id                  = aws_vpc.main.id
  cidr_block              = "10.0.1.0/24"
  availability_zone       = data.aws_availability_zones.available.names[0]
  map_public_ip_on_launch = true

  tags = {
    Name = "public-subnet"
  }
}`,
          terminalCommands: [
            'terraform init',
            'terraform plan',
            'terraform apply',
            'terraform destroy'
          ],
          exercises: [
            {
              question: 'Create a Terraform configuration that provisions a complete web application infrastructure including VPC, subnets, security groups, and EC2 instances.',
              hint: 'Think about the components needed for a web application: networking (VPC, subnets), security (security groups), and compute (EC2 instances). Consider both public and private subnets.',
              solution: `# Complete Web Application Infrastructure

# Variables
variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-west-2"
}

variable "environment" {
  description = "Environment name"
  type        = string
  default     = "production"
}

# Data sources
data "aws_availability_zones" "available" {
  state = "available"
}

# VPC
resource "aws_vpc" "webapp_vpc" {
  cidr_block           = "10.0.0.0/16"
  enable_dns_hostnames = true
  enable_dns_support   = true

  tags = {
    Name        = "\${var.environment}-webapp-vpc"
    Environment = var.environment
  }
}

# Internet Gateway
resource "aws_internet_gateway" "webapp_igw" {
  vpc_id = aws_vpc.webapp_vpc.id

  tags = {
    Name        = "\${var.environment}-webapp-igw"
    Environment = var.environment
  }
}

# Public Subnets
resource "aws_subnet" "public_subnets" {
  count             = 2
  vpc_id            = aws_vpc.webapp_vpc.id
  cidr_block        = "10.0.\${count.index + 1}.0/24"
  availability_zone = data.aws_availability_zones.available.names[count.index]
  map_public_ip_on_launch = true

  tags = {
    Name        = "\${var.environment}-public-subnet-\${count.index + 1}"
    Environment = var.environment
    Type        = "Public"
  }
}

# Private Subnets
resource "aws_subnet" "private_subnets" {
  count             = 2
  vpc_id            = aws_vpc.webapp_vpc.id
  cidr_block        = "10.0.\${count.index + 10}.0/24"
  availability_zone = data.aws_availability_zones.available.names[count.index]

  tags = {
    Name        = "\${var.environment}-private-subnet-\${count.index + 1}"
    Environment = var.environment
    Type        = "Private"
  }
}

# Route Table for Public Subnets
resource "aws_route_table" "public_rt" {
  vpc_id = aws_vpc.webapp_vpc.id

  route {
    cidr_block = "0.0.0.0/0"
    gateway_id = aws_internet_gateway.webapp_igw.id
  }

  tags = {
    Name        = "\${var.environment}-public-rt"
    Environment = var.environment
  }
}

# Associate Public Subnets with Route Table
resource "aws_route_table_association" "public_rta" {
  count          = length(aws_subnet.public_subnets)
  subnet_id      = aws_subnet.public_subnets[count.index].id
  route_table_id = aws_route_table.public_rt.id
}

# Security Group for Web Servers
resource "aws_security_group" "web_sg" {
  name_prefix = "\${var.environment}-web-sg"
  vpc_id      = aws_vpc.webapp_vpc.id

  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["10.0.0.0/16"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name        = "\${var.environment}-web-sg"
    Environment = var.environment
  }
}

# Launch Template for Web Servers
resource "aws_launch_template" "web_lt" {
  name_prefix   = "\${var.environment}-web-lt"
  image_id      = "ami-0c02fb55956c7d316" # Amazon Linux 2
  instance_type = "t3.micro"

  vpc_security_group_ids = [aws_security_group.web_sg.id]

  user_data = base64encode(<<-EOF
              #!/bin/bash
              yum update -y
              yum install -y httpd
              systemctl start httpd
              systemctl enable httpd
              echo "<h1>Hello from \${var.environment} Web Server</h1>" > /var/www/html/index.html
              EOF
  )

  tag_specifications {
    resource_type = "instance"
    tags = {
      Name        = "\${var.environment}-web-server"
      Environment = var.environment
    }
  }
}

# Auto Scaling Group
resource "aws_autoscaling_group" "web_asg" {
  name                = "\${var.environment}-web-asg"
  vpc_zone_identifier = aws_subnet.public_subnets[*].id
  target_group_arns   = [aws_lb_target_group.web_tg.arn]
  health_check_type   = "ELB"
  min_size            = 2
  max_size            = 6
  desired_capacity    = 2

  launch_template {
    id      = aws_launch_template.web_lt.id
    version = "$Latest"
  }

  tag {
    key                 = "Name"
    value               = "\${var.environment}-web-asg"
    propagate_at_launch = false
  }

  tag {
    key                 = "Environment"
    value               = var.environment
    propagate_at_launch = true
  }
}

# Application Load Balancer
resource "aws_lb" "web_alb" {
  name               = "\${var.environment}-web-alb"
  internal           = false
  load_balancer_type = "application"
  security_groups    = [aws_security_group.web_sg.id]
  subnets            = aws_subnet.public_subnets[*].id

  enable_deletion_protection = false

  tags = {
    Name        = "\${var.environment}-web-alb"
    Environment = var.environment
  }
}

# Target Group
resource "aws_lb_target_group" "web_tg" {
  name     = "\${var.environment}-web-tg"
  port     = 80
  protocol = "HTTP"
  vpc_id   = aws_vpc.webapp_vpc.id

  health_check {
    enabled             = true
    healthy_threshold   = 2
    interval            = 30
    matcher             = "200"
    path                = "/"
    port                = "traffic-port"
    protocol            = "HTTP"
    timeout             = 5
    unhealthy_threshold = 2
  }

  tags = {
    Name        = "\${var.environment}-web-tg"
    Environment = var.environment
  }
}

# Load Balancer Listener
resource "aws_lb_listener" "web_listener" {
  load_balancer_arn = aws_lb.web_alb.arn
  port              = "80"
  protocol          = "HTTP"

  default_action {
    type             = "forward"
    target_group_arn = aws_lb_target_group.web_tg.arn
  }
}

# Outputs
output "load_balancer_dns" {
  description = "DNS name of the load balancer"
  value       = aws_lb.web_alb.dns_name
}

output "vpc_id" {
  description = "ID of the VPC"
  value       = aws_vpc.webapp_vpc.id
}`,
              points: 250,
              terminalTask: 'terraform init && terraform plan && terraform apply'
            }
          ]
        }
      ]
    },
    {
      id: 'monitoring-logging',
      title: 'Monitoring & Logging',
      description: 'Application and infrastructure monitoring',
      icon: <Monitor className="w-5 h-5" />,
      progress: 15,
      estimatedTime: '3 hours',
      difficulty: 'intermediate',
      isExpanded: false,
      lessons: [
        {
          id: 'monitoring-fundamentals',
          title: 'Monitoring Fundamentals',
          duration: '75 min',
          difficulty: 'intermediate',
          progress: 20,
          estimatedTime: '75 minutes',
          icon: <Monitor className="w-4 h-4" />,
          completed: false,
          content: `
            <h2 className="text-2xl font-bold text-white mb-6">Monitoring & Observability</h2>
            <p className="text-gray-300 mb-6 leading-relaxed">Monitoring is crucial for maintaining system reliability and performance. It involves collecting, analyzing, and acting on data about your systems.</p>
          `,
          codeExample: `# Prometheus Configuration
global:
  scrape_interval: 15s
  evaluation_interval: 15s

rule_files:
  - "alert_rules.yml"

scrape_configs:
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']

  - job_name: 'node-exporter'
    static_configs:
      - targets: ['localhost:9100']

  - job_name: 'application'
    static_configs:
      - targets: ['localhost:3000']
    metrics_path: '/metrics'
    scrape_interval: 5s

alerting:
  alertmanagers:
    - static_configs:
        - targets:
          - alertmanager:9093`,
          terminalCommands: [
            'docker run -p 9090:9090 prom/prometheus',
            'docker run -p 3000:3000 grafana/grafana',
            'curl http://localhost:9090/metrics',
            'kubectl apply -f monitoring-stack.yaml'
          ],
          exercises: [
            {
              question: 'Design a comprehensive monitoring solution using Prometheus and Grafana for a microservices application.',
              hint: 'Consider different types of metrics: application metrics, infrastructure metrics, and business metrics. Think about alerting rules and dashboard design.',
              solution: `# Comprehensive Monitoring Solution

# docker-compose.yml for monitoring stack
version: '3.8'

services:
  prometheus:
    image: prom/prometheus:latest
    container_name: prometheus
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
      - ./alert_rules.yml:/etc/prometheus/alert_rules.yml
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.path=/prometheus'
      - '--web.console.libraries=/etc/prometheus/console_libraries'
      - '--web.console.templates=/etc/prometheus/consoles'
      - '--storage.tsdb.retention.time=200h'
      - '--web.enable-lifecycle'
      - '--web.enable-admin-api'

  grafana:
    image: grafana/grafana:latest
    container_name: grafana
    ports:
      - "3000:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin123
    volumes:
      - grafana-storage:/var/lib/grafana
      - ./grafana/dashboards:/etc/grafana/provisioning/dashboards
      - ./grafana/datasources:/etc/grafana/provisioning/datasources

  alertmanager:
    image: prom/alertmanager:latest
    container_name: alertmanager
    ports:
      - "9093:9093"
    volumes:
      - ./alertmanager.yml:/etc/alertmanager/alertmanager.yml

  node-exporter:
    image: prom/node-exporter:latest
    container_name: node-exporter
    ports:
      - "9100:9100"
    volumes:
      - /proc:/host/proc:ro
      - /sys:/host/sys:ro
      - /:/rootfs:ro
    command:
      - '--path.procfs=/host/proc'
      - '--path.rootfs=/rootfs'
      - '--path.sysfs=/host/sys'
      - '--collector.filesystem.mount-points-exclude=^/(sys|proc|dev|host|etc)($$|/)'

volumes:
  grafana-storage:

# prometheus.yml - Enhanced configuration
global:
  scrape_interval: 15s
  evaluation_interval: 15s

rule_files:
  - "alert_rules.yml"

scrape_configs:
  # Prometheus itself
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']

  # Node Exporter for system metrics
  - job_name: 'node-exporter'
    static_configs:
      - targets: ['node-exporter:9100']

  # Application metrics
  - job_name: 'user-service'
    static_configs:
      - targets: ['user-service:8080']
    metrics_path: '/actuator/prometheus'
    scrape_interval: 5s

  - job_name: 'order-service'
    static_configs:
      - targets: ['order-service:8081']
    metrics_path: '/actuator/prometheus'
    scrape_interval: 5s

  - job_name: 'payment-service'
    static_configs:
      - targets: ['payment-service:8082']
    metrics_path: '/actuator/prometheus'
    scrape_interval: 5s

  # Database metrics
  - job_name: 'postgres-exporter'
    static_configs:
      - targets: ['postgres-exporter:9187']

  # Redis metrics
  - job_name: 'redis-exporter'
    static_configs:
      - targets: ['redis-exporter:9121']

alerting:
  alertmanagers:
    - static_configs:
        - targets:
          - alertmanager:9093

# alert_rules.yml - Comprehensive alerting rules
groups:
  - name: infrastructure
    rules:
      - alert: HighCPUUsage
        expr: 100 - (avg by(instance) (irate(node_cpu_seconds_total{mode="idle"}[5m])) * 100) > 80
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High CPU usage detected"
          description: "CPU usage is above 80% for more than 5 minutes"

      - alert: HighMemoryUsage
        expr: (node_memory_MemTotal_bytes - node_memory_MemAvailable_bytes) / node_memory_MemTotal_bytes * 100 > 85
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High memory usage detected"
          description: "Memory usage is above 85% for more than 5 minutes"

      - alert: DiskSpaceLow
        expr: (node_filesystem_avail_bytes / node_filesystem_size_bytes) * 100 < 10
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "Low disk space"
          description: "Disk space is below 10%"

  - name: application
    rules:
      - alert: HighErrorRate
        expr: rate(http_requests_total{status=~"5.."}[5m]) / rate(http_requests_total[5m]) * 100 > 5
        for: 2m
        labels:
          severity: critical
        annotations:
          summary: "High error rate detected"
          description: "Error rate is above 5% for more than 2 minutes"

      - alert: HighResponseTime
        expr: histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m])) > 0.5
        for: 5m
        labels:
          severity: warning
        annotations:
          summary: "High response time"
          description: "95th percentile response time is above 500ms"

      - alert: ServiceDown
        expr: up == 0
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: "Service is down"
          description: "Service {{ $labels.instance }} is down"

# alertmanager.yml - Alert routing configuration
global:
  smtp_smarthost: 'localhost:587'
  smtp_from: 'alerts@company.com'

route:
  group_by: ['alertname']
  group_wait: 10s
  group_interval: 10s
  repeat_interval: 1h
  receiver: 'web.hook'
  routes:
    - match:
        severity: critical
      receiver: 'critical-alerts'
    - match:
        severity: warning
      receiver: 'warning-alerts'

receivers:
  - name: 'web.hook'
    webhook_configs:
      - url: 'http://127.0.0.1:5001/'

  - name: 'critical-alerts'
    email_configs:
      - to: 'oncall@company.com'
        subject: 'CRITICAL: {{ .GroupLabels.alertname }}'
        body: |
          {{ range .Alerts }}
          Alert: {{ .Annotations.summary }}
          Description: {{ .Annotations.description }}
          {{ end }}
    slack_configs:
      - api_url: 'YOUR_SLACK_WEBHOOK_URL'
        channel: '#alerts-critical'
        title: 'Critical Alert'
        text: '{{ range .Alerts }}{{ .Annotations.summary }}{{ end }}'

  - name: 'warning-alerts'
    email_configs:
      - to: 'team@company.com'
        subject: 'WARNING: {{ .GroupLabels.alertname }}'
        body: |
          {{ range .Alerts }}
          Alert: {{ .Annotations.summary }}
          Description: {{ .Annotations.description }}
          {{ end }}

inhibit_rules:
  - source_match:
      severity: 'critical'
    target_match:
      severity: 'warning'
    equal: ['alertname', 'dev', 'instance']`,
              points: 220,
              terminalTask: 'docker-compose up -d && curl http://localhost:9090/targets'
            }
          ]
        }
      ]
    },
    {
      id: 'devsecops',
      title: 'DevSecOps',
      description: 'Security integration in DevOps pipelines',
      icon: <Shield className="w-5 h-5" />,
      progress: 10,
      estimatedTime: '4 hours',
      difficulty: 'advanced',
      isExpanded: false,
      lessons: [
        {
          id: 'security-fundamentals',
          title: 'Security in DevOps',
          duration: '90 min',
          difficulty: 'advanced',
          progress: 15,
          estimatedTime: '90 minutes',
          icon: <Shield className="w-4 h-4" />,
          completed: false,
          content: `
            <h2 className="text-2xl font-bold text-white mb-6">DevSecOps Fundamentals</h2>
            <p className="text-gray-300 mb-6 leading-relaxed">DevSecOps integrates security practices within the DevOps process, making security a shared responsibility throughout the entire IT lifecycle.</p>
          `,
          codeExample: `# Security Pipeline Example
name: Security Pipeline
on: [push, pull_request]

jobs:
  security-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Run Trivy vulnerability scanner
        uses: aquasecurity/trivy-action@master
        with:
          scan-type: 'fs'
          scan-ref: '.'
          format: 'sarif'
          output: 'trivy-results.sarif'
      
      - name: Upload Trivy scan results
        uses: github/codeql-action/upload-sarif@v2
        with:
          sarif_file: 'trivy-results.sarif'
      
      - name: Run Snyk security scan
        uses: snyk/actions/node@master
        env:
          SNYK_TOKEN: \${{ secrets.SNYK_TOKEN }}`,
          terminalCommands: [
            'trivy fs .',
            'snyk test',
            'docker run --rm -v \\$(pwd):/app clair-scanner',
            'bandit -r . -f json'
          ],
          exercises: [
            {
              question: 'Design a comprehensive DevSecOps pipeline that includes SAST, DAST, dependency scanning, and container security scanning.',
              hint: 'Think about different types of security testing: static analysis (SAST), dynamic analysis (DAST), dependency vulnerabilities, and container security. Consider when each type of scan should run in the pipeline.',
              solution: `# Comprehensive DevSecOps Pipeline

# .github/workflows/devsecops-pipeline.yml
name: DevSecOps Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

env:
  REGISTRY: ghcr.io
  IMAGE_NAME: \${{ github.repository }}

jobs:
  # Static Application Security Testing (SAST)
  sast-scan:
    name: Static Security Analysis
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v3
      with:
        fetch-depth: 0
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: ESLint Security Scan
      run: |
        npm install eslint-plugin-security --save-dev
        npx eslint . --ext .js,.jsx,.ts,.tsx --config .eslintrc-security.js
    
    - name: Semgrep SAST Scan
      uses: returntocorp/semgrep-action@v1
      with:
        config: >-
          p/security-audit
          p/secrets
          p/owasp-top-ten
    
    - name: CodeQL Analysis
      uses: github/codeql-action/init@v2
      with:
        languages: javascript
    
    - name: Perform CodeQL Analysis
      uses: github/codeql-action/analyze@v2

  # Dependency Security Scanning
  dependency-scan:
    name: Dependency Security Scan
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: npm audit
      run: npm audit --audit-level high
    
    - name: Snyk Dependency Scan
      uses: snyk/actions/node@master
      env:
        SNYK_TOKEN: \${{ secrets.SNYK_TOKEN }}
      with:
        args: --severity-threshold=high
    
    - name: OWASP Dependency Check
      uses: dependency-check/Dependency-Check_Action@main
      with:
        project: 'my-project'
        path: '.'
        format: 'ALL'
        args: >
          --enableRetired
          --enableExperimental
          --failOnCVSS 7
    
    - name: Upload Dependency Check results
      uses: actions/upload-artifact@v3
      with:
        name: dependency-check-report
        path: reports/

  # Secret Scanning
  secret-scan:
    name: Secret Detection
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v3
      with:
        fetch-depth: 0
    
    - name: TruffleHog Secret Scan
      uses: trufflesecurity/trufflehog@main
      with:
        path: ./
        base: main
        head: HEAD
        extra_args: --debug --only-verified
    
    - name: GitLeaks Secret Scan
      uses: gitleaks/gitleaks-action@v2
      env:
        GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}

  # Build and Container Security
  build-and-container-scan:
    name: Build and Container Security
    runs-on: ubuntu-latest
    needs: [sast-scan, dependency-scan, secret-scan]
    
    steps:
    - name: Checkout code
      uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build application
      run: npm run build
    
    - name: Build Docker image
      run: |
        docker build -t \${{ env.REGISTRY }}/\${{ env.IMAGE_NAME }}:\${{ github.sha }} .
        docker build -t \${{ env.REGISTRY }}/\${{ env.IMAGE_NAME }}:latest .
    
    - name: Trivy Container Scan
      uses: aquasecurity/trivy-action@master
      with:
        image-ref: '\${{ env.REGISTRY }}/\${{ env.IMAGE_NAME }}:\${{ github.sha }}'
        format: 'sarif'
        output: 'trivy-results.sarif'
    
    - name: Upload Trivy scan results
      uses: github/codeql-action/upload-sarif@v2
      with:
        sarif_file: 'trivy-results.sarif'
    
    - name: Snyk Container Scan
      uses: snyk/actions/docker@master
      env:
        SNYK_TOKEN: \${{ secrets.SNYK_TOKEN }}
      with:
        image: '\${{ env.REGISTRY }}/\${{ env.IMAGE_NAME }}:\${{ github.sha }}'
        args: --severity-threshold=high
    
    - name: Docker Bench Security
      run: |
        docker run --rm --net host --pid host --userns host --cap-add audit_control \\
           -e DOCKER_CONTENT_TRUST=$DOCKER_CONTENT_TRUST \\
           -v /var/lib:/var/lib:ro \\
           -v /var/run/docker.sock:/var/run/docker.sock:ro \\
           -v /usr/lib/systemd:/usr/lib/systemd:ro \\
           -v /etc:/etc:ro --label docker_bench_security \\
           docker/docker-bench-security

   # Dynamic Application Security Testing (DAST)
   dast-scan:
     name: Dynamic Security Testing
     runs-on: ubuntu-latest
     needs: build-and-container-scan
     if: github.ref == 'refs/heads/main'
     
     steps:
     - name: Checkout code
       uses: actions/checkout@v3
     
     - name: Start application for DAST
       run: |
         docker run -d -p 3000:3000 --name test-app \${{ env.REGISTRY }}/\${{ env.IMAGE_NAME }}:\${{ github.sha }}
         sleep 30 # Wait for app to start
     
     - name: OWASP ZAP Baseline Scan
       uses: zaproxy/action-baseline@v0.7.0
       with:
         target: 'http://localhost:3000'
         rules_file_name: '.zap/rules.tsv'
         cmd_options: '-a'
     
     - name: Stop test application
       run: docker stop test-app && docker rm test-app

   # Infrastructure Security
   infrastructure-scan:
     name: Infrastructure Security
     runs-on: ubuntu-latest
     
     steps:
     - name: Checkout code
       uses: actions/checkout@v3
     
     - name: Checkov Infrastructure Scan
       uses: bridgecrewio/checkov-action@master
       with:
         directory: .
         framework: terraform,dockerfile,kubernetes,github_actions
         output_format: sarif
         output_file_path: checkov-results.sarif
     
     - name: Upload Checkov scan results
       uses: github/codeql-action/upload-sarif@v2
       with:
         sarif_file: checkov-results.sarif
     
     - name: Terraform Security Scan
       uses: aquasecurity/tfsec-action@v1.0.0
       with:
         soft_fail: true

   # Compliance and Policy Checks
   compliance-check:
     name: Compliance and Policy
     runs-on: ubuntu-latest
     
     steps:
     - name: Checkout code
       uses: actions/checkout@v3
     
     - name: Open Policy Agent (OPA) Conftest
       run: |
         curl -L -o conftest.tar.gz https://github.com/open-policy-agent/conftest/releases/download/v0.46.0/conftest_0.46.0_Linux_x86_64.tar.gz
         tar xzf conftest.tar.gz
         sudo mv conftest /usr/local/bin
         conftest verify --policy policy/ kubernetes/

   # Security Report Generation
   security-report:
     name: Generate Security Report
     runs-on: ubuntu-latest
     needs: [sast-scan, dependency-scan, secret-scan, build-and-container-scan, infrastructure-scan]
     if: always()
     
     steps:
     - name: Download all artifacts
       uses: actions/download-artifact@v3
     
     - name: Generate Security Dashboard
       run: |
         echo "# Security Scan Results" > security-report.md
         echo "## Summary" >> security-report.md
         echo "- SAST: Completed" >> security-report.md
         echo "- Dependency Scan: Completed" >> security-report.md
         echo "- Secret Scan: Completed" >> security-report.md
         echo "- Container Scan: Completed" >> security-report.md
         echo "- Infrastructure Scan: Completed" >> security-report.md
     
     - name: Upload Security Report
       uses: actions/upload-artifact@v3
       with:
         name: security-report
         path: security-report.md

# Security Configuration Files

# .eslintrc-security.js
module.exports = {
  plugins: ['security'],
  extends: ['plugin:security/recommended'],
  rules: {
    'security/detect-object-injection': 'error',
    'security/detect-non-literal-regexp': 'error',
    'security/detect-unsafe-regex': 'error',
    'security/detect-buffer-noassert': 'error',
    'security/detect-child-process': 'error',
    'security/detect-disable-mustache-escape': 'error',
    'security/detect-eval-with-expression': 'error',
    'security/detect-no-csrf-before-method-override': 'error',
    'security/detect-non-literal-fs-filename': 'error',
    'security/detect-non-literal-require': 'error',
    'security/detect-possible-timing-attacks': 'error',
    'security/detect-pseudoRandomBytes': 'error'
  }
};

# .zap/rules.tsv
10011	IGNORE	(Cookie Without Secure Flag)
10015	IGNORE	(Incomplete or No Cache-control and Pragma HTTP Header Set)
10017	IGNORE	(Cross-Domain JavaScript Source File Inclusion)
10019	IGNORE	(Content-Type Header Missing)
10020	IGNORE	(X-Frame-Options Header Scanner)
10021	IGNORE	(X-Content-Type-Options Header Missing)

# policy/security.rego (OPA Policy)
package kubernetes.security

deny[msg] {
  input.kind == "Deployment"
  input.spec.template.spec.containers[_].securityContext.runAsRoot == true
  msg := "Container must not run as root"
}

deny[msg] {
  input.kind == "Deployment"
  not input.spec.template.spec.containers[_].securityContext.readOnlyRootFilesystem
  msg := "Container must have read-only root filesystem"
}

deny[msg] {
  input.kind == "Deployment"
  input.spec.template.spec.containers[_].securityContext.privileged == true
  msg := "Container must not run in privileged mode"
}`,
               points: 300,
               terminalTask: 'Create and run a complete DevSecOps pipeline with all security scans'
             }
           ]
         }
       ]
     }
   ];

   const selectedModule = modules.find(m => m.id === selectedModuleId) || modules[0];
   const selectedLesson = selectedModule.lessons.find(l => l.id === selectedLessonId) || selectedModule.lessons[0];
   const currentExercise = selectedLesson.exercises[0];

   useEffect(() => {
     if (currentExercise) {
       setCode(currentExercise.solution);
     }
   }, [selectedLessonId]);

   const handleTerminalCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
     if (e.key === 'Enter') {
       const command = terminalInput.trim();
       if (command) {
         const newHistory = [...terminalHistory, '$ ' + command];
         
         // Enhanced command simulation
         if (command === 'help') {
           newHistory.push('🚀 Available DevOps Commands:');
           newHistory.push('  git - Git version control commands');
           newHistory.push('  docker - Container management');
           newHistory.push('  kubectl - Kubernetes cluster management');
           newHistory.push('  terraform - Infrastructure as code');
           newHistory.push('  helm - Kubernetes package manager');
           newHistory.push('  prometheus - Monitoring queries');
           newHistory.push('  ls - List directory contents');
           newHistory.push('  clear - Clear terminal');
         } else if (command === 'clear') {
           setTerminalHistory(['🚀 Welcome to DevOps Professional Terminal', '💡 Type "help" for available commands', '📚 Practice DevOps commands in a safe environment', '']);
           setTerminalInput('');
           return;
         } else if (command.startsWith('git')) {
           newHistory.push('✅ Git command executed successfully');
           if (command.includes('status')) {
             newHistory.push('On branch main');
             newHistory.push('Your branch is up to date with \'origin/main\'.');
             newHistory.push('nothing to commit, working tree clean');
           } else if (command.includes('log')) {
             newHistory.push('commit abc123 (HEAD -> main, origin/main)');
             newHistory.push('Author: DevOps Engineer <devops@company.com>');
             newHistory.push('Date: ' + new Date().toLocaleDateString());
             newHistory.push('    feat: implement CI/CD pipeline');
           }
         } else if (command.startsWith('docker')) {
           newHistory.push('🐳 Docker command executed');
           if (command.includes('ps')) {
             newHistory.push('CONTAINER ID   IMAGE          COMMAND       CREATED       STATUS       PORTS                    NAMES');
             newHistory.push('abc123def456   nginx:alpine   "nginx -g..."  2 hours ago   Up 2 hours   0.0.0.0:80->80/tcp      web-server');
           } else if (command.includes('images')) {
             newHistory.push('REPOSITORY     TAG       IMAGE ID       CREATED        SIZE');
             newHistory.push('nginx          alpine    abc123def456   2 days ago     23.4MB');
             newHistory.push('node           18        def456ghi789   1 week ago     993MB');
           }
         } else if (command.startsWith('kubectl')) {
           newHistory.push('☸️ Kubernetes command executed');
           if (command.includes('get pods')) {
             newHistory.push('NAME                    READY   STATUS    RESTARTS   AGE');
             newHistory.push('web-app-7d4b8c9f-xyz12   1/1     Running   0          2h');
             newHistory.push('api-service-5f6g7h-abc34 1/1     Running   0          1h');
           }
         } else if (command.startsWith('terraform')) {
           newHistory.push('🏗️ Terraform command executed');
           if (command.includes('plan')) {
             newHistory.push('Plan: 3 to add, 0 to change, 0 to destroy.');
           } else if (command.includes('apply')) {
             newHistory.push('Apply complete! Resources: 3 added, 0 changed, 0 destroyed.');
           }
         } else if (command.startsWith('prometheus') || command.startsWith('curl')) {
           newHistory.push('📊 Monitoring command executed');
           newHistory.push('# HELP http_requests_total Total HTTP requests');
           newHistory.push('# TYPE http_requests_total counter');
           newHistory.push('http_requests_total{method="GET",status="200"} 1234');
         } else if (command === 'ls' || command.startsWith('ls ')) {
           newHistory.push('📁 Directory contents:');
           newHistory.push('drwxr-xr-x  3 devops devops  4096 Dec 15 10:30 src/');
           newHistory.push('drwxr-xr-x  2 devops devops  4096 Dec 15 10:25 config/');
           newHistory.push('drwxr-xr-x  4 devops devops  4096 Dec 15 10:20 docker/');
           newHistory.push('-rw-r--r--  1 devops devops  1024 Dec 15 10:15 Dockerfile');
           newHistory.push('-rw-r--r--  1 devops devops  2048 Dec 15 10:10 docker-compose.yml');
           newHistory.push('-rw-r--r--  1 devops devops   512 Dec 15 10:05 package.json');
           newHistory.push('-rw-r--r--  1 devops devops   256 Dec 15 10:00 README.md');
           newHistory.push('drwxr-xr-x  2 devops devops  4096 Dec 14 15:30 .git/');
         } else {
           newHistory.push(`❌ Command not found: ${command}`);
           newHistory.push('💡 Type "help" for available commands');
         }
         
         newHistory.push('');
         setTerminalHistory(newHistory);
         setTerminalInput('');
       }
     }
   };

   const runCode = () => {
     setOutput('✅ Code executed successfully!\n🚀 DevOps workflow completed.\n📊 All tests passed!\n🔒 Security scans completed.\n📈 Monitoring configured.');
   };

   const resetCode = () => {
     if (currentExercise) {
       setCode(currentExercise.solution);
       setOutput('');
       setShowHint(false);
       setShowSolution(false);
     }
   };

   const toggleModuleExpansion = (moduleId: string) => {
     const updatedModules = modules.map(module => 
       module.id === moduleId 
         ? { ...module, isExpanded: !module.isExpanded }
         : module
     );
     // Update the modules state if needed
   };

   const getDifficultyColor = (difficulty: string) => {
     switch (difficulty) {
       case 'beginner': return 'text-green-400 bg-green-900/20 border-green-500/30';
       case 'intermediate': return 'text-yellow-400 bg-yellow-900/20 border-yellow-500/30';
       case 'advanced': return 'text-red-400 bg-red-900/20 border-red-500/30';
       default: return 'text-gray-400 bg-gray-900/20 border-gray-500/30';
     }
   };

   const getProgressColor = (progress: number) => {
     if (progress >= 80) return 'from-green-500 to-emerald-500';
     if (progress >= 50) return 'from-yellow-500 to-orange-500';
     return 'from-blue-500 to-purple-500';
   };

   return (
     <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white' : 'bg-gradient-to-br from-gray-50 via-white to-gray-50 text-gray-900'}`}>
       {/* Header */}
       <div className={`fixed top-0 left-0 right-0 z-50 ${theme === 'dark' ? 'bg-gray-900/95 border-gray-700/50' : 'bg-white/95 border-gray-200/50'} backdrop-blur-sm border-b`}>
         <div className="flex items-center justify-between px-6 py-4">
           <div className="flex items-center space-x-4">
             <button
               onClick={() => window.history.back()}
               className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${theme === 'dark' ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}
             >
               <ChevronLeft className="w-4 h-4" />
               <span>Back to Courses</span>
             </button>
             <div className="h-6 w-px bg-gray-600"></div>
             <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
               DevOps Professional Course
             </h1>
           </div>
           
           <div className="flex items-center space-x-4">
             <div className="flex items-center space-x-2">
               <Award className="w-5 h-5 text-yellow-400" />
               <span className="text-sm font-medium">1,250 XP</span>
             </div>
             <button
               onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
               className={`p-2 rounded-lg transition-all duration-200 ${theme === 'dark' ? 'hover:bg-gray-800 text-gray-300' : 'hover:bg-gray-100 text-gray-600'}`}
             >
               {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
             </button>
           </div>
         </div>
       </div>

       <div className="pt-20 flex h-screen">
         {/* Enhanced Sidebar */}
         <div className={`w-80 ${theme === 'dark' ? 'bg-gray-900/95 border-gray-700/50' : 'bg-white/95 border-gray-200/50'} border-r backdrop-blur-sm flex flex-col`}>
           <div className="p-6 border-b border-gray-700/50">
             <div className="mb-6">
               <h2 className="text-lg font-bold mb-2">Course Progress</h2>
               <div className={`${theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-100/50'} rounded-lg p-4`}>
                 <div className="flex items-center justify-between mb-2">
                   <span className="text-sm font-medium">Overall Progress</span>
                   <span className="text-sm text-blue-400 font-semibold">35%</span>
                 </div>
                 <div className={`w-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-2`}>
                   <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500" style={{ width: '35%' }}></div>
                 </div>
                 <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                   <span>🎯 4/12 lessons completed</span>
                   <span>⭐ 1,250 points earned</span>
                 </div>
               </div>
             </div>
           </div>

           <div className="flex-1 overflow-y-auto p-4">
             <div className="space-y-3">
               {modules.map((module) => (
                 <div key={module.id} className="space-y-2">
                   <div 
                     className={`p-4 rounded-xl cursor-pointer transition-all duration-200 border ${
                       selectedModuleId === module.id 
                         ? `${theme === 'dark' ? 'bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-blue-500/30' : 'bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200'} shadow-lg`
                         : `${theme === 'dark' ? 'bg-gray-800/30 border-gray-700/30 hover:bg-gray-800/50' : 'bg-gray-50/30 border-gray-200/30 hover:bg-gray-100/50'}`
                     }`}
                     onClick={() => {
                       setSelectedModuleId(module.id);
                       toggleModuleExpansion(module.id);
                     }}
                   >
                     <div className="flex items-center justify-between">
                       <div className="flex items-center space-x-3">
                         <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                           module.progress > 0 ? 'bg-gradient-to-r from-green-500 to-blue-500' : `${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}`
                         }`}>
                           {module.icon}
                         </div>
                         <div className="flex-1">
                           <h3 className="font-semibold text-sm">{module.title}</h3>
                           <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{module.description}</p>
                           <div className="flex items-center space-x-3 mt-2">
                             <span className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>{module.estimatedTime}</span>
                             <div className="flex items-center">
                               <div className={`w-16 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'} rounded-full h-1`}>
                                 <div 
                                   className={`bg-gradient-to-r ${getProgressColor(module.progress)} h-1 rounded-full transition-all duration-500`}
                                   style={{ width: `${module.progress}%` }}
                                 ></div>
                               </div>
                               <span className={`text-xs ml-2 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>{module.progress}%</span>
                             </div>
                           </div>
                         </div>
                       </div>
                       <div className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                         {module.isExpanded ? 
                           <ChevronRight className="w-4 h-4 transform rotate-90 transition-transform duration-200" /> : 
                           <ChevronRight className="w-4 h-4 transition-transform duration-200" />
                         }
                       </div>
                     </div>
                   </div>

                   {/* Lessons */}
                   {module.isExpanded && (
                     <div className="ml-6 space-y-2">
                       {module.lessons.map((lesson, lessonIndex) => (
                         <button
                           key={lesson.id}
                           onClick={() => setSelectedLessonId(lesson.id)}
                           className={`w-full text-left p-3 rounded-lg transition-all duration-200 border ${
                             selectedLessonId === lesson.id
                               ? `${theme === 'dark' ? 'bg-gradient-to-r from-blue-900/50 to-purple-900/50 border-blue-500/50' : 'bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200'} shadow-lg`
                               : `${theme === 'dark' ? 'bg-gray-800/20 border-gray-700/30 hover:bg-gray-800/40' : 'bg-gray-50/20 border-gray-200/30 hover:bg-gray-100/40'}`
                           }`}
                         >
                           <div className="flex items-center space-x-3">
                             <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                               selectedLessonId === lesson.id
                                 ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                                 : lesson.completed 
                                   ? 'bg-green-500 text-white'
                                   : `${theme === 'dark' ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-600'}`
                             }`}>
                               {lesson.completed ? <CheckCircle className="w-4 h-4" /> : lessonIndex + 1}
                             </div>
                             <div className="flex-1">
                               <div className="flex items-center justify-between">
                                 <span className="text-sm font-medium">{lesson.title}</span>
                                 <span className={`px-2 py-1 rounded-full text-xs ${getDifficultyColor(lesson.difficulty)} border`}>
                                   {lesson.difficulty}
                                 </span>
                               </div>
                               <div className="flex items-center justify-between mt-1">
                                 <span className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>{lesson.duration}</span>
                                 {lesson.exercises.length > 0 && (
                                   <span className="text-xs text-blue-400">⭐ {lesson.exercises[0].points} pts</span>
                                 )}
                               </div>
                             </div>
                           </div>
                         </button>
                       ))}
                     </div>
                   )}
                 </div>
               ))}
             </div>
           </div>
         </div>

         {/* Main Content */}
         <div className="flex-1 flex flex-col">
           {/* Content Header */}
           <div className={`border-b ${theme === 'dark' ? 'border-gray-700/50 bg-gray-900/95' : 'border-gray-200/50 bg-white/95'} backdrop-blur-sm`}>
             <div className="p-6">
               <div className="flex items-center justify-between mb-4">
                 <div>
                   <h2 className="text-3xl font-bold">{selectedLesson.title}</h2>
                   <div className="flex items-center space-x-4 mt-2">
                     <span className={`flex items-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                       <Clock className="w-4 h-4 mr-1" />
                       {selectedLesson.duration}
                     </span>
                     <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(selectedLesson.difficulty)}`}>
                       {selectedLesson.difficulty}
                     </span>
                     <span className={`flex items-center ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                       <Target className="w-4 h-4 mr-1" />
                       {selectedLesson.exercises[0]?.points || 0} points
                     </span>
                   </div>
                 </div>
                 <div className="flex items-center space-x-2">
                   <div className={`px-4 py-2 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
                     <div className="flex items-center space-x-2">
                       <div className={`w-2 h-2 rounded-full ${selectedLesson.completed ? 'bg-green-400' : 'bg-yellow-400'}`}></div>
                       <span className="text-sm font-medium">
                         {selectedLesson.completed ? 'Completed' : 'In Progress'}
                       </span>
                     </div>
                   </div>
                 </div>
               </div>
               
               {/* Tab Navigation */}
               <div className="flex space-x-1">
                 {['theory', 'exercise', 'terminal'].map((tab) => (
                   <button
                     key={tab}
                     onClick={() => setActiveTab(tab as any)}
                     className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                       activeTab === tab
                         ? `${theme === 'dark' ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white'} shadow-lg`
                         : `${theme === 'dark' ? 'text-gray-400 hover:text-white hover:bg-gray-800' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`
                     }`}
                   >
                     {tab === 'theory' && <Book className="w-4 h-4 inline mr-2" />}
                     {tab === 'exercise' && <Code className="w-4 h-4 inline mr-2" />}
                     {tab === 'terminal' && <Terminal className="w-4 h-4 inline mr-2" />}
                     {tab.charAt(0).toUpperCase() + tab.slice(1)}
                   </button>
                 ))}
               </div>
             </div>
           </div>

           {/* Content Area */}
           <div className="flex-1 overflow-hidden">
             {activeTab === 'theory' && (
               <div className="h-full overflow-y-auto p-6">
                 <div 
                   className={`prose prose-lg max-w-none ${theme === 'dark' ? 'prose-invert' : ''}`}
                   dangerouslySetInnerHTML={{ __html: selectedLesson.content }}
                 />
               </div>
             )}

             {activeTab === 'exercise' && (
               <div className="h-full flex">
                 <div className="flex-1 flex flex-col">
                   <div className="p-4 border-b border-gray-700/50">
                     <h3 className="text-lg font-semibold mb-2">Exercise</h3>
                     <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>{currentExercise?.question}</p>
                   </div>
                   
                   <div className="flex-1 p-4">
                     <div className="h-full flex flex-col">
                       <div className="flex items-center justify-between mb-4">
                         <h4 className="font-medium">Code Editor</h4>
                         <div className="flex space-x-2">
                           <button
                             onClick={() => setShowHint(!showHint)}
                             className={`px-3 py-1 rounded text-sm transition-colors ${theme === 'dark' ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-yellow-500 hover:bg-yellow-600'} text-white`}
                           >
                             <Lightbulb className="w-4 h-4 inline mr-1" />
                             Hint
                           </button>
                           <button
                             onClick={() => setShowSolution(!showSolution)}
                             className={`px-3 py-1 rounded text-sm transition-colors ${theme === 'dark' ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'} text-white`}
                           >
                             <Eye className="w-4 h-4 inline mr-1" />
                             Solution
                           </button>
                           <button
                             onClick={resetCode}
                             className={`px-3 py-1 rounded text-sm transition-colors ${theme === 'dark' ? 'bg-gray-600 hover:bg-gray-700' : 'bg-gray-500 hover:bg-gray-600'} text-white`}
                           >
                             <RotateCcw className="w-4 h-4 inline mr-1" />
                             Reset
                           </button>
                         </div>
                       </div>
                       
                       {showHint && (
                         <div className={`mb-4 p-3 rounded-lg border-l-4 border-yellow-500 ${theme === 'dark' ? 'bg-yellow-900/20' : 'bg-yellow-50'}`}>
                           <p className={`text-sm ${theme === 'dark' ? 'text-yellow-200' : 'text-yellow-800'}`}>
                             💡 <strong>Hint:</strong> {currentExercise?.hint}
                           </p>
                         </div>
                       )}
                       
                       {showSolution && (
                         <div className={`mb-4 p-3 rounded-lg border-l-4 border-green-500 ${theme === 'dark' ? 'bg-green-900/20' : 'bg-green-50'}`}>
                           <p className={`text-sm ${theme === 'dark' ? 'text-green-200' : 'text-green-800'} mb-2`}>
                             ✅ <strong>Solution:</strong>
                           </p>
                           <pre className={`text-xs ${theme === 'dark' ? 'text-green-300' : 'text-green-700'} overflow-x-auto`}>
                             {currentExercise?.solution}
                           </pre>
                         </div>
                       )}
                       
                       <div className="flex-1 flex flex-col">
                         <textarea
                           value={code}
                           onChange={(e) => setCode(e.target.value)}
                           className={`flex-1 p-4 rounded-lg border font-mono text-sm resize-none ${
                             theme === 'dark' 
                               ? 'bg-gray-800 border-gray-700 text-gray-100' 
                               : 'bg-white border-gray-300 text-gray-900'
                           }`}
                           placeholder="Write your code here..."
                         />
                         
                         <div className="flex items-center justify-between mt-4">
                           <button
                             onClick={runCode}
                             className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg hover:from-green-600 hover:to-blue-600 transition-all duration-200"
                           >
                             <Play className="w-4 h-4" />
                             <span>Run Code</span>
                           </button>
                           
                           <button
                             className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                               theme === 'dark' 
                                 ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
                                 : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                             }`}
                           >
                             <Copy className="w-4 h-4" />
                             <span>Copy</span>
                           </button>
                         </div>
                       </div>
                     </div>
                   </div>
                 </div>
                 
                 <div className={`w-80 border-l ${theme === 'dark' ? 'border-gray-700/50 bg-gray-900/50' : 'border-gray-200/50 bg-gray-50/50'} flex flex-col`}>
                   <div className="p-4 border-b border-gray-700/50">
                     <h4 className="font-medium">Output</h4>
                   </div>
                   <div className="flex-1 p-4">
                     <pre className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'} whitespace-pre-wrap`}>
                       {output || 'Run your code to see the output...'}
                     </pre>
                   </div>
                 </div>
               </div>
             )}

             {activeTab === 'terminal' && (
               <div className="h-full flex flex-col">
                 <div className="p-4 border-b border-gray-700/50">
                   <h3 className="text-lg font-semibold mb-2">DevOps Terminal</h3>
                   <p className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>Practice DevOps commands in a safe environment</p>
                 </div>
                 
                 <div className="flex-1 flex flex-col">
                   <div className={`flex-1 p-4 overflow-y-auto font-mono text-sm ${theme === 'dark' ? 'bg-black/50' : 'bg-gray-900 text-green-400'}`}>
                     {terminalHistory.map((line, index) => (
                       <div key={index} className="mb-1">
                         {line}
                       </div>
                     ))}
                   </div>
                   
                   <div className={`p-4 border-t ${theme === 'dark' ? 'border-gray-700/50 bg-black/30' : 'border-gray-200/50 bg-gray-800'}`}>
                     <div className="flex items-center space-x-2">
                       <span className="text-green-400 font-mono">$</span>
                       <input
                         type="text"
                         value={terminalInput}
                         onChange={(e) => setTerminalInput(e.target.value)}
                         onKeyPress={handleTerminalCommand}
                         className="flex-1 bg-transparent text-green-400 font-mono outline-none"
                         placeholder="Type a command..."
                       />
                       <button
                         onClick={() => handleTerminalCommand({ key: 'Enter' } as any)}
                         className="p-2 text-green-400 hover:text-green-300 transition-colors"
                       >
                         <Send className="w-4 h-4" />
                       </button>
                     </div>
                   </div>
                 </div>
               </div>
             )}
           </div>
         </div>
       </div>
     </div>
   );
 };

 export default CourseLearningDevOpsBeginner;