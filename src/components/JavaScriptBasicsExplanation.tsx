import React from 'react';
import InteractiveCodeExplorer from './InteractiveCodeExplorer';
import { javascriptBasicsStructure } from '../data/javascriptBasicsStructure';

const JavaScriptBasicsExplanation: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            JavaScript Fundamentals
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Master JavaScript basics with this comprehensive interactive guide. Explore the complete project structure, 
            examine real code examples, and understand how to organize your JavaScript projects effectively.
          </p>
        </div>

        {/* Learning Objectives */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            🎯 What You'll Learn
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                Core Concepts
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>• Variables and data types</li>
                <li>• Functions and scope</li>
                <li>• Arrays and objects</li>
                <li>• DOM manipulation</li>
                <li>• Event handling</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                Practical Applications
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>• Interactive web pages</li>
                <li>• Form validation</li>
                <li>• Dynamic content updates</li>
                <li>• User interface interactions</li>
                <li>• API data handling</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Interactive Code Explorer */}
        <InteractiveCodeExplorer
          title="JavaScript Basics Project Structure"
          description="Explore the complete folder structure and code organization for JavaScript projects. Click on any file to view its complete source code and understand how different JavaScript concepts are implemented."
          data={javascriptBasicsStructure}
        />

        {/* Key Features Section */}
        <div className="mt-12 grid md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="text-yellow-500 text-3xl mb-4">⚡</div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
              Modern JavaScript
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Learn modern JavaScript syntax including ES6+ features, arrow functions, 
              destructuring, and template literals with practical examples.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="text-blue-500 text-3xl mb-4">🌐</div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
              DOM Manipulation
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Master the Document Object Model with hands-on examples of selecting elements, 
              modifying content, and creating dynamic user interfaces.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="text-green-500 text-3xl mb-4">🎮</div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
              Interactive Examples
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Build real-world applications including calculators, to-do lists, 
              and interactive games to solidify your JavaScript knowledge.
            </p>
          </div>
        </div>

        {/* Code Examples Preview */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">
            📋 What's Included in This Project
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">
                📁 File Structure
              </h3>
              <div className="bg-gray-50 dark:bg-gray-700 rounded p-4 font-mono text-sm">
                <div className="text-gray-600 dark:text-gray-400">
                  javascript-basics/<br/>
                  ├── index.html<br/>
                  ├── css/<br/>
                  │   └── styles.css<br/>
                  ├── js/<br/>
                  │   ├── 01-variables.js<br/>
                  │   ├── 02-functions.js<br/>
                  │   ├── 03-arrays.js<br/>
                  │   ├── 04-objects.js<br/>
                  │   ├── 05-dom.js<br/>
                  │   ├── 06-events.js<br/>
                  │   └── 07-async.js<br/>
                  └── exercises/<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;└── README.md
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">
                🔧 Topics Covered
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>✅ Variables and data types</li>
                <li>✅ Functions and arrow functions</li>
                <li>✅ Arrays and array methods</li>
                <li>✅ Objects and destructuring</li>
                <li>✅ DOM selection and manipulation</li>
                <li>✅ Event listeners and handling</li>
                <li>✅ Asynchronous JavaScript</li>
                <li>✅ Practical coding exercises</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Learning Path Section */}
        <div className="mt-12 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            📚 Recommended Learning Path
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">
                Step-by-Step Progression
              </h3>
              <ol className="space-y-3 text-gray-600 dark:text-gray-400">
                <li className="flex items-start">
                  <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">1</span>
                  <div>
                    <strong>Variables & Data Types</strong><br/>
                    <code className="text-sm bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">01-variables.js</code>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">2</span>
                  <div>
                    <strong>Functions & Scope</strong><br/>
                    <code className="text-sm bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">02-functions.js</code>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">3</span>
                  <div>
                    <strong>Arrays & Methods</strong><br/>
                    <code className="text-sm bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">03-arrays.js</code>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">4</span>
                  <div>
                    <strong>Objects & Destructuring</strong><br/>
                    <code className="text-sm bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">04-objects.js</code>
                  </div>
                </li>
              </ol>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">
                Advanced Topics
              </h3>
              <ol className="space-y-3 text-gray-600 dark:text-gray-400" start={5}>
                <li className="flex items-start">
                  <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">5</span>
                  <div>
                    <strong>DOM Manipulation</strong><br/>
                    <code className="text-sm bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">05-dom.js</code>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">6</span>
                  <div>
                    <strong>Event Handling</strong><br/>
                    <code className="text-sm bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">06-events.js</code>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">7</span>
                  <div>
                    <strong>Asynchronous JavaScript</strong><br/>
                    <code className="text-sm bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">07-async.js</code>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="bg-purple-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">8</span>
                  <div>
                    <strong>Practice Exercises</strong><br/>
                    <code className="text-sm bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">exercises/</code>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            💡 Learning Tips
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">
                🎯 Best Practices
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>• Run each JavaScript file in the browser console</li>
                <li>• Modify the examples and observe the changes</li>
                <li>• Complete the exercises in the exercises folder</li>
                <li>• Use browser developer tools for debugging</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">
                🚀 Next Steps
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>• Build your own interactive projects</li>
                <li>• Explore JavaScript frameworks (React, Vue)</li>
                <li>• Learn about Node.js for backend development</li>
                <li>• Practice with coding challenges and projects</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JavaScriptBasicsExplanation;