
import React from 'react';

export const InfoSection = () => {
  return (
    <div>
      {/* About Section */}
      <section id="about" className="py-20 bg-navy-900">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-cyan-400">About Our Lab</h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-8">
              AASTHRA Lab is dedicated to advancing autonomous systems through innovative research in underwater 
              and aerial vehicle technologies. We develop cutting-edge solutions for intelligent navigation, 
              sustainable operations, and robust control systems.
            </p>
            
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              <div className="bg-navy-800 p-6 rounded-xl border border-cyan-500/20">
                <h3 className="text-xl font-bold text-white mb-4">Underwater Systems</h3>
                <p className="text-gray-300">
                  Advanced autonomous underwater vehicles with AI-driven navigation and energy-efficient propulsion systems.
                </p>
              </div>
              
              <div className="bg-navy-800 p-6 rounded-xl border border-cyan-500/20">
                <h3 className="text-xl font-bold text-white mb-4">Aerial Robotics</h3>
                <p className="text-gray-300">
                  Intelligent aerial platforms with adaptive control systems for complex environmental operations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Research Section */}
      <section id="research" className="py-20 bg-navy-950">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-cyan-400">Research Areas</h2>
            
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-navy-800 to-navy-900 p-6 rounded-xl border border-cyan-500/20">
                <h3 className="text-xl font-bold text-white mb-3">AI Navigation Systems</h3>
                <p className="text-gray-300">
                  Developing machine learning algorithms for autonomous path planning and real-time decision making in dynamic environments.
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-navy-800 to-navy-900 p-6 rounded-xl border border-cyan-500/20">
                <h3 className="text-xl font-bold text-white mb-3">Hydrodynamic Control</h3>
                <p className="text-gray-300">
                  Advanced control systems optimizing energy efficiency and maneuverability for underwater vehicles in complex aquatic conditions.
                </p>
              </div>
              
              <div className="bg-gradient-to-r from-navy-800 to-navy-900 p-6 rounded-xl border border-cyan-500/20">
                <h3 className="text-xl font-bold text-white mb-3">Hybrid Systems Integration</h3>
                <p className="text-gray-300">
                  Creating versatile platforms that seamlessly operate across multiple domains - air, surface, and underwater.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
