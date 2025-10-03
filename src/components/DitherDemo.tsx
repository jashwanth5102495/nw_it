import React from 'react';
import Dither from './Dither';

const DitherDemo: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-black text-white">
      <Dither
        waveSpeed={0.06}
        waveFrequency={3}
        waveAmplitude={0.25}
        waveColor={[0.3, 0.7, 1.0]}
        colorNum={4}
        pixelSize={2}
        enableMouseInteraction
        mouseRadius={0.3}
      />
      <div className="relative z-10 p-6">
        <h1 className="text-2xl font-bold">Dither Background Demo</h1>
        <p className="text-gray-300">Move your mouse to interact.</p>
      </div>
    </div>
  );
};

export default DitherDemo;