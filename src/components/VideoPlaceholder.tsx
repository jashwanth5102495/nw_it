import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

interface VideoPlaceholderProps {
  title?: string;
  subtitle?: string;
  gradient?: 'purple' | 'pink' | 'blue' | 'default';
}

const VideoPlaceholder: React.FC<VideoPlaceholderProps> = ({ 
  title = "Video Placeholder", 
  subtitle = "Video explanation coming soon - stay tuned!",
  gradient = 'default'
}) => {
  const { theme } = useTheme();

  const gradientClasses = {
    purple: 'from-purple-600 to-purple-800',
    pink: 'from-pink-500 to-red-500',
    blue: 'from-blue-400 to-cyan-400',
    default: 'from-indigo-500 to-purple-600'
  };

  return (
    <div className="mb-5 text-center">
      <div className={`
        w-full max-w-4xl h-96 mx-auto rounded-lg shadow-lg
        bg-gradient-to-br ${gradientClasses[gradient]}
        flex items-center justify-center text-white text-lg font-bold
        transition-all duration-300 hover:shadow-xl hover:scale-[1.02]
      `}>
        {title}
      </div>
      <p className={`
        mt-2.5 text-sm
        ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}
      `}>
        {subtitle}
      </p>
    </div>
  );
};

export default VideoPlaceholder;