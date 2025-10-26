import React from 'react';
import { Link, useLocation } from 'react-router-dom';
export const Navigation = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;
  return <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md border-b border-gray-200">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center group">
            <div className="transition-transform duration-300 group-hover:scale-105">
              <img src="/lovable-uploads/27a6da18-2e3d-4142-9de7-3376acc2a499.png" alt="AstraM Lab | IIT Hyderabad" className="h-11 w-auto object-contain" />
            </div>
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link to="/" className={`transition-all duration-300 hover:text-blue-600 hover:scale-105 ${isActive('/') ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : 'text-gray-700'}`}>
              Home
            </Link>
            <Link to="/team" className={`transition-all duration-300 hover:text-blue-600 hover:scale-105 ${isActive('/team') ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : 'text-gray-700'}`}>
              Team
            </Link>
            <Link to="/projects" className={`transition-all duration-300 hover:text-blue-600 hover:scale-105 ${isActive('/projects') ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : 'text-gray-700'}`}>
              Projects
            </Link>
            <Link to="/publications" className={`transition-all duration-300 hover:text-blue-600 hover:scale-105 ${isActive('/publications') ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : 'text-gray-700'}`}>
              Publications
            </Link>
            <Link to="/awards" className={`transition-all duration-300 hover:text-blue-600 hover:scale-105 ${isActive('/awards') ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : 'text-gray-700'}`}>
              Awards
            </Link>
            <Link to="/courses" className={`transition-all duration-300 hover:text-blue-600 hover:scale-105 ${isActive('/courses') ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : 'text-gray-700'}`}>
              Courses
            </Link>
            <Link to="/join-us" className={`transition-all duration-300 hover:text-blue-600 hover:scale-105 ${isActive('/join-us') ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : 'text-gray-700'}`}>
              Join Us
            </Link>
          </div>
        </div>
      </div>
    </nav>;
};