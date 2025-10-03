import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import './PixelBlast.css';

type PixelBlastVariant = 'square' | 'circle' | 'triangle' | 'diamond';

type PixelBlastProps = {
  variant?: PixelBlastVariant;
  pixelSize?: number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
  antialias?: boolean;
  patternScale?: number;
  patternDensity?: number;
  liquid?: boolean;
  liquidStrength?: number;
  liquidRadius?: number;
  pixelSizeJitter?: number;
  enableRipples?: boolean;
  rippleIntensityScale?: number;
  rippleThickness?: number;
  rippleSpeed?: number;
  liquidWobbleSpeed?: number;
  autoPauseOffscreen?: boolean;
  speed?: number;
  transparent?: boolean;
  edgeFade?: number;
  noiseAmount?: number;
};

const defaultProps: Required<Pick<PixelBlastProps,
  'variant' | 'pixelSize' | 'color' | 'antialias' | 'patternScale' | 'patternDensity' |
  'liquid' | 'liquidStrength' | 'liquidRadius' | 'pixelSizeJitter' | 'enableRipples' |
  'rippleIntensityScale' | 'rippleThickness' | 'rippleSpeed' | 'liquidWobbleSpeed' |
  'autoPauseOffscreen' | 'speed' | 'transparent' | 'edgeFade' | 'noiseAmount'
>> = {
  variant: 'circle',
  pixelSize: 6,
  color: '#B19EEF',
  antialias: true,
  patternScale: 3,
  patternDensity: 1.2,
  liquid: true,
  liquidStrength: 0.12,
  liquidRadius: 1.2,
  pixelSizeJitter: 0.5,
  enableRipples: true,
  rippleIntensityScale: 1.5,
  rippleThickness: 0.12,
  rippleSpeed: 0.4,
  liquidWobbleSpeed: 5,
  autoPauseOffscreen: true,
  speed: 0.6,
  transparent: true,
  edgeFade: 0.25,
  noiseAmount: 0.15,
};

