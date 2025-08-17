import React, { useState } from 'react';

const Career = () => {
  const [activeTab, setActiveTab] = useState('training');

  const trainingPrograms = [
    {
      id: 1,
      title: "Web Development Bootcamp",
      duration: "8 weeks",
      description: "Learn modern web development with React, Node.js, and MongoDB. Build real-world projects and get certified.",
      features: ["Live sessions", "Project-based learning", "Certificate on completion", "24/7 support", "Job placement assistance"],
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop&crop=center"
    },
    {
      id: 2,
      title: "AI & Machine Learning",
      duration: "12 weeks",
      description: "Master AI and ML fundamentals with Python, TensorFlow, and real-world applications.",
      features: ["Hands-on AI projects", "Industry expert mentors", "Certificate on completion", "Portfolio building", "Career guidance"],
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop&crop=center"
    },
    {
      id: 3,
      title: "Mobile App Development",
      duration: "10 weeks",
      description: "Build iOS and Android apps with React Native and Flutter. Launch your app on app stores.",
      features: ["Cross-platform development", "App store deployment", "Certificate on completion", "UI/UX design", "Monetization strategies"],
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop&crop=center"
    }
  ];

  const internshipPrograms = [
    {
      id: 1,
      title: "Software Development Internship",
      stipend: "$500/month",
      duration: "3-6 months",
      description: "Work on real client projects and gain industry experience. Get mentored by senior developers.",
      benefits: ["Monthly stipend", "Professional certificate", "Letter of recommendation", "Potential job offer", "Networking opportunities"],
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop&crop=center"
    },
    {
      id: 2,
      title: "AI Research Internship",
      stipend: "$600/month",
      duration: "4-8 months",
      description: "Contribute to cutting-edge AI research projects and publish papers.",
      benefits: ["Research experience", "Publication opportunities", "Professional certificate", "Academic credit", "Conference attendance"],
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop&crop=center"
    },
    {
      id: 3,
      title: "UI/UX Design Internship",
      stipend: "$450/month",
      duration: "3-6 months",
      description: "Design user interfaces and experiences for web and mobile applications.",
      benefits: ["Design portfolio", "Professional certificate", "Creative freedom", "Client interaction", "Design tools access"],
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop&crop=center"
    }
  ];

  const projectIdeas = [
    {
      id: 1,
      title: "E-Learning Platform",
      domain: "Education Technology",
      difficulty: "Advanced",
      description: "Build a comprehensive e-learning platform with video streaming, quizzes, and progress tracking.",
      problem: "Students need affordable, accessible learning platforms with interactive features.",
      certificate: "Full-stack Development Certificate",
      image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=600&fit=crop&crop=center"
    },
    {
      id: 2,
      title: "Healthcare Management System",
      domain: "Healthcare",
      difficulty: "Intermediate",
      description: "Create a system for managing patient records, appointments, and medical inventory.",
      problem: "Healthcare facilities need efficient digital systems for patient management.",
      certificate: "Healthcare Technology Certificate",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop&crop=center"
    },
    {
      id: 3,
      title: "Smart City IoT Dashboard",
      domain: "Internet of Things",
      difficulty: "Advanced",
      description: "Develop a dashboard for monitoring city infrastructure using IoT sensors.",
      problem: "Cities need real-time monitoring systems for infrastructure management.",
      certificate: "IoT Development Certificate",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop&crop=center"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-4">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
            <span className="text-gray-400 text-sm">• Career Opportunities</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-8">
            Launch Your Career
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Join our comprehensive programs designed to accelerate your career in technology. 
            <span className="text-green-400 font-semibold"> Starting Soon!</span>
          </p>
        </div>

        {/* Coming Soon Banner */}
        <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-green-500/30 rounded-2xl p-8 mb-16 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse mr-3"></div>
            <h2 className="text-2xl font-bold text-green-400">Programs Starting Soon!</h2>
          </div>
          <p className="text-gray-300 text-lg">
            Our comprehensive training and internship programs will be launching in the next few weeks. 
            Get ready to transform your career with hands-on experience and professional certifications.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-900 rounded-full p-2 flex space-x-2">
            <button
              onClick={() => setActiveTab('training')}
              className={`px-6 py-3 rounded-full transition-all duration-300 ${
                activeTab === 'training'
                  ? 'bg-white text-black font-semibold'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Training Programs
            </button>
            <button
              onClick={() => setActiveTab('internship')}
              className={`px-6 py-3 rounded-full transition-all duration-300 ${
                activeTab === 'internship'
                  ? 'bg-white text-black font-semibold'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Internship Programs
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              className={`px-6 py-3 rounded-full transition-all duration-300 ${
                activeTab === 'projects'
                  ? 'bg-white text-black font-semibold'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Project Ideas
            </button>
          </div>
        </div>

        {/* Content Sections */}
        {activeTab === 'training' && (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Affordable Training Programs</h2>
              <p className="text-gray-300 text-lg">Learn from industry experts at student-friendly prices</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {trainingPrograms.map((program) => (
                <div key={program.id} className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-green-500/50 transition-all duration-300 hover:scale-105">
                  <div className="h-48 overflow-hidden">
                    <img src={program.image} alt={program.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6">
                                         <div className="mb-4">
                       <h3 className="text-xl font-bold text-white mb-2">{program.title}</h3>
                       <div className="text-sm text-gray-400">{program.duration}</div>
                     </div>
                    <p className="text-gray-300 mb-4">{program.description}</p>
                    <ul className="space-y-2 mb-6">
                      {program.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-400">
                          <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <button className="w-full bg-green-500 text-black py-3 rounded-lg font-semibold hover:bg-green-400 transition-colors">
                      Coming Soon
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'internship' && (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Paid Internship Programs</h2>
              <p className="text-gray-300 text-lg">Gain real-world experience with stipend and certificates</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {internshipPrograms.map((program) => (
                <div key={program.id} className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-blue-500/50 transition-all duration-300 hover:scale-105">
                  <div className="h-48 overflow-hidden">
                    <img src={program.image} alt={program.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-white">{program.title}</h3>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-400">{program.stipend}</div>
                        <div className="text-sm text-gray-400">{program.duration}</div>
                      </div>
                    </div>
                    <p className="text-gray-300 mb-4">{program.description}</p>
                    <ul className="space-y-2 mb-6">
                      {program.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-400">
                          <svg className="w-4 h-4 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          {benefit}
                        </li>
                      ))}
                    </ul>
                    <button className="w-full bg-blue-500 text-black py-3 rounded-lg font-semibold hover:bg-blue-400 transition-colors">
                      Coming Soon
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Project Ideas & Problem Statements</h2>
              <p className="text-gray-300 text-lg">Build real applications and earn certificates upon completion</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projectIdeas.map((project) => (
                <div key={project.id} className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-purple-500/50 transition-all duration-300 hover:scale-105">
                  <div className="h-48 overflow-hidden">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-bold text-white">{project.title}</h3>
                      <div className="text-right">
                        <div className="text-sm bg-purple-500 text-white px-3 py-1 rounded-full">{project.difficulty}</div>
                        <div className="text-xs text-gray-400 mt-1">{project.domain}</div>
                      </div>
                    </div>
                    <p className="text-gray-300 mb-4">{project.description}</p>
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-purple-400 mb-2">Problem Statement:</h4>
                      <p className="text-sm text-gray-400">{project.problem}</p>
                    </div>
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-green-400 mb-2">Certificate:</h4>
                      <p className="text-sm text-gray-400">{project.certificate}</p>
                    </div>
                    <button className="w-full bg-purple-500 text-white py-3 rounded-lg font-semibold hover:bg-purple-400 transition-colors">
                      Coming Soon
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-20 bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Career?</h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Join our programs and gain the skills, experience, and certifications you need to succeed in the tech industry. 
            Our affordable programs are designed specifically for students.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-green-500 text-black px-8 py-4 rounded-full font-semibold hover:bg-green-400 transition-colors">
              Get Notified When Programs Start
            </button>
            <button className="bg-transparent border border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-black transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Career;
