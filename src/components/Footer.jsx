import React from 'react';
import { Home, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t border-glass-border bg-black/20 pt-16 pb-8 px-4 sm:px-6 lg:px-8 mt-20 relative overflow-hidden w-full">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-neon-blue to-transparent opacity-50"></div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-4">
            <Home className="text-neon-blue w-6 h-6 drop-shadow-[0_0_8px_rgba(0,243,255,0.8)]" />
            <span className="text-2xl font-bold text-white">SmartHome<span className="text-neon-blue">_Manager</span></span>
          </div>
          <p className="text-gray-400 max-w-md">
            Elevating your living experience through intelligent automation and breathtaking design.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-lg mb-4 text-white">Quick Links</h4>
          <ul className="space-y-2 text-gray-400">
            <li><Link to="/" className="hover:text-neon-blue transition">Home</Link></li>
            <li><Link to="/features" className="hover:text-neon-blue transition">Features</Link></li>
            <li><Link to="/dashboard" className="hover:text-neon-blue transition">Dashboard</Link></li>
            <li><Link to="/contact" className="hover:text-neon-blue transition">Contact</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-lg mb-4 text-white">Contact Us</h4>
          <ul className="space-y-2 text-gray-400">
            <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-neon-blue" /> support@smarthome.manager</li>
            <li>1-800-SMART-HM</li>
            <li className="pt-4 flex gap-4">
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-neon-blue hover:text-black cursor-pointer transition text-white">X</div>
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-neon-blue hover:text-black cursor-pointer transition text-white">in</div>
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-neon-blue hover:text-black cursor-pointer transition text-white">fb</div>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto text-center text-gray-500 text-sm border-t border-glass-border/50 pt-8">
        &copy; {new Date().getFullYear()} SmartHome_Manager. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
