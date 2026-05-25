import { useState, useEffect } from 'react';
import { 
  Users,
  Tv,
  Fan,
  Lightbulb,
  Video,
  X,
  Eye,
  EyeOff
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import api from '../lib/api';

const AuthModal = ({ isOpen, onClose, initialMode }) => {
  const [mode, setMode] = useState(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  
  // initialize from props when modal opens; keep local state in sync via effect only when initialMode changes
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setShowPassword(false);
    }
  }, [initialMode, isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm" 
            onClick={onClose}
          ></motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="glass-panel w-full max-w-md p-8 relative z-10 border-neon-blue/30 shadow-[0_0_30px_rgba(0,243,255,0.15)]"
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10">
              <X className="w-5 h-5" />
            </button>
            
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold mb-2 tracking-tight">{mode === 'login' ? 'Welcome Back' : 'Create Account'}</h2>
              <p className="text-gray-400 text-sm">{mode === 'login' ? 'Enter your credentials to access your dashboard.' : 'Sign up to start managing your smart home.'}</p>
            </div>
            
            <form className="space-y-5" onSubmit={async (e) => { 
                e.preventDefault();
                const form = e.currentTarget;
                const email = form.querySelector('input[type="email"]').value;
                const password = form.querySelector('input[type="password"]').value;
                try {
                  const res = await api.register({ email, password });
                  // simple success flow: close and go to dashboard
                  onClose();
                  navigate('/dashboard');
                } catch (err) {
                  console.error('register failed', err);
                  alert('Register failed: ' + (err.message || 'unknown'));
                }
              }}>
              {mode === 'register' && (
                <div>
                  <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Full Name</label>
                  <input type="text" className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-all" placeholder="John Doe" required />
                </div>
              )}
              <div>
                <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider mb-2">Email Address</label>
                <input type="email" className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-all" placeholder="you@example.com" required />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-medium text-gray-400 uppercase tracking-wider">Password</label>
                  {mode === 'login' && <a href="#" className="text-xs text-neon-blue hover:underline">Forgot password?</a>}
                </div>
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3.5 text-white placeholder-gray-500 focus:outline-none focus:border-neon-blue focus:ring-1 focus:ring-neon-blue transition-all" 
                    placeholder="••••••••" 
                    required 
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors p-1"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              
              <button type="submit" className="w-full btn-primary py-3.5 mt-2 rounded-xl text-md font-semibold tracking-wide shadow-[0_0_15px_rgba(0,243,255,0.4)]">
                {mode === 'login' ? 'Sign In' : 'Create Account'}
              </button>
            </form>

            <div className="mt-8 relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-[#0f172a] text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 px-4 py-3 border border-white/10 rounded-xl hover:bg-white/5 transition-colors text-sm font-medium">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"/></svg>
                Google
              </button>
              <button className="flex items-center justify-center gap-2 px-4 py-3 border border-white/10 rounded-xl hover:bg-white/5 transition-colors text-sm font-medium">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"/></svg>
                GitHub
              </button>
            </div>
            
            <div className="mt-8 text-center text-gray-400 text-sm">
              {mode === 'login' ? "Don't have an account? " : "Already have an account? "}
              <button 
                type="button"
                onClick={() => setMode(mode === 'login' ? 'register' : 'login')} 
                className="text-neon-blue font-semibold hover:underline focus:outline-none"
              >
                {mode === 'login' ? 'Create one now' : 'Sign in instead'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const Hero = ({ onOpenAuth }) => {
  return (
    <section id="home" className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 min-h-screen">
      <div className="flex-1 text-center lg:text-left z-10">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold leading-tight mb-6"
        >
          Control Your <br/>
          <span className="neon-text-blue">Smart Home</span> <br/>
          Effortlessly
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-gray-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto lg:mx-0"
        >
          Manage devices, automate routines, monitor energy usage, and secure your virtual home — all in one intelligent platform.
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
        >
          <button onClick={() => onOpenAuth('register')} className="btn-primary text-center inline-block cursor-pointer">Get Started</button>
          <Link to="/features" className="btn-outline text-center inline-block">Explore Features</Link>
        </motion.div>
      </div>
      <div className="flex-1 relative z-10 w-full max-w-lg lg:max-w-none">
        <div className="absolute inset-0 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full blur-[100px] opacity-20 animate-pulse-glow"></div>
        <motion.img 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          src="/hero.png" 
          alt="Smart Home Dashboard" 
          className="w-full h-auto relative animate-float rounded-2xl shadow-[0_0_30px_rgba(0,243,255,0.3)]"
        />
      </div>
    </section>
  );
};

const Features = null;

const DashboardPreview = () => {
  return (
    <section id="dashboard" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="glass-panel p-8 md:p-12 relative overflow-hidden">
        <div className="absolute top-[-50%] left-[-10%] w-[60%] h-[200%] bg-neon-blue/10 rotate-12 blur-3xl"></div>
        <div className="absolute bottom-[-50%] right-[-10%] w-[60%] h-[200%] bg-neon-purple/10 -rotate-12 blur-3xl"></div>
        
        <div className="relative z-10 flex flex-col lg:flex-row gap-12 items-center">
          <div className="flex-1 text-left">
            <h2 className="text-4xl font-bold mb-6">Centralized <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 drop-shadow-[0_0_8px_rgba(176,38,255,0.8)]">Command Center</span></h2>
            <p className="text-gray-400 mb-8 text-lg">
              Get a birds-eye view of your entire home. Monitor real-time status, tweak environments, and manage security from a beautifully crafted dashboard.
            </p>
            <ul className="space-y-4">
              {[
                "Real-time ON/OFF toggles",
                "Advanced Thermostat Controls",
                "Live Energy Usage Charts",
                "Instant Emergency Status Panel"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-300">
                  <div className="w-2 h-2 rounded-full bg-neon-green shadow-[0_0_5px_#39ff14]"></div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="flex-1 w-full grid grid-cols-2 gap-4">
            <div className="glass-card flex flex-col items-center justify-center p-6 bg-white/5">
              <Thermometer className="w-10 h-10 text-orange-400 mb-2" />
              <div className="text-3xl font-bold">22°C</div>
              <div className="text-sm text-gray-400">Living Room</div>
            </div>
            <div className="glass-card flex flex-col items-center justify-center p-6 bg-white/5">
              <Power className="w-10 h-10 text-neon-green drop-shadow-[0_0_8px_#39ff14] mb-2" />
              <div className="text-3xl font-bold">12</div>
              <div className="text-sm text-gray-400">Active Devices</div>
            </div>
            <div className="glass-card col-span-2 flex items-center justify-between p-6 bg-white/5">
              <div>
                <div className="text-sm text-gray-400">Energy Today</div>
                <div className="text-2xl font-bold text-neon-blue">14.5 kWh</div>
              </div>
              <Activity className="w-12 h-12 text-neon-blue opacity-50" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const HowItWorks = () => {
  const steps = [
    { num: "01", title: "Add Devices", desc: "Discover and pair your smart devices instantly." },
    { num: "02", title: "Connect & Configure", desc: "Set rooms, parameters, and network settings." },
    { num: "03", title: "Control & Automate", desc: "Create routines and enjoy your smart home." }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
      <h2 className="text-4xl font-bold mb-16">How It <span className="neon-text-blue">Works</span></h2>
      <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-4 relative">
        <div className="hidden md:block absolute top-1/2 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-transparent via-neon-blue/50 to-transparent -z-10"></div>
        {steps.map((step, i) => (
          <div key={i} className="flex-1 flex flex-col items-center relative">
            <div className="w-16 h-16 rounded-full glass-panel flex items-center justify-center text-2xl font-bold text-neon-blue mb-6 shadow-[0_0_15px_rgba(0,243,255,0.3)]">
              {step.num}
            </div>
            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
            <p className="text-gray-400 text-sm max-w-xs">{step.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const Devices = () => {
  const devices = [
    { icon: <Lightbulb />, name: "Smart Lamp", status: "ON", active: true },
    { icon: <Fan />, name: "Smart Fan", status: "OFF", active: false },
    { icon: <Zap />, name: "Smart AC", status: "ON", active: true },
    { icon: <Thermometer />, name: "Thermostat", status: "Auto", active: true },
    { icon: <Tv />, name: "Smart TV", status: "OFF", active: false },
    { icon: <Video />, name: "Security Camera", status: "Recording", active: true },
  ];

  return (
    <section id="devices" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h2 className="text-4xl font-bold mb-4">Supported <span className="neon-text-blue">Devices</span></h2>
          <p className="text-gray-400">Manage all your categories in one place.</p>
        </div>
        <button className="hidden sm:block text-neon-blue hover:underline">View All Devices</button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {devices.map((d, i) => (
          <div key={i} className="glass-card flex flex-col items-center p-6 hover:bg-white/5 cursor-pointer">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${d.active ? 'bg-neon-blue/20 text-neon-blue shadow-[0_0_10px_rgba(0,243,255,0.5)]' : 'bg-gray-800 text-gray-500'}`}>
              {d.icon}
            </div>
            <h3 className="font-semibold text-center mb-1 text-sm">{d.name}</h3>
            <div className="flex items-center gap-2 text-xs">
              <span className={`w-2 h-2 rounded-full ${d.active ? 'bg-neon-green shadow-[0_0_5px_#39ff14]' : 'bg-gray-500'}`}></span>
              <span className={d.active ? 'text-gray-300' : 'text-gray-500'}>{d.status}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const Testimonials = ({ initial = [] }) => {
  const [reviews, setReviews] = useState(initial.length ? initial : null);

  useEffect(() => {
    if (reviews) return;
    (async () => {
      try {
        const t = await api.getTestimonials();
        if (Array.isArray(t)) setReviews(t.map((x) => ({ text: x.quote || x.text || x.q, author: x.name || x.author }))); 
      } catch (e) {
        console.warn('failed to load testimonials', e);
        setReviews([]);
      }
    })();
  }, []);

  if (!reviews) return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      <h2 className="text-4xl font-bold text-center mb-16">User <span className="neon-text-blue">Stories</span></h2>
      <div className="text-center text-gray-400">Loading testimonials...</div>
    </section>
  );

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      <h2 className="text-4xl font-bold text-center mb-16">User <span className="neon-text-blue">Stories</span></h2>
      <div className="flex flex-col md:flex-row gap-6">
        {reviews.length === 0 ? (
          <div className="text-gray-400 italic">No testimonials available.</div>
        ) : (
          reviews.map((r, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="flex-1 glass-card bg-gradient-to-b from-white/5 to-transparent relative p-8"
            >
              <div className="text-neon-purple text-4xl font-serif absolute top-4 left-4 opacity-20">"</div>
              <p className="text-gray-300 mb-6 relative z-10 italic">"{r.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                  <Users className="w-5 h-5 text-gray-400" />
                </div>
                <span className="font-semibold text-sm">{r.author}</span>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </section>
  );
};

const Contact = null;

const StatsBanner = ({ initial = [] }) => {
  const [stats, setStats] = useState(initial.length ? initial : null);

  useEffect(() => {
    if (stats) return;
    (async () => {
      try {
        const s = await api.getStats();
        setStats(s || []);
      } catch (e) {
        console.warn('failed to load stats', e);
        setStats([]);
      }
    })();
  }, []);

  if (!stats) return (
    <div className="border-y border-white/5 bg-black/40 backdrop-blur-md py-12 relative z-10 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center text-gray-400">Loading stats...</div>
      </div>
    </div>
  );

  return (
    <div className="border-y border-white/5 bg-black/40 backdrop-blur-md py-12 relative z-10 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-white/5">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center justify-center px-4">
              <div className="text-3xl md:text-5xl font-bold text-white mb-2 tracking-tight drop-shadow-[0_0_8px_rgba(0,243,255,0.5)]">{stat.value}</div>
              <div className="text-xs md:text-sm text-gray-400 uppercase tracking-widest font-semibold">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const AppDownloadCTA = () => {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
      <div className="glass-panel rounded-3xl p-8 md:p-16 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between border-neon-blue/30 shadow-[0_0_50px_rgba(0,243,255,0.15)]">
  <div className="absolute top-0 right-0 w-56 h-56 md:w-96 md:h-96 bg-neon-blue/20 rounded-full blur-[100px] pointer-events-none"></div>
  <div className="absolute bottom-0 left-0 w-56 h-56 md:w-96 md:h-96 bg-neon-purple/20 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="max-w-xl z-10 text-center lg:text-left mb-16 lg:mb-0">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Control your home from <span className="neon-text-blue">anywhere.</span></h2>
          <p className="text-gray-300 text-lg mb-10 leading-relaxed">Download the SmartHome_Manager mobile app for iOS and Android. Experience ultimate convenience on the go with zero compromise.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button className="flex items-center justify-center gap-3 bg-white text-black px-8 py-4 rounded-xl font-bold hover:bg-gray-200 transition-colors shadow-lg">
              <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.04 2.26-.85 3.65-.79 1.48.06 2.68.68 3.42 1.83-2.92 1.76-2.43 5.48.36 6.74-.63 1.63-1.57 3.33-2.51 4.39zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/></svg>
              App Store
            </button>
            <button className="flex items-center justify-center gap-3 bg-black/40 border border-white/20 text-white px-8 py-4 rounded-xl font-bold hover:bg-black/60 transition-colors shadow-lg">
              <svg viewBox="0 0 24 24" className="w-7 h-7 fill-current text-green-400"><path d="M3.6 20.9l12.4-7.1-4.2-4.2-8.2 11.3zM2.5 3.4l13.5 7.8-3.1 3.1L2.5 3.4zm14.3 8.3l3.6 2.1c.9.5.9 1.4 0 1.9l-3.6 2.1-2.4-2.4 2.4-3.7z"/></svg>
              Google Play
            </button>
          </div>
        </div>
        
        <div className="relative z-10 w-full max-w-sm lg:w-1/3 flex justify-center lg:justify-end">
          <div className="relative border-gray-800 bg-gray-900 border-[8px] rounded-[2.5rem] h-[450px] w-[220px] shadow-2xl overflow-hidden">
            <div className="w-[120px] h-[20px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute z-20"></div>
            <div className="absolute inset-0 bg-[#0f172a] p-5 flex flex-col pt-10">
              <div className="flex justify-between items-center mb-8">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-blue to-neon-purple shadow-[0_0_10px_rgba(0,243,255,0.5)]"></div>
                <div className="text-sm font-bold text-white">24°C</div>
              </div>
              <div className="space-y-4 flex-1">
                <div className="h-28 rounded-2xl bg-white/10 border border-white/10 flex flex-col p-4 justify-between relative overflow-hidden">
                   <div className="absolute inset-0 bg-neon-blue/10"></div>
                   <div className="w-8 h-8 rounded-full bg-neon-blue/20 flex items-center justify-center relative z-10"><div className="w-2.5 h-2.5 rounded-full bg-neon-blue drop-shadow-[0_0_5px_rgba(0,243,255,1)]"></div></div>
                   <div className="text-base font-semibold text-white relative z-10">Living Room</div>
                </div>
                <div className="h-28 rounded-2xl bg-white/5 border border-white/5 flex flex-col p-4 justify-between">
                   <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center"><div className="w-2.5 h-2.5 rounded-full bg-gray-500"></div></div>
                   <div className="text-base font-semibold text-gray-400">Bedroom</div>
                </div>
              </div>
              <div className="mt-4 h-12 bg-neon-blue rounded-xl flex items-center justify-center text-sm font-bold text-black shadow-[0_0_15px_rgba(0,243,255,0.4)]">Master Switch</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

function LandingPage() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  const openAuth = (mode) => {
    setAuthMode(mode);
    setIsAuthOpen(true);
  };

  return (
    <div className="min-h-screen text-white overflow-x-hidden selection:bg-neon-blue/30 relative">
      <Navbar onOpenAuth={openAuth} />
      <Hero onOpenAuth={openAuth} />
      <StatsBanner />
      <HowItWorks />
      <DashboardPreview />
      <Devices />
      <Testimonials />
      <AppDownloadCTA />
      <Footer />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} initialMode={authMode} />
    </div>
  );
}

export default LandingPage;
