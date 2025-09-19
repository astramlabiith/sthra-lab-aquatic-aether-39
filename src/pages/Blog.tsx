
import React from 'react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { Calendar, User, ArrowRight, ExternalLink } from 'lucide-react';
const Blog = () => {
  const blogPosts = [{
    title: "Advancing Autonomous Underwater Vehicle Technology",
    excerpt: "Exploring the latest developments in AUV navigation systems and their applications in marine research and environmental monitoring.",
    author: "Dr. Himabindu Allaka",
    date: "December 15, 2024",
    category: "Research",
    readTime: "5 min read",
    featured: true
  }, {
    title: "Machine Learning Applications in Marine Robotics",
    excerpt: "How artificial intelligence is revolutionizing underwater exploration and autonomous decision-making in challenging marine environments.",
    author: "Dr. Himabindu Allaka",
    date: "November 28, 2024",
    category: "Technology",
    readTime: "7 min read",
    featured: false
  }, {
    title: "GNSS Integration for Precision Navigation",
    excerpt: "Latest advancements in Global Navigation Satellite Systems for enhanced positioning accuracy in unmanned surface vehicles.",
    author: "Research Team",
    date: "November 10, 2024",
    category: "Innovation",
    readTime: "4 min read",
    featured: false
  }, {
    title: "Collaborative Robotics in Underwater Environments",
    excerpt: "Developing multi-robot systems for coordinated underwater missions and their potential impact on ocean exploration.",
    author: "Dr. Himabindu Allaka",
    date: "October 22, 2024",
    category: "Research",
    readTime: "6 min read",
    featured: false
  }, {
    title: "Sustainable Technologies in Marine Systems",
    excerpt: "Exploring eco-friendly approaches to underwater robotics and their contribution to marine conservation efforts.",
    author: "Research Team",
    date: "October 5, 2024",
    category: "Sustainability",
    readTime: "5 min read",
    featured: false
  }, {
    title: "Future of Autonomous Systems in Space Exploration",
    excerpt: "How technologies developed for marine environments are being adapted for planetary exploration missions.",
    author: "Dr. Himabindu Allaka",
    date: "September 18, 2024",
    category: "Space Tech",
    readTime: "8 min read",
    featured: false
  }];
  const categories = ["All", "Research", "Technology", "Innovation", "Sustainability", "Space Tech"];
  return <div className="min-h-screen bg-white">
      <Navigation />
      <div className="pt-20">
        <section className="section-padding bg-gradient-to-b from-gray-50 to-white">
          <div className="container-width">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold text-blue-800 mb-4">
                AstraM Lab Blog
              </h1>
              <p className="academic-body text-lg max-w-4xl mx-auto">
                Stay updated with the latest research insights, technological breakthroughs, and academic developments from our laboratory.
              </p>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-12">
              {categories.map((category, index) => <button key={index} className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${index === 0 ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
                  {category}
                </button>)}
            </div>

            {/* Featured Post */}
            {blogPosts.filter(post => post.featured).map((post, index) => <div key={index} className="academic-card p-8 mb-12 border-l-4 border-primary">
                <div className="flex items-center space-x-2 mb-4">
                  <span className="bg-primary text-white px-3 py-1 rounded-full text-xs font-medium">
                    Featured
                  </span>
                  <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs">
                    {post.category}
                  </span>
                </div>
                
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-blue-800">
                  {post.title}
                </h2>
                
                <p className="academic-body text-lg mb-6">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <User size={16} />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar size={16} />
                      <span>{post.date}</span>
                    </div>
                    <span>{post.readTime}</span>
                  </div>
                  
                  <button className="academic-button-primary flex items-center space-x-2">
                    <span>Read More</span>
                    <ArrowRight size={16} />
                  </button>
                </div>
              </div>)}

            {/* Blog Posts Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.filter(post => !post.featured).map((post, index) => <div key={index} className="academic-card p-6 hover:scale-105 transition-transform duration-200">
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs">
                      {post.category}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {post.title}
                  </h3>
                  
                  <p className="academic-body mb-4">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-1">
                      <User size={14} />
                      <span>{post.author}</span>
                    </div>
                    <span>{post.readTime}</span>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                    <div className="flex items-center space-x-1">
                      <Calendar size={14} />
                      <span>{post.date}</span>
                    </div>
                  </div>
                  
                  <button className="academic-button-secondary w-full flex items-center justify-center space-x-2">
                    <span>Read Article</span>
                    <ArrowRight size={16} />
                  </button>
                </div>)}
            </div>

            {/* External Blog Link */}
            <div className="text-center mt-12 p-8 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Visit Our External Blog
              </h3>
              <p className="academic-body mb-6">
                For more detailed technical articles and research updates, visit our external blog platform.
              </p>
              <a href="https://astramlab-blog.ghost.io/" target="_blank" rel="noopener noreferrer" className="academic-button-primary inline-flex items-center space-x-2">
                <span>Visit External Blog</span>
                <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>;
};
export default Blog;
