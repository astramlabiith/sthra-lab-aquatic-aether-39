import React, { useState } from 'react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { ProjectCategoryContent } from '../components/ProjectCategoryContent';
import { ProjectCategoryNavigation } from '../components/ProjectCategoryNavigation';
import { SEOHead } from '../components/SEOHead';
import { Plane, Ship, Zap, Satellite, Car } from 'lucide-react';
import { ProjectCategory } from '../types/projects';
import { projectData } from '../data/projectData';
const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('UAVs');
  const categories: ProjectCategory[] = [{
    id: 'UAVs',
    name: 'UAVs',
    icon: Plane,
    color: 'primary'
  }, {
    id: 'AUVs',
    name: 'AUVs',
    icon: Zap,
    color: 'primary'
  }, {
    id: 'ROVs',
    name: 'ROVs',
    icon: Zap,
    color: 'primary'
  }, {
    id: 'USVs',
    name: 'USVs',
    icon: Ship,
    color: 'primary'
  }, {
    id: 'GNSS',
    name: 'GNSS',
    icon: Satellite,
    color: 'primary'
  }, {
    id: 'Mars Rovers',
    name: 'Mars Rovers',
    icon: Car,
    color: 'primary'
  }];
  const currentData = projectData[activeCategory];
  return <div className="min-h-screen bg-background">
      <SEOHead 
        title="Research Projects - AstraM Lab IITH | UAV AUV ROV USV Mars Rovers"
        description="Explore AstraM Lab IITH research projects: UAVs (Unmanned Aerial Vehicles), AUVs (Autonomous Underwater Vehicles), ROVs, USVs, and Mars Rovers. Astram Lab IIT Hyderabad autonomous systems research."
        keywords="astram lab projects, iith projects, uav research, auv research, rov research, usv research, mars rovers, autonomous systems projects, robotics research iith, astram iith, drone research, underwater robotics iit hyderabad"
        canonical="/projects"
      />
      <Navigation />
      <div className="pt-20">
        <section className="section-padding bg-gradient-to-b from-muted/50 to-background">
          <div className="container-width">
            <div className="text-center mb-16">
              <h1 className="academic-heading md:text-5xl mb-4 text-blue-800 text-5xl">
                Research Projects
              </h1>
              <p className="academic-body text-lg max-w-3xl mx-auto">
                Explore our comprehensive research portfolio across multiple domains of unmanned systems technology.
              </p>
            </div>

            {/* Tab Navigation */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {categories.map(category => {
              const IconComponent = category.icon;
              return <button key={category.id} onClick={() => setActiveCategory(category.id)} className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${activeCategory === category.id ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}>
                    <IconComponent className="w-4 h-4" />
                    <span>{category.name}</span>
                  </button>;
            })}
            </div>

            <ProjectCategoryContent activeCategory={activeCategory} currentData={currentData} />
          </div>
        </section>
      </div>
      <Footer />
    </div>;
};
export default Projects;