const PixelBlast: React.FC<PixelBlastProps> = (props) => {
  const p = { ...defaultProps, ...props };
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const uniformsRef = useRef<any>(null);

  useEffect(() => {
    const container = containerRef.current!;
    const scene = new THREE.Scene();
    const renderer = new THREE.WebGLRenderer({ antialias: p.antialias, alpha: p.transparent });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.inset = '0';
    container.appendChild(renderer.domElement);

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const geometry = new THREE.PlaneGeometry(2, 2);

    const color = new THREE.Color(p.color);

    const fragment = `
      precision highp float;
      uniform vec2 uResolution;
      uniform float uTime;
      uniform vec2 uMouse;
      uniform float uPixelSize;
      uniform vec3 uColor;
      uniform float uPatternScale;
      uniform float uPatternDensity;
      uniform float uPixelSizeJitter;
      uniform float uRippleIntensityScale;
      uniform float uRippleThickness;
      uniform float uRippleSpeed;
      uniform float uLiquidStrength;
      uniform float uLiquidRadius;
      uniform float uLiquidWobbleSpeed;
      uniform float uSpeed;
      uniform float uEdgeFade;
      uniform float uNoiseAmount;
      uniform int uVariant;
      uniform bool uEnableRipples;
      uniform bool uLiquid;

      float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453123); }
      float noise(vec2 p){
        vec2 i = floor(p);
        vec2 f = fract(p);
        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));
        vec2 u = f*f*(3.0-2.0*f);
        return mix(a, b, u.x) + (c - a)*u.y*(1.0 - u.x) + (d - b)*u.x*u.y;
      }

      vec2 liquidWarp(vec2 uv, float t){
        float n1 = noise(uv * 3.0 + t);
        float n2 = noise(uv * 5.0 - t*0.7);
        float a = (n1 - 0.5) * uLiquidStrength;
        float b = (n2 - 0.5) * uLiquidStrength;
        return uv + vec2(a, b);
      }

      float shapeMask(vec2 uv, int kind){
        // centered cell coordinate
        vec2 c = abs(uv - 0.5);
        if(kind == 0){ // square
          float d = max(c.x, c.y);
          return step(d, 0.5);
        } else if(kind == 1){ // circle
          float d = length(c);
          return step(d, 0.5);
        } else if(kind == 2){ // triangle
          float d = max(c.y*2.0 + c.x, c.y*2.0 - c.x);
          return step(d, 0.5);
        } else { // diamond
          float d = c.x + c.y;
          return step(d, 0.5);
        }
      }

      void main(){
        vec2 uv = gl_FragCoord.xy / uResolution.xy;

        // edge fade
        float edge = smoothstep(0.0, uEdgeFade, min(min(uv.x, 1.0-uv.x), min(uv.y, 1.0-uv.y)));

        // motion base
        float t = uTime * uSpeed;
        vec2 suv = uv;
        if(uLiquid){
          suv = liquidWarp(suv, t * (uLiquidWobbleSpeed*0.2));
        }

        // ripple modulation based on distance to mouse
        float ripple = 0.0;
        if(uEnableRipples){
          float d = distance(suv, uMouse);
          ripple = sin(d/uRippleThickness - t*uRippleSpeed);
          ripple *= exp(-d * uRippleIntensityScale);
        }

        // pixel grid
        float ps = uPixelSize / max(uResolution.x, uResolution.y);
        ps += (noise(suv * 10.0) - 0.5) * ps * uPixelSizeJitter;
        vec2 grid = floor(suv / ps) * ps;
        vec2 cellUV = fract(suv / ps);

        // pattern density & scale influences brightness
        float pat = noise(grid * (3.0*uPatternScale) + t);
        float bright = mix(0.4, 1.0, pat * uPatternDensity);
        bright += ripple * 0.25;
        bright += (noise(suv * 20.0) - 0.5) * uNoiseAmount;

        // shape mask
        float mask = shapeMask(cellUV, uVariant);

        vec3 col = uColor * bright;
        float alpha = mask * edge;
        gl_FragColor = vec4(col, alpha);
      }
    `;

    const material = new THREE.ShaderMaterial({
      vertexShader: `void main(){ gl_Position = vec4(position, 1.0); }`,
      fragmentShader: fragment,
      transparent: p.transparent,
      uniforms: {
        uResolution: { value: new THREE.Vector2(container.clientWidth, container.clientHeight) },
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uPixelSize: { value: p.pixelSize },
        uColor: { value: new THREE.Vector3(color.r, color.g, color.b) },
        uPatternScale: { value: p.patternScale },
        uPatternDensity: { value: p.patternDensity },
        uPixelSizeJitter: { value: p.pixelSizeJitter },
        uRippleIntensityScale: { value: p.rippleIntensityScale },
        uRippleThickness: { value: p.rippleThickness },
        uRippleSpeed: { value: p.rippleSpeed },
        uLiquidStrength: { value: p.liquidStrength },
        uLiquidRadius: { value: p.liquidRadius },
        uLiquidWobbleSpeed: { value: p.liquidWobbleSpeed },
        uSpeed: { value: p.speed },
        uEdgeFade: { value: p.edgeFade },
        uNoiseAmount: { value: p.noiseAmount },
        uVariant: { value: (() => {
          switch(p.variant){
            case 'square': return 0;
            case 'circle': return 1;
            case 'triangle': return 2;
            case 'diamond': return 3;
            default: return 1;
          }
        })() },
        uEnableRipples: { value: !!p.enableRipples },
        uLiquid: { value: !!p.liquid },
      }
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      material.uniforms.uResolution.value.set(w, h);
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      material.uniforms.uMouse.value.set(x, y);
    };

    window.addEventListener('resize', onResize);
    container.addEventListener('pointermove', onPointerMove);

    let raf = 0;
    const clock = new THREE.Clock();
    const animate = () => {
      const elapsed = clock.getElapsedTime();
      material.uniforms.uTime.value = elapsed;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    rendererRef.current = renderer;
    sceneRef.current = scene;
    cameraRef.current = camera;
    uniformsRef.current = material.uniforms;

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      container.removeEventListener('pointermove', onPointerMove);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      container.removeChild(renderer.domElement);
    };
  }, [p.antialias, p.transparent, p.pixelSize, p.color, p.variant]);

  return (
    <div ref={containerRef} className={`pixel-blast-container ${props.className || ''}`} style={props.style} />
  );
};

export default PixelBlast;