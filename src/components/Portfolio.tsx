import React from 'react';
import { ExternalLink, Github } from 'lucide-react';

const Portfolio: React.FC = () => {
  const projects = [
    {
      title: 'E-Commerce Platform',
      category: 'Web Development',
      image: 'https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Modern e-commerce solution with AI-powered recommendations'
    },
    {
      title: 'Healthcare Management System',
      category: 'Software Development',
      image: 'https://images.pexels.com/photos/576831/pexels-photo-576831.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Comprehensive healthcare platform with telemedicine capabilities'
    },
    {
      title: 'Cybersecurity Dashboard',
      category: 'Security',
      image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Real-time threat monitoring and incident response system'
    },
    {
      title: 'Cloud Migration Project',
      category: 'Cloud Solutions',
      image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Enterprise cloud migration with 99.9% uptime achievement'
    },
    {
      title: 'AI Chatbot Platform',
      category: 'Artificial Intelligence',
      image: 'https://images.pexels.com/photos/8439093/pexels-photo-8439093.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Intelligent conversational AI with natural language processing'
    },
    {
      title: 'Financial Analytics Tool',
      category: 'Data Science',
      image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Advanced analytics platform for financial market predictions'
    }
  ];

  return (
    <section id="portfolio" className="py-20 bg-white dark:bg-deep-blue">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Our Portfolio
          </h2>
          <p className="text-xl text-cyber-gray dark:text-light-slate max-w-3xl mx-auto">
            Showcasing our latest projects and innovative solutions across various industries
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="group relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-blue/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                  <div className="flex space-x-3">
                    <button className="p-2 bg-neon-cyan text-deep-blue rounded-full hover:bg-white transition-colors duration-200">
                      <ExternalLink className="h-5 w-5" />
                    </button>
                    <button className="p-2 bg-neon-cyan text-deep-blue rounded-full hover:bg-white transition-colors duration-200">
                      <Github className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-neon-cyan bg-neon-cyan/10 px-3 py-1 rounded-full">
                    {project.category}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-cyber-gray dark:text-light-slate">
                  {project.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-neon-cyan to-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            View All Projects
          </button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;