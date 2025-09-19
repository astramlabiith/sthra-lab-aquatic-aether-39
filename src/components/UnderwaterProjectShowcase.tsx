
import React from 'react';

export const UnderwaterProjectShowcase = () => {
  const underwaterProject = {
    title: "DeepExplorer AUV",
    subtitle: "Autonomous Underwater Vehicle with AI Navigation",
    description: "Advanced autonomous underwater vehicle featuring cutting-edge AI-based navigation systems, adaptive hydrodynamic control, and real-time environmental perception for deep-sea exploration missions.",
    image: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=1200&q=80",
    features: [
      {
        title: "AI Navigation System",
        description: "Deep learning algorithms for autonomous path planning and obstacle avoidance in complex underwater environments",
        icon: "🤖"
      },
      {
        title: "Hydrodynamic Control",
        description: "Advanced propulsion systems with energy-efficient maneuvering and adaptive control in varying current conditions",
        icon: "🌊"
      },
      {
        title: "Environmental Perception",
        description: "Multi-sensor fusion for real-time mapping, object detection, and environmental analysis",
        icon: "👁️"
      },
      {
        title: "Autonomous Operations",
        description: "Self-directed mission execution with dynamic replanning and emergency surface protocols",
        icon: "⚡"
      }
    ],
    specifications: [
      { label: "Max Depth", value: "6,000m" },
      { label: "Operating Time", value: "72 hours" },
      { label: "Navigation Accuracy", value: "±0.5m" },
      { label: "Payload Capacity", value: "50kg" }
    ],
    applications: [
      "Deep-sea exploration and mapping",
      "Marine biological research",
      "Underwater infrastructure inspection",
      "Ocean floor geological surveys",
      "Environmental monitoring missions"
    ]
  };

  return (
    <section className="py-20 bg-gradient-to-b from-navy-900 to-navy-950 relative overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-ocean-300 bg-clip-text text-transparent">
            Underwater Autonomy Project
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Pioneering the future of underwater exploration through advanced AI navigation and hydrodynamic control systems
          </p>
        </div>

        {/* Main Project Showcase */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Project Image */}
          <div className="relative group">
            <div className="relative overflow-hidden rounded-2xl">
              <img 
                src={underwaterProject.image} 
                alt={underwaterProject.title}
                className="w-full h-96 object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-transparent to-cyan-500/20"></div>
              <div className="absolute top-6 left-6">
                <span className="bg-cyan-400 text-navy-950 px-4 py-2 rounded-full text-sm font-bold">
                  Active Development
                </span>
              </div>
            </div>
            
            {/* Floating specs cards */}
            <div className="absolute -right-4 top-1/4 bg-navy-800/90 backdrop-blur-sm border border-cyan-500/30 rounded-xl p-4 animate-float">
              <div className="text-cyan-400 font-bold text-lg">6,000m</div>
              <div className="text-gray-300 text-sm">Max Depth</div>
            </div>
            <div className="absolute -left-4 bottom-1/4 bg-navy-800/90 backdrop-blur-sm border border-cyan-500/30 rounded-xl p-4 animate-float" style={{ animationDelay: '1s' }}>
              <div className="text-tech-yellow font-bold text-lg">72hrs</div>
              <div className="text-gray-300 text-sm">Autonomous</div>
            </div>
          </div>

          {/* Project Details */}
          <div>
            <h3 className="text-3xl font-bold text-white mb-3">{underwaterProject.title}</h3>
            <p className="text-cyan-400 text-lg font-medium mb-4">{underwaterProject.subtitle}</p>
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              {underwaterProject.description}
            </p>

            {/* Key Features */}
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {underwaterProject.features.map((feature, index) => (
                <div 
                  key={index}
                  className="bg-navy-800/50 border border-cyan-500/20 rounded-lg p-4 hover:border-cyan-400/40 transition-all duration-300"
                >
                  <div className="flex items-center mb-2">
                    <span className="text-2xl mr-3">{feature.icon}</span>
                    <h4 className="text-white font-semibold">{feature.title}</h4>
                  </div>
                  <p className="text-gray-300 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>

            <button className="bg-gradient-ocean text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-105">
              View Technical Details
            </button>
          </div>
        </div>

        {/* Technical Specifications */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Specs */}
          <div className="bg-gradient-to-br from-navy-800/50 to-navy-900/50 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-8">
            <h4 className="text-2xl font-bold text-cyan-400 mb-6">Technical Specifications</h4>
            <div className="space-y-4">
              {underwaterProject.specifications.map((spec, index) => (
                <div key={index} className="flex justify-between items-center border-b border-cyan-500/20 pb-2">
                  <span className="text-gray-300">{spec.label}</span>
                  <span className="text-white font-bold">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Applications */}
          <div className="bg-gradient-to-br from-navy-800/50 to-navy-900/50 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-8">
            <h4 className="text-2xl font-bold text-ocean-400 mb-6">Mission Applications</h4>
            <ul className="space-y-3">
              {underwaterProject.applications.map((application, index) => (
                <li key={index} className="flex items-center text-gray-300">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full mr-3 animate-pulse"></div>
                  {application}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Background decorations */}
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-gradient-to-r from-cyan-500/10 to-transparent rounded-full blur-3xl animate-pulse-glow"></div>
      <div className="absolute bottom-1/4 right-0 w-48 h-48 bg-gradient-to-l from-ocean-500/10 to-transparent rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }}></div>
    </section>
  );
};
