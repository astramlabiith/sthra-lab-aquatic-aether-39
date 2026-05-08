import React, { useEffect, useState } from 'react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { SEOHead } from '../components/SEOHead';
import { FileText } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Pub {
  id: string; kind: 'research' | 'conference'; title: string; authors: string;
  venue: string; year: string; abstract: string | null; doi: string | null; pdf_link: string | null;
}

const Publications = () => {
  const [activeTab, setActiveTab] = useState<'research' | 'conference'>('research');
  const [items, setItems] = useState<Pub[]>([]);

  useEffect(() => {
    supabase.from('publications').select('*').order('display_order').then(({ data }) => {
      if (data) setItems(data as Pub[]);
    });
  }, []);

  const list = items.filter(i => i.kind === activeTab);

  const PublicationCard = ({ publication }: { publication: Pub }) => (
    <div className="bg-white border border-blue-200 rounded-lg p-6 hover:border-blue-300 transition-all duration-300 hover:shadow-md">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-blue-800 mb-2">{publication.title}</h3>
          <p className="text-blue-700 font-medium mb-2">{publication.authors}</p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-900 mb-3">
            <span className="bg-blue-50 text-blue-800 px-3 py-1 rounded-full border border-blue-200">{publication.venue}</span>
            <span className="text-blue-800 font-medium">{publication.year}</span>
          </div>
        </div>
        <FileText className="w-5 h-5 text-blue-800 ml-4" />
      </div>
      {publication.abstract && <p className="text-gray-900 mb-4 leading-relaxed">{publication.abstract}</p>}
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600">DOI: {publication.doi}</span>
        {publication.pdf_link && (
          <a href={publication.pdf_link} target="_blank" rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-blue-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-900 transition-all duration-300">
            <span>View Paper</span>
          </a>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title="Publications - AstraM Lab IITH | Research Papers & Conference Proceedings"
        description="Explore research publications from AstraM Lab IIT Hyderabad."
        keywords="astram lab publications, iith research papers"
        canonical="/publications"
      />
      <Navigation />
      <div className="pt-20">
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-blue-800">Publications</h1>
              <p className="text-xl text-gray-900 max-w-3xl mx-auto">
                Explore our latest research contributions to the field of unmanned systems and autonomous technology.
              </p>
            </div>

            <div className="flex justify-center mb-12">
              <div className="bg-white border border-blue-200 rounded-xl p-2">
                {(['research', 'conference'] as const).map(t => (
                  <button key={t} onClick={() => setActiveTab(t)}
                    className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                      activeTab === t ? 'bg-blue-800 text-white' : 'text-blue-800 hover:bg-blue-50'
                    }`}>
                    {t === 'research' ? 'Research Papers' : 'Conference Papers'}
                  </button>
                ))}
              </div>
            </div>

            <div className="max-w-6xl mx-auto space-y-6">
              <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">
                {activeTab === 'research' ? 'Research Papers' : 'Conference Papers'}
              </h2>
              {list.map(p => <PublicationCard key={p.id} publication={p} />)}
              {list.length === 0 && <p className="text-center text-gray-500">No publications yet.</p>}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Publications;
