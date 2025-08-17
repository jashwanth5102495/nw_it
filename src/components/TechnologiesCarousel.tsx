import { useState, useEffect } from 'react';
import SplashCursor from './SplashCursor';

const TechnologiesCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(4); // Start with middle card

  const technologies = [
    {
      name: 'TypeScript',
      description: 'Strongly typed programming language that builds on JavaScript',
      color: 'from-blue-500 to-blue-700',
      icon: 'TS',
      bgColor: '#3178C6'
    },
    {
      name: 'React',
      description: 'A JavaScript library for building user interfaces',
      color: 'from-cyan-400 to-blue-500',
      icon: '⚛️',
      bgColor: '#61DAFB'
    },
    {
      name: 'Node.js',
      description: 'JavaScript runtime built on Chrome\'s V8 JavaScript engine',
      color: 'from-green-500 to-green-700',
      icon: '🟢',
      bgColor: '#339933'
    },
    {
      name: 'MongoDB',
      description: 'Document-oriented NoSQL database program',
      color: 'from-green-600 to-green-800',
      icon: '🍃',
      bgColor: '#47A248'
    },
    {
      name: 'HTML5',
      description: 'The latest evolution of the standard markup language',
      color: 'from-orange-500 to-red-600',
      icon: '🌐',
      bgColor: '#E34F26'
    },
    {
      name: 'CSS3',
      description: 'Style sheet language used for describing presentation',
      color: 'from-blue-400 to-blue-600',
      icon: '🎨',
      bgColor: '#1572B6'
    },
    {
      name: 'Expo',
      description: 'Platform for making universal native apps with React',
      color: 'from-purple-500 to-indigo-600',
      icon: '📱',
      bgColor: '#000020'
    },
    {
      name: 'SQL',
      description: 'Domain-specific language for managing relational databases',
      color: 'from-gray-600 to-gray-800',
      icon: '🗄️',
      bgColor: '#336791'
    },
    {
      name: 'HuggingFace',
      description: 'Platform for machine learning and AI model deployment',
      color: 'from-yellow-400 to-orange-500',
      icon: '🤗',
      bgColor: '#FF9D00'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % technologies.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [technologies.length]);

  const getVisibleCards = () => {
    const visibleCards = [];
    const totalVisible = 7; // Show 7 cards total (3 left + center + 3 right)
    const halfVisible = Math.floor(totalVisible / 2);
    
    for (let i = -halfVisible; i <= halfVisible; i++) {
      const index = (currentIndex + i + technologies.length) % technologies.length;
      visibleCards.push({ ...technologies[index], position: i, originalIndex: index });
    }
    
    return visibleCards;
  };

  const getCardTransform = (position: number) => {
    const angle = position * 25; // 25 degrees between each card
    const translateX = position * 180; // Horizontal spacing
    const translateZ = Math.abs(position) * -100; // Depth for curve effect
    const scale = position === 0 ? 1 : Math.max(0.6, 1 - Math.abs(position) * 0.15);
    const opacity = position === 0 ? 1 : Math.max(0.4, 1 - Math.abs(position) * 0.2);
    
    return {
      transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${-angle}deg) scale(${scale})`,
      opacity,
      zIndex: 10 - Math.abs(position)
    };
  };

  return (
    <section className="bg-black py-20 relative overflow-hidden splash-cursor">
      <SplashCursor />
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/20 to-black pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-2 mb-6">
            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
            <span className="text-sm text-emerald-400">Creative</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Technology Stack
          </h2>
          
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            We create the most stunning applications using cutting-edge technologies for web development, 
            mobile apps, databases, AI integration, and modern frameworks. They are just mind-blowing.
          </p>
        </div>

        {/* U-Shaped 3D Carousel */}
        <div className="relative h-[500px] flex items-center justify-center" style={{ perspective: '1200px' }}>
          <div className="relative w-full h-full flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
            {getVisibleCards().map((tech, index) => {
              const cardTransform = getCardTransform(tech.position);
              return (
                <div
                  key={`${tech.originalIndex}-${index}`}
                  className="absolute w-64 h-80 tech-card transition-all duration-1000 ease-out"
                  style={{
                    ...cardTransform,
                    transformStyle: 'preserve-3d'
                  }}
                  onClick={() => setCurrentIndex(tech.originalIndex)}
                >
                  <div 
                    className="w-full h-full rounded-2xl p-6 shadow-2xl border border-white/20 backdrop-blur-sm relative overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, ${tech.bgColor}dd, ${tech.bgColor}aa)`,
                      boxShadow: tech.position === 0 
                        ? '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 30px rgba(255, 255, 255, 0.1)' 
                        : '0 10px 25px -5px rgba(0, 0, 0, 0.6)'
                    }}
                  >
                    {/* Card content */}
                    <div className="h-full flex flex-col justify-between relative z-10">
                      <div className="text-center">
                        <div className="text-5xl mb-4 filter drop-shadow-lg">{tech.icon}</div>
                        <h3 className="text-2xl font-bold text-white mb-3 drop-shadow-md">
                          {tech.name}
                        </h3>
                      </div>
                      
                      <div className="text-center">
                        <p className="text-white/90 text-sm leading-relaxed drop-shadow-sm">
                          {tech.description}
                        </p>
                      </div>
                      
                      <div className="flex justify-center">
                        <div className="w-12 h-1 bg-white/40 rounded-full"></div>
                      </div>
                    </div>

                    {/* Subtle overlay for depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
                    
                    {/* Highlight effect for center card */}
                    {tech.position === 0 && (
                      <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-transparent rounded-2xl"></div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation dots */}
        <div className="flex justify-center space-x-2 mt-12">
          {technologies.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'bg-white w-8' : 'bg-gray-600'
              }`}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>

        {/* Interactive instructions */}
        <div className="flex justify-center items-center space-x-4 mt-8 text-gray-500 text-sm">
          <div className="flex items-center space-x-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Move your cursor to see splash effects</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
        
        {/* Splash effect hint */}
        <div className="flex justify-center mt-4">
          <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
            <span className="text-xs text-blue-400">Interactive splash cursor active in this section</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnologiesCarousel;