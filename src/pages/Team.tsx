import React, { useEffect, useMemo, useState } from 'react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { SEOHead } from '../components/SEOHead';
import { ChevronDown, ChevronUp, Users } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Member {
  id: string; category: string; name: string; role: string | null;
  specialization: string | null; education: string | null; email: string | null;
  linkedin: string | null; image_url: string | null; short_bio: string | null; full_bio: string | null;
}

const CATEGORY_ORDER: { key: string; label: string; accent: string; bg: string }[] = [
  { key: 'phd',           label: 'PhD Students',     accent: 'from-blue-600 to-indigo-600',    bg: 'bg-blue-50/60' },
  { key: 'mtech',         label: 'M.Tech Students',  accent: 'from-emerald-600 to-teal-600',   bg: 'bg-emerald-50/60' },
  { key: 'project_staff', label: 'Project Staff',    accent: 'from-amber-600 to-orange-600',   bg: 'bg-amber-50/60' },
  { key: 'intern',        label: 'Interns',          accent: 'from-fuchsia-600 to-pink-600',   bg: 'bg-fuchsia-50/60' },
  { key: 'btech',         label: 'B.Tech Students',  accent: 'from-cyan-600 to-sky-600',       bg: 'bg-cyan-50/60' },
];

const ALUMNI_TABS: { key: string; label: string; match: (r: string) => boolean }[] = [
  { key: 'all',           label: 'All',             match: () => true },
  { key: 'phd',           label: 'PhD',             match: r => /ph\.?d/.test(r) },
  { key: 'mtech',         label: 'M.Tech',          match: r => /m\.?\s*tech|mtech|masters?/.test(r) },
  { key: 'project_staff', label: 'Project Staff',   match: r => /staff|research\s*associate|ra\b|engineer/.test(r) },
  { key: 'intern',        label: 'Interns',         match: r => /intern/.test(r) },
  { key: 'btech',         label: 'B.Tech',          match: r => /b\.?\s*tech|btech|undergrad/.test(r) },
];

const TeamMemberCard = ({ member }: { member: Member }) => (
  <div className="group bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden h-full flex flex-col">
    {member.image_url ? (
      <div className="w-full h-56 overflow-hidden bg-gray-100">
        <img src={member.image_url} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      </div>
    ) : (
      <div className="w-full h-56 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
        <Users className="w-16 h-16 text-gray-400" />
      </div>
    )}
    <div className="p-5 flex-1 flex flex-col">
      <h3 className="text-lg font-bold text-gray-900 leading-tight">{member.name}</h3>
      {member.role && <p className="text-primary text-sm font-semibold mt-1">{member.role}</p>}
      {member.specialization && <p className="text-gray-600 text-sm mt-1">{member.specialization}</p>}
      <div className="mt-auto pt-3 border-t border-gray-100 space-y-1 text-xs">
        {member.email && (
          <a href={`mailto:${member.email}`} className="block text-blue-600 hover:text-blue-800 truncate">{member.email}</a>
        )}
        {member.linkedin && (
          <a href={member.linkedin.startsWith('http') ? member.linkedin : `https://${member.linkedin}`}
            target="_blank" rel="noopener noreferrer" className="block text-blue-600 hover:text-blue-800">LinkedIn Profile →</a>
        )}
        {member.short_bio && <p className="text-gray-500 mt-2 line-clamp-3">{member.short_bio}</p>}
      </div>
    </div>
  </div>
);

const SectionHeader = ({ label, count, accent }: { label: string; count: number; accent: string }) => (
  <div className="flex items-center gap-4 mb-8">
    <div className={`h-10 w-1.5 rounded-full bg-gradient-to-b ${accent}`} />
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{label}</h2>
    <span className={`inline-flex items-center justify-center min-w-[2rem] h-7 px-2.5 text-sm font-semibold text-white rounded-full bg-gradient-to-r ${accent}`}>
      {count}
    </span>
    <div className="flex-1 h-px bg-gradient-to-r from-gray-200 to-transparent" />
  </div>
);

