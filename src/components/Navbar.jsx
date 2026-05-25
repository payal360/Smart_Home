import { useState, useEffect } from 'react';
import { Home, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = ({ onOpenAuth }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHome = location.pathname === '/';

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Features', path: '/features' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled || !isHome ? 'glass-panel py-3 shadow-[0_4px_30px_rgba(0,0,0,0.3)]' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-blue to-neon-purple flex items-center justify-center shadow-[0_0_15px_rgba(0,243,255,0.5)] group-hover:shadow-[0_0_25px_rgba(176,38,255,0.6)] transition-all">
            <Home className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-white">SmartHome<span className="text-neon-blue">_Manager</span></span>
        </Link>
        
        <div className="hidden md:flex space-x-8 items-center">
          {navLinks.map((item) => (
            <Link 
              key={item.name} 
              to={item.path} 
              className={`text-sm font-medium transition-all ${location.pathname === item.path ? 'text-neon-blue drop-shadow-[0_0_8px_rgba(0,243,255,0.8)]' : 'text-gray-300 hover:text-neon-blue'}`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          {onOpenAuth ? (
            <button onClick={() => onOpenAuth('register')} className="btn-primary py-2 px-6 text-sm font-semibold rounded-full shadow-[0_0_15px_rgba(0,243,255,0.3)] hover:shadow-[0_0_25px_rgba(0,243,255,0.5)]">Register</button>
          ) : (
            <Link to="/dashboard" className="btn-primary py-2 px-6 text-sm font-semibold rounded-full">Go to App</Link>
          )}
        </div>

        <div className="md:hidden flex items-center">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white p-2 focus:outline-none">
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full glass-panel border-t border-glass-border py-4 flex flex-col items-center gap-4 shadow-2xl">
          {navLinks.map((item) => (
            <Link 
              key={item.name} 
              to={item.path} 
              onClick={() => setMobileMenuOpen(false)} 
              className={`text-lg font-medium ${location.pathname === item.path ? 'text-neon-blue' : 'text-gray-300'}`}
            >
              {item.name}
            </Link>
          ))}
          {onOpenAuth && (
            <button onClick={() => { onOpenAuth('register'); setMobileMenuOpen(false); }} className="btn-primary w-11/12 py-3 mt-2 rounded-xl text-center">
              Register
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
