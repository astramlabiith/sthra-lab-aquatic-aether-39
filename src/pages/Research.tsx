
import React from 'react';
import { Navigation } from '../components/Navigation';
import { SEOHead } from '../components/SEOHead';

const Research = () => {
  const researchAreas = [
    {
      title: "AI Navigation Systems",
      description: "Developing machine learning algorithms for autonomous path planning and real-time decision making in dynamic environments.",
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=800&q=80",
      technologies: ["Deep Learning", "Computer Vision", "Reinforcement Learning", "Neural Networks"],
      applications: ["Underwater exploration", "Obstacle avoidance", "Real-time adaptation"]
    },
    {
      title: "Hydrodynamic Control",
      description: "Advanced control systems optimizing energy efficiency and maneuverability for underwater vehicles in complex aquatic conditions.",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=800&q=80",
      technologies: ["Fluid Dynamics", "Control Theory", "Energy Optimization", "Propulsion Systems"],
      applications: ["Energy-efficient operation", "Precise maneuvering", "Adaptive control"]
    },
    {
      title: "Hybrid Systems Integration",
      description: "Creating versatile platforms that seamlessly operate across multiple domains - air, surface, and underwater.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
      technologies: ["Multi-domain Design", "Adaptive Materials", "System Integration", "Transition Control"],
      applications: ["Cross-domain missions", "Search and rescue", "Environmental monitoring"]
    },
    {
      title: "Sensor Fusion & Perception",
      description: "Integrating multiple sensing modalities for robust environmental perception and decision-making in challenging conditions.",
      image: "https://images.unsplash.com/photo-1518877593221-1f28583780b4?auto=format&fit=crop&w=800&q=80",
      technologies: ["Multi-sensor Integration", "Signal Processing", "3D Mapping", "Object Detection"],
      applications: ["Environmental mapping", "Object recognition", "Navigation assistance"]
    }
  ];

  const ongoingProjects = [
    {
      title: "AquaBot Genesis",
      funding: "$1.2M NSF Grant",
      duration: "2023-2026",
      description: "Next-generation autonomous underwater vehicle with advanced AI navigation."
    },
    {
      title: "SkyMarine Hybrid",
      funding: "$800K DARPA Contract",
      duration: "2024-2027",
      description: "Revolutionary hybrid platform for aerial and underwater operations."
    },
    {
      title: "Neural Flow Control",
      funding: "$600K ONR Grant",
      duration: "2023-2025",
      description: "Machine learning algorithms for optimal path planning in fluid environments."
    }
  ];

  return (
    <div className="min-h-screen bg-navy-950 text-white">
      <SEOHead 
        title="Research Areas - AstraM Lab IITH | AI Navigation, Control Systems, Robotics"
        description="Explore cutting-edge research at AstraM Lab IIT Hyderabad: AI navigation systems, hydrodynamic control, swarm robotics, sensor fusion, and autonomous systems. Astram Lab IITH research innovations."
        keywords="astram lab research, iith research areas, ai navigation, hydrodynamic control, swarm robotics, sensor fusion, autonomous systems research, robotics research iith, control systems research"
        canonical="/research"
      />
      <Navigation />
      <div className="pt-20">
        <section className="py-20 bg-gradient-to-b from-navy-950 to-navy-900">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-ocean-300 bg-clip-text text-transparent">
                Research Areas
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Our multidisciplinary research spans cutting-edge technologies in autonomous systems, marine robotics, and AI-driven navigation.
              </p>
            </div>

            {/* Research Areas */}
            <div className="space-y-12 mb-20">
              {researchAreas.map((area, index) => (
                <div 
                  key={index}
                  className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 items-center`}
                >
                  <div className="lg:w-1/2">
                    <div className="relative overflow-hidden rounded-2xl">
                      <img 
                        src={area.image} 
                        alt={area.title}
                        className="w-full h-64 lg:h-80 object-cover hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 to-transparent"></div>
                    </div>
                  </div>
                  
                  <div className="lg:w-1/2">
                    <h3 className="text-3xl font-bold text-cyan-400 mb-4">{area.title}</h3>
                    <p className="text-gray-300 text-lg leading-relaxed mb-6">
                      {area.description}
                    </p>
                    
                    <div className="mb-6">
                      <h4 className="text-white font-semibold mb-3">Key Technologies:</h4>
                      <div className="flex flex-wrap gap-2">
                        {area.technologies.map((tech, techIndex) => (
                          <span 
                            key={techIndex}
                            className="bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full text-sm border border-cyan-500/30"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="text-white font-semibold mb-3">Applications:</h4>
                      <ul className="text-gray-300 space-y-1">
                        {area.applications.map((app, appIndex) => (
                          <li key={appIndex} className="flex items-center">
                            <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
                            {app}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Ongoing Projects */}
            <div className="bg-gradient-to-r from-navy-800/30 to-navy-900/30 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-cyan-400 mb-8 text-center">Ongoing Projects</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {ongoingProjects.map((project, index) => (
                  <div 
                    key={index}
                    className="bg-navy-800/50 border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-400/40 transition-all duration-300 hover:scale-105"
                  >
                    <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
                    <div className="space-y-2 mb-4">
                      <p className="text-tech-yellow font-medium text-sm">{project.funding}</p>
                      <p className="text-gray-400 text-sm">{project.duration}</p>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">{project.description}</p>
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

export default Research;
