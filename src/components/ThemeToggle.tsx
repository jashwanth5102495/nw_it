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
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-14 h-14'
  };

  const iconSizes = {
    sm: 'w-5 h-5',
    md: 'w-6 h-6',
    lg: 'w-7 h-7'
  };

  return (
    <button
      onClick={toggleTheme}
      className={`
        ${sizeClasses[size]}
        relative inline-flex items-center justify-center
        rounded-2xl transition-all duration-500 ease-out
        hover:scale-110 active:scale-95
        backdrop-blur-xl border-2
        ${theme === 'dark' 
          ? 'bg-gradient-to-br from-slate-800/90 to-slate-900/90 border-slate-600/50 text-amber-300 hover:from-slate-700/90 hover:to-slate-800/90 hover:border-slate-500/70 shadow-lg shadow-slate-900/50' 
          : 'bg-gradient-to-br from-white/90 to-gray-50/90 border-gray-300/50 text-slate-700 hover:from-gray-50/90 hover:to-white/90 hover:border-gray-400/70 shadow-lg shadow-gray-900/20'
        }
        hover:shadow-2xl group overflow-hidden
        ${className}
      `}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {/* Background glow effect */}
      <div className={`
        absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500
        ${theme === 'dark' 
          ? 'bg-gradient-to-br from-amber-400/20 to-orange-500/20' 
          : 'bg-gradient-to-br from-blue-400/20 to-indigo-500/20'
        }
      `} />
      
      <div className="relative z-10">
        {/* Sun Icon */}
        <SunIcon 
          className={`
            ${iconSizes[size]}
            absolute inset-0 transition-all duration-500 ease-out
            ${theme === 'dark' 
              ? 'opacity-0 rotate-180 scale-0' 
              : 'opacity-100 rotate-0 scale-100'
            }
            drop-shadow-sm
          `}
        />
        
        {/* Moon Icon */}
        <MoonIcon 
          className={`
            ${iconSizes[size]}
            absolute inset-0 transition-all duration-500 ease-out
            ${theme === 'dark' 
              ? 'opacity-100 rotate-0 scale-100' 
              : 'opacity-0 -rotate-180 scale-0'
            }
            drop-shadow-sm
          `}
        />
      </div>
      
      {/* Animated border */}
      <div className={`
        absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300
        ${theme === 'dark' 
          ? 'bg-gradient-to-r from-amber-400/30 via-orange-500/30 to-amber-400/30' 
          : 'bg-gradient-to-r from-blue-400/30 via-indigo-500/30 to-blue-400/30'
        }
        animate-pulse
      `} />
    </button>
  );
};

export default ThemeToggle;