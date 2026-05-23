import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Home, 
  Grid, 
  Settings, 
  LogOut, 
  Bell, 
  Search,
  Thermometer,
  Zap,
  Power,
  Lightbulb,
  Fan,
  Video,
  Wind,
  Clock,
  Shield,
  User,
  Wifi,
  Smartphone,
  Moon,
  Sun
} from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../lib/api';

const DashboardStats = () => {
  const [stats, setStats] = React.useState(null);

  React.useEffect(() => {
    (async () => {
      try {
        const s = await api.getStats();
        setStats(s);
      } catch (e) {
        console.warn('failed to load stats', e);
      }
    })();
  }, []);

  if (!stats) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6">Loading...</div>
        <div className="glass-card p-6">Loading...</div>
        <div className="glass-card p-6">Loading...</div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.slice(0,3).map((stat, i) => (
        <motion.div key={i} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="glass-card flex items-center justify-between p-6">
          <div>
            <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
            <h3 className="text-3xl font-bold">{stat.value}</h3>
          </div>
          <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-white">
            <Power className="w-6 h-6" />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('home');
  
  // User Settings State
  const [userProfile, setUserProfile] = useState({
    name: 'Alex Johnson',
    email: 'alex.j@example.com',
    guestNetwork: false
  });
  
  // Settings Form State
  const [settingsForm, setSettingsForm] = useState(userProfile);
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveSettings = () => {
    setUserProfile(settingsForm);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };
  
  // Device States
  const [devices, setDevices] = useState({
    livingRoomLight: true,
    bedroomLight: false,
    ac: true,
    purifier: false
  });

  const toggleDevice = (device) => {
    setDevices(prev => ({ ...prev, [device]: !prev[device] }));
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-white overflow-hidden flex relative">
      {/* Background gradients */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-neon-blue/10 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-neon-purple/10 rounded-full blur-[120px] pointer-events-none"></div>
      </div>

      {/* Sidebar */}
      <motion.aside 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="w-64 h-screen glass-panel rounded-none border-y-0 border-l-0 z-10 flex flex-col hidden md:flex"
      >
        <div className="p-6 flex items-center gap-2 mb-8">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-[0_0_10px_rgba(0,243,255,0.5)]">
            <Home className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight">Smart<span className="text-neon-blue">Home</span></span>
        </div>

        <nav className="flex-1 px-4 space-y-2">
          {[
            { id: 'home', icon: <Grid />, label: 'Overview' },
            { id: 'devices', icon: <Power />, label: 'Devices' },
            { id: 'automation', icon: <Zap />, label: 'Automation' },
            { id: 'settings', icon: <Settings />, label: 'Settings' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === item.id 
                  ? 'bg-neon-blue/10 text-neon-blue border border-neon-blue/30 shadow-[0_0_10px_rgba(0,243,255,0.1)]' 
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              {React.cloneElement(item.icon, { className: 'w-5 h-5' })}
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-glass-border">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main className="flex-1 h-screen overflow-y-auto z-10 relative">
        {/* Header */}
        <header className="px-8 py-6 flex justify-between items-center sticky top-0 bg-[#0f172a]/80 backdrop-blur-md border-b border-glass-border z-20">
          <div>
            <h1 className="text-2xl font-bold">Welcome Home, {userProfile.name.split(' ')[0]}</h1>
            <p className="text-gray-400 text-sm">Tuesday, 22 Oct 2024</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="glass-card p-2 rounded-full hidden sm:flex">
              <Search className="w-5 h-5 text-gray-400" />
            </div>
            <div className="glass-card p-2 rounded-full relative">
              <Bell className="w-5 h-5 text-gray-400" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-neon-blue rounded-full shadow-[0_0_5px_#00f3ff]"></span>
            </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 border-2 border-white/10 overflow-hidden">
              <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userProfile.name}`} alt="Profile" className="w-full h-full object-cover" />
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        {activeTab === 'home' && (
          <div className="p-8 max-w-7xl mx-auto space-y-8">
            {/* Top Widgets */}
            <DashboardStats />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Camera Feed */}
              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }} className="lg:col-span-2 glass-panel p-6 flex flex-col">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <Video className="w-5 h-5 text-neon-blue" />
                    Security Camera
                  </h3>
                  <span className="flex items-center gap-2 text-xs bg-red-500/20 text-red-400 px-3 py-1 rounded-full border border-red-500/30">
                    <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                    LIVE
                  </span>
                </div>
                <div className="flex-1 bg-black/50 rounded-xl relative overflow-hidden border border-white/5 min-h-[300px] flex items-center justify-center">
                  {/* Mock Camera View */}
                  <img src="/camera-feed.png" alt="Camera Feed" className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity" />
                  
                  {/* Grid Overlay */}
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(0,243,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,243,255,0.03)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
                  
                  <div className="absolute bottom-4 left-4 text-xs font-mono text-neon-blue bg-black/60 px-2 py-1 rounded backdrop-blur-sm border border-neon-blue/30">
                    CAM_01 / FRONT_DOOR / {new Date().toLocaleTimeString()}
                  </div>
                </div>
              </motion.div>

              {/* Quick Controls */}
              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="space-y-4">
                <h3 className="font-semibold text-lg mb-4">Quick Controls</h3>
                
                {/* Light Toggle */}
                <div 
                  onClick={() => toggleDevice('livingRoomLight')}
                  className={`glass-card p-4 flex items-center justify-between cursor-pointer transition-all ${devices.livingRoomLight ? 'border-neon-blue/50 shadow-[0_0_15px_rgba(0,243,255,0.15)]' : ''}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full ${devices.livingRoomLight ? 'bg-neon-blue/20 text-neon-blue' : 'bg-white/5 text-gray-500'}`}>
                      <Lightbulb className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-medium">Living Room</h4>
                      <p className="text-xs text-gray-400">Main Light</p>
                    </div>
                  </div>
                  <div className={`w-12 h-6 rounded-full p-1 transition-colors ${devices.livingRoomLight ? 'bg-neon-blue' : 'bg-gray-700'}`}>
                    <div className={`w-4 h-4 rounded-full bg-white transition-transform ${devices.livingRoomLight ? 'translate-x-6' : 'translate-x-0'}`}></div>
                  </div>
                </div>

                {/* AC Toggle */}
                <div 
                  onClick={() => toggleDevice('ac')}
                  className={`glass-card p-4 flex items-center justify-between cursor-pointer transition-all ${devices.ac ? 'border-neon-blue/50 shadow-[0_0_15px_rgba(0,243,255,0.15)]' : ''}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full ${devices.ac ? 'bg-neon-blue/20 text-neon-blue' : 'bg-white/5 text-gray-500'}`}>
                      <Wind className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-medium">Air Conditioner</h4>
                      <p className="text-xs text-gray-400">Cooling • 22°C</p>
                    </div>
                  </div>
                  <div className={`w-12 h-6 rounded-full p-1 transition-colors ${devices.ac ? 'bg-neon-blue' : 'bg-gray-700'}`}>
                    <div className={`w-4 h-4 rounded-full bg-white transition-transform ${devices.ac ? 'translate-x-6' : 'translate-x-0'}`}></div>
                  </div>
                </div>

                {/* Purifier Toggle */}
                <div 
                  onClick={() => toggleDevice('purifier')}
                  className={`glass-card p-4 flex items-center justify-between cursor-pointer transition-all ${devices.purifier ? 'border-neon-purple/50 shadow-[0_0_15px_rgba(176,38,255,0.15)]' : ''}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-full ${devices.purifier ? 'bg-neon-purple/20 text-neon-purple' : 'bg-white/5 text-gray-500'}`}>
                      <Fan className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="font-medium">Air Purifier</h4>
                      <p className="text-xs text-gray-400">Auto Mode</p>
                    </div>
                  </div>
                  <div className={`w-12 h-6 rounded-full p-1 transition-colors ${devices.purifier ? 'bg-neon-purple' : 'bg-gray-700'}`}>
                    <div className={`w-4 h-4 rounded-full bg-white transition-transform ${devices.purifier ? 'translate-x-6' : 'translate-x-0'}`}></div>
                  </div>
                </div>

              </motion.div>
            </div>
            
          </div>
        )}

        {/* Devices Tab */}
        {activeTab === 'devices' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8 max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">All Devices</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { id: 'livingRoomLight', name: 'Living Room Light', icon: <Lightbulb />, room: 'Living Room', color: 'blue', img: '/device-living-room.png' },
                { id: 'bedroomLight', name: 'Bedroom Light', icon: <Lightbulb />, room: 'Bedroom', color: 'blue', img: '/device-bedroom.png' },
                { id: 'ac', name: 'Air Conditioner', icon: <Wind />, room: 'Living Room', color: 'cyan', img: '/device-ac.png' },
                { id: 'purifier', name: 'Air Purifier', icon: <Fan />, room: 'Bedroom', color: 'purple', img: '/device-purifier.png' },
              ].map((dev) => (
                <div key={dev.id} className="glass-card p-0 flex flex-col justify-between min-h-[220px] relative overflow-hidden group">
                  <div className="absolute inset-0 z-0">
                    <img src={dev.img} alt={dev.name} className="w-full h-full object-cover opacity-30 group-hover:opacity-50 transition-opacity duration-300 mix-blend-luminosity" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/60 to-transparent"></div>
                  </div>
                  
                  <div className="p-6 flex flex-col justify-between h-full relative z-10">
                    <div className="flex justify-between items-start mb-4">
                      <div className={`p-3 rounded-full backdrop-blur-md ${devices[dev.id] ? 'bg-neon-blue/30 text-neon-blue shadow-[0_0_15px_rgba(0,243,255,0.4)] border border-neon-blue/50' : 'bg-white/10 text-gray-300 border border-white/10'}`}>
                        {dev.icon}
                      </div>
                      <div 
                        onClick={() => toggleDevice(dev.id)}
                        className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${devices[dev.id] ? 'bg-neon-blue' : 'bg-gray-700'}`}
                      >
                        <div className={`w-4 h-4 rounded-full bg-white transition-transform ${devices[dev.id] ? 'translate-x-6' : 'translate-x-0'}`}></div>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white drop-shadow-md">{dev.name}</h3>
                      <p className="text-gray-300 text-sm drop-shadow-md">{dev.room}</p>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Add New Device Card */}
              <div className="glass-card border-dashed border-2 border-glass-border p-6 flex flex-col items-center justify-center min-h-[220px] cursor-pointer hover:bg-white/5 hover:border-neon-blue/50 transition-colors">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-gray-400 mb-2">
                  <span className="text-2xl">+</span>
                </div>
                <p className="text-gray-400 font-medium">Add Device</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Automation Tab */}
        {activeTab === 'automation' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8 max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Routines & Automation</h2>
              <button className="btn-primary py-2 px-4 text-sm flex items-center gap-2">
                <span className="text-xl leading-none">+</span> New Routine
              </button>
            </div>
            <div className="space-y-4">
              {[
                { name: 'Good Morning', icon: <Sun />, time: '07:00 AM', status: true, desc: 'Turns on bedroom lights, opens blinds, starts coffee maker.' },
                { name: 'Away Mode', icon: <Shield />, time: 'When leaving home', status: true, desc: 'Locks all doors, turns off all lights, arms security system.' },
                { name: 'Movie Time', icon: <Video />, time: 'Manual', status: false, desc: 'Dims living room lights to 10%, turns on TV and sound system.' },
                { name: 'Good Night', icon: <Moon />, time: '11:30 PM', status: true, desc: 'Turns off all lights, sets AC to 24°C, locks front door.' }
              ].map((routine, i) => (
                <div key={i} className="glass-card p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex items-center gap-4">
                    <div className={`p-4 rounded-xl ${routine.status ? 'bg-gradient-to-br from-purple-500/20 to-blue-500/20 text-neon-blue border border-neon-blue/30' : 'bg-white/5 text-gray-500'}`}>
                      {routine.icon}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold flex items-center gap-3">
                        {routine.name}
                        <span className="text-xs font-mono bg-white/10 px-2 py-1 rounded text-gray-300">{routine.time}</span>
                      </h3>
                      <p className="text-gray-400 text-sm mt-1 max-w-xl">{routine.desc}</p>
                    </div>
                  </div>
                  <div className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${routine.status ? 'bg-neon-purple' : 'bg-gray-700'}`}>
                    <div className={`w-4 h-4 rounded-full bg-white transition-transform ${routine.status ? 'translate-x-6' : 'translate-x-0'}`}></div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8 max-w-7xl mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold mb-8">Account Settings</h2>
            
            <div className="space-y-8">
              {/* Profile Section */}
              <div className="glass-panel p-6">
                <h3 className="text-lg font-semibold mb-4 border-b border-glass-border pb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-neon-blue" /> Profile Information
                </h3>
                <div className="flex items-center gap-6 mb-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 overflow-hidden">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${settingsForm.name}`} alt="Profile" />
                  </div>
                  <div>
                    <button className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg text-sm transition-colors mb-2">Change Avatar</button>
                    <p className="text-xs text-gray-400">JPG, GIF or PNG. Max size of 800K</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Full Name</label>
                    <input 
                      type="text" 
                      value={settingsForm.name} 
                      onChange={(e) => setSettingsForm({...settingsForm, name: e.target.value})}
                      className="w-full bg-white/5 border border-glass-border rounded-lg px-4 py-2 text-white outline-none focus:border-neon-blue transition-colors" 
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Email Address</label>
                    <input 
                      type="email" 
                      value={settingsForm.email} 
                      onChange={(e) => setSettingsForm({...settingsForm, email: e.target.value})}
                      className="w-full bg-white/5 border border-glass-border rounded-lg px-4 py-2 text-white outline-none focus:border-neon-blue transition-colors" 
                    />
                  </div>
                </div>
              </div>

              {/* Network Settings */}
              <div className="glass-panel p-6">
                <h3 className="text-lg font-semibold mb-4 border-b border-glass-border pb-4 flex items-center gap-2">
                  <Wifi className="w-5 h-5 text-neon-purple" /> Home Network
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Primary Wi-Fi</p>
                      <p className="text-sm text-gray-400">Home_Network_5G</p>
                    </div>
                    <span className="text-green-400 text-sm bg-green-400/10 px-3 py-1 rounded-full">Connected</span>
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-white/5">
                    <div>
                      <p className="font-medium">Guest Network</p>
                      <p className="text-sm text-gray-400">Home_Guest</p>
                    </div>
                    <div 
                      onClick={() => setSettingsForm({...settingsForm, guestNetwork: !settingsForm.guestNetwork})}
                      className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors ${settingsForm.guestNetwork ? 'bg-neon-blue' : 'bg-gray-700'}`}
                    >
                      <div className={`w-4 h-4 rounded-full bg-white transition-transform ${settingsForm.guestNetwork ? 'translate-x-6' : 'translate-x-0'}`}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end items-center gap-4">
                {isSaved && <span className="text-neon-green text-sm flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-neon-green"></span> Saved Successfully</span>}
                <button 
                  onClick={handleSaveSettings}
                  className="btn-primary py-2 px-8"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
