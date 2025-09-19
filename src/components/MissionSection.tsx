import React from 'react';
export const MissionSection = () => {
  return <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-8 text-blue-900 md:text-6xl">
            Our Mission
          </h2>
          
          <div className="bg-white border border-blue-200 rounded-2xl p-8 hover:border-blue-300 transition-all duration-300 shadow-sm">
            <p className="text-2xl md:text-3xl leading-relaxed font-light text-blue-900">Autonomous Systems and Technologies in Robotics and Advanced Multi-domain Applications </p>
          </div>
          
          <div className="mt-6 grid md:grid-cols-3 gap-8">
            <div className="bg-white border border-blue-200 rounded-xl p-6 hover:border-blue-300 transition-all duration-300 shadow-sm">
              <h3 className="text-xl font-bold mb-3 text-blue-900">Innovation</h3>
              <p className="text-gray-900">
                Pioneering cutting-edge technologies for autonomous navigation and control systems.
              </p>
            </div>
            
            <div className="bg-white border border-blue-200 rounded-xl p-6 hover:border-blue-300 transition-all duration-300 shadow-sm">
              <h3 className="text-xl font-bold mb-3 text-blue-900">Excellence</h3>
              <p className="text-gray-900">
                Maintaining the highest standards in research quality and scientific rigor.
              </p>
            </div>
            
            <div className="bg-white border border-blue-200 rounded-xl p-6 hover:border-blue-300 transition-all duration-300 shadow-sm">
              <h3 className="text-xl font-bold mb-3 text-blue-900">Impact</h3>
              <p className="text-gray-900">
                Creating solutions that address real-world challenges in unmanned systems.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>;
};