import React from 'react';
import InteractiveCodeExplorer from './InteractiveCodeExplorer';
import { cssGridStructure } from '../data/cssGridStructure';

const CSSGridExplanation: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            CSS Grid Layout System
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Master CSS Grid with this comprehensive interactive guide. Explore the complete project structure, 
            examine real code examples, and understand how to organize your CSS Grid projects effectively.
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
                <li>• Grid container and grid items</li>
                <li>• Grid template columns and rows</li>
                <li>• Grid areas and named lines</li>
                <li>• Gap and alignment properties</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
                Practical Applications
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>• Responsive gallery layouts</li>
                <li>• Dashboard and admin panels</li>
                <li>• Blog and content layouts</li>
                <li>• Complex web page structures</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Interactive Code Explorer */}
        <InteractiveCodeExplorer
          title="CSS Grid Project Structure"
          description="Explore the complete folder structure and code organization for CSS Grid projects. Click on any file to view its complete source code and understand how different CSS Grid techniques are implemented."
          data={cssGridStructure}
        />

        {/* Key Features Section */}
        <div className="mt-12 grid md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="text-blue-500 text-3xl mb-4">🏗️</div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
              Project Organization
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Learn how to structure your CSS Grid projects with proper file organization, 
              base styles, and modular CSS architecture.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="text-green-500 text-3xl mb-4">📱</div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
              Responsive Design
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Discover how to create responsive layouts that adapt to different screen sizes 
              using CSS Grid's powerful auto-fit and minmax functions.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="text-purple-500 text-3xl mb-4">🎨</div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
              Real-World Examples
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Examine complete HTML and CSS code for practical layouts including 
              galleries, dashboards, and complex web page structures.
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
                  css-grid-course/<br/>
                  ├── index.html<br/>
                  ├── css/<br/>
                  │   ├── base.css<br/>
                  │   ├── 01-basic.css<br/>
                  │   ├── 02-placement.css<br/>
                  │   ├── 03-named-areas.css<br/>
                  │   ├── 04-responsive-gallery.css<br/>
                  │   └── 05-dashboard.css<br/>
                  ├── demos/<br/>
                  │   └── [5 HTML demo files]<br/>
                  └── assets/
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">
                🔧 Features Covered
              </h3>
              <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>✅ Basic grid setup and syntax</li>
                <li>✅ Grid item placement techniques</li>
                <li>✅ Named grid areas</li>
                <li>✅ Responsive gallery layouts</li>
                <li>✅ Dashboard and admin layouts</li>
                <li>✅ Complete working examples</li>
                <li>✅ Mobile-responsive designs</li>
                <li>✅ Best practices and conventions</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Getting Started Section */}
        <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
            🚀 Getting Started
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">
                For Beginners
              </h3>
              <ol className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>1. Start with <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">base.css</code> to understand the foundation</li>
                <li>2. Examine <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">01-basic.css</code> for grid fundamentals</li>
                <li>3. Open the corresponding HTML demo files</li>
                <li>4. Experiment with the code in your browser</li>
              </ol>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-3">
                For Advanced Users
              </h3>
              <ol className="space-y-2 text-gray-600 dark:text-gray-400">
                <li>1. Jump to <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">04-responsive-gallery.css</code> for complex layouts</li>
                <li>2. Study the <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">05-dashboard.css</code> for real-world applications</li>
                <li>3. Modify the examples to fit your needs</li>
                <li>4. Create your own grid-based projects</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CSSGridExplanation;