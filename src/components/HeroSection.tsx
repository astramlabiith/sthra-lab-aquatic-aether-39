import React from 'react';
export const HeroSection = () => {
  return <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Full-size background image */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{
      backgroundImage: `url('https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`
    }} />
      
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/50" />
      
      {/* Top logos */}
      <div className="absolute top-8 left-0 right-0 flex justify-between items-center px-8 z-10">
        <div className="flex items-center space-x-4">
          
          <div className="text-white">
            <h3 className="text-lg font-bold">AstraM Lab</h3>
            
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="text-white text-right">
            <h3 className="text-lg font-bold">IIT Hyderabad</h3>
            
          </div>
          
        </div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Logo with floating animation */}
        <div className="flex justify-center mb-4 animate-fade-in">
          <div className="animate-float">
            <img src="/lovable-uploads/5b8449b8-6fc4-4091-b934-a8acbcf86385.png" alt="AstraM Logo" className="w-96 h-24 object-contain drop-shadow " />
          </div>
        </div>
        
        {/* Main heading with slide-up animation */}
        
        
        {/* Subtitle with delayed slide-up animation */}
        <p className="text-xl md:text-2xl mb-4 animate-slide-up [animation-delay:0.2s] opacity-0 [animation-fill-mode:forwards] text-cyan-300">Autonomous Systems and Technologies in Robotics and Advanced Multi-domain Applications </p>
        
        {/* Description with delayed fade-in animation */}
        <p className="text-lg text-gray-200 max-w-2xl mx-auto animate-fade-in [animation-delay:0.4s] opacity-0 [animation-fill-mode:forwards] drop-shadow-lg">ASTRAM Lab at the Department of Mechanical and Aerospace Engineering, IIT Hyderabad, is dedicated to advancing the science and engineering of intelligent autonomous systems. </p>
      </div>
      
      {/* Animated scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-cyan-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-cyan-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>;
};