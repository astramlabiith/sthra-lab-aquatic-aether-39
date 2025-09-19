
import React from 'react';
import { Navigation } from '../components/Navigation';
import { SEOHead } from '../components/SEOHead';

const About = () => {
  const milestones = [
    { year: "2020", event: "ASTHRA Lab founded with initial NSF grant" },
    { year: "2021", event: "First successful autonomous underwater navigation trials" },
    { year: "2022", event: "Partnership with leading marine research institutions" },
    { year: "2023", event: "Breakthrough in hybrid aerial-aquatic systems" },
    { year: "2024", event: "Major funding award for AI navigation research" }
  ];

  const capabilities = [
    {
      title: "Advanced Testing Facilities",
      description: "State-of-the-art underwater testing pools and aerial flight chambers",
      icon: "🏢"
    },
    {
      title: "High-Performance Computing",
      description: "Dedicated GPU clusters for AI training and simulation",
      icon: "💻"
    },
    {
      title: "Rapid Prototyping Lab",
      description: "3D printing and fabrication facilities for custom hardware",
      icon: "🔧"
    },
    {
      title: "Sensor Integration Suite",
      description: "Advanced instrumentation for multi-modal sensing systems",
      icon: "📡"
    }
  ];

  return (
    <div className="min-h-screen bg-navy-950 text-white">
      <SEOHead 
        title="About AstraM Lab IITH - Autonomous Systems Research at IIT Hyderabad"
        description="Learn about AstraM Lab (Astram Lab) at IIT Hyderabad (IITH) - Our mission, research capabilities, milestones in autonomous systems, UAV, AUV, ROV, USV, and robotics technology development."
        keywords="about astram lab, about astram iith, iit hyderabad research lab, autonomous systems research, astram lab history, robotics lab iith, uav auv research center"
        canonical="/about"
      />
      <Navigation />
      <div className="pt-20">
        <section className="py-20 bg-gradient-to-b from-navy-950 to-navy-900">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-8 bg-gradient-to-r from-cyan-400 to-ocean-300 bg-clip-text text-transparent">
                About ASTHRA Lab
              </h1>
              <p className="text-lg text-gray-300 leading-relaxed mb-8">
                ASTHRA Lab (Advanced Systems for Technology Research & Autonomy) is a pioneering research laboratory 
                dedicated to advancing autonomous systems through innovative research in underwater and aerial vehicle technologies. 
                We develop cutting-edge solutions for intelligent navigation, sustainable operations, and robust control systems.
              </p>
            </div>

            {/* Mission and Vision */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              <div className="bg-gradient-to-br from-navy-800/50 to-navy-900/50 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-8 hover:border-cyan-400/40 transition-all duration-300">
                <h3 className="text-2xl font-bold text-cyan-400 mb-4">Our Mission</h3>
                <p className="text-gray-300 leading-relaxed">
                  To advance the frontiers of autonomous systems by developing innovative technologies that enable intelligent, 
                  sustainable, and robust operations in challenging aquatic and aerial environments.
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-navy-800/50 to-navy-900/50 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-8 hover:border-cyan-400/40 transition-all duration-300">
                <h3 className="text-2xl font-bold text-ocean-400 mb-4">Our Vision</h3>
                <p className="text-gray-300 leading-relaxed">
                  To be the global leader in hybrid robotics research, creating transformative technologies that revolutionize 
                  how autonomous systems operate across multiple domains for scientific discovery and societal benefit.
                </p>
              </div>
            </div>

            {/* Research Focus Areas */}
            <div className="grid md:grid-cols-2 gap-8 mt-12 mb-16">
              <div className="bg-navy-800/50 border border-cyan-500/20 rounded-2xl p-6 hover:border-cyan-400/40 transition-all duration-300">
                <h3 className="text-xl font-bold text-white mb-4">Underwater Systems</h3>
                <p className="text-gray-300">
                  Advanced autonomous underwater vehicles with AI-driven navigation and energy-efficient propulsion systems 
                  for deep-sea exploration and marine research.
                </p>
              </div>
              
              <div className="bg-navy-800/50 border border-cyan-500/20 rounded-2xl p-6 hover:border-cyan-400/40 transition-all duration-300">
                <h3 className="text-xl font-bold text-white mb-4">Aerial Robotics</h3>
                <p className="text-gray-300">
                  Intelligent aerial platforms with adaptive control systems for complex environmental operations 
                  and multi-domain mission capabilities.
                </p>
              </div>
            </div>

            {/* Lab Capabilities */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-cyan-400 mb-8 text-center">Lab Capabilities</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {capabilities.map((capability, index) => (
                  <div 
                    key={index}
                    className="bg-gradient-to-br from-navy-800/50 to-navy-900/50 backdrop-blur-sm border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-400/40 transition-all duration-300 hover:scale-105 text-center"
                  >
                    <div className="text-4xl mb-4">{capability.icon}</div>
                    <h3 className="text-lg font-bold text-white mb-3">{capability.title}</h3>
                    <p className="text-gray-300 text-sm">{capability.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-gradient-to-r from-navy-800/30 to-navy-900/30 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-cyan-400 mb-8 text-center">Lab Milestones</h2>
              <div className="space-y-6">
                {milestones.map((milestone, index) => (
                  <div key={index} className="flex items-center">
                    <div className="bg-cyan-400 text-navy-950 font-bold px-4 py-2 rounded-lg mr-6 min-w-[80px] text-center">
                      {milestone.year}
                    </div>
                    <div className="flex-1 bg-navy-800/50 border border-cyan-500/20 rounded-lg p-4">
                      <p className="text-gray-300">{milestone.event}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
