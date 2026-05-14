import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

const FALLBACK = 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80';

export const HeroSection = () => {
  const [slides, setSlides] = useState<string[]>([FALLBACK]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    supabase.from('hero_slides').select('image_url').order('display_order').then(({ data }) => {
      if (data && data.length) setSlides(data.map((d: any) => d.image_url));
    });
  }, []);

  useEffect(() => {
    if (slides.length < 2) return;
    const t = setInterval(() => setIndex(i => (i + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, [slides.length]);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Rotating background slides */}
      {slides.map((src, i) => (
        <div
          key={src + i}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000"
          style={{ backgroundImage: `url('${src}')`, opacity: i === index ? 1 : 0 }}
        />
      ))}

      {/* Top gradient bar to host titles without blocking the image */}
      <div className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/70 via-black/40 to-transparent pt-6 pb-12 px-8 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <img src="/lovable-uploads/5b8449b8-6fc4-4091-b934-a8acbcf86385.png" alt="AstraM Logo" className="h-10 object-contain drop-shadow" />
          <span className="text-white font-semibold tracking-wide hidden sm:inline">AstraM Lab</span>
        </div>
        <h3 className="text-white text-sm md:text-base font-semibold tracking-wide drop-shadow">IIT Hyderabad</h3>
      </div>

      {/* Bottom gradient bar with logo + caption */}
      <div className="absolute bottom-0 left-0 right-0 z-10 bg-gradient-to-t from-black/80 via-black/50 to-transparent pt-20 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-3">
            <img src="/lovable-uploads/5b8449b8-6fc4-4091-b934-a8acbcf86385.png" alt="AstraM Logo" className="h-14 md:h-16 w-auto object-contain drop-shadow-2xl animate-float" />
          </div>
          <p className="text-lg md:text-2xl font-medium animate-slide-up [animation-delay:0.2s] opacity-0 [animation-fill-mode:forwards] text-cyan-300 drop-shadow">
            Autonomous Systems and Technologies in Robotics and Advanced Multi-domain Applications
          </p>
          <p className="text-sm md:text-base text-gray-200 max-w-2xl mx-auto mt-3 animate-fade-in [animation-delay:0.4s] opacity-0 [animation-fill-mode:forwards] drop-shadow">
            ASTRAM Lab at the Department of Mechanical and Aerospace Engineering, IIT Hyderabad, advancing intelligent autonomous systems.
          </p>
        </div>
      </div>

      {/* Slide indicators - moved to right edge to avoid overlap with caption */}
      {slides.length > 1 && (
        <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-20">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Slide ${i + 1}`}
              className={`w-2 rounded-full transition-all ${i === index ? 'h-8 bg-cyan-400' : 'h-2 bg-white/50'}`}
            />
          ))}
        </div>
      )}

      {/* Scroll indicator - moved to left edge to avoid overlap */}
      <div className="absolute bottom-6 left-6 z-20 animate-bounce">
        <div className="w-6 h-10 border-2 border-cyan-400 rounded-full flex justify-center bg-black/30 backdrop-blur-sm">
          <div className="w-1 h-3 bg-cyan-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};
