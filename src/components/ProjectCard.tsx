import React from 'react';
import { Project } from '../types/projects';
interface ProjectCardProps {
  project: Project;
  index: number;
}
export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  index
}) => {
  return <div className="academic-card overflow-hidden hover:shadow-lg transition-all duration-300 group">
      <div className="relative overflow-hidden">
        <img src={project.image} alt={project.title} className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      <div className="p-6">
        <h3 className="academic-subheading text-xl mb-3 text-blue-800">
          {project.title}
        </h3>
        <p className="academic-body mb-4 leading-relaxed">
          {project.description}
        </p>
        
        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">Progress</span>
            <span className="text-sm font-medium text-primary">{project.progress}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div style={{
            width: `${project.progress}%`
          }} className="bg-primary h-2 rounded-full transition-all duration-300"></div>
          </div>
        </div>

        {/* Related Publications */}
        <div>
          <h4 className="text-sm font-medium mb-2 text-muted-foreground">Related Publications:</h4>
          <div className="flex flex-wrap gap-2">
            {project.publications.map((pub, pubIndex) => <span key={pubIndex} className="px-2 py-1 bg-muted text-xs rounded-md border text-muted-foreground">
                {pub}
              </span>)}
          </div>
        </div>
      </div>
    </div>;
};