import React, { useRef } from 'react';
import RotatingBackgrounds from './backgrounds/RotatingBackgrounds';
import VariableProximity from './VariableProximity';
import RotatingText from './RotatingText';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section id="hero-section" className="bg-black min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      {/* Rotating Backgrounds */}
      <RotatingBackgrounds interval={10000} />

      {/* Overlay for better text readability */}
      <div className="absolute inset-0 hero-overlay"></div>

      <div ref={containerRef} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Top badge */}
        <div className="inline-flex items-center space-x-2 bg-gray-900/50 border border-gray-700 rounded-full px-4 py-2 mb-8">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-sm text-gray-300">Manage projects end-to-end</span>
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>

        {/* Main heading with Company Name */}
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          <VariableProximity
            label=".XYZ IT solutions"
            fromFontVariationSettings="'wght' 400, 'opsz' 9"
            toFontVariationSettings="'wght' 800, 'opsz' 40"
            containerRef={containerRef}
            radius={80}
            falloff="gaussian"
            style={{ color: 'white' }}
          />
        </h1>

        {/* Creative Text with Rotating Words */}
        <div className="text-2xl md:text-3xl font-bold text-white mb-6 leading-tight flex items-center justify-center gap-3">
          <span>Creative</span>
          <RotatingText
            texts={['thinking', 'design', 'development', 'solutions', 'innovation']}
            mainClassName="px-3 py-1 bg-purple-600 text-white overflow-hidden rounded-lg text-lg md:text-xl"
            staggerFrom={"last"}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-120%" }}
            staggerDuration={0.025}
            splitLevelClassName="overflow-hidden"
            transition={{ type: "spring", damping: 30, stiffness: 400 }}
            rotationInterval={2000}
          />
        </div>

        {/* Subtitle with Variable Proximity */}
        <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
          <VariableProximity
            label="Create a clear roadmap, track progress, and smoothly guide your project from idea to successful launch."
            fromFontVariationSettings="'wght' 300, 'opsz' 8"
            toFontVariationSettings="'wght' 600, 'opsz' 20"
            containerRef={containerRef}
            radius={60}
            falloff="exponential"
            style={{ color: '#9ca3af' }}
          />
        </p>

        {/* Trust indicators */}
        <div className="flex items-center justify-center space-x-6 text-sm text-gray-400">
          <div className="flex items-center space-x-2">
            <span className="text-green-500">Excellent</span>
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-4 h-4 text-green-500 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span>4.9 reviews on</span>
            <span className="text-green-500 font-semibold">Trustpilot</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;