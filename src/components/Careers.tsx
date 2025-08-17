import React from 'react';
import { MapPin, Clock, DollarSign, Users } from 'lucide-react';

const Careers: React.FC = () => {
  const jobs = [
    {
      title: 'Senior Full-Stack Developer',
      department: 'Engineering',
      location: 'New York, NY / Remote',
      type: 'Full-time',
      salary: '$120k - $160k',
      description: 'Join our engineering team to build scalable web applications using modern technologies.',
      requirements: ['5+ years experience', 'React/Node.js expertise', 'Cloud platforms knowledge']
    },
    {
      title: 'Cybersecurity Specialist',
      department: 'Security',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$130k - $180k',
      description: 'Protect our clients\' digital assets with cutting-edge security solutions.',
      requirements: ['CISSP/CEH certified', 'Penetration testing', 'Incident response experience']
    },
    {
      title: 'Cloud Solutions Architect',
      department: 'Cloud Services',
      location: 'Austin, TX / Remote',
      type: 'Full-time',
      salary: '$140k - $190k',
      description: 'Design and implement cloud infrastructure solutions for enterprise clients.',
      requirements: ['AWS/Azure certified', 'Infrastructure as Code', 'Microservices architecture']
    },
    {
      title: 'AI/ML Engineer',
      department: 'Research & Development',
      location: 'Seattle, WA',
      type: 'Full-time',
      salary: '$150k - $200k',
      description: 'Develop intelligent systems and machine learning models to solve complex problems.',
      requirements: ['Python/TensorFlow', 'ML algorithms', 'Data science background']
    }
  ];

  return (
    <section id="careers" className="py-20 bg-white dark:bg-deep-blue">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Join Our Team
          </h2>
          <p className="text-xl text-cyber-gray dark:text-light-slate max-w-3xl mx-auto">
            Be part of a dynamic team that's shaping the future of technology. 
            We offer competitive benefits, growth opportunities, and a collaborative work environment.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {jobs.map((job, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                    {job.title}
                  </h3>
                  <span className="inline-block bg-neon-cyan/10 text-neon-cyan px-3 py-1 rounded-full text-sm font-medium">
                    {job.department}
                  </span>
                </div>
              </div>
              
              <p className="text-cyber-gray dark:text-light-slate mb-6 leading-relaxed">
                {job.description}
              </p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-gray-600 dark:text-light-slate">
                  <MapPin className="h-4 w-4 mr-2 text-neon-cyan" />
                  {job.location}
                </div>
                <div className="flex items-center text-gray-600 dark:text-light-slate">
                  <Clock className="h-4 w-4 mr-2 text-neon-cyan" />
                  {job.type}
                </div>
                <div className="flex items-center text-gray-600 dark:text-light-slate">
                  <DollarSign className="h-4 w-4 mr-2 text-neon-cyan" />
                  {job.salary}
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Requirements:</h4>
                <ul className="space-y-1">
                  {job.requirements.map((req, reqIndex) => (
                    <li key={reqIndex} className="flex items-center text-cyber-gray dark:text-light-slate text-sm">
                      <div className="w-1.5 h-1.5 bg-neon-cyan rounded-full mr-2"></div>
                      {req}
                    </li>
                  ))}
                </ul>
              </div>
              
              <button className="w-full bg-gradient-to-r from-neon-cyan to-blue-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                Apply Now
              </button>
            </div>
          ))}
        </div>

        <div className="text-center mt-12 bg-gray-50 dark:bg-gray-800 rounded-2xl p-8">
          <Users className="h-12 w-12 text-neon-cyan mx-auto mb-4" />
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Don't see the right position?
          </h3>
          <p className="text-cyber-gray dark:text-light-slate mb-6">
            We're always looking for talented individuals. Send us your resume and tell us how you can contribute to our mission.
          </p>
          <button className="bg-gradient-to-r from-neon-cyan to-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            Send Your Resume
          </button>
        </div>
      </div>
    </section>
  );
};

export default Careers;