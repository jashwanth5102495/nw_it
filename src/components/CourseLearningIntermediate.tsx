import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import Header from './Header';
import { ArrowLeft, Play, Book, Code, CheckCircle, XCircle, Lightbulb, Clock, Award, Users, Star, Monitor, Send, Sun, Moon, RotateCcw } from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  content: string;
  codeExample: string;
  exercises: Exercise[];
}

interface Exercise {
  id: string;
  question: string;
  initialCode: string;
  solution: string;
  hint: string;
}

interface CourseModule {
  id: string;
  title: string;
  lessons: Lesson[];
}

const CourseLearningIntermediate = () => {
  const { courseId, moduleId, lessonId } = useParams();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [currentModule, setCurrentModule] = useState<CourseModule | null>(null);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [code, setCode] = useState('');
  const [htmlCode, setHtmlCode] = useState('');
  const [cssCode, setCssCode] = useState('');
  const [jsCode, setJsCode] = useState('');
  const [activeTab, setActiveTab] = useState<'html' | 'css' | 'js' | 'theory'>('html');
  const [output, setOutput] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentExerciseId, setCurrentExerciseId] = useState<string | null>(null);
  const [submittedExercises, setSubmittedExercises] = useState<Set<string>>(new Set());
  const [exerciseProgress, setExerciseProgress] = useState<{[key: string]: number}>({});
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);

  // Frontend Development Intermediate Course - Module-based
  const courseModules: CourseModule[] = [
    {
      id: 'advanced-html',
      title: 'Advanced HTML Concepts',
      lessons: [
        {
          id: 'semantic-html',
          title: 'Semantic HTML and Accessibility',
          content: `
            <h2>🎯 Semantic HTML Elements</h2>
            <p>Semantic HTML provides meaning to web content, making it more accessible and SEO-friendly.</p>
            
            <h3>📋 Key Semantic Elements</h3>
            <ul>
              <li><code>&lt;header&gt;</code> - Page or section header</li>
              <li><code>&lt;nav&gt;</code> - Navigation links</li>
              <li><code>&lt;main&gt;</code> - Main content area</li>
              <li><code>&lt;article&gt;</code> - Independent content</li>
              <li><code>&lt;section&gt;</code> - Thematic grouping</li>
              <li><code>&lt;aside&gt;</code> - Sidebar content</li>
              <li><code>&lt;footer&gt;</code> - Page or section footer</li>
            </ul>
            
            <h3>♿ Accessibility Features</h3>
            <ul>
              <li><code>alt</code> attributes for images</li>
              <li><code>aria-label</code> for screen readers</li>
              <li><code>role</code> attributes for custom elements</li>
              <li>Proper heading hierarchy (h1-h6)</li>
            </ul>
          `,
          codeExample: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Semantic HTML Example</title>
</head>
<body>
    <header>
        <nav aria-label="Main navigation">
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    </header>
    
    <main>
        <article>
            <header>
                <h1>Article Title</h1>
                <time datetime="2024-01-15">January 15, 2024</time>
            </header>
            <p>This is the main content of the article...</p>
        </article>
        
        <aside>
            <h2>Related Links</h2>
            <ul>
                <li><a href="#">Related Article 1</a></li>
                <li><a href="#">Related Article 2</a></li>
            </ul>
        </aside>
    </main>
    
    <footer>
        <p>&copy; 2024 Your Website. All rights reserved.</p>
    </footer>
</body>
</html>`,
          exercises: [
            {
              id: 'ex1',
              question: 'Create a semantic HTML structure for a blog post',
              initialCode: '<!DOCTYPE html>\n<html>\n<body>\n    <!-- Create a semantic structure for a blog post with header, main content, sidebar, and footer -->\n</body>\n</html>',
              solution: '<!DOCTYPE html>\n<html lang="en">\n<head>\n    <meta charset="UTF-8">\n    <title>Blog Post</title>\n</head>\n<body>\n    <header>\n        <nav>\n            <ul>\n                <li><a href="#home">Home</a></li>\n                <li><a href="#blog">Blog</a></li>\n            </ul>\n        </nav>\n    </header>\n    \n    <main>\n        <article>\n            <header>\n                <h1>My Blog Post Title</h1>\n                <time datetime="2024-01-15">January 15, 2024</time>\n            </header>\n            <p>This is the main content of my blog post...</p>\n        </article>\n        \n        <aside>\n            <h2>Recent Posts</h2>\n            <ul>\n                <li><a href="#">Post 1</a></li>\n                <li><a href="#">Post 2</a></li>\n            </ul>\n        </aside>\n    </main>\n    \n    <footer>\n        <p>&copy; 2024 My Blog</p>\n    </footer>\n</body>\n</html>',
              hint: 'Use header, main, article, aside, and footer elements'
            }
          ]
        }
      ]
    }
  ];

  useEffect(() => {
    // Find the current module and lesson based on URL params
    const module = courseModules.find(m => m.id === moduleId);
    if (module) {
      setCurrentModule(module);
      const lesson = module.lessons.find(l => l.id === lessonId);
      if (lesson) {
        setCurrentLesson(lesson);
        setCode(lesson.codeExample);
        // Initialize tab content based on lesson type
        if (lesson.codeExample.includes('<html>') || lesson.codeExample.includes('<!DOCTYPE html>')) {
          setHtmlCode(lesson.codeExample);
          setCssCode('/* Add your CSS styles here */\nbody {\n  font-family: Arial, sans-serif;\n  margin: 0;\n  padding: 20px;\n}');
          setJsCode('// Add your JavaScript code here\nconsole.log("Hello World!");');
        } else {
          setHtmlCode('<!DOCTYPE html>\n<html lang="en">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Code Editor</title>\n</head>\n<body>\n  <h1>Hello World!</h1>\n  <p>Start coding here...</p>\n</body>\n</html>');
          setCssCode('/* Add your CSS styles here */\nbody {\n  font-family: Arial, sans-serif;\n  margin: 0;\n  padding: 20px;\n  background-color: #f0f0f0;\n}\n\nh1 {\n  color: #333;\n  text-align: center;\n}');
          setJsCode('// Add your JavaScript code here\ndocument.addEventListener("DOMContentLoaded", function() {\n  console.log("Page loaded!");\n  \n  // Example: Add click event to h1\n  const heading = document.querySelector("h1");\n  if (heading) {\n    heading.addEventListener("click", function() {\n      alert("Hello from JavaScript!");\n    });\n  }\n});');
        }
      }
    }
  }, [moduleId, lessonId]);

  const runCode = () => {
    try {
      // Combine HTML, CSS, and JS for execution
      const combinedCode = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            ${cssCode}
          </style>
        </head>
        <body>
          ${htmlCode.replace(/<!DOCTYPE html>.*?<body[^>]*>/is, '').replace(/<\/body>.*?<\/html>/is, '')}
          <script>
            ${jsCode}
          </script>
        </body>
        </html>
      `;
      setCode(combinedCode);
      setOutput('Code executed successfully! Check the preview tab.');
    } catch (error) {
      setOutput(`Error: ${error}`);
    }
  };

  const getCurrentTabCode = () => {
    switch (activeTab) {
      case 'html': return htmlCode;
      case 'css': return cssCode;
      case 'js': return jsCode;
      default: return htmlCode;
    }
  };

  const setCurrentTabCode = (value: string) => {
    switch (activeTab) {
      case 'html': setHtmlCode(value); break;
      case 'css': setCssCode(value); break;
      case 'js': setJsCode(value); break;
    }
  };

  const startExercise = (exercise: Exercise) => {
    setCurrentExerciseId(exercise.id);
    setCode(exercise.initialCode);
    setHtmlCode(exercise.initialCode);
    setActiveTab('html');
    setOutput('');
  };

  const submitExercise = async () => {
    if (!currentExerciseId) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubmittedExercises(prev => new Set([...prev, currentExerciseId]));
      setSubmissionMessage('Exercise submitted successfully!');
      setShowSubmissionModal(true);
      
      // Update progress
      setExerciseProgress(prev => ({
        ...prev,
        [currentExerciseId]: 100
      }));
      
    } catch (error) {
      setSubmissionMessage('Failed to submit exercise. Please try again.');
      setShowSubmissionModal(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePreview = () => {
    setIsFlipping(true);
    setTimeout(() => {
      setShowPreview(!showPreview);
      setIsFlipping(false);
    }, 150);
  };

  if (!currentModule || !currentLesson) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Loading...</h2>
          <p className="text-gray-400">Please wait while we load the course content.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      
      <div className="flex h-screen pt-16">
        {/* Left Sidebar - Course Navigation */}
        <div className={`${sidebarOpen ? 'w-80' : 'w-16'} bg-gray-800 border-r border-gray-700 transition-all duration-300 flex flex-col`}>
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
                <p className="text-sm text-gray-400">Frontend Development - Intermediate</p>
              </div>
            )}
          </div>
          
          {sidebarOpen && (
            <div className="flex-1 overflow-y-auto p-4">
              <div className="space-y-2">
                {currentModule.lessons.map((lesson, index) => (
                  <button
                    key={lesson.id}
                    onClick={() => navigate(`/course-learning-intermediate/frontend-intermediate/${moduleId}/${lesson.id}`)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      lesson.id === lessonId
                        ? 'bg-blue-600 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs mr-3 ${
                        lesson.id === lessonId ? 'bg-white text-blue-600' : 'bg-gray-600 text-gray-300'
                      }`}>
                        {index + 1}
                      </div>
                      <span className="font-medium">{lesson.title}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex">
          {/* Content Panel */}
          <div className="w-1/2 flex flex-col bg-gray-900">
            <div className="bg-gray-800 px-6 py-4 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-white">{currentLesson.title}</h2>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setActiveTab('theory')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      activeTab === 'theory'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                    }`}
                  >
                    <Book className="w-4 h-4 mr-2 inline" />
                    Theory
                  </button>
                  <button
                    onClick={() => setActiveTab('html')}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      currentExerciseId
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                    }`}
                  >
                    <Code className="w-4 h-4 mr-2 inline" />
                    Practice
                  </button>
                </div>
              </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6">
              {activeTab === 'theory' ? (
                <div className="prose prose-lg max-w-none dark:prose-invert">
                  <div dangerouslySetInnerHTML={{ __html: currentLesson.content }} />
                  
                  {/* Exercise Preview */}
                  {currentLesson.exercises && currentLesson.exercises.length > 0 && (
                    <div className="mt-8">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                        <Code className="w-5 h-5 text-green-500" />
                        Practice Exercises ({currentLesson.exercises.length})
                      </h4>
                      <div className="grid gap-4">
                        {currentLesson.exercises.map((exercise, index) => {
                          const isCompleted = submittedExercises.has(exercise.id);
                          const isCurrentExercise = currentExerciseId === exercise.id;
                          
                          return (
                            <div
                              key={exercise.id}
                              className={`p-4 rounded-lg border transition-all duration-200 ${
                                isCompleted
                                  ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20'
                                  : isCurrentExercise
                                  ? 'border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20'
                                  : 'border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600'
                              }`}
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-2">
                                    {isCompleted ? (
                                      <CheckCircle className="w-5 h-5 text-green-500" />
                                    ) : (
                                      <Code className="w-5 h-5 text-gray-400" />
                                    )}
                                    <h5 className="font-medium text-gray-900 dark:text-white">
                                      Exercise {index + 1}
                                    </h5>
                                  </div>
                                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                                    {exercise.question}
                                  </p>
                                  <div className="flex items-center gap-2">
                                    <button
                                      onClick={() => startExercise(exercise)}
                                      className={`inline-flex items-center px-4 py-2 text-white text-sm font-medium rounded-lg transition-colors duration-200 ${
                                        isCompleted
                                          ? 'bg-gray-600 hover:bg-gray-700'
                                          : 'bg-blue-600 hover:bg-blue-700'
                                      }`}
                                    >
                                      {isCompleted ? (
                                        <>
                                          <Code className="h-4 w-4 mr-2" />
                                          Review Exercise
                                        </>
                                      ) : (
                                        <>
                                          <Play className="h-4 w-4 mr-2" />
                                          Start Exercise
                                        </>
                                      )}
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="h-full">
                  {currentExerciseId ? (
                    <div className="h-full flex flex-col">
                      {(() => {
                        const exercise = currentLesson.exercises.find(ex => ex.id === currentExerciseId);
                        if (!exercise) return null;
                        
                        return (
                          <>
                            <div className="mb-4">
                              <h3 className="text-lg font-semibold mb-2">Exercise</h3>
                              <p className="text-gray-600 dark:text-gray-300">{exercise.question}</p>
                              {exercise.hint && (
                                <div className="mt-2 p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                                  <div className="flex items-start">
                                    <Lightbulb className="w-4 h-4 text-yellow-600 dark:text-yellow-400 mt-0.5 mr-2 flex-shrink-0" />
                                    <p className="text-sm text-yellow-800 dark:text-yellow-200">{exercise.hint}</p>
                                  </div>
                                </div>
                              )}
                            </div>
                            
                            <div className="flex-1 flex flex-col">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Your Solution:</span>
                                <button
                                  onClick={submitExercise}
                                  disabled={isSubmitting}
                                  className="inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white text-sm font-medium rounded-lg transition-colors duration-200"
                                >
                                  {isSubmitting ? (
                                    <>
                                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                      Submitting...
                                    </>
                                  ) : (
                                    <>
                                      <Send className="h-4 w-4 mr-2" />
                                      Submit Solution
                                    </>
                                  )}
                                </button>
                              </div>
                              <div className="flex-1 bg-gray-800 rounded-lg p-4">
                                <textarea
                                  value={code}
                                  onChange={(e) => setCode(e.target.value)}
                                  className="w-full h-full bg-transparent text-green-400 font-mono text-sm resize-none focus:outline-none"
                                  placeholder="Write your code here..."
                                />
                              </div>
                            </div>
                          </>
                        );
                      })()}
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center text-gray-500">
                      <div className="text-center">
                        <Code className="w-16 h-16 mx-auto mb-4 text-gray-600" />
                        <h3 className="text-lg font-medium mb-2">No Exercise Selected</h3>
                        <p>Select an exercise to start practicing</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Right Panel - Code Editor with Flip Effect */}
          <div className="w-1/2 flex flex-col bg-gray-900 relative">
            <div className="bg-gray-800 px-4 py-3 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex space-x-1.5">
                    <div className="w-2.5 h-2.5 bg-red-500 rounded-full"></div>
                    <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full"></div>
                    <div className="w-2.5 h-2.5 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {showPreview ? (
                      <>
                        <Monitor className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-400">Preview</span>
                      </>
                    ) : (
                      <>
                        <Code className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-400">Code Editor</span>
                        {/* Tab Navigation */}
                        <div className="flex ml-4 space-x-1">
                          {['html', 'css', 'js'].map((tab) => (
                            <button
                              key={tab}
                              onClick={() => setActiveTab(tab)}
                              className={`px-3 py-1 text-xs font-medium rounded transition-colors ${
                                activeTab === tab
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                              }`}
                            >
                              {tab.toUpperCase()}
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={togglePreview}
                    className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-700"
                    title={showPreview ? 'Show Code Editor' : 'Show Preview'}
                  >
                    <RotateCcw className={`w-4 h-4 transition-transform duration-300 ${isFlipping ? 'rotate-180' : ''}`} />
                  </button>
                  <button
                    onClick={runCode}
                    className="inline-flex items-center px-3 py-1.5 bg-green-600 hover:bg-green-700 text-white text-sm font-medium rounded-lg transition-colors duration-200"
                  >
                    <Play className="h-3 w-3 mr-1" />
                    Run
                  </button>
                </div>
              </div>
            </div>
            
            <div className="flex-1 relative overflow-hidden">
              <div className={`absolute inset-0 transition-transform duration-300 ${showPreview ? 'transform rotate-y-180' : ''}`}>
                {!showPreview ? (
                  <div className="h-full flex flex-col">
                    <div className="flex-1 p-4">
                      <div className="h-full flex flex-col">
                        {/* Tab Content Info */}
                        <div className="px-4 py-2 bg-gray-800 border-b border-gray-700">
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-gray-400">
                              {activeTab === 'html' && 'HTML Structure'}
                              {activeTab === 'css' && 'CSS Styles'}
                              {activeTab === 'js' && 'JavaScript Logic'}
                            </span>
                            <span className="text-xs text-gray-500">
                              {activeTab === 'html' && 'Define your page structure'}
                              {activeTab === 'css' && 'Style your elements'}
                              {activeTab === 'js' && 'Add interactivity'}
                            </span>
                          </div>
                        </div>
                        
                        {/* Code Editor */}
                        <div className="flex-1 p-4">
                          <textarea
                            value={getCurrentTabCode()}
                            onChange={(e) => setCurrentTabCode(e.target.value)}
                            className="w-full h-full bg-gray-900 text-green-400 font-mono text-sm resize-none focus:outline-none"
                            placeholder={
                              activeTab === 'html' ? 'Write your HTML structure here...' :
                              activeTab === 'css' ? 'Write your CSS styles here...' :
                              'Write your JavaScript code here...'
                            }
                          />
                        </div>
                      </div>
                    </div>
                    {output && (
                      <div className="border-t border-gray-700 p-4">
                        <div className="text-sm text-gray-400 mb-2">Output:</div>
                        <div className="bg-gray-800 p-3 rounded text-sm text-green-400 font-mono">
                          {output}
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="h-full">
                    <iframe
                      srcDoc={`
                        <!DOCTYPE html>
                        <html>
                        <head>
                          <meta charset="UTF-8">
                          <meta name="viewport" content="width=device-width, initial-scale=1.0">
                          <title>Live Preview</title>
                          <style>
                            /* Default styles */
                            body { margin: 0; padding: 20px; font-family: Arial, sans-serif; background: #ffffff; color: #333; }
                            /* User CSS */
                            ${cssCode}
                          </style>
                        </head>
                        <body>
                          ${htmlCode.replace(/<!DOCTYPE html>.*?<body[^>]*>/is, '').replace(/<\/body>.*?<\/html>/is, '')}
                          <script>
                            try {
                              ${jsCode}
                            } catch (error) {
                              console.error('JavaScript Error:', error);
                              document.body.innerHTML += '<div style="background: #ffebee; color: #c62828; padding: 10px; margin: 10px 0; border-radius: 4px; font-family: monospace;">JavaScript Error: ' + error.message + '</div>';
                            }
                          </script>
                        </body>
                        </html>
                      `}
                      className="w-full h-full border-none"
                      title="Live Preview"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Submission Modal */}
      {showSubmissionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 mb-4">
                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Exercise Submitted!
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                {submissionMessage}
              </p>
              <button
                onClick={() => setShowSubmissionModal(false)}
                className="w-full inline-flex justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors duration-200"
              >
                Continue Learning
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseLearningIntermediate;