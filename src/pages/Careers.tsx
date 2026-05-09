import React, { useEffect, useState } from 'react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { SEOHead } from '../components/SEOHead';
import { supabase } from '@/integrations/supabase/client';
import { Briefcase, GraduationCap, Mail, ExternalLink } from 'lucide-react';

interface Career {
  id: string; kind: 'Internship' | 'Hiring'; title: string;
  description: string | null; requirements: string[];
  apply_link: string | null; apply_email: string | null; is_open: boolean;
}

const Careers = () => {
  const [items, setItems] = useState<Career[]>([]);

  useEffect(() => {
    supabase.from('careers').select('*').order('kind').order('display_order').then(({ data }) => {
      if (data) setItems(data as Career[]);
    });
  }, []);

  const internships = items.filter(i => i.kind === 'Internship');
  const hirings = items.filter(i => i.kind === 'Hiring');

  const renderCard = (c: Career) => (
    <div key={c.id} className="bg-white border border-blue-200 rounded-2xl p-8 hover:border-blue-300 hover:shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
        <h3 className="text-xl font-bold text-blue-800">{c.title}</h3>
        <div className="flex gap-2">
          <span className="px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-sm">
            {c.kind}
          </span>
          {!c.is_open && (
            <span className="px-3 py-2 rounded-full text-xs font-medium bg-gray-200 text-gray-700">Closed</span>
          )}
        </div>
      </div>
      {c.description && <p className="text-gray-900 mb-4 leading-relaxed">{c.description}</p>}
      {c.requirements.length > 0 && (
        <div className="mb-4">
          <h4 className="text-gray-900 font-medium mb-2">Requirements:</h4>
          <ul className="text-gray-900 text-sm space-y-1">
            {c.requirements.map((r, i) => (
              <li key={i} className="flex items-start"><span className="text-blue-800 mr-2">•</span>{r}</li>
            ))}
          </ul>
        </div>
      )}
      {(c.apply_link || c.apply_email) && c.is_open && (
        <div className="flex gap-3 mt-4">
          {c.apply_link && (
            <a href={c.apply_link} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-blue-700 text-white text-sm hover:bg-blue-800 transition-colors">
              <ExternalLink className="w-4 h-4" /> Apply
            </a>
          )}
          {c.apply_email && (
            <a href={`mailto:${c.apply_email}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-blue-700 text-blue-700 text-sm hover:bg-blue-50 transition-colors">
              <Mail className="w-4 h-4" /> Email
            </a>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title="Careers & Internships - AstraM Lab IITH"
        description="Open internships and hiring opportunities at AstraM Lab, IIT Hyderabad."
        keywords="astram lab careers, iith internships, hiring, research positions"
        canonical="/careers"
      />
      <Navigation />
      <div className="pt-20">
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-blue-800">Careers & Internships</h1>
              <p className="text-xl text-gray-900 max-w-3xl mx-auto leading-relaxed">
                Join our team — explore current openings for research interns, project staff and full-time roles.
              </p>
            </div>

            <div className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <GraduationCap className="w-6 h-6 text-blue-800" />
                <h2 className="text-3xl font-bold text-blue-800">Internships</h2>
              </div>
              {internships.length === 0 ? (
                <p className="text-gray-600">No internship openings at the moment.</p>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">{internships.map(renderCard)}</div>
              )}
            </div>

            <div>
              <div className="flex items-center gap-3 mb-6">
                <Briefcase className="w-6 h-6 text-blue-800" />
                <h2 className="text-3xl font-bold text-blue-800">Hiring</h2>
              </div>
              {hirings.length === 0 ? (
                <p className="text-gray-600">No hiring openings at the moment.</p>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">{hirings.map(renderCard)}</div>
              )}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Careers;
