import React from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../contexts/ThemeContext';

interface ThemeToggleProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '', size = 'md' }) => {
  const { theme, toggleTheme } = useTheme();

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12'
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  return (
    <button
      onClick={toggleTheme}
      className={`
        ${sizeClasses[size]}
        relative inline-flex items-center justify-center
        rounded-full border-2 transition-all duration-300 ease-in-out
        hover:scale-105 active:scale-95
        ${theme === 'dark' 
          ? 'bg-gray-800 border-gray-600 text-yellow-400 hover:bg-gray-700 hover:border-gray-500' 
          : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50 hover:border-gray-400'
        }
        shadow-lg hover:shadow-xl
        ${className}
      `}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <div className="relative">
        {/* Sun Icon */}
        <SunIcon 
          className={`
            ${iconSizes[size]}
            absolute inset-0 transition-all duration-300 ease-in-out
            ${theme === 'dark' 
              ? 'opacity-0 rotate-90 scale-0' 
              : 'opacity-100 rotate-0 scale-100'
            }
          `}
        />
        
        {/* Moon Icon */}
        <MoonIcon 
          className={`
            ${iconSizes[size]}
            absolute inset-0 transition-all duration-300 ease-in-out
            ${theme === 'dark' 
              ? 'opacity-100 rotate-0 scale-100' 
              : 'opacity-0 -rotate-90 scale-0'
            }
          `}
        />
      </div>
      
      {/* Ripple effect */}
      <div className={`
        absolute inset-0 rounded-full opacity-0 
        ${theme === 'dark' ? 'bg-yellow-400' : 'bg-gray-600'}
        animate-ping
      `} />
    </button>
  );
};

export default ThemeToggle;