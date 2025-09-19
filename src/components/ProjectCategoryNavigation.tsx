
import React from 'react';
import { ProjectCategory } from '../types/projects';

interface ProjectCategoryNavigationProps {
  categories: ProjectCategory[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export const ProjectCategoryNavigation: React.FC<ProjectCategoryNavigationProps> = ({
  categories,
  activeCategory,
  onCategoryChange
}) => {
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-12">
      {categories.map((category) => {
        const IconComponent = category.icon;
        return (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
              activeCategory === category.id
                ? 'bg-cyan-400 text-navy-950'
                : 'bg-navy-800/50 border border-cyan-500/20 text-cyan-400 hover:bg-cyan-400/10 hover:border-cyan-400/40'
            }`}
          >
            <IconComponent className="w-5 h-5" />
            <span>{category.name}</span>
          </button>
        );
      })}
    </div>
  );
};
