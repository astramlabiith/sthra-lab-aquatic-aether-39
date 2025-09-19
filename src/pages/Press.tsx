
import React from 'react';
import { Navigation } from '../components/Navigation';

const Press = () => {
  const pressReleases = [
    {
      title: "ASTHRA Lab Receives $2.5M Grant for Revolutionary Underwater AI Research",
      date: "March 15, 2024",
      source: "University News",
      excerpt: "The National Science Foundation awarded ASTHRA Lab a major grant to develop next-generation AI navigation systems for autonomous underwater vehicles.",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=800&q=80",
      category: "Funding"
    },
    {
      title: "Breakthrough in Hybrid Aerial-Aquatic Vehicle Technology",
      date: "February 28, 2024",
      source: "Tech Innovation Today",
      excerpt: "ASTHRA Lab unveils groundbreaking hybrid platform capable of seamless transitions between air and underwater operations.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=800&q=80",
      category: "Innovation"
    },
    {
      title: "AI-Powered Ocean Exploration: The Future is Now",
      date: "January 12, 2024",
      source: "Marine Technology Review",
      excerpt: "Dr. Sarah Chen and her team at ASTHRA Lab are revolutionizing ocean exploration with cutting-edge autonomous systems.",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?auto=format&fit=crop&w=800&q=80",
      category: "Research"
    },
    {
      title: "ASTHRA Lab Partners with Leading Marine Research Institute",
      date: "December 8, 2023",
      source: "Research Collaboration News",
      excerpt: "Strategic partnership will accelerate development of sustainable marine robotics technologies.",
      image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?auto=format&fit=crop&w=800&q=80",
      category: "Partnership"
    }
  ];

  const mediaKit = [
    {
      type: "High-Resolution Lab Photos",
      description: "Professional photos of our laboratory facilities and equipment",
      format: "JPG/PNG"
    },
    {
      type: "Team Member Headshots",
      description: "Professional headshots of all team members",
      format: "JPG/PNG"
    },
    {
      type: "Logo Package",
      description: "ASTHRA Lab logos in various formats and orientations",
      format: "SVG/PNG/EPS"
    },
    {
      type: "Research Videos",
      description: "Demonstration videos of our autonomous systems in action",
      format: "MP4/MOV"
    }
  ];

  return (
    <div className="min-h-screen bg-navy-950 text-white">
      <Navigation />
      <div className="pt-20">
        <section className="py-20 bg-gradient-to-b from-navy-950 to-navy-900">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-ocean-300 bg-clip-text text-transparent">
                Press & Media
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Stay updated with the latest news, breakthroughs, and media coverage of ASTHRA Lab's research and innovations.
              </p>
            </div>

            {/* Press Releases Section */}
            <div className="mb-20">
              <h2 className="text-3xl font-bold text-cyan-400 mb-8 text-center">Latest Press Releases</h2>
              <div className="grid md:grid-cols-2 gap-8">
                {pressReleases.map((item, index) => (
                  <div 
                    key={index}
                    className="group bg-gradient-to-br from-navy-800/50 to-navy-900/50 backdrop-blur-sm border border-cyan-500/20 rounded-2xl overflow-hidden hover:border-cyan-400/40 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/10"
                  >
                    <div className="relative overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 to-transparent"></div>
                      <div className="absolute top-4 right-4">
                        <span className="bg-cyan-400 text-navy-950 px-3 py-1 rounded-full text-xs font-medium">
                          {item.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
                        <span>{item.date}</span>
                        <span>{item.source}</span>
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-gray-300 mb-4 leading-relaxed">
                        {item.excerpt}
                      </p>
                      <button className="bg-gradient-ocean text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg hover:shadow-cyan-500/25 transition-all duration-300">
                        Read More
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Media Kit Section */}
            <div className="bg-gradient-to-r from-navy-800/30 to-navy-900/30 backdrop-blur-sm border border-cyan-500/20 rounded-2xl p-8">
              <h2 className="text-3xl font-bold text-cyan-400 mb-8 text-center">Media Kit</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {mediaKit.map((item, index) => (
                  <div 
                    key={index}
                    className="bg-navy-800/50 border border-cyan-500/20 rounded-xl p-6 hover:border-cyan-400/40 transition-all duration-300 hover:scale-105"
                  >
                    <h3 className="text-lg font-bold text-white mb-3">{item.type}</h3>
                    <p className="text-gray-300 text-sm mb-3">{item.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-cyan-400 text-xs font-medium">{item.format}</span>
                      <button className="text-cyan-400 hover:text-white transition-colors duration-300 text-sm font-medium">
                        Download
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Information */}
            <div className="text-center mt-16">
              <h2 className="text-2xl font-bold text-white mb-6">Media Inquiries</h2>
              <div className="bg-navy-800/50 border border-cyan-500/20 rounded-xl p-6 max-w-2xl mx-auto">
                <p className="text-gray-300 mb-4">
                  For media inquiries, interview requests, or additional information about ASTHRA Lab's research:
                </p>
                <div className="space-y-2">
                  <p className="text-cyan-400 font-medium">Dr. Sarah Chen, Principal Investigator</p>
                  <p className="text-gray-300">Email: media@asthralab.edu</p>
                  <p className="text-gray-300">Phone: +1 (555) 123-4567</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Press;
