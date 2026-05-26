import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface OngoingProject {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  category: string;
  progress: number;
}

export const OngoingProjectsSection = () => {
  const [projects, setProjects] = useState<OngoingProject[]>([]);

  useEffect(() => {
    supabase
      .from('projects')
      .select('id,title,description,image_url,category,progress,display_order')
      .order('display_order')
      .limit(6)
      .then(({ data }) => {
        if (data) setProjects(data as OngoingProject[]);
      });
  }, []);

  const statusFor = (progress: number) =>
    progress >= 100 ? 'Completed' : progress > 0 ? 'Active' : 'Development';

  return (
    <section className="section-padding bg-gradient-to-b from-gray-50 to-white">
      <div className="container-width">
        <div className="text-center mb-16">
          <h2 className="academic-heading text-blue-800">Ongoing Projects</h2>
          <p className="academic-body text-lg max-w-3xl mx-auto text-gray-900">
            Explore our current research initiatives that are shaping the future of unmanned systems technology.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map(project => {
            const status = statusFor(project.progress);
            return (
              <div key={project.id} className="academic-card p-6 hover:scale-105 transition-transform duration-200">
                <div className="relative overflow-hidden mb-4 rounded-lg">
                  <img
                    src={project.image_url || '/placeholder.svg'}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-white/90 text-blue-800 text-xs rounded-full border border-blue-200 font-medium">
                      {project.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${status === 'Active' ? 'bg-green-100 text-green-800' : status === 'Development' ? 'bg-yellow-100 text-yellow-800' : 'bg-blue-100 text-blue-800'}`}>
                      {status}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-blue-900 mb-3">{project.title}</h3>
                {project.description && (
                  <p className="academic-body mb-4 text-gray-950">{project.description}</p>
                )}

                <Link to="/projects" className="academic-button-primary w-full block text-center">
                  Learn More
                </Link>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link to="/projects" className="academic-button-secondary">View All Projects</Link>
        </div>
      </div>
    </section>
  );
};
