import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import './Dither.css';

type DitherProps = {
  waveSpeed?: number; // Speed of the wave animation
  waveFrequency?: number; // Frequency of the wave pattern
  waveAmplitude?: number; // Amplitude of the wave pattern
  waveColor?: [number, number, number]; // RGB array (0..1)
  colorNum?: number; // Number of quantization colors
  pixelSize?: number; // Pixel size for dithering effect
  disableAnimation?: boolean; // Stop animation when true
  enableMouseInteraction?: boolean; // Mouse affects waves
  mouseRadius?: number; // Radius for mouse effect (normalized)
  className?: string; // Optional container class
  style?: React.CSSProperties; // Optional container styles
};

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

// 4x4 Bayer dithering + retro wave quantization
const fragmentShader = `
  precision highp float;
  varying vec2 vUv;

  uniform float uTime;
  uniform vec3 uColor;
  uniform float uAmplitude;
  uniform float uFrequency;
  uniform float uSpeed;
  uniform float uPixelSize;
  uniform float uColorNum;
  uniform vec2 uMouse;
  uniform float uMouseRadius;
  uniform bool uEnableMouse;
  uniform bool uDisableAnimation;

  // 4x4 Bayer matrix function (returns threshold in [0,1])
  float bayer4(vec2 p){
    vec2 a = mod(p, 2.0);
    vec2 b = mod(floor(p/2.0), 2.0);
    float t = (a.x + a.y*2.0 + b.x*4.0 + b.y*8.0) / 16.0; 
    return t;
  }

  void main(){
    // Map uv to [-1,1]
    vec2 p = vUv * 2.0 - 1.0;

    // Optional mouse ripple influence
    float animT = uDisableAnimation ? 0.0 : uTime;
    float wave = sin(p.x * uFrequency + animT * uSpeed) +
                 sin(p.y * (uFrequency * 1.3) + animT * (uSpeed * 1.1));
    wave *= uAmplitude;

    if(uEnableMouse){
      vec2 m = uMouse * 2.0 - 1.0; // normalized to [-1,1]
      float d = length(p - m);
      float ripple = smoothstep(uMouseRadius, 0.0, d);
      wave += ripple * uAmplitude;
    }

    // Base intensity
    float i = clamp((wave + 1.0) * 0.5, 0.0, 1.0);

    // Pixelation using gl_FragCoord and desired pixel size
    vec2 px = floor(gl_FragCoord.xy / max(uPixelSize, 1.0));
    float threshold = bayer4(px);

    // Quantize with dither offset
    float levels = max(uColorNum, 1.0);
    float q = floor(i * levels + threshold) / levels;

    vec3 col = uColor * q;
    gl_FragColor = vec4(col, 1.0);
  }
`;

const DitherInner: React.FC<DitherProps> = ({
  waveSpeed = 0.05,
  waveFrequency = 3,
  waveAmplitude = 0.3,
  waveColor = [0.5, 0.5, 0.5],
  colorNum = 4,
  pixelSize = 2,
  disableAnimation = false,
  enableMouseInteraction = true,
  mouseRadius = 0.3,
}) => {
  const materialRef = useRef<THREE.ShaderMaterial>(null!);

  useFrame((state) => {
    const m = materialRef.current;
    if (!m) return;
    m.uniforms.uTime.value = state.clock.getElapsedTime();
    if (enableMouseInteraction) {
      const x = state.mouse.x * 0.5 + 0.5; // convert [-1,1] to [0,1]
      const y = -state.mouse.y * 0.5 + 0.5; // flip Y
      m.uniforms.uMouse.value.set(x, y);
    }
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef as any}
        uniforms={
          {
            uTime: { value: 0 },
            uColor: { value: new THREE.Color(waveColor[0], waveColor[1], waveColor[2]) },
            uAmplitude: { value: waveAmplitude },
            uFrequency: { value: waveFrequency },
            uSpeed: { value: waveSpeed },
            uPixelSize: { value: pixelSize },
            uColorNum: { value: colorNum },
            uMouse: { value: new THREE.Vector2(0.5, 0.5) },
            uMouseRadius: { value: mouseRadius },
            uEnableMouse: { value: enableMouseInteraction },
            uDisableAnimation: { value: disableAnimation },
          } as any
        }
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
      />
    </mesh>
  );
};

const Dither: React.FC<DitherProps> = ({ className, style, ...props }) => {
  return (
    <div className={`dither-container ${className ?? ''}`} style={style}>
      <Canvas gl={{ antialias: false }} dpr={[1, 2]}>
        <DitherInner {...props} />
      </Canvas>
    </div>
  );
};

export default Dither;