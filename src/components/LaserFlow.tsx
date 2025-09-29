import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './LaserFlow.css';

type Props = {
  className?: string;
  style?: React.CSSProperties;
  wispDensity?: number;
  dpr?: number;
  mouseSmoothTime?: number;
  mouseTiltStrength?: number;
  horizontalBeamOffset?: number;
  verticalBeamOffset?: number;
  flowSpeed?: number;
  verticalSizing?: number;
  horizontalSizing?: number;
  fogIntensity?: number;
  fogScale?: number;
  wispSpeed?: number;
  wispIntensity?: number;
  flowStrength?: number;
  decay?: number;
  falloffStart?: number;
  fogFallSpeed?: number;
  color?: string;
};

const VERT = `
precision highp float;
attribute vec3 position;
void main(){
  gl_Position = vec4(position, 1.0);
}
`;

const FRAG = `
#ifdef GL_ES
#extension GL_OES_standard_derivatives : enable
#endif
precision highp float;
precision mediump int;

uniform float iTime;
uniform vec3 iResolution;
uniform vec4 iMouse;
uniform float uWispDensity;
uniform float uTiltScale;
uniform float uFlowTime;
uniform float uFogTime;
uniform float uBeamXFrac;
uniform float uBeamYFrac;
uniform float uFlowSpeed;
uniform float uVLenFactor;
uniform float uHLenFactor;
uniform float uFogIntensity;
uniform float uFogScale;
uniform float uWSpeed;
uniform float uWIntensity;
uniform float uFlowStrength;
uniform float uDecay;
uniform float uFalloffStart;
uniform float uFogFallSpeed;
uniform vec3 uColor;
uniform float uFade;

#define PI 3.14159265359
#define TWO_PI 6.28318530718
#define EPS 1e-6

float hash(float n) {
  return fract(sin(n) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float n = i.x + i.y * 57.0;
  return mix(mix(hash(n), hash(n + 1.0), f.x),
             mix(hash(n + 57.0), hash(n + 58.0), f.x), f.y);
}

float fbm(vec2 p) {
  float value = 0.0;
  float amplitude = 0.5;
  for (int i = 0; i < 4; i++) {
    value += amplitude * noise(p);
    p *= 2.0;
    amplitude *= 0.5;
  }
  return value;
}

void main() {
  vec2 uv = gl_FragCoord.xy / iResolution.xy;
  vec2 p = uv * 2.0 - 1.0;
  p.x *= iResolution.x / iResolution.y;
  
  float time = iTime * uFlowSpeed;
  
  // Create flowing laser beams
  float beam1 = abs(p.y - sin(p.x * 3.0 + time) * 0.1);
  float beam2 = abs(p.y - sin(p.x * 2.0 - time * 0.7) * 0.15);
  float beam3 = abs(p.x - sin(p.y * 4.0 + time * 1.2) * 0.08);
  
  beam1 = 1.0 / (beam1 * 50.0 + 1.0);
  beam2 = 1.0 / (beam2 * 40.0 + 1.0);
  beam3 = 1.0 / (beam3 * 60.0 + 1.0);
  
  // Add flowing effect
  float flow = fbm(vec2(p.x * 2.0, p.y * 2.0 + time * 0.5));
  
  // Combine beams
  float intensity = (beam1 + beam2 + beam3) * flow * uFlowStrength;
  
  // Add wisps
  vec2 wispUV = p + vec2(sin(time * 0.3), cos(time * 0.2)) * 0.1;
  float wisps = fbm(wispUV * uWispDensity + time * uWSpeed) * uWIntensity;
  
  intensity += wisps;
  
  // Apply color
  vec3 color = uColor * intensity;
  
  // Add fog effect
  float fog = fbm(p * uFogScale + time * uFogFallSpeed) * uFogIntensity;
  color += fog * uColor * 0.3;
  
  // Apply fade
  color *= uFade;
  
  gl_FragColor = vec4(color, intensity * 0.8);
}
`;

const LaserFlow: React.FC<Props> = ({
  className = '',
  style = {},
  wispDensity = 3.0,
  dpr = 1,
  mouseSmoothTime = 0.1,
  mouseTiltStrength = 0.1,
  horizontalBeamOffset = 0.0,
  verticalBeamOffset = 0.0,
  flowSpeed = 1.0,
  verticalSizing = 1.0,
  horizontalSizing = 1.0,
  fogIntensity = 0.5,
  fogScale = 2.0,
  wispSpeed = 1.0,
  wispIntensity = 0.3,
  flowStrength = 1.0,
  decay = 0.95,
  falloffStart = 0.1,
  fogFallSpeed = 0.1,
  color = '#FF79C6',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const animationIdRef = useRef<number | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Initialize Three.js
    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
    renderer.setPixelRatio(dpr);
    rendererRef.current = renderer;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    cameraRef.current = camera;

    // Convert hex color to RGB
    const colorObj = new THREE.Color(color);

    // Create shader material
    const material = new THREE.ShaderMaterial({
      vertexShader: VERT,
      fragmentShader: FRAG,
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new THREE.Vector3(canvas.offsetWidth, canvas.offsetHeight, 1) },
        iMouse: { value: new THREE.Vector4(0, 0, 0, 0) },
        uWispDensity: { value: wispDensity },
        uTiltScale: { value: mouseTiltStrength },
        uFlowTime: { value: 0 },
        uFogTime: { value: 0 },
        uBeamXFrac: { value: horizontalBeamOffset },
        uBeamYFrac: { value: verticalBeamOffset },
        uFlowSpeed: { value: flowSpeed },
        uVLenFactor: { value: verticalSizing },
        uHLenFactor: { value: horizontalSizing },
        uFogIntensity: { value: fogIntensity },
        uFogScale: { value: fogScale },
        uWSpeed: { value: wispSpeed },
        uWIntensity: { value: wispIntensity },
        uFlowStrength: { value: flowStrength },
        uDecay: { value: decay },
        uFalloffStart: { value: falloffStart },
        uFogFallSpeed: { value: fogFallSpeed },
        uColor: { value: new THREE.Vector3(colorObj.r, colorObj.g, colorObj.b) },
        uFade: { value: 1.0 },
      },
      transparent: true,
      blending: THREE.AdditiveBlending,
    });
    materialRef.current = material;

    // Create geometry
    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Animation loop
    const animate = (time: number) => {
      if (material.uniforms) {
        material.uniforms.iTime.value = time * 0.001;
        material.uniforms.uFlowTime.value = time * 0.001 * flowSpeed;
        material.uniforms.uFogTime.value = time * 0.001 * fogFallSpeed;
      }
      renderer.render(scene, camera);
      animationIdRef.current = requestAnimationFrame(animate);
    };

    animationIdRef.current = requestAnimationFrame(animate);

    // Handle resize
    const handleResize = () => {
      if (!canvas || !renderer || !material.uniforms) return;
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      renderer.setSize(width, height);
      material.uniforms.iResolution.value.set(width, height, 1);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, [
    wispDensity,
    dpr,
    mouseSmoothTime,
    mouseTiltStrength,
    horizontalBeamOffset,
    verticalBeamOffset,
    flowSpeed,
    verticalSizing,
    horizontalSizing,
    fogIntensity,
    fogScale,
    wispSpeed,
    wispIntensity,
    flowStrength,
    decay,
    falloffStart,
    fogFallSpeed,
    color,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className={`laser-flow-canvas ${className}`}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        ...style,
      }}
    />
  );
};

export default LaserFlow;