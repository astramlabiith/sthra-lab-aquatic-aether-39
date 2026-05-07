import React, { useState } from 'react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { Award, Trophy, Medal, Star, GraduationCap, User, FlaskConical } from 'lucide-react';

type AwardItem = {
  year: string;
  award: string;
  recipient: string;
  organization: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
};

const Awards = () => {
  const [activeCategory, setActiveCategory] = useState<'pi' | 'lab'>('pi');

  const piAwards: AwardItem[] = [
    {
      year: "2021",
      award: "Royal Institute of Naval Architecture - Institution's Calder Prize",
      recipient: "Dr. Himabindu Allaka",
      organization: "Royal Institute of Naval Architecture (RINA), UK",
      description: "Recognized for the best research in the field of naval architecture and marine engineering.",
      icon: Trophy,
    },
    {
      year: "2021",
      award: "Royal Institute of Naval Architecture - Institution's Medal",
      recipient: "Dr. Himabindu Allaka",
      organization: "Royal Institute of Naval Architecture (RINA), UK",
      description: "Awarded for exceptional contributions to naval architecture and marine technology research.",
      icon: Medal,
    },
    {
      year: "2019",
      award: "Mediterranean Sea Research Center of Israel Scholarship",
      recipient: "Dr. Himabindu Allaka",
      organization: "Mediterranean Sea Research Center of Israel",
      description: "Scholarship awarded for outstanding research contributions in marine science and technology.",
      icon: Award,
    },
    {
      year: "2018",
      award: "Summa Cum Laude",
      recipient: "Dr. Himabindu Allaka",
      organization: "Technion – Israel Institute of Technology",
      description: "Awarded for exceptional academic performance and research excellence in Master's degree.",
      icon: GraduationCap,
    },
    {
      year: "2015-2017",
      award: "Hatter Maurice Scholarship",
      recipient: "Dr. Himabindu Allaka",
      organization: "Hatter Department of Marine Technologies",
      description: "Multi-year scholarship for outstanding research in marine technologies and engineering.",
      icon: Award,
    },
    {
      year: "2016 & 2017",
      award: "Yoel Carasso Scholarship",
      recipient: "Dr. Himabindu Allaka",
      organization: "Academic Institution",
      description: "Awarded for exceptional academic performance and research contributions.",
      icon: Star,
    },
    {
      year: "2013-2014",
      award: "Lady Davis Fellowship",
      recipient: "Dr. Himabindu Allaka",
      organization: "Lady Davis Fellowship Trust",
      description: "Prestigious fellowship awarded for outstanding research potential and academic excellence.",
      icon: Trophy,
    },
    {
      year: "2004",
      award: "Selected in All India School Entrance (Jawahar Navodaya Vidyalaya)",
      recipient: "Dr. Himabindu Allaka",
      organization: "Jawahar Navodaya Vidyalaya",
      description: "Selected through competitive national entrance examination for admission to prestigious school system.",
      icon: GraduationCap,
    }
  ];

  const labAwards: AwardItem[] = [
    {
      year: "2026",
      award: "Best Poster of the Conference",
      recipient: "Vuppu Venkata Sai Viswa Kiran, Akkala Sainath Reddy, H. Vishal Sri Sai, Dr. Himabindu Allaka, Dr. R Prasanth Kumar",
      organization: "IEEE APSCON 2026",
      description: "Recognized as the Best Poster among all international submissions at the IEEE Applied Sensing Conference (APSCON).",
      icon: Trophy,
    },
    {
      year: "2026",
      award: "Best Project of the Course – Military & Institutional Honors",
      recipient: "Astram Lab & MCEME Team",
      organization: "Military College of Electrical and Mechanical Engineering (MCEME)",
      description: "The collaborative project, \"USV for Maritime Surveillance and Situational Awareness,\" was distinguished as the Best Project of the course. The honor was formally presented by the Lt. General of MCEME for excellence in unmanned surface vehicle development and tactical application.",
      icon: Medal,
    },
    {
      year: "2025",
      award: "Special Mention Award",
      recipient: "Sainath Reddy Akkala, H. Vishal Sri Sai, Dr. Himabindu Allaka",
      organization: "International Knowledge Millennium Conference (IKMC)",
      description: "Awarded at the International Knowledge Millennium Conference (IKMC) for the project \"Mrinal,\" cited as a premier innovation in enhancing strategic autonomy through advanced engineering.",
      icon: Star,
    },
  ];

  const categories = [
    { id: 'pi' as const, name: 'Principal Investigator', icon: User },
    { id: 'lab' as const, name: 'Lab Awards & Recognitions', icon: FlaskConical },
  ];

  const awards = activeCategory === 'pi' ? piAwards : labAwards;

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="pt-20">
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-blue-800">
                Awards & Recognition
              </h1>
              <p className="text-xl text-gray-900 max-w-3xl mx-auto">
                Celebrating our achievements and recognition in the field of unmanned systems research.
              </p>
            </div>

            {/* Category Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {categories.map((category) => {
                const IconComponent = category.icon;
                const isActive = activeCategory === category.id;
                return (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                      isActive
                        ? 'bg-blue-800 text-white'
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{category.name}</span>
                  </button>
                );
              })}
            </div>

            {/* Timeline Layout */}
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-blue-800"></div>

                <div className="space-y-8">
                  {awards.map((award, index) => {
                    const IconComponent = award.icon;
                    return (
                      <div key={index} className="relative flex items-start">
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
                                <h3 className="text-xl font-bold text-blue-800 mb-2 hover:text-blue-900 transition-colors duration-300">
                                  {award.award}
                                </h3>
                                <p className="text-blue-700 font-medium mb-2">{award.recipient}</p>
                                <p className="text-gray-900 text-sm mb-3">{award.organization}</p>
                                <p className="text-gray-900 leading-relaxed">{award.description}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
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