const Team = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [showFullBio, setShowFullBio] = useState(false);
  const [alumniTab, setAlumniTab] = useState<string>('all');

  useEffect(() => {
    supabase.from('team_members').select('*').order('display_order').then(({ data }) => {
      if (data) setMembers(data as Member[]);
    });
  }, []);

  const pi = members.find(m => m.category === 'pi');
  const alumni = useMemo(() => members.filter(m => m.category === 'alumni'), [members]);
  const groups = CATEGORY_ORDER.map(c => ({ ...c, members: members.filter(m => m.category === c.key) }));

  const alumniCounts = useMemo(() => {
    const map: Record<string, number> = { all: alumni.length };
    for (const tab of ALUMNI_TABS) {
      if (tab.key === 'all') continue;
      map[tab.key] = alumni.filter(a => tab.match(((a.role || '') + ' ' + (a.specialization || '')).toLowerCase())).length;
    }
    return map;
  }, [alumni]);

  const filteredAlumni = useMemo(() => {
    const tab = ALUMNI_TABS.find(t => t.key === alumniTab)!;
    if (tab.key === 'all') return alumni;
    return alumni.filter(a => tab.match(((a.role || '') + ' ' + (a.specialization || '')).toLowerCase()));
  }, [alumni, alumniTab]);

  return (
    <div className="min-h-screen bg-white">
      <SEOHead
        title="Our Team - AstraM Lab IITH"
        description="Meet the team at AstraM Lab IIT Hyderabad."
        keywords="astram lab team, iith team"
        canonical="/team"
      />
      <Navigation />
      <div className="pt-20">
        <section className="section-padding bg-gradient-to-b from-gray-50 to-white">
          <div className="container-width">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-blue-800 mb-4">Our Team</h1>
              <p className="academic-body text-lg max-w-3xl mx-auto">
                Meet the brilliant minds driving innovation in unmanned systems research at AstraM Lab.
              </p>
            </div>

            {pi && (
              <div className="mb-20">
                <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                  <div className="lg:col-span-1">
                    {pi.image_url && (
                      <img src={pi.image_url} alt={pi.name} className="w-full h-96 object-cover rounded-lg shadow-md" />
                    )}
                  </div>
                  <div className="lg:col-span-2 flex flex-col justify-start">
                    <div className="border border-blue-200 rounded-lg p-8 shadow-sm hover:shadow-md transition-all duration-300 bg-slate-50">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{pi.name}</h3>
                      {pi.role && <p className="text-primary font-semibold mb-2">{pi.role}</p>}
                      {pi.specialization && <p className="text-gray-600 font-medium mb-4">{pi.specialization}</p>}
                      <div className="border-t border-gray-200 pt-4">
                        <div className="text-gray-500 text-sm leading-relaxed">
                          {pi.short_bio && <p className="mt-2 text-gray-900"><span className="font-bold text-black">{pi.name}</span> {pi.short_bio.replace(new RegExp(`^${pi.name}\\s*`), '')}</p>}
                          {showFullBio && pi.full_bio && <p className="mt-3 text-gray-900">{pi.full_bio}</p>}
                          {pi.full_bio && (
                            <button onClick={() => setShowFullBio(!showFullBio)} className="flex items-center gap-2 mt-4 text-primary hover:text-primary/80 font-medium transition-colors duration-200">
                              {showFullBio ? 'Read Less' : 'Read More'}
                              {showFullBio ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {groups.map(group => group.members.length > 0 && (
              <section key={group.key} className={`mb-12 rounded-2xl ${group.bg} border border-gray-100 p-6 md:p-8`}>
                <SectionHeader label={group.label} count={group.members.length} accent={group.accent} />
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {group.members.map(m => <TeamMemberCard key={m.id} member={m} />)}
                </div>
              </section>
            ))}

            {alumni.length > 0 && (
              <section className="mt-16 rounded-2xl bg-gradient-to-br from-slate-50 to-gray-100 border border-gray-200 p-6 md:p-8">
                <SectionHeader label="Alumni" count={alumni.length} accent="from-slate-700 to-gray-900" />

                <div className="flex flex-wrap gap-2 mb-8 overflow-x-auto">
                  {ALUMNI_TABS.map(tab => {
                    const active = alumniTab === tab.key;
                    const count = alumniCounts[tab.key] ?? 0;
                    return (
                      <button
                        key={tab.key}
                        onClick={() => setAlumniTab(tab.key)}
                        className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 border ${
                          active
                            ? 'bg-slate-900 text-white border-slate-900 shadow-md'
                            : 'bg-white text-gray-700 border-gray-200 hover:border-slate-400 hover:text-slate-900'
                        }`}
                      >
                        {tab.label}
                        <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${active ? 'bg-white/20' : 'bg-gray-100'}`}>{count}</span>
                      </button>
                    );
                  })}
                </div>

                {filteredAlumni.length > 0 ? (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredAlumni.map(m => <TeamMemberCard key={m.id} member={m} />)}
                  </div>
                ) : (
                  <p className="text-center text-gray-500 py-12">No alumni in this category yet.</p>
                )}
              </section>
            )}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Team;
