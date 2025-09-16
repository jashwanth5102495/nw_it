import React, { useState } from 'react';
import FolderStructure, { FileNode } from './FolderStructure';
import CodeViewer from './CodeViewer';

interface InteractiveCodeExplorerProps {
  title: string;
  description?: string;
  data: FileNode[];
}

const InteractiveCodeExplorer: React.FC<InteractiveCodeExplorerProps> = ({ 
  title, 
  description, 
  data 
}) => {
  const [selectedFile, setSelectedFile] = useState<FileNode | null>(null);
  const [copied, setCopied] = useState(false);
  const [isFileExplorerVisible, setIsFileExplorerVisible] = useState(true);

  const handleFileSelect = (file: FileNode) => {
    setSelectedFile(file);
    setCopied(false);
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-1">
          {title}
        </h2>
        {description && (
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            {description}
          </p>
        )}
      </div>

      {/* Toggle Button */}
      <div className="fixed top-20 left-4 z-50">
        <button
          onClick={() => setIsFileExplorerVisible(!isFileExplorerVisible)}
          className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-full shadow-lg transition-all duration-200 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-red-300"
          title={isFileExplorerVisible ? 'Hide File Explorer' : 'Show File Explorer'}
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            {isFileExplorerVisible ? (
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
            ) : (
              <path fillRule="evenodd" d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
            )}
          </svg>
        </button>
      </div>

      {/* VS Code-like Interface */}
      <div className="flex h-[calc(100vh-120px)]">
        {/* File Explorer Panel - Left Sidebar */}
        {isFileExplorerVisible && (
          <div className="w-80 bg-gray-100 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col transition-all duration-300">
          {/* Explorer Header */}
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-750">
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wide">
                Explorer
              </span>
            </div>
          </div>
          
          {/* Project Name */}
          <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                {title.toLowerCase().replace(/\s+/g, '-')}-project
              </span>
            </div>
          </div>

          {/* File Structure */}
          <div className="flex-1 overflow-y-auto">
            <FolderStructure 
              data={data}
              onFileSelect={handleFileSelect}
              selectedFile={selectedFile?.name}
            />
          </div>
          </div>
        )}

        {/* Main Editor Area */}
        <div className={`flex-1 flex flex-col bg-white dark:bg-gray-900 transition-all duration-300 ${!isFileExplorerVisible ? 'ml-0' : ''}`}>
          {/* Tab Bar */}
          <div className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-2">
            {selectedFile ? (
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-2 bg-white dark:bg-gray-700 px-3 py-1 rounded-t border-t-2 border-blue-500">
                  <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {selectedFile.name}
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Select a file to view its contents
              </div>
            )}
          </div>

          {/* Code Editor */}
          <div className="flex-1">
            <CodeViewer 
              file={selectedFile}
              onCopy={handleCopy}
              copied={copied}
            />
          </div>
        </div>
      </div>

      {/* Instructions Footer */}
      <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <svg className="w-5 h-5 text-blue-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">
              💡 Interactive Code Explorer Guide:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400">
              <ul className="space-y-1">
                <li>• Expand folders by clicking the arrow icons</li>
                <li>• Click on any file name to view its source code</li>
              </ul>
              <ul className="space-y-1">
                <li>• Use the copy button to copy code snippets</li>
                <li>• Follow the project structure to understand organization</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveCodeExplorer;