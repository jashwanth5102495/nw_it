import React from 'react';
import Plasma from './Plasma';

const PlasmaDemo: React.FC = () => {
  return (
    <div style={{ width: '100%', height: '100vh', position: 'relative' }}>
      <Plasma 
        color="#ff6b35"
        speed={0.6}
        direction="forward"
        scale={1.1}
        opacity={0.8}
        mouseInteractive={true}
      />
      <div style={{ position: 'absolute', top: 20, left: 20, zIndex: 10, color: '#fff' }}>
        Plasma Demo (ESC to navigate back)
      </div>
    </div>
  );
};

export default PlasmaDemo;