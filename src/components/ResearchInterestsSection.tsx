import React from 'react';
import { Waves, Zap, Fish, Plane, Eye, Brain, MapPin, Satellite } from 'lucide-react';
export const ResearchInterestsSection = () => {
  const researchAreas = [{
    icon: Waves,
    title: "Intelligent Marine Robotics",
    description: "We design and prototype robotic systems for underwater and surface-level aquatic operations:",
    items: ["Autonomous Underwater Vehicles (AUVs) for bathymetry and quality sensing", "Water Tunnel Inspection Systems for submerged civil infrastructure", "Surveillance-Capable USVs for lake health monitoring and environmental security", "ROVs for Close-Range Inspections in tanks, reservoirs, and pipelines"]
  }, {
    icon: Zap,
    title: "High-Speed Craft Dynamics & Stability",
    description: "Modeling, prediction, and control of planing crafts:",
    items: ["Instability detection through environmental perception", "Development of real-time stability control algorithms for autonomous surface vessels (ASVs)"]
  }, {
    icon: Fish,
    title: "Biomimetic Underwater Robotics",
    description: "Inspired by marine organisms, we develop robots that emphasize:",
    items: ["Quiet, efficient swimming using soft fins (inspired by SoFi, DroidMantaRay)", "Designs that minimize disturbance in sensitive aquatic ecosystems", "Applications in aquafarms, coral studies, and ecologically safe exploration"]
  }, {
    icon: Plane,
    title: "Cross-Medium Autonomous Platforms",
    description: "Development of platforms capable of operating across air, water, and terrain. This includes:",
    items: ["Tiltable-thruster aerial-aquatic drones", "Amphibious propulsion inspired by Velox robot and cuttlefish, using undulating fins to both swim and crawl"]
  }, {
    icon: Eye,
    title: "Sensor Suite Development",
    description: "Development of modular, real-time sensor systems that combine:",
    items: ["Visual, inertial, depth, sonar, and pressure sensors", "Compact and low-power embedded implementations", "Capable of supporting GNSS-denied navigation, both indoor and underwater"]
  }, {
    icon: Brain,
    title: "AI-enabled Perception & Control",
    description: "Integration of lightweight AI models for:",
    items: ["Terrain understanding", "Adaptive control", "Learning-based decision-making in uncertain and dynamic conditions"]
  }, {
    icon: MapPin,
    title: "Indoor Navigation & SLAM",
    description: "Design and deployment of autonomous drones and ground robots for indoor and tunnel environments:",
    items: ["Implementation of Visual-Inertial SLAM", "Navigation in GPS-denied or confined industrial spaces"]
  }, {
    icon: Satellite,
    title: "Planetary Mobility Systems",
    description: "Research into rugged mobility and autonomy for unstructured terrain:",
    items: ["Inspired by Mars rovers and extra-terrestrial exploration", "Includes wheel-soil interaction, perception-based navigation, and terrain mapping"]
  }];
  return <section className="section-padding bg-white">
      <div className="container-width">
        <div className="text-center mb-16">
          <h2 className="academic-heading text-blue-800">
            Technology & Innovation
          </h2>
          <p className="academic-body text-lg max-w-3xl mx-auto text-black">
            Our research encompasses cutting-edge technologies across multiple domains, 
            developing intelligent systems that push the boundaries of autonomous robotics.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {researchAreas.map((area, index) => {
          const IconComponent = area.icon;
          return <div key={index} className="academic-card p-8 hover:scale-105 transition-transform duration-200">
                <div className="flex items-start mb-6">
                  <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center border border-blue-200 mr-4 flex-shrink-0">
                    <IconComponent className="w-8 h-8 text-blue-800" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-blue-900 mb-3">
                      {area.title}
                    </h3>
                    <p className="academic-body leading-relaxed mb-4 text-gray-950">
                      {area.description}
                    </p>
                  </div>
                </div>
                
                <ul className="space-y-2 ml-20">
                  {area.items.map((item, itemIndex) => <li key={itemIndex} className="flex items-start">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-sm leading-relaxed text-gray-950">{item}</span>
                    </li>)}
                </ul>
              </div>;
        })}
        </div>

      </div>
    </section>;
};