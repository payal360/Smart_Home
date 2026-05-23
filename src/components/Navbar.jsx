import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Home, Menu, X } from 'lucide-react';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Dashboard', to: '/dashboard' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'glass-panel py-3' : 'bg-transparent py-5'}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-[0_0_15px_rgba(0,243,255,0.5)]">
            <Home className="h-6 w-6 text-white" />
          </div>
          <span className="text-2xl font-bold tracking-normal">
            SmartHome<span className="text-neon-blue">_Manager</span>
          </span>
        </Link>

        <div className="hidden items-center space-x-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="text-gray-300 transition-all hover:text-neon-blue hover:drop-shadow-[0_0_8px_rgba(0,243,255,0.8)]"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-4 md:flex">
          <Link to="/dashboard" className="text-white transition-colors hover:text-neon-blue">
            Login
          </Link>
          <Link to="/dashboard" className="btn-primary px-5 py-2 text-sm">
            Register
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setMobileMenuOpen((isOpen) => !isOpen)}
          className="text-white md:hidden"
          aria-label="Toggle navigation"
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="glass-panel absolute left-0 top-full flex w-full flex-col items-center gap-4 py-4 md:hidden">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-300 transition-colors hover:text-neon-blue"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
