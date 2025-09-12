import React from 'react';

interface GalaxyProps {
  className?: string;
}

const Galaxy: React.FC<GalaxyProps> = ({ className = '' }) => {
  return (
    <div className={`galaxy-container ${className}`}>
      <div className="space stars1"></div>
      <div className="space stars2"></div>
      <div className="space stars3"></div>
      <div className="space stars4"></div>
    </div>
  );
};

export default Galaxy;