import React from 'react';
import { ProjectCard } from './ProjectCard';
import { ProjectData } from '../types/projects';
interface ProjectCategoryContentProps {
  activeCategory: string;
  currentData: ProjectData;
}
export const ProjectCategoryContent: React.FC<ProjectCategoryContentProps> = ({
  activeCategory,
  currentData
}) => {
  return <div className="max-w-6xl mx-auto">
      {/* Category Description */}
      <div className="academic-card p-8 mb-12">
        <h2 className="academic-subheading text-3xl mb-4 text-blue-800">{activeCategory}</h2>
        <p className="academic-body text-lg leading-relaxed">
          {currentData.description}
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {currentData.projects.map((project, index) => <ProjectCard key={index} project={project} index={index} />)}
      </div>
    </div>;
};