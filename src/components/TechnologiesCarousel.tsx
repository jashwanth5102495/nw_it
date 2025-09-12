import { useState, useEffect } from "react";

const TechnologiesCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const technologies = [
    { name: "TypeScript", description: "Strongly typed superset of JavaScript", icon: "TS", bgColor: "#3178C6" },
    { name: "React", description: "Library for building UI", icon: "⚛️", bgColor: "#61DAFB" },
    { name: "Node.js", description: "JavaScript runtime", icon: "🟢", bgColor: "#339933" },
    { name: "MongoDB", description: "NoSQL database", icon: "🍃", bgColor: "#47A248" },
    { name: "HTML5", description: "Markup language", icon: "🌐", bgColor: "#E34F26" },
    { name: "CSS3", description: "Style sheet language", icon: "🎨", bgColor: "#1572B6" },
    { name: "Expo", description: "React Native framework", icon: "📱", bgColor: "#000020" },
    { name: "SQL", description: "Relational database language", icon: "🗄️", bgColor: "#336791" },
    { name: "HuggingFace", description: "AI & ML platform", icon: "🤗", bgColor: "#FF9D00" },

    // ✅ New ones
    { name: "AI Integration", description: "Connecting applications with AI models & APIs", icon: "🤖", bgColor: "#8E44AD" },
    { name: "Tailwind CSS", description: "Utility-first CSS framework for rapid UI design", icon: "💨", bgColor: "#38BDF8" },
    { name: "Next.js", description: "React framework for production-grade apps", icon: "⚡", bgColor: "#000000" },
    { name: "Python", description: "Versatile language for AI, data, and backend", icon: "🐍", bgColor: "#3776AB" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % technologies.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [technologies.length]);

  const getCardTransform = (index: number) => {
    const position = (index - currentIndex + technologies.length) % technologies.length;

    // Center at 0, shift left/right
    const offset = position > technologies.length / 2 ? position - technologies.length : position;

    const angle = offset * 25;
    const translateX = offset * 180;
    const translateZ = Math.abs(offset) * -120;
    const scale = offset === 0 ? 1 : Math.max(0.6, 1 - Math.abs(offset) * 0.15);
    const opacity = offset === 0 ? 1 : Math.max(0.3, 1 - Math.abs(offset) * 0.25);

    return {
      transform: `translateX(${translateX}px) translateZ(${translateZ}px) rotateY(${-angle}deg) scale(${scale})`,
      opacity,
      zIndex: 10 - Math.abs(offset),
    };
  };

  return (
    <section className="bg-black py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-center text-4xl md:text-6xl font-bold text-white mb-12">
          Technology Stack
        </h2>

        {/* U-Shaped 3D Carousel */}
        <div className="relative h-[500px] flex items-center justify-center" style={{ perspective: "1200px" }}>
          <div className="relative w-full h-full flex items-center justify-center" style={{ transformStyle: "preserve-3d" }}>
            {technologies.map((tech, index) => {
              const cardTransform = getCardTransform(index);
              return (
                <div
                  key={index}
                  className="absolute w-64 h-80 cursor-pointer 
                             transition-transform transition-opacity duration-700 ease-in-out"
                  style={{
                    ...cardTransform,
                    transformStyle: "preserve-3d",
                  }}
                  onClick={() => setCurrentIndex(index)}
                >
                  <div
                    className="w-full h-full rounded-2xl p-6 shadow-2xl border border-white/20 backdrop-blur-sm relative overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, ${tech.bgColor}dd, ${tech.bgColor}aa)`,
                    }}
                  >
                    <div className="h-full flex flex-col justify-between text-center">
                      <div>
                        <div className="text-5xl mb-4">{tech.icon}</div>
                        <h3 className="text-2xl font-bold text-white">{tech.name}</h3>
                      </div>
                      <p className="text-white/90 text-sm">{tech.description}</p>
                      <div className="w-12 h-1 bg-white/40 rounded-full mx-auto"></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center space-x-2 mt-8">
          {technologies.map((_, i) => (
            <button
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                i === currentIndex ? "bg-white w-8" : "bg-gray-600"
              }`}
              onClick={() => setCurrentIndex(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechnologiesCarousel;
