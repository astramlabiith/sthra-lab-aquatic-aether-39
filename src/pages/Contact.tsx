
import React from 'react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { Mail, Phone, MapPin, Clock, Globe } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <div className="pt-20">
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold mb-8 text-blue-800">Contact Us</h1>
                <p className="text-xl text-black">
                  Get in touch with AstraM Lab for research collaborations, partnerships, or inquiries.
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-12">
                {/* Contact Information */}
                <div className="bg-white border border-blue-800 rounded-2xl p-8">
                  <h2 className="text-2xl font-bold text-blue-800 mb-6">Contact Information</h2>
                  
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="flex items-center justify-center w-12 h-12 bg-blue-50 rounded-full border border-blue-800">
                        <MapPin className="w-6 h-6 text-blue-800" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-blue-800 mb-2">Address</h3>
                        <p className="text-black">Dr. Himabindu Allaka</p>
                        <p className="text-black">Academic Block, C – 604</p>
                        <p className="text-black">Mechanical and Aerospace Engineering</p>
                        <p className="text-black">Indian Institute of Technology, Hyderabad</p>
                        <p className="text-black">Sangareddy, 502284</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="flex items-center justify-center w-12 h-12 bg-blue-50 rounded-full border border-blue-800">
                        <Mail className="w-6 h-6 text-blue-800" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-blue-800 mb-2">Email</h3>
                        <a href="mailto:Himabindu.allaka@mae.iith.ac.in" className="text-blue-700 hover:text-blue-900 transition-colors duration-300">
                          Himabindu.allaka@mae.iith.ac.in
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-start space-x-4">
                      <div className="flex items-center justify-center w-12 h-12 bg-blue-50 rounded-full border border-blue-800">
                        <Phone className="w-6 h-6 text-blue-800" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-blue-800 mb-2">Phone</h3>
                        <p className="text-black">+91 40 2301 6032</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="flex items-center justify-center w-12 h-12 bg-blue-50 rounded-full border border-blue-800">
                        <Globe className="w-6 h-6 text-blue-800" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-blue-800 mb-2">Website</h3>
                        <a href="https://www.iith.ac.in" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900 transition-colors duration-300">
                          www.iith.ac.in
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="flex items-center justify-center w-12 h-12 bg-blue-50 rounded-full border border-blue-800">
                        <Clock className="w-6 h-6 text-blue-800" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-blue-800 mb-2">Office Hours</h3>
                        <p className="text-black">Monday - Friday: 9:00 AM - 6:00 PM</p>
                        <p className="text-black">Saturday: 9:00 AM - 1:00 PM</p>
                        <p className="text-black">Sunday: Closed</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Contact Form */}
                <div className="bg-white border border-blue-800 rounded-2xl p-8">
                  <h2 className="text-2xl font-bold text-blue-800 mb-6">Quick Contact</h2>
                  
                  <form className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-black font-medium mb-2">
                        Name
                      </label>
                      <input type="text" id="name" className="w-full px-4 py-3 bg-white border border-blue-300 rounded-lg text-black placeholder-gray-400 focus:border-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-300" placeholder="Your full name" />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-black font-medium mb-2">
                        Email
                      </label>
                      <input type="email" id="email" className="w-full px-4 py-3 bg-white border border-blue-300 rounded-lg text-black placeholder-gray-400 focus:border-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-300" placeholder="your.email@example.com" />
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-black font-medium mb-2">
                        Subject
                      </label>
                      <input type="text" id="subject" className="w-full px-4 py-3 bg-white border border-blue-300 rounded-lg text-black placeholder-gray-400 focus:border-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-300" placeholder="Inquiry subject" />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-black font-medium mb-2">
                        Message
                      </label>
                      <textarea id="message" rows={4} className="w-full px-4 py-3 bg-white border border-blue-300 rounded-lg text-black placeholder-gray-400 focus:border-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all duration-300 resize-vertical" placeholder="Your message..." />
                    </div>

                    <button type="submit" className="w-full bg-blue-800 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-900 transition-all duration-300">
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
              
              {/* Additional Information */}
              <div className="mt-12 bg-white border border-blue-800 rounded-2xl p-8 text-center">
                <h3 className="text-2xl font-bold text-blue-800 mb-4">Interested in Collaboration?</h3>
                <p className="text-black mb-6">
                  We welcome collaborations with industry partners, research institutions, and academic organizations. 
                  Contact us to discuss potential research partnerships and joint projects in unmanned systems technology.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <a href="mailto:Himabindu.allaka@mae.iith.ac.in" className="bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-900 transition-all duration-300">
                    Research Partnerships
                  </a>
                  <a href="mailto:Himabindu.allaka@mae.iith.ac.in" className="border-2 border-blue-800 text-blue-800 px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 hover:text-white transition-all duration-300">
                    Industry Collaboration
                  </a>
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

export default Contact;
