import React from 'react';
import { Target, Lightbulb, Cog, Brain } from 'lucide-react';
export const LabInfoSection = () => {
  const whatWeDo = ["Navigate autonomously in challenging and GNSS-denied environments", "Adapt to multi-domain tasks such as flying, floating, swimming, and crawling", "Fuse perception, learning, and embedded control in real-time", "Translate research into field-ready hardware through hands-on prototyping"];
  const researchFoundations = ["Guidance, Navigation & Control (GNC)", "Sensor Fusion & Environmental Perception", "Dynamic Modeling & Stability", "Multi-modal Autonomy and AI-based Decision Making"];
  return <section className="py-8 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Goal Statement */}
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-8 border border-blue-200">
              <p className="text-lg md:text-xl text-gray-800 leading-relaxed max-w-4xl mx-auto">
                Our goal is to create <span className="font-semibold text-blue-800">resilient, intelligent, and field-deployable autonomous systems</span> — 
                addressing both technological and societal challenges.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* What We Do */}
            <div className="bg-white border border-blue-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center border border-blue-200 mr-4">
                  <Target className="w-6 h-6 text-blue-800" />
                </div>
                <h3 className="text-2xl font-bold text-blue-900">What We Do</h3>
              </div>
              <p className="text-gray-900 mb-4">We develop systems that:</p>
              <ul className="space-y-3">
                {whatWeDo.map((item, index) => <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="leading-relaxed text-gray-950">{item}</span>
                  </li>)}
              </ul>
            </div>

            {/* Research Foundations */}
            <div className="bg-white border border-blue-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center border border-blue-200 mr-4">
                  <Brain className="w-6 h-6 text-blue-800" />
                </div>
                <h3 className="text-2xl font-bold text-blue-900">Research Foundations</h3>
              </div>
              <p className="text-gray-900 mb-4">Our work is grounded in:</p>
              <ul className="space-y-3">
                {researchFoundations.map((item, index) => <li key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="leading-relaxed text-gray-950">{item}</span>
                  </li>)}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </section>;
};