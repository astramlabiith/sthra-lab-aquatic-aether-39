import React, { useState } from 'react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { SEOHead } from '../components/SEOHead';
import { FileText, Download } from 'lucide-react';

const Publications = () => {
  const [activeTab, setActiveTab] = useState('research');

  const researchPapers = [
    {
      title: "Validation and verification of a planing craft motion prediction model based on experiments conducted on full-size crafts operating in real sea",
      authors: "H Allaka, M Groper",
      venue: "Journal of Marine Science and Technology",
      year: "2020",
      abstract: "This paper focuses on the validation and testing of a computational model for assessing the motion of planing crafts in a seaway. The study aims to improve the design and operability of these crafts by accurately predicting their accelerations and motions.",
      doi: "Journal of Marine Science and Technology",
      pdfLink: "https://link.springer.com/article/10.1007/s00773-020-00709-6"
    },
    {
      title: "Mitigation of vertical motion in planing crafts for enhanced operationability in seaways using passive energy absorbers–A test of concept",
      authors: "H Allaka, M Farid, M Groper",
      venue: "Ocean Engineering",
      year: "2022",
      abstract: "This research investigates the use of a tuned mass damper (TMD), a type of linear passive energy absorber, to reduce the vertical motion of planing crafts in rough seas. The study found that while the TMD was effective in specific conditions, its overall practicality is limited.",
      doi: "Ocean Engineering",
      pdfLink: "https://www.sciencedirect.com/science/article/pii/S0029801822017188"
    },
    {
      title: "A Real Time Speed Modulation System to Improve Operational Ability of Autonomous Planing Craft in a Seaway",
      authors: "H Allaka, A Levy, D Levy, T Treibitz, M Groper",
      venue: "International Journal of Maritime Engineering",
      year: "2020",
      abstract: "This study focuses on developing a control system to enhance the seaworthiness of autonomous high-speed planing crafts (APCs). The system aims to mitigate the high vertical accelerations experienced by APCs at high speeds in a seaway, which pose a hazard to the payload and the craft's structural integrity.",
      doi: "International Journal of Maritime Engineering",
      pdfLink: "https://www.intmaritimeengineering.org/index.php/ijme/article/view/1145"
    },
    {
      title: "Speed–wave height operational envelope for high-speed planing craft in seaways: theoretical vs. empirical methods",
      authors: "H Allaka, M Groper",
      venue: "Ship Technology Research",
      year: "2021",
      abstract: "This paper compares a nonlinear time-domain approach (MAPCS tool) with existing experimental and empirical formulas for determining the operational limits of high-speed planing crafts. The study finds that the MAPCS approach provides more realistic estimations of vertical accelerations and speed vs. wave height limits.",
      doi: "Ship Technology Research",
      pdfLink: "https://www.tandfonline.com/doi/full/10.1080/09377255.2021.1973263"
    }
  ];

  const conferencePapers = [
    {
      title: "Estimating sea state using a low cost buoy",
      authors: "S Farber, H Allaka, I Klein, M Groper",
      venue: "IEEE Conference",
      year: "2018",
      abstract: "This paper, presented at an IEEE conference, discusses a method for determining sea conditions using an affordable buoy. This information is crucial for the safe and efficient operation of marine vessels.",
      doi: "IEEE Conference Proceedings",
      pdfLink: "https://ieeexplore.ieee.org/abstract/document/8646100"
    },
    {
      title: "Vision-aided speed modulation system to enhance seaworthiness of autonomous planing crafts",
      authors: "H Allaka, D Levy, T Treibitz, M Groper",
      venue: "IEEE Conference",
      year: "2018",
      abstract: "This paper presents a system that uses vision to adjust the speed of autonomous planing crafts. The goal is to improve their stability and performance in various sea conditions.",
      doi: "IEEE Conference Proceedings",
      pdfLink: "https://ieeexplore.ieee.org/abstract/document/8555758"
    }
  ];

  const PublicationCard = ({ publication }) => (
    <div className="bg-white border border-blue-200 rounded-lg p-6 hover:border-blue-300 transition-all duration-300 hover:shadow-md">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-blue-800 mb-2 hover:text-blue-900 transition-colors duration-300 cursor-pointer">
            {publication.title}
          </h3>
          <p className="text-blue-700 font-medium mb-2">{publication.authors}</p>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-900 mb-3">
            <span className="bg-blue-50 text-blue-800 px-3 py-1 rounded-full border border-blue-200">
              {publication.venue}
            </span>
            <span className="text-blue-800 font-medium">{publication.year}</span>
          </div>
        </div>
        <div className="flex items-center space-x-2 ml-4">
          <FileText className="w-5 h-5 text-blue-800" />
        </div>
      </div>
      
      <p className="text-gray-900 mb-4 leading-relaxed">
        {publication.abstract}
      </p>
      
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600">DOI: {publication.doi}</span>
        <a 
          href={publication.pdfLink} 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center space-x-2 bg-blue-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-900 transition-all duration-300"
        >
          <span>View Paper</span>
        </a>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      <SEOHead 
        title="Publications - AstraM Lab IITH | Research Papers & Conference Proceedings"
        description="Explore research publications from AstraM Lab IIT Hyderabad: journal papers, conference proceedings, patents in autonomous systems, UAV, AUV, ROV technology, and robotics research."
        keywords="astram lab publications, iith research papers, autonomous systems papers, uav auv research papers, robotics publications, marine technology research, control systems papers, astram iith publications"
        canonical="/publications"
      />
      <Navigation />
      <div className="pt-20">
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-blue-800">
                Publications
              </h1>
              <p className="text-xl text-gray-900 max-w-3xl mx-auto">
                Explore our latest research contributions to the field of unmanned systems and autonomous technology.
              </p>
            </div>

            {/* Tab Navigation */}
            <div className="flex justify-center mb-12">
              <div className="bg-white border border-blue-200 rounded-xl p-2">
                <button
                  onClick={() => setActiveTab('research')}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                    activeTab === 'research'
                      ? 'bg-blue-800 text-white'
                      : 'text-blue-800 hover:bg-blue-50'
                  }`}
                >
                  Research Papers
                </button>
                <button
                  onClick={() => setActiveTab('conference')}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                    activeTab === 'conference'
                      ? 'bg-blue-800 text-white'
                      : 'text-blue-800 hover:bg-blue-50'
                  }`}
                >
                  Conference Papers
                </button>
              </div>
            </div>

            {/* Publications List */}
            <div className="max-w-6xl mx-auto space-y-6">
              {activeTab === 'research' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">Research Papers</h2>
                  {researchPapers.map((paper, index) => (
                    <PublicationCard key={index} publication={paper} />
                  ))}
                </div>
              )}

              {activeTab === 'conference' && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-blue-800 mb-6 text-center">Conference Papers</h2>
                  {conferencePapers.map((paper, index) => (
                    <PublicationCard key={index} publication={paper} />
                  ))}
                </div>
              )}
            </div>

          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Publications;
