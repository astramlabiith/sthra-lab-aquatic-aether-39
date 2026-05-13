import React, { useEffect, useState } from 'react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { SEOHead } from '../components/SEOHead';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';


interface Member {
  id: string; category: string; name: string; role: string | null;
  specialization: string | null; education: string | null; email: string | null;
  linkedin: string | null; image_url: string | null; short_bio: string | null; full_bio: string | null;
}

const CATEGORY_ORDER: { key: string; label: string }[] = [
  { key: 'phd', label: "PhD Students" },
  { key: 'mtech', label: "M.Tech Students" },
  { key: 'project_staff', label: 'Project Staff' },
  { key: 'intern', label: 'Interns' },
  { key: 'btech', label: 'B.Tech Students' },
];

const TeamMemberCard = ({ member }: { member: Member }) => (
  <div className="academic-card p-6 hover:scale-105 transition-transform duration-200 h-full">
    {member.image_url && (
      <div className="mb-4">
        <img src={member.image_url} alt={member.name} className="w-full h-64 object-cover rounded-lg" />
      </div>
    )}
    <div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
      {member.role && <p className="text-primary font-semibold mb-2">{member.role}</p>}
      {member.specialization && <p className="text-gray-600 font-medium mb-3">{member.specialization}</p>}
      <div className="border-t border-gray-200 pt-3">
        {member.email && (
          <p className="text-gray-500 text-sm mb-2">
            <span className="font-medium text-gray-700">Email:</span>
            <a href={`mailto:${member.email}`} className="text-blue-600 hover:text-blue-800 ml-1">{member.email}</a>
          </p>
        )}
        {member.linkedin && (
          <p className="text-gray-500 text-sm mb-2">
            <span className="font-medium text-gray-700">LinkedIn:</span>
            <a href={member.linkedin.startsWith('http') ? member.linkedin : `https://${member.linkedin}`}
              target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 ml-1">View Profile</a>
          </p>
        )}
        {member.short_bio && (
          <div className="text-gray-500 text-sm leading-relaxed">
            <span className="font-medium text-gray-700">About:</span>
            <p className="mt-1">{member.short_bio}</p>
          </div>
        )}
      </div>
    </div>
  </div>
);

const Team = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [showFullBio, setShowFullBio] = useState(false);

  useEffect(() => {
    supabase.from('team_members').select('*').order('display_order').then(({ data }) => {
      if (data) setMembers(data as Member[]);
    });
  }, []);

  const pi = members.find(m => m.category === 'pi');
  const alumni = members.filter(m => m.category === 'alumni');
  const groups = CATEGORY_ORDER.map(c => ({ ...c, members: members.filter(m => m.category === c.key) }));

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
              <div className="mb-16">
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
              <div key={group.key} className="mb-16">
                <h2 className="academic-subheading text-center mb-8">{group.label}</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {group.members.map(m => <TeamMemberCard key={m.id} member={m} />)}
                </div>
              </div>
            ))}

            {alumni.length > 0 && (
              <div className="mb-16">
                <h2 className="academic-subheading text-center mb-8">Alumni</h2>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {alumni.map(m => <TeamMemberCard key={m.id} member={m} />)}
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Team;
