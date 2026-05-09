import React, { useEffect, useState } from 'react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { ProjectCategoryContent } from '../components/ProjectCategoryContent';
import { SEOHead } from '../components/SEOHead';
import { Plane, Ship, Zap, Satellite, Car } from 'lucide-react';
import { ProjectCategory, ProjectDataMap } from '../types/projects';
import { supabase } from '@/integrations/supabase/client';

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  'UAVs': 'Our UAV research focuses on developing advanced autonomous aerial systems with intelligent flight control, adaptive navigation, and multi-mission capabilities for various applications including surveillance, mapping, and environmental monitoring.',
  'AUVs': 'Our AUV research encompasses autonomous underwater navigation, deep-sea exploration systems, and AI-powered obstacle avoidance for complex underwater environments and marine research applications.',
  'ROVs': 'ROV research at AstraM Lab focuses on haptic feedback systems, precision control mechanisms, and human-robot interaction for complex underwater manipulation tasks and deep-sea operations.',
  'USVs': 'USV research involves autonomous surface vehicle navigation, marine environmental monitoring, and integration with underwater systems for comprehensive ocean exploration missions.',
  'GNSS': 'GNSS research focuses on high-precision positioning systems for marine applications, real-time kinematic solutions, and integration with autonomous vehicle navigation systems.',
  'Mars Rovers': 'Mars rover research involves autonomous navigation in extreme planetary conditions, terrain analysis systems, and robust control mechanisms for extraterrestrial exploration missions.',
};

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('UAVs');
  const [projectData, setProjectData] = useState<ProjectDataMap>({});

  const categories: ProjectCategory[] = [
    { id: 'UAVs', name: 'UAVs', icon: Plane, color: 'primary' },
    { id: 'AUVs', name: 'AUVs', icon: Zap, color: 'primary' },
    { id: 'ROVs', name: 'ROVs', icon: Zap, color: 'primary' },
    { id: 'USVs', name: 'USVs', icon: Ship, color: 'primary' },
    { id: 'GNSS', name: 'GNSS', icon: Satellite, color: 'primary' },
    { id: 'Mars Rovers', name: 'Mars Rovers', icon: Car, color: 'primary' },
  ];

  useEffect(() => {
    supabase.from('projects').select('*').order('display_order').then(({ data }) => {
      const map: ProjectDataMap = {};
      categories.forEach(c => {
        map[c.id] = { description: CATEGORY_DESCRIPTIONS[c.id] || '', projects: [] };
      });
      (data || []).forEach((p: any) => {
        const key = p.category;
        if (!map[key]) map[key] = { description: CATEGORY_DESCRIPTIONS[key] || '', projects: [] };
        map[key].projects.push({
          title: p.title,
          image: p.image_url || '/placeholder.svg',
          description: p.description || '',
          progress: p.progress || 0,
          publications: p.publications || [],
          link: p.link || undefined,
        });
      });
      setProjectData(map);
    });
  }, []);

  const currentData = projectData[activeCategory] || { description: CATEGORY_DESCRIPTIONS[activeCategory] || '', projects: [] };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Research Projects - AstraM Lab IITH | UAV AUV ROV USV Mars Rovers"
        description="Explore AstraM Lab IITH research projects: UAVs, AUVs, ROVs, USVs, and Mars Rovers."
        keywords="astram lab projects, iith projects, uav, auv, rov, usv, mars rovers"
        canonical="/projects"
      />
      <Navigation />
      <div className="pt-20">
        <section className="section-padding bg-gradient-to-b from-muted/50 to-background">
          <div className="container-width">
            <div className="text-center mb-16">
              <h1 className="academic-heading md:text-5xl mb-4 text-blue-800 text-5xl">Research Projects</h1>
              <p className="academic-body text-lg max-w-3xl mx-auto">
                Explore our comprehensive research portfolio across multiple domains of unmanned systems technology.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {categories.map(category => {
                const Icon = category.icon;
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                      activeCategory === category.id ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{category.name}</span>
                  </button>
                );
              })}
            </div>

            <ProjectCategoryContent activeCategory={activeCategory} currentData={currentData} />
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Projects;
