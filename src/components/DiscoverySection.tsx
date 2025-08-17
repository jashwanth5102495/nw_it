import { useState, useEffect } from 'react';

const DiscoverySection = () => {
  const [savedLocation, setSavedLocation] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);

  const destinations = [
    {
      region: 'Support',
      name: '24/7 Support',
      description: 'Round-the-clock technical support and customer service. Our dedicated team ensures your business runs smoothly with immediate assistance whenever you need it.',
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1920&h=1080&fit=crop&crop=center',
      color: 'from-blue-400 to-indigo-500'
    },
    {
      region: 'Delivery',
      name: 'On Time Delivery',
      description: 'Guaranteed project delivery within agreed timelines. We prioritize punctuality and ensure all milestones are met without compromising quality.',
      image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=1920&h=1080&fit=crop&crop=center',
      color: 'from-green-400 to-blue-500'
    },
    {
      region: 'Technology',
      name: 'A.I Integration',
      description: 'Advanced artificial intelligence solutions integrated into your business processes. Enhance efficiency and automation with cutting-edge AI technology.',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1920&h=1080&fit=crop&crop=center',
      color: 'from-purple-400 to-pink-500'
    },
    {
      region: 'Automation',
      name: 'A.I Automation',
      description: 'Streamline your workflows with intelligent automation solutions. Reduce manual tasks and increase productivity through smart AI-powered systems.',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1920&h=1080&fit=crop&crop=center',
      color: 'from-cyan-400 to-blue-500'
    },
    {
      region: 'Development',
      name: 'Web Applications',
      description: 'Custom web applications including e-commerce platforms, business management systems, and all kinds of web-based solutions tailored to your needs.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&h=1080&fit=crop&crop=center',
      color: 'from-orange-400 to-red-500'
    },
    {
      region: 'Mobile',
      name: 'Mobile Applications',
      description: 'Native and cross-platform mobile app development for iOS and Android. Create engaging mobile experiences for your customers.',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1920&h=1080&fit=crop&crop=center',
      color: 'from-teal-400 to-green-500'
    },
    {
      region: 'Education',
      name: 'Internship Programs',
      description: 'Comprehensive internship opportunities for students to gain real-world experience in technology and software development.',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1920&h=1080&fit=crop&crop=center',
      color: 'from-yellow-400 to-orange-500'
    },
    {
      region: 'Learning',
      name: 'Training Programs',
      description: 'Professional training programs in latest technologies, programming languages, and industry best practices to enhance your team skills.',
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1920&h=1080&fit=crop&crop=center',
      color: 'from-indigo-400 to-purple-500'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCardIndex((prev) => (prev + 1) % destinations.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [destinations.length]);

  const getCardPosition = (index: number) => {
    const diff = (index - currentCardIndex + destinations.length) % destinations.length;
    return diff;
  };

  const getCardStyle = (position: number) => {
    const isActive = position === 0;
    const isNext = position === 1;
    const isPrevious = position === 2;
    
    if (isActive) {
      return {
        top: '50%',
        opacity: 1,
        scale: 1,
        zIndex: 30
      };
    } else if (isNext) {
      return {
        top: '85%', // Bottom position (coming up next)
        opacity: 0.7,
        scale: 0.9,
        zIndex: 20
      };
    } else if (isPrevious) {
      return {
        top: '15%', // Top position (going away)
        opacity: 0.7,
        scale: 0.9,
        zIndex: 10
      };
    } else {
      return {
        top: '100%', // Hidden below
        opacity: 0,
        scale: 0.8,
        zIndex: 5
      };
    }
  };

  const handleCardClick = (index: number) => {
    if (index === currentCardIndex) {
      setIsExpanded(!isExpanded);
    } else {
      setCurrentCardIndex(index);
    }
  };

  return (
    <>
      <section className="relative min-h-screen bg-black overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000"
          style={{
            backgroundImage: `url('${destinations[currentCardIndex].image}')`,
          }}
        >
          {/* Multiple Gradient Overlays for Fade-to-Black Effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/80"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/50"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
          <div className="absolute inset-0 bg-black/25"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 min-h-screen flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="flex flex-col lg:flex-row items-start gap-12">
              
              {/* Left Content */}
              <div className="text-white lg:w-1/2">
                <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                  <span className="text-white/90">Our Services</span>
                </h1>
                
                <p className="text-xl text-white/80 mb-8 max-w-lg leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sollicitudin interdum parturient amet libero.
                </p>

                <div className="flex items-center space-x-4 mb-12">
                  {/* Save Button */}
                  <button
                    onClick={() => setSavedLocation(!savedLocation)}
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                      savedLocation 
                        ? 'bg-green-500 text-white' 
                        : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                    </svg>
                  </button>

                  {/* Discover Button */}
                  <button className="px-8 py-3 border-2 border-white text-white rounded-full hover:bg-white hover:text-black transition-all duration-300 font-medium">
                    Discover Location
                  </button>
                </div>

                {/* Counter */}
                <div className="text-6xl font-bold text-white/60">
                  01
                </div>
              </div>

              {/* Right Content - Auto-Scrolling Destination Cards */}
              <div className="lg:w-1/2 flex justify-center relative">
                <div className="relative w-96 h-[700px] flex flex-col items-center justify-center">
                  {destinations.map((destination, index) => {
                    const position = getCardPosition(index);
                    const cardStyle = getCardStyle(position);
                    const isActive = position === 0;
                    
                    return (
                      <div
                        key={index}
                        className={`absolute rounded-2xl overflow-hidden backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all duration-1000 ease-in-out cursor-pointer group ${
                          isActive 
                            ? 'w-80 h-56' 
                            : 'w-72 h-44'
                        }`}
                        style={{
                          background: `linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))`,
                          top: cardStyle.top,
                          left: '50%',
                          transform: `translate(-50%, -50%) scale(${cardStyle.scale})`,
                          opacity: cardStyle.opacity,
                          zIndex: cardStyle.zIndex,
                        }}
                        onClick={() => handleCardClick(index)}
                      >
                        {/* Background Image */}
                        <div 
                          className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                          style={{ backgroundImage: `url('${destination.image}')` }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30"></div>
                        </div>

                        {/* Content */}
                        <div className="relative z-10 p-4 h-full flex flex-col justify-between">
                          <div>
                            <div className="text-white/80 text-xs mb-1 font-medium">
                              {destination.region}
                            </div>
                            <h3 className={`font-bold text-white mb-2 ${isActive ? 'text-2xl' : 'text-xl'}`}>
                              {destination.name}
                            </h3>
                          </div>
                          
                          <p className="text-white/70 text-xs leading-relaxed">
                            {destination.description.substring(0, isActive ? 80 : 50)}...
                          </p>

                          {/* Airplane Icon */}
                          <div className="absolute top-3 right-3 text-red-500">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Enhanced Bottom Fade-to-Black */}
        <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-black via-black/80 to-transparent z-20"></div>
        
        {/* Side Fade Effects */}
        <div className="absolute left-0 inset-y-0 w-32 bg-gradient-to-r from-black/60 to-transparent z-20"></div>
        <div className="absolute right-0 inset-y-0 w-32 bg-gradient-to-l from-black/60 to-transparent z-20"></div>
        
        {/* Top Fade Effect */}
        <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-black/40 to-transparent z-20"></div>
      </section>

      {/* Expanded Card Overlay */}
      {isExpanded && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl h-3/4 rounded-3xl overflow-hidden">
            {/* Background Image */}
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${destinations[currentCardIndex].image}')` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20"></div>
            </div>

            {/* Close Button */}
            <button 
              onClick={() => setIsExpanded(false)}
              className="absolute top-6 right-6 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors z-10"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Expanded Content */}
            <div className="relative z-10 h-full flex flex-col justify-end p-8">
              <div className="text-white/80 text-sm mb-2 font-medium">
                {destinations[currentCardIndex].region}
              </div>
              <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
                {destinations[currentCardIndex].name}
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl leading-relaxed">
                {destinations[currentCardIndex].description}
              </p>
              
              <div className="flex items-center space-x-4">
                <button className="px-8 py-3 bg-white text-black rounded-full hover:bg-white/90 transition-colors font-medium">
                  Explore Now
                </button>
                <button className="px-8 py-3 border-2 border-white text-white rounded-full hover:bg-white hover:text-black transition-all duration-300 font-medium">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DiscoverySection;