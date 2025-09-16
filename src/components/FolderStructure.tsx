import React, { useState } from 'react';
import { ChevronRightIcon, ChevronDownIcon, FolderIcon, DocumentIcon } from '@heroicons/react/24/outline';

export interface FileNode {
  name: string;
  type: 'file' | 'folder';
  content?: string;
  language?: string;
  children?: FileNode[];
}

interface FolderStructureProps {
  data: FileNode[];
  onFileSelect?: (file: FileNode) => void;
  selectedFile?: string;
}

interface FileTreeItemProps {
  node: FileNode;
  level: number;
  onFileSelect?: (file: FileNode) => void;
  selectedFile?: string;
}

const FileTreeItem: React.FC<FileTreeItemProps> = ({ node, level, onFileSelect, selectedFile }) => {
  const [isExpanded, setIsExpanded] = useState(level === 0);
  const isSelected = selectedFile === node.name;
  const hasChildren = node.children && node.children.length > 0;

  const handleClick = () => {
    if (node.type === 'folder') {
      setIsExpanded(!isExpanded);
    } else {
      onFileSelect?.(node);
    }
  };

  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'html':
        return (
          <svg className="w-4 h-4 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
          </svg>
        );
      case 'css':
        return (
          <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" />
          </svg>
        );
      case 'js':
      case 'jsx':
        return (
          <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z" clipRule="evenodd" />
          </svg>
        );
      case 'ts':
      case 'tsx':
        return (
          <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z" clipRule="evenodd" />
          </svg>
        );
      case 'json':
        return (
          <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z" clipRule="evenodd" />
          </svg>
        );
      case 'md':
        return (
          <svg className="w-4 h-4 text-gray-600 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z" clipRule="evenodd" />
          </svg>
        );
      default:
        return (
          <DocumentIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
        );
    }
  };

  return (
    <div className="select-none">
      <div
        className={`flex items-center py-1 px-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150 ${
          isSelected ? 'bg-blue-600 text-white' : ''
        }`}
        style={{ paddingLeft: `${level * 16 + 8}px` }}
        onClick={handleClick}
      >
        {node.type === 'folder' ? (
          <>
            <span className="mr-1 flex-shrink-0">
              {isExpanded ? (
                <ChevronDownIcon className="w-3 h-3 text-gray-500 dark:text-gray-400" />
              ) : (
                <ChevronRightIcon className="w-3 h-3 text-gray-500 dark:text-gray-400" />
              )}
            </span>
            <FolderIcon className={`w-4 h-4 mr-2 flex-shrink-0 ${
              isExpanded ? 'text-blue-500 dark:text-blue-400' : 'text-yellow-600 dark:text-yellow-500'
            } ${isSelected ? 'text-white' : ''}`} />
          </>
        ) : (
          <>
            <span className="w-3 h-3 mr-1 flex-shrink-0" />
            <span className="mr-2 flex-shrink-0">{getFileIcon(node.name)}</span>
          </>
        )}
        <span className={`text-sm truncate ${
          isSelected 
            ? 'text-white font-medium'
            : 'text-gray-700 dark:text-gray-300'
        }`}>
          {node.name}
        </span>
      </div>
      
      {node.type === 'folder' && hasChildren && isExpanded && (
        <div>
          {node.children!.map((child, index) => (
            <FileTreeItem
              key={`${child.name}-${index}`}
              node={child}
              level={level + 1}
              onFileSelect={onFileSelect}
              selectedFile={selectedFile}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const FolderStructure: React.FC<FolderStructureProps> = ({ data, onFileSelect, selectedFile }) => {
  return (
    <div className="h-full">
      {data.map((node, index) => (
        <FileTreeItem
          key={`${node.name}-${index}`}
          node={node}
          level={0}
          onFileSelect={onFileSelect}
          selectedFile={selectedFile}
        />
      ))}
    </div>
  );
};

export default FolderStructure;