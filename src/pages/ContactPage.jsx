import { Mail, MessageSquare, Send } from 'lucide-react';
// Link not used here
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import api from '../lib/api';

const ContactPage = () => {
  return (
    <div className="min-h-screen text-white overflow-x-hidden selection:bg-neon-blue/30 relative bg-[#0f172a]">
      {/* Background gradients */}
  <div className="fixed top-0 left-1/2 -translate-x-1/2 w-72 h-72 md:w-96 md:h-96 bg-neon-blue/20 rounded-full blur-[120px] pointer-events-none"></div>
  <div className="fixed bottom-0 right-1/2 translate-x-1/2 w-72 h-72 md:w-96 md:h-96 bg-neon-purple/20 rounded-full blur-[120px] pointer-events-none"></div>

      <Navbar />

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
              <form className="space-y-5" onSubmit={async (e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const firstName = form.querySelector('input[placeholder="John"]').value;
                const lastName = form.querySelector('input[placeholder="Doe"]').value;
                const email = form.querySelector('input[type="email"]').value;
                const message = form.querySelector('textarea').value;
                try {
                  await api.contact({ firstName, lastName, email, message });
                  form.reset();
                  alert('Message sent successfully!');
                } catch (err) {
                  console.error('contact failed', err);
                  alert('Failed to send message');
                }
              }}>
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
      <Footer />
    </div>
  );
};

export default ContactPage;
