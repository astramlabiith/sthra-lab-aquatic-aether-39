import React, { useState } from 'react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { Mail, Phone, MapPin, Clock, Globe, Send } from 'lucide-react';
const JoinUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    message: ''
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your interest! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      position: '',
      message: ''
    });
  };
  const positions = [{
    title: "Research Intern - Autonomous Systems",
    type: "Internship",
    description: "Internship opportunity for Undergraduate students interested in autonomous systems research",
    requirements: ["B tech student (2nd/3rd/4th year)", "interested in robotics and control systems", "fundamental level knowledge in any of the multi domainer aspects and Computer vision"]
  }];
  return <div className="min-h-screen bg-white">
      <Navigation />
      <div className="pt-20">
        <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-blue-800">
                Join Us
              </h1>
              <p className="text-xl text-gray-900 max-w-3xl mx-auto leading-relaxed">
                Be part of cutting-edge research in unmanned systems. We're always looking for passionate researchers and students to join our innovative team.
              </p>
              
            </div>

            <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {/* Available Positions */}
              <div>
                <h2 className="text-3xl font-bold text-blue-800 mb-8">Available Positions</h2>
                <div className="space-y-6">
                  {positions.map((position, index) => <div key={index} className="bg-white border border-blue-200 rounded-2xl p-8 hover:border-blue-300 hover:shadow-lg transition-all duration-300">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-bold text-blue-800">{position.title}</h3>
                        <span className="px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-sm">
                          {position.type}
                        </span>
                      </div>
                      
                      <p className="text-gray-900 mb-4 leading-relaxed">
                        {position.description}
                      </p>
                      
                      <div>
                        <h4 className="text-gray-900 font-medium mb-2">Requirements:</h4>
                        <ul className="text-gray-900 text-sm space-y-1">
                          {position.requirements.map((req, reqIndex) => <li key={reqIndex} className="flex items-start">
                              <span className="text-blue-800 mr-2">•</span>
                              {req}
                            </li>)}
                        </ul>
                      </div>
                    </div>)}
                </div>

                {/* Application Form */}
                
              </div>

              {/* Contact Information */}
              <div>
                <h2 className="text-3xl font-bold text-blue-800 mb-8">Contact Information</h2>
                <div className="bg-white border border-blue-800 rounded-2xl p-8 shadow-lg">
                  <div className="space-y-8">
                    <div className="flex items-start space-x-4">
                      <div className="flex items-center justify-center w-12 h-12 bg-blue-50 rounded-full border border-blue-800">
                        <MapPin className="w-6 h-6 text-blue-800" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-blue-800 mb-2">Address</h3>
                        <p className="text-gray-900">Dr. Himabindu Allaka</p>
                        <p className="text-gray-900">Academic Block, C – 604</p>
                        <p className="text-gray-900">Mechanical and Aerospace Engineering</p>
                        <p className="text-gray-900">Indian Institute of Technology, Hyderabad</p>
                        <p className="text-gray-900">Sangareddy, 502284</p>
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
                      
                      
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="flex items-center justify-center w-12 h-12 bg-blue-50 rounded-full border border-blue-800">
                        <Globe className="w-6 h-6 text-blue-800" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-blue-800 mb-2">Website</h3>
                        <a href="https://www.iith.ac.in" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900 transition-colors duration-300">www.astramlabiith.in</a>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="flex items-center justify-center w-12 h-12 bg-blue-50 rounded-full border border-blue-800">
                        <Clock className="w-6 h-6 text-blue-800" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-blue-800 mb-2">Office Hours</h3>
                        <p className="text-gray-900">Monday - Friday: 9:00 AM - 6:00 PM</p>
                        <p className="text-gray-900">Saturday: 9:00 AM - 1:00 PM</p>
                        <p className="text-gray-900">Sunday: Closed</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Additional Information */}
                
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>;
};
export default JoinUs;