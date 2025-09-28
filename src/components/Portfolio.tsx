import React, { useState } from 'react';
import { ExternalLink, Github, Award, Star, Calendar, Users } from 'lucide-react';

const Portfolio: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'AI Tools Mastery', 'Web Development', 'Enterprise Solutions', 'Data Science'];

  const projects = [
    // AI Tools Mastery Professional Portfolio Projects
    {
      title: 'Enterprise Brand Identity Suite',
      category: 'AI Tools Mastery',
      image: 'https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Complete brand identity system created using AI image generation tools for Fortune 500 client',
      tools: ['Midjourney', 'DALL-E 3', 'Stable Diffusion'],
      certification: 'A.I Tools Mastery Professional',
      rating: 5,
      completionDate: '2024',
      clientType: 'Fortune 500'
    },
    {
      title: 'Luxury Brand Video Campaign',
      category: 'AI Tools Mastery',
      image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'High-end video production campaign using AI cinematography and motion design',
      tools: ['Runway Gen-2', 'Pika Labs', 'Stable Video Diffusion'],
      certification: 'A.I Tools Mastery Professional',
      rating: 5,
      completionDate: '2024',
      clientType: 'Luxury Brand'
    },
    {
      title: 'Automated Data Processing System',
      category: 'AI Tools Mastery',
      image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Enterprise-grade automated data processing using JSON prompts and structured AI outputs',
      tools: ['Claude AI', 'GPT-4', 'Custom APIs'],
      certification: 'A.I Tools Mastery Professional',
      rating: 5,
      completionDate: '2024',
      clientType: 'Enterprise'
    },
    {
      title: 'Business Process Automation Suite',
      category: 'AI Tools Mastery',
      image: 'https://images.pexels.com/photos/8439093/pexels-photo-8439093.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Intelligent business automation ecosystem with AI agents for Fortune 500 operations',
      tools: ['Claude AI', 'Custom AI Agents', 'Zapier'],
      certification: 'A.I Tools Mastery Professional',
      rating: 5,
      completionDate: '2024',
      clientType: 'Fortune 500'
    },
    // Traditional Portfolio Projects
    {
      title: 'E-Commerce Platform',
      category: 'Web Development',
      image: 'https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Modern e-commerce solution with AI-powered recommendations',
      tools: ['React', 'Node.js', 'MongoDB'],
      rating: 4,
      completionDate: '2023',
      clientType: 'Startup'
    },
    {
      title: 'Healthcare Management System',
      category: 'Enterprise Solutions',
      image: 'https://images.pexels.com/photos/576831/pexels-photo-576831.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Comprehensive healthcare platform with telemedicine capabilities',
      tools: ['Angular', 'Python', 'PostgreSQL'],
      rating: 5,
      completionDate: '2023',
      clientType: 'Healthcare'
    },
    {
      title: 'Financial Analytics Tool',
      category: 'Data Science',
      image: 'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=600',
      description: 'Advanced analytics platform for financial market predictions',
      tools: ['Python', 'TensorFlow', 'React'],
      rating: 4,
      completionDate: '2023',
      clientType: 'Financial'
    }
  ];

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <section id="portfolio" className="py-20 bg-white dark:bg-deep-blue">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Professional Portfolio Showcase
          </h2>
          <p className="text-xl text-cyber-gray dark:text-light-slate max-w-3xl mx-auto">
            Featuring certified A.I Tools Mastery projects and enterprise solutions across various industries
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-gradient-to-r from-neon-cyan to-blue-500 text-white shadow-lg'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
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
                
                {/* Certification Badge */}
                {project.certification && (
                  <div className="absolute top-4 left-4">
                    <div className="flex items-center bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      <Award className="h-3 w-3 mr-1" />
                      CERTIFIED
                    </div>
                  </div>
                )}

                {/* Rating */}
                <div className="absolute top-4 right-4">
                  <div className="flex items-center bg-black/70 text-white px-2 py-1 rounded-full text-xs">
                    <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
                    {project.rating}
                  </div>
                </div>

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
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-sm font-medium px-3 py-1 rounded-full ${
                    project.category === 'AI Tools Mastery' 
                      ? 'text-purple-600 bg-purple-100 dark:text-purple-400 dark:bg-purple-900/30'
                      : 'text-neon-cyan bg-neon-cyan/10'
                  }`}>
                    {project.category}
                  </span>
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                    <Calendar className="h-3 w-3 mr-1" />
                    {project.completionDate}
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {project.title}
                </h3>
                
                <p className="text-cyber-gray dark:text-light-slate mb-4">
                  {project.description}
                </p>

                {/* Tools Used */}
                <div className="mb-3">
                  <div className="flex flex-wrap gap-1">
                    {project.tools.map((tool, toolIndex) => (
                      <span 
                        key={toolIndex}
                        className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Client Type */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Users className="h-4 w-4 mr-1" />
                    {project.clientType}
                  </div>
                  {project.certification && (
                    <div className="text-xs text-purple-600 dark:text-purple-400 font-medium">
                      Professional Certified
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Professional Certification Showcase */}
        <div className="mt-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-center text-white">
          <div className="max-w-3xl mx-auto">
            <Award className="h-16 w-16 mx-auto mb-4 text-yellow-400" />
            <h3 className="text-3xl font-bold mb-4">A.I Tools Mastery Professional Certification</h3>
            <p className="text-lg mb-6 opacity-90">
              Showcase your expertise with enterprise-grade AI tools and professional portfolio development. 
              Join the elite community of certified AI professionals.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                View Certification Program
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-all duration-300">
                Browse All Projects
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;