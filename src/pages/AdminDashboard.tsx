import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LogOut, Image, BookText, Trophy, Users, GraduationCap, Layers, Sparkles, Briefcase } from 'lucide-react';
import { PublicationsAdmin } from '@/components/admin/PublicationsAdmin';
import { AwardsAdmin } from '@/components/admin/AwardsAdmin';
import { TeamAdmin } from '@/components/admin/TeamAdmin';
import { CoursesAdmin } from '@/components/admin/CoursesAdmin';
import { ProjectsAdmin } from '@/components/admin/ProjectsAdmin';
import { HeroSlidesAdmin } from '@/components/admin/HeroSlidesAdmin';
import { CareersAdmin } from '@/components/admin/CareersAdmin';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!session) navigate('/admin');
      else setUserId(session.user.id);
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) navigate('/admin');
      else setUserId(session.user.id);
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin');
  };

  if (!userId) return null;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Navigation />
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" /> Logout
            </Button>
          </div>

          <Tabs defaultValue="team" className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 w-full mb-8 h-auto">
              <TabsTrigger value="team" className="flex gap-2 py-3"><Users className="h-4 w-4" />Team</TabsTrigger>
              <TabsTrigger value="projects" className="flex gap-2 py-3"><Layers className="h-4 w-4" />Projects</TabsTrigger>
              <TabsTrigger value="hero" className="flex gap-2 py-3"><Sparkles className="h-4 w-4" />Hero Slides</TabsTrigger>
              <TabsTrigger value="publications" className="flex gap-2 py-3"><BookText className="h-4 w-4" />Publications</TabsTrigger>
              <TabsTrigger value="awards" className="flex gap-2 py-3"><Trophy className="h-4 w-4" />Awards</TabsTrigger>
              <TabsTrigger value="courses" className="flex gap-2 py-3"><GraduationCap className="h-4 w-4" />Courses & Grants</TabsTrigger>
              <TabsTrigger value="careers" className="flex gap-2 py-3"><Briefcase className="h-4 w-4" />Careers</TabsTrigger>
              <TabsTrigger value="gallery" className="flex gap-2 py-3" onClick={() => navigate('/admin/gallery')}>
                <Image className="h-4 w-4" />Gallery
              </TabsTrigger>
            </TabsList>
            <TabsContent value="team"><TeamAdmin userId={userId} /></TabsContent>
            <TabsContent value="projects"><ProjectsAdmin userId={userId} /></TabsContent>
            <TabsContent value="hero"><HeroSlidesAdmin userId={userId} /></TabsContent>
            <TabsContent value="publications"><PublicationsAdmin /></TabsContent>
            <TabsContent value="awards"><AwardsAdmin /></TabsContent>
            <TabsContent value="courses"><CoursesAdmin /></TabsContent>
            <TabsContent value="careers"><CareersAdmin /></TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
