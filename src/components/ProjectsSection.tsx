
import React from 'react';

export const ProjectsSection = () => {
  const projects = [
    {
      title: "AquaBot Genesis",
      category: "Underwater Autonomy",
      description: "Next-generation autonomous underwater vehicle with advanced AI navigation and energy-efficient propulsion systems.",
      image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=800&q=80",
      status: "Active",
      tech: ["Deep Learning", "Computer Vision", "Hydrodynamics"]
    },
    {
      title: "SkyMarine Hybrid",
      category: "Aerial-Aquatic Systems",
      description: "Revolutionary hybrid platform capable of seamless transitions between aerial flight and underwater operations.",
      image: "https://images.unsplash.com/photo-1487887235947-a955ef187fcc?auto=format&fit=crop&w=800&q=80",
      status: "Development",
      tech: ["Multi-domain Control", "Adaptive Materials", "AI Planning"]
    },
    {
      title: "Neural Flow Control",
      category: "AI Navigation",
      description: "Machine learning algorithms for real-time flow analysis and optimal path planning in complex fluid environments.",
      image: "https://images.unsplash.com/photo-1518877593221-1f28583780b4?auto=format&fit=crop&w=800&q=80",
      status: "Research",
      tech: ["Neural Networks", "Fluid Dynamics", "Reinforcement Learning"]
    }
  ];

  return (
    <section id="projects" className="py-20 bg-gradient-to-b from-navy-900 to-navy-950 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-tech-yellow bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore our groundbreaking research projects that are shaping the future of autonomous systems across multiple domains.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="group bg-gradient-to-br from-navy-800/50 to-navy-900/50 backdrop-blur-sm border border-cyan-500/20 rounded-2xl overflow-hidden hover:border-cyan-400/40 transition-all duration-500 hover:shadow-xl hover:shadow-cyan-500/10 hover:scale-105"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 to-transparent"></div>
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    project.status === 'Active' ? 'bg-cyan-400 text-navy-950' :
                    project.status === 'Development' ? 'bg-tech-yellow text-navy-950' :
                    'bg-ocean-400 text-white'
                  }`}>
                    {project.status}
                  </span>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-3">
                  <span className="text-cyan-400 text-sm font-medium">{project.category}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-300 mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className="px-2 py-1 bg-cyan-500/20 text-cyan-300 text-xs rounded-md border border-cyan-500/30"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <button className="w-full bg-gradient-ocean text-white py-2 rounded-lg font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 group-hover:scale-105">
                  Learn More
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="border-2 border-cyan-400 text-cyan-400 px-8 py-3 rounded-lg font-semibold hover:bg-cyan-400 hover:text-navy-950 transition-all duration-300">
            View All Projects
          </button>
        </div>
      </div>

      {/* Background decorations */}
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-gradient-to-r from-cyan-500/10 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-gradient-to-l from-ocean-500/10 to-transparent rounded-full blur-3xl"></div>
    </section>
  );
};
