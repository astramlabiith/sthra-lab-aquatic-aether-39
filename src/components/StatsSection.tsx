
import React, { useEffect, useState } from 'react';

interface StatItemProps {
  end: number;
  duration: number;
  suffix?: string;
  prefix?: string;
}

const CountUpNumber: React.FC<StatItemProps> = ({ end, duration, suffix = '', prefix = '' }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationId: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        animationId = requestAnimationFrame(animate);
      }
    };

    animationId = requestAnimationFrame(animate);

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [end, duration]);

  return <span>{prefix}{count}{suffix}</span>;
};

export const StatsSection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-navy-900 via-ocean-900 to-navy-900 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Research Impact
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Our cutting-edge research delivers measurable results across multiple domains of autonomous systems.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center group">
            <div className="bg-gradient-to-br from-cyan-500/20 to-ocean-500/20 backdrop-blur-sm border border-cyan-400/30 rounded-2xl p-8 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105">
              <div className="text-4xl md:text-5xl font-bold text-cyan-400 mb-2">
                <CountUpNumber end={50} duration={2000} suffix="+" />
              </div>
              <p className="text-gray-300 font-medium">Publications</p>
            </div>
          </div>

          <div className="text-center group">
            <div className="bg-gradient-to-br from-ocean-500/20 to-cyan-500/20 backdrop-blur-sm border border-ocean-400/30 rounded-2xl p-8 hover:border-ocean-400/50 transition-all duration-300 hover:scale-105">
              <div className="text-4xl md:text-5xl font-bold text-ocean-400 mb-2">
                <CountUpNumber end={15} duration={2000} />
              </div>
              <p className="text-gray-300 font-medium">Active Projects</p>
            </div>
          </div>

          <div className="text-center group">
            <div className="bg-gradient-to-br from-tech-yellow/20 to-cyan-500/20 backdrop-blur-sm border border-tech-yellow/30 rounded-2xl p-8 hover:border-tech-yellow/50 transition-all duration-300 hover:scale-105">
              <div className="text-4xl md:text-5xl font-bold text-tech-yellow mb-2">
                <CountUpNumber end={8} duration={2000} />
              </div>
              <p className="text-gray-300 font-medium">Patent Applications</p>
            </div>
          </div>

          <div className="text-center group">
            <div className="bg-gradient-to-br from-cyan-500/20 to-tech-yellow/20 backdrop-blur-sm border border-cyan-400/30 rounded-2xl p-8 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105">
              <div className="text-4xl md:text-5xl font-bold text-cyan-400 mb-2">
                <CountUpNumber end={95} duration={2000} suffix="%" />
              </div>
              <p className="text-gray-300 font-medium">Success Rate</p>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-8 bg-navy-800/50 backdrop-blur-sm border border-cyan-500/20 rounded-2xl px-8 py-6">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
              <span className="text-gray-300">Live Research Data</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-tech-yellow rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              <span className="text-gray-300">Real-time Updates</span>
            </div>
          </div>
        </div>
      </div>

      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, rgba(34, 211, 238, 0.3) 0%, transparent 50%)`,
        }}></div>
      </div>
    </section>
  );
};
