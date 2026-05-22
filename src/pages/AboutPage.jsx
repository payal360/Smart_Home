import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const AboutPage = () => {
  return (
    <div className="min-h-screen text-white bg-[#0f172a] selection:bg-neon-blue/30 relative">
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-neon-blue/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-neon-purple/20 rounded-full blur-[120px] pointer-events-none"></div>
      
      <Navbar />

      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto relative z-10 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-8">Redefining <span className="neon-text-blue">Living Spaces</span></h1>
        
        <div className="glass-panel p-8 md:p-12 text-left rounded-3xl space-y-8 text-gray-300 text-lg leading-relaxed shadow-[0_0_40px_rgba(0,0,0,0.5)]">
          <p>
            Founded in 2024, SmartHome_Manager was born out of a simple realization: the smart home industry is fragmented, complex, and frustrating for the average user.
          </p>
          <p>
            We believe that technology should adapt to humans, not the other way around. Our mission is to provide a seamless, beautiful, and highly intelligent unified dashboard that connects every IoT device in your home under one roof.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8 border-y border-white/10 my-12">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2 drop-shadow-[0_0_8px_rgba(0,243,255,0.5)]">1.2M+</div>
              <div className="text-sm text-gray-500 uppercase tracking-wider">Devices Connected</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2 drop-shadow-[0_0_8px_rgba(176,38,255,0.5)]">150+</div>
              <div className="text-sm text-gray-500 uppercase tracking-wider">Brand Integrations</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2 drop-shadow-[0_0_8px_rgba(0,243,255,0.5)]">99.9%</div>
              <div className="text-sm text-gray-500 uppercase tracking-wider">Uptime Reliability</div>
            </div>
          </div>

          <h3 className="text-3xl font-bold text-white mb-4">Our Vision</h3>
          <p>
            We envision a future where your home anticipates your needs before you even express them. Through predictive AI and robust infrastructure, we are building the nervous system for the homes of tomorrow.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;
