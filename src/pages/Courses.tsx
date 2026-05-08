import React, { useEffect, useState } from 'react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { BookOpen, Award, Users, Calendar } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface Course { id: string; kind: 'current' | 'upcoming'; title: string; semester: string | null; instructor: string | null; description: string | null; }
interface Grant { id: string; title: string; grant_type: string | null; duration: string | null; institution: string | null; description: string | null; }

const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [grants, setGrants] = useState<Grant[]>([]);

  useEffect(() => {
    supabase.from('courses').select('*').order('display_order').then(({ data }) => { if (data) setCourses(data as Course[]); });
    supabase.from('research_grants').select('*').order('display_order').then(({ data }) => { if (data) setGrants(data as Grant[]); });
  }, []);

  const currentCourses = courses.filter(c => c.kind === 'current');
  const upcomingCourses = courses.filter(c => c.kind === 'upcoming');

  const CourseCard = ({ course, accent }: { course: Course; accent?: boolean }) => (
    <div className={`academic-card p-6 hover:scale-105 transition-transform duration-200 ${accent ? 'border-l-4 border-orange-500' : ''}`}>
      <div className="flex items-center mb-4">
        <BookOpen className="text-blue-800 mr-3" size={24} />
        <h3 className="text-xl font-bold text-gray-900">{course.title}</h3>
      </div>
      {course.instructor && <p className="text-primary font-semibold mb-3">{course.instructor}</p>}
      {course.semester && <p className="text-gray-600 mb-3 font-medium">{course.semester}</p>}
      {course.description && <p className="academic-body mb-6">{course.description}</p>}
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="pt-20">
        <section className="section-padding bg-gradient-to-b from-gray-50 to-white">
          <div className="container-width">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-blue-800 mb-4">Courses & Research Grants</h1>
              <p className="academic-body text-lg max-w-4xl mx-auto">
                Explore our comprehensive curriculum and ongoing research initiatives that advance knowledge in autonomous systems, robotics, and marine technology.
              </p>
            </div>

            {currentCourses.length > 0 && (
              <div className="mb-16">
                <h2 className="academic-subheading text-center mb-8 flex items-center justify-center">
                  <Calendar className="mr-3 text-blue-800" size={28} />
                  Current Courses
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  {currentCourses.map(c => <CourseCard key={c.id} course={c} />)}
                </div>
              </div>
            )}

            {upcomingCourses.length > 0 && (
              <div className="mb-16">
                <h2 className="academic-subheading text-center mb-8 flex items-center justify-center">
                  <Calendar className="mr-3 text-blue-800" size={28} />
                  Upcoming Courses
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  {upcomingCourses.map(c => <CourseCard key={c.id} course={c} accent />)}
                </div>
              </div>
            )}

            <div>
              <h2 className="academic-subheading text-center mb-8 flex items-center justify-center">
                <Award className="mr-3 text-blue-800" size={28} />
                Research Grants
              </h2>
              <div className="space-y-8">
                {grants.map(grant => (
                  <div key={grant.id} className="academic-card p-8 hover:scale-105 transition-transform duration-200">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-3">{grant.title}</h3>
                        <div className="flex flex-wrap items-center gap-4 text-sm mb-4">
                          {grant.grant_type && <span className="bg-blue-50 text-blue-800 px-3 py-1 rounded-full border border-blue-200 font-medium">{grant.grant_type}</span>}
                          {grant.duration && <span className="text-gray-600"><strong>Duration:</strong> {grant.duration}</span>}
                          {grant.institution && <span className="text-gray-600"><strong>Institution:</strong> {grant.institution}</span>}
                        </div>
                      </div>
                      <Award className="text-blue-800 flex-shrink-0 ml-4" size={24} />
                    </div>
                    {grant.description && <p className="academic-body leading-relaxed">{grant.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Courses;
