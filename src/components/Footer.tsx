import React from 'react';
import { Link } from 'react-router-dom';
export const Footer = () => {
  return <footer className="bg-gradient-to-br from-gray-900 via-gray-900 to-gray-950 text-white border-t border-gray-700/50 relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600 rounded-full filter blur-3xl transform translate-x-1/2 translate-y-1/2"></div>
      </div>
      <div className="container-width py-12 relative z-10">
        {/* Main Footer Content */}
        <div className="grid lg:grid-cols-10 md:grid-cols-6 gap-8 mb-8">
          {/* Lab Info Section */}
          <div className="lg:col-span-6 md:col-span-4">
            <div className="flex items-start space-x-4 mb-6">
              <div className="p-3 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10">
                <img src="/lovable-uploads/5b8449b8-6fc4-4091-b934-a8acbcf86385.png" alt="AstraM Lab Logo" className="w-14 h-14 object-contain" />
              </div>
              <div>
                <h3 className="text-xl font-bold tracking-tight mb-2 text-white">AstraM Lab</h3>
                <p className="text-blue-300 font-medium text-sm mb-2">Autonomous Systems Technology Research</p>
                <p className="text-gray-400 text-sm leading-relaxed">Indian Institute of Technology Hyderabad</p>
                <p className="text-gray-400 text-sm mt-3 leading-relaxed max-w-md">Advancing the frontiers of unmanned systems through innovative research in robotics, control systems, and autonomous navigation technologies</p>
              </div>
            </div>
          </div>

          {/* Research Areas */}
          <div className="lg:col-span-2 md:col-span-1">
            <h4 className="text-white font-bold text-sm mb-4 flex items-center uppercase tracking-wider">
              <div className="w-6 h-0.5 bg-blue-400 mr-3"></div>
              Research Areas
            </h4>
            <ul className="space-y-2">
              <li><Link to="/projects" className="text-gray-300 hover:text-blue-300 transition-all duration-300 text-sm flex items-center group hover:translate-x-1">
                <span className="w-1 h-1 bg-blue-400 rounded-full mr-3 group-hover:w-2 transition-all duration-300"></span>
                Unmanned Aerial Vehicles
              </Link></li>
              <li><Link to="/projects" className="text-gray-300 hover:text-blue-300 transition-all duration-300 text-sm flex items-center group hover:translate-x-1">
                <span className="w-1 h-1 bg-blue-400 rounded-full mr-3 group-hover:w-2 transition-all duration-300"></span>
                Autonomous Underwater Vehicles
              </Link></li>
              <li><Link to="/projects" className="text-gray-300 hover:text-blue-300 transition-all duration-300 text-sm flex items-center group hover:translate-x-1">
                <span className="w-1 h-1 bg-blue-400 rounded-full mr-3 group-hover:w-2 transition-all duration-300"></span>
                GNSS Navigation
              </Link></li>
              <li><Link to="/projects" className="text-gray-300 hover:text-blue-300 transition-all duration-300 text-sm flex items-center group hover:translate-x-1">
                <span className="w-1 h-1 bg-blue-400 rounded-full mr-3 group-hover:w-2 transition-all duration-300"></span>
                Control Systems
              </Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 md:col-span-1">
            <h4 className="text-white font-bold text-sm mb-4 flex items-center uppercase tracking-wider">
              <div className="w-6 h-0.5 bg-blue-400 mr-3"></div>
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-300 hover:text-blue-300 transition-all duration-300 text-sm flex items-center group hover:translate-x-1">
                <span className="w-1 h-1 bg-blue-400 rounded-full mr-3 group-hover:w-2 transition-all duration-300"></span>
                About Us
              </Link></li>
              <li><Link to="/publications" className="text-gray-300 hover:text-blue-300 transition-all duration-300 text-sm flex items-center group hover:translate-x-1">
                <span className="w-1 h-1 bg-blue-400 rounded-full mr-3 group-hover:w-2 transition-all duration-300"></span>
                Publications
              </Link></li>
              <li><Link to="/team" className="text-gray-300 hover:text-blue-300 transition-all duration-300 text-sm flex items-center group hover:translate-x-1">
                <span className="w-1 h-1 bg-blue-400 rounded-full mr-3 group-hover:w-2 transition-all duration-300"></span>
                Team
              </Link></li>
              <li><Link to="/courses" className="text-gray-300 hover:text-blue-300 transition-all duration-300 text-sm flex items-center group hover:translate-x-1">
                <span className="w-1 h-1 bg-blue-400 rounded-full mr-3 group-hover:w-2 transition-all duration-300"></span>
                Courses
              </Link></li>
              <li><Link to="/join-us" className="text-gray-300 hover:text-blue-300 transition-all duration-300 text-sm flex items-center group hover:translate-x-1">
                <span className="w-1 h-1 bg-blue-400 rounded-full mr-3 group-hover:w-2 transition-all duration-300"></span>
                Join Us
              </Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700/30 pt-6 mt-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
            <div className="text-sm text-gray-400 max-w-2xl">
              <p className="mb-2 font-medium text-gray-300 text-sm">© 2024 ASTRAM Lab, Indian Institute of Technology Hyderabad. All rights reserved.</p>
              <p className="text-xs leading-relaxed text-gray-500">
                Research content and innovations are property of AstraM Lab. External media used under appropriate academic licenses.
              </p>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
              <Link to="/contact" className="text-gray-400 hover:text-blue-300 transition-colors duration-300 font-medium text-xs">
                Privacy Policy
              </Link>
              <Link to="/contact" className="text-gray-400 hover:text-blue-300 transition-colors duration-300 font-medium text-xs">
                Terms of Use
              </Link>
              <Link to="/contact" className="text-gray-400 hover:text-blue-300 transition-colors duration-300 font-medium text-xs">
                Academic Guidelines
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>;
};