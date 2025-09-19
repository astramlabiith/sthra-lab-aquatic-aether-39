import React from 'react';
import { Link } from 'react-router-dom';
export const OngoingProjectsSection = () => {
  const projects = [{
    title: "LIMUS – Lake Inspection & Monitoring Unmanned Surface Vehicle",
    description: "A one-man portable USV platform – fits in a car trunk with integrated water sampling mechanism.",
    details: ["Manual and autonomous modes of operation", "Modular payload for lake-specific research"],
    image: "/lovable-uploads/698bf489-4494-48ab-9b20-a030405d281c.png",
    category: "USV",
    status: "Active"
  }, {
    title: "NEERA – Nearshore Economical Exploration ROV/AUV",
    description: "Convertible between autonomous (AUV) and tethered (ROV) modes with sensors for tunnel inspections.",
    details: ["Modular payload for in-situ water quality testing", "Lightweight, low-cost platform for scalable deployments"],
    image: "/lovable-uploads/cd37a39a-5d6e-45a7-8ae7-01df267c15c7.png",
    category: "ROV/AUV",
    status: "Development"
  }, {
    title: "DRONA – Dynamic ROV for Near-field Assessment",
    description: "Precise maneuvering in tight underwater spaces with live camera and sonar data feeds.",
    details: ["Hovering capability for close-up infrastructure scanning", "Integrated gripper mechanism"],
    image: "/lovable-uploads/9d46154f-2775-4701-b37f-5400470069d9.png",
    category: "ROV",
    status: "Active"
  }];
  return <section className="section-padding bg-gradient-to-b from-gray-50 to-white">
      <div className="container-width">
        <div className="text-center mb-16">
          <h2 className="academic-heading text-blue-800">
            Ongoing Projects
          </h2>
          <p className="academic-body text-lg max-w-3xl mx-auto text-gray-900">
            Explore our current research initiatives that are shaping the future of unmanned systems technology.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => <div key={index} className="academic-card p-6 hover:scale-105 transition-transform duration-200">
              <div className="relative overflow-hidden mb-4 rounded-lg">
                <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-white/90 text-blue-800 text-xs rounded-full border border-blue-200 font-medium">
                    {project.category}
                  </span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${project.status === 'Active' ? 'bg-green-100 text-green-800' : project.status === 'Development' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>
                    {project.status}
                  </span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-blue-900 mb-3">
                {project.title}
              </h3>
              <p className="academic-body mb-4 text-gray-950">
                {project.description}
              </p>
              <ul className="list-disc list-inside mb-6 text-gray-800 space-y-1">
                {project.details.map((detail, idx) => (
                  <li key={idx} className="text-sm">{detail}</li>
                ))}
              </ul>
              
              <Link to="/projects" className="academic-button-primary w-full block text-center">
                Learn More
              </Link>
            </div>)}
        </div>

        <div className="text-center mt-12">
          <Link to="/projects" className="academic-button-secondary">
            View All Projects
          </Link>
        </div>
      </div>
    </section>;
};