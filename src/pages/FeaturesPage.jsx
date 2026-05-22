import React from 'react';
import { Home, ArrowLeft, ShieldCheck, Zap, Server, Settings, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';

const FeaturesPage = () => {
  const features = [
    { 
      title: "Intelligent Device Control", 
      subtitle: "Master Your Environment",
      desc: "Experience absolute control over every aspect of your living space. From ambient lighting to climate control, our unified interface brings your entire home to your fingertips with zero latency.", 
      stats: [
        { label: "Response Time", value: "<50ms" },
        { label: "Supported Devices", value: "10,000+" }
      ],
      img: "/feature-smart-control.png",
      reverse: false
    },
    { 
      title: "Real-time Energy Analytics", 
      subtitle: "Sustainable Living",
      desc: "Monitor your power consumption with pinpoint accuracy. Our predictive algorithms help you identify energy vampires and optimize your usage for maximum efficiency and reduced carbon footprint.", 
      stats: [
        { label: "Avg. Energy Saved", value: "32%" },
        { label: "Data Granularity", value: "Live" }
      ],
      img: "/feature-energy-monitoring.png",
      reverse: true
    },
    { 
      title: "Bank-Grade Security", 
      subtitle: "Peace of Mind",
      desc: "Your sanctuary stays protected 24/7. With encrypted video streams, instant anomaly detection, and automated lockdown protocols, your family's safety is never compromised.", 
      stats: [
        { label: "Encryption", value: "AES-256" },
        { label: "Threat Detection", value: "AI-Powered" }
      ],
      img: "/feature-security.png",
      reverse: false
    }
  ];

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

      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-24">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Platform <span className="neon-text-blue">Features</span></h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-xl">Professional-grade tools designed for the modern smart home ecosystem.</p>
        </div>
        
        <div className="space-y-32 mb-32">
          {features.map((f, i) => (
            <div key={i} className={`flex flex-col gap-16 items-center ${f.reverse ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}>
              <motion.div 
                initial={{ opacity: 0, x: f.reverse ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="flex-1 w-full relative"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-neon-blue/20 to-neon-purple/20 rounded-3xl blur-3xl -z-10"></div>
                <div className="glass-panel p-2 rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.6)]">
                  <img src={f.img} alt={f.title} className="w-full h-auto rounded-2xl object-cover aspect-[4/3]" />
                </div>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, x: f.reverse ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex-1 w-full"
              >
                <div className="inline-block px-5 py-2 rounded-full bg-white/5 border border-white/10 text-neon-blue text-sm font-semibold tracking-wider mb-6 shadow-[0_0_15px_rgba(0,243,255,0.1)]">
                  {f.subtitle}
                </div>
                <h3 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">{f.title}</h3>
                <p className="text-gray-400 text-lg lg:text-xl mb-10 leading-relaxed">{f.desc}</p>
                
                <div className="grid grid-cols-2 gap-8 pt-8 border-t border-glass-border/50">
                  {f.stats.map((stat, idx) => (
                    <div key={idx}>
                      <div className="text-4xl font-bold text-white mb-2 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">{stat.value}</div>
                      <div className="text-sm text-gray-500 uppercase tracking-widest font-medium">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Integration Ecosystem */}
        <div className="py-20 border-t border-glass-border">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Seamless <span className="neon-text-purple">Integrations</span></h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">Works flawlessly with the brands you already know and love.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {['Apple HomeKit', 'Amazon Alexa', 'Google Assistant', 'Samsung SmartThings', 'Philips Hue', 'Ring Security', 'Nest Thermostats', 'Sonos Audio'].map((brand, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card flex items-center justify-center py-8 text-lg font-medium text-gray-300 hover:text-white hover:border-neon-blue/50 transition-colors"
              >
                {brand}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-20 glass-panel p-12 text-center rounded-3xl relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 -z-10"></div>
          <h2 className="text-4xl font-bold mb-6">Ready to upgrade your home?</h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">Join thousands of users who have already transformed their living spaces into intelligent, responsive environments.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="btn-primary text-center py-4 px-8 text-lg font-semibold flex items-center justify-center gap-2">
              Talk to Sales <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/dashboard" className="btn-outline text-center py-4 px-8 text-lg font-semibold bg-black/40 hover:bg-black/60">
              Try Demo
            </Link>
          </div>
        </motion.div>

      </div>
      <Footer />
    </div>
  );
};

export default FeaturesPage;
