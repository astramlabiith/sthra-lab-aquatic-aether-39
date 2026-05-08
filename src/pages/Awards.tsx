import React, { useEffect, useState } from 'react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { Award, Trophy, Medal, Star, GraduationCap, User, FlaskConical } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

const ICON_MAP: Record<string, any> = { Trophy, Medal, Award, Star, GraduationCap };

interface AwardRow {
  id: string; kind: 'pi' | 'lab'; year: string; award: string;
  recipient: string; organization: string | null; description: string | null; icon: string;
}

const Awards = () => {
  const [items, setItems] = useState<AwardRow[]>([]);
  const [activeTab, setActiveTab] = useState<'pi' | 'lab'>('pi');

  useEffect(() => {
    supabase.from('awards').select('*').order('display_order').then(({ data }) => {
      if (data) setItems(data as AwardRow[]);
    });
  }, []);

  const tabs = [
    { id: 'pi' as const, name: 'Principal Investigator', icon: User },
    { id: 'lab' as const, name: 'Lab Awards & Recognitions', icon: FlaskConical },
  ];

  const currentAwards = items.filter(a => a.kind === activeTab);

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="pt-20">
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-blue-800">Awards & Recognition</h1>
              <p className="text-xl text-gray-900 max-w-3xl mx-auto">
                Celebrating our achievements and recognition in the field of unmanned systems research.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {tabs.map(tab => {
                const Icon = tab.icon;
                return (
                  <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                      activeTab === tab.id ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}>
                    <Icon className="w-4 h-4" />
                    <span>{tab.name}</span>
                  </button>
                );
              })}
            </div>

            <div className="max-w-4xl mx-auto">
              <div className="relative">
                <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-blue-800"></div>
                <div className="space-y-8">
                  {currentAwards.map(award => {
                    const IconComponent = ICON_MAP[award.icon] || Trophy;
                    return (
                      <div key={award.id} className="relative flex items-start">
                        <div className="absolute left-0 top-2 w-4 h-4 bg-blue-800 rounded-full border-4 border-white z-10"></div>
                        <div className="ml-8 flex items-start w-full">
                          <div className="bg-blue-800 text-white font-bold px-4 py-2 rounded-lg mr-6 min-w-[80px] text-center">
                            {award.year}
                          </div>
                          <div className="flex-1 bg-white border border-blue-200 rounded-2xl p-6 hover:border-blue-300 transition-all duration-300 hover:shadow-md">
                            <div className="flex items-start">
                              <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-50 border border-blue-200 mr-4 flex-shrink-0">
                                <IconComponent className="w-6 h-6 text-blue-800" />
                              </div>
                              <div className="flex-1">
                                <h3 className="text-xl font-bold text-blue-800 mb-2">{award.award}</h3>
                                <p className="text-blue-700 font-medium mb-2">{award.recipient}</p>
                                {award.organization && <p className="text-gray-900 text-sm mb-3">{award.organization}</p>}
                                {award.description && <p className="text-gray-900 leading-relaxed">{award.description}</p>}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  {currentAwards.length === 0 && <p className="text-center text-gray-500">No awards yet.</p>}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Awards;
