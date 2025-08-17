import React, { useState, useEffect } from 'react';
import Threads from './Threads';
import FaultyTerminal from './FaultyTerminal';
import LetterGlitch from './LetterGlitch';
import LightRays from './LightRays';

interface RotatingBackgroundsProps {
  interval?: number; // in milliseconds
}

const RotatingBackgrounds: React.FC<RotatingBackgroundsProps> = ({ 
  interval = 10000 // 10 seconds default
}) => {
  const [currentBackground, setCurrentBackground] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const backgrounds = [
    {
      name: 'Threads',
      component: (
        <Threads
          color={[0.0, 1.0, 0.0]} // Bright green color
          amplitude={1.5}
          distance={0.1}
          enableMouseInteraction={true}
        />
      )
    },
    {
      name: 'Light Rays',
      component: (
        <LightRays
          raysOrigin="top-center"
          raysColor="#00ffff"
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={1.2}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
        />
      )
    },
    {
      name: 'Faulty Terminal',
      component: (
        <FaultyTerminal
          scale={1}
          gridMul={[2, 1]}
          digitSize={1.5}
          timeScale={0.3}
          pause={false}
          scanlineIntensity={0.3}
          glitchAmount={1}
          flickerAmount={1}
          noiseAmp={1}
          chromaticAberration={0}
          dither={0}
          curvature={0.2}
          tint="#ffffff"
          mouseReact={true}
          mouseStrength={0.2}
          pageLoadAnimation={true}
          brightness={1}
        />
      )
    },
    {
      name: 'Letter Glitch',
      component: (
        <LetterGlitch
          glitchColors={["#2b4539", "#61dca3", "#61b3dc"]}
          glitchSpeed={50}
          centerVignette={true}
          outerVignette={false}
          smooth={true}
        />
      )
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true);
      
      // After a short transition delay, change the background
      setTimeout(() => {
        setCurrentBackground((prev) => (prev + 1) % backgrounds.length);
        setIsTransitioning(false);
      }, 300);
    }, interval);

    return () => clearInterval(timer);
  }, [interval, backgrounds.length]);

  return (
    <div style={{ 
      position: 'absolute', 
      top: 0, 
      left: 0, 
      width: '100%', 
      height: '100%',
      overflow: 'hidden'
    }}>
      {/* Current Background */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: isTransitioning ? 0 : 1,
          transition: 'opacity 0.3s ease-in-out',
        }}
      >
        {backgrounds[currentBackground].component}
      </div>

      {/* Background indicator (optional - can be removed) */}
      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          right: '20px',
          background: 'rgba(0, 0, 0, 0.7)',
          color: 'white',
          padding: '8px 12px',
          borderRadius: '20px',
          fontSize: '12px',
          fontFamily: 'monospace',
          zIndex: 10,
          opacity: 0.7,
        }}
      >
        {backgrounds[currentBackground].name}
      </div>

      {/* Progress indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: '10px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '4px',
          zIndex: 10,
        }}
      >
        {backgrounds.map((_, index) => (
          <div
            key={index}
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: index === currentBackground ? '#61dca3' : 'rgba(255, 255, 255, 0.3)',
              transition: 'background 0.3s ease',
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default RotatingBackgrounds;