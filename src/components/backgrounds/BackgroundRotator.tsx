import React, { useEffect, useState } from 'react';
import Lightning from '../Lightning';
import LaserFlow from '../LaserFlow';
import './backgrounds.css';
import PixelBlast from '../PixelBlast';

// Liquid Ether removed per requirement

const SilkRibbons: React.FC = () => (
  <div className="absolute inset-0 silk-ribbons-bg" />
);

const PixelBlastWrapper: React.FC = () => (
  <div className="absolute inset-0">
    <PixelBlast
      variant="circle"
      pixelSize={6}
      color="#00E0FF"
      patternScale={3}
      patternDensity={1.2}
      pixelSizeJitter={0.5}
      enableRipples
      rippleSpeed={0.4}
      rippleThickness={0.12}
      rippleIntensityScale={1.5}
      liquid
      liquidStrength={0.12}
      liquidRadius={1.2}
      liquidWobbleSpeed={5}
      speed={0.6}
      edgeFade={0.25}
      transparent
    />
  </div>
);

// Removed Plasma and Dither wrappers per requirement

type EffectKey = 'lightning' | 'pixel' | 'silk' | 'laserflow';

const effects: EffectKey[] = ['lightning', 'pixel', 'silk', 'laserflow'];

const BackgroundRotator: React.FC = () => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIndex(i => (i + 1) % effects.length), 10000);
    return () => clearInterval(id);
  }, []);

  const current = effects[index];

  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      {current === 'lightning' && (
        <Lightning hue={280} xOffset={0} speed={1} intensity={0.85} size={1} />
      )}
      {/* Liquid Ether removed */}
      {current === 'pixel' && <PixelBlastWrapper />}
      {/* Plasma and Dither removed */}
      {current === 'silk' && <SilkRibbons />}
      {current === 'laserflow' && (
        <LaserFlow 
          color="#00ff88"
          horizontalBeamOffset={0.1}
          verticalBeamOffset={0.0}
          flowSpeed={0.8}
          wispIntensity={0.4}
          fogIntensity={0.3}
          style={{ zIndex: 0 }}
        />
      )}
    </div>
  );
};

export default BackgroundRotator;