
import React from 'react';

export const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-navy-900">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-cyan-400">Contact Us</h2>
          
          <div className="bg-navy-800 p-8 rounded-xl border border-cyan-500/20">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">ASTHRA Laboratory</h3>
                <p className="text-gray-300">Marine Technology Research Center</p>
                <p className="text-gray-300">University Campus, Building A</p>
                <p className="text-gray-300">Research Park, Suite 301</p>
              </div>
              
              <div className="border-t border-cyan-500/20 pt-4">
                <p className="text-gray-300 mb-2">
                  <span className="text-cyan-400">Email:</span> info@asthralab.edu
                </p>
                <p className="text-gray-300">
                  <span className="text-cyan-400">Phone:</span> +1 (555) 123-4567
                </p>
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <p className="text-gray-400">
              Interested in collaboration or have questions about our research? Get in touch!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
