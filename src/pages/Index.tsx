
import React from 'react';
import { Navigation } from '../components/Navigation';
import { HeroSection } from '../components/HeroSection';
import { MissionSection } from '../components/MissionSection';
import { LabInfoSection } from '../components/LabInfoSection';
import { ResearchInterestsSection } from '../components/ResearchInterestsSection';
import { OngoingProjectsSection } from '../components/OngoingProjectsSection';
import { Footer } from '../components/Footer';
import { SEOHead } from '../components/SEOHead';

const Index = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <SEOHead 
        title="AstraM Lab IITH - Autonomous Systems Technology Research at IIT Hyderabad"
        description="AstraM Lab at IIT Hyderabad (IITH) - Leading research in autonomous systems, UAVs, AUVs, ROVs, USVs, GNSS navigation, control systems, and robotics technology. Astram Lab IITH pioneers unmanned vehicle innovations."
        keywords="iith, astram lab, astram, astram iith, astram lab iith, IIT Hyderabad, autonomous systems, UAV, AUV, ROV, USV, robotics research, unmanned vehicles, GNSS navigation, control systems, drone technology, underwater robotics, autonomous navigation, robotics lab, research lab iith"
        canonical="/"
      />
      <Navigation />
      <HeroSection />
      <MissionSection />
      <LabInfoSection />
      <ResearchInterestsSection />
      <OngoingProjectsSection />
      <Footer />
    </div>
  );
};

export default Index;
