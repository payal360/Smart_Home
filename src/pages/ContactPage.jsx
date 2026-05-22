import React from 'react';
import { Mail, MessageSquare, Send, Home, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const ContactPage = () => {
  return (
    <div className="min-h-screen text-white overflow-x-hidden selection:bg-neon-blue/30 relative bg-[#0f172a]">
      {/* Background gradients */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-neon-blue/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-neon-purple/20 rounded-full blur-[120px] pointer-events-none"></div>

      <nav className="fixed w-full z-50 glass-panel py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Link to="/" className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-[0_0_15px_rgba(0,243,255,0.5)]">
              <Home className="text-white w-6 h-6" />
            </Link>
            <span className="text-2xl font-bold tracking-tight">SmartHome<span className="text-neon-blue">_Manager</span></span>
          </div>
          <Link to="/" className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>
      </nav>

      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto min-h-screen flex items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel p-8 md:p-12 relative overflow-hidden w-full"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-neon-blue/10 rounded-full blur-[80px]"></div>
          
          <div className="flex flex-col lg:flex-row gap-12 relative z-10">
            <div className="flex-1">
              <h1 className="text-5xl font-bold mb-6">Get in <span className="neon-text-blue">Touch</span></h1>
              <p className="text-gray-400 mb-10 max-w-md text-lg">
                Have questions about integrating your smart devices or need help with a custom setup? Our team is ready to assist you.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center shadow-[0_0_15px_rgba(0,243,255,0.1)]">
                    <Mail className="w-6 h-6 text-neon-blue" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Email Us</h4>
                    <p className="text-gray-400">support@smarthome.manager</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center shadow-[0_0_15px_rgba(176,38,255,0.1)]">
                    <MessageSquare className="w-6 h-6 text-neon-purple" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">Live Chat</h4>
                    <p className="text-gray-400">Available 24/7 for premium users</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex-1">
              <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); e.target.reset(); alert('Message sent successfully!'); }}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">First Name</label>
                    <input type="text" className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-neon-blue transition-colors" placeholder="John" required />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Last Name</label>
                    <input type="text" className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-neon-blue transition-colors" placeholder="Doe" required />
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Email</label>
                  <input type="email" className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-neon-blue transition-colors" placeholder="john@example.com" required />
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Message</label>
                  <textarea rows="5" className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-neon-blue transition-colors resize-none" placeholder="How can we help you?" required></textarea>
                </div>
                
                <button type="submit" className="btn-primary w-full py-4 rounded-xl flex items-center justify-center gap-2 text-lg mt-2">
                  <Send className="w-5 h-5" /> Send Message
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;
