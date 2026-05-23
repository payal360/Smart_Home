import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative mt-20 overflow-hidden border-t border-glass-border bg-black/20 px-4 pb-8 pt-16 sm:px-6 lg:px-8">
      <div className="absolute left-1/2 top-0 h-px w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-neon-blue to-transparent opacity-50"></div>
      <div className="mx-auto mb-12 grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-4">
        <div className="col-span-1 md:col-span-2">
          <Link to="/" className="mb-4 flex items-center gap-2">
            <Home className="h-6 w-6 text-neon-blue drop-shadow-[0_0_8px_rgba(0,243,255,0.8)]" />
            <span className="text-2xl font-bold">
              SmartHome<span className="text-neon-blue">_Manager</span>
            </span>
          </Link>
          <p className="max-w-md text-gray-400">
            Elevating your living experience through intelligent automation and breathtaking design.
          </p>
        </div>

        <div>
          <h4 className="mb-4 text-lg font-semibold text-white">Quick Links</h4>
          <ul className="space-y-2 text-gray-400">
            <li>
              <Link to="/" className="transition hover:text-neon-blue">Home</Link>
            </li>
            <li>
              <Link to="/about" className="transition hover:text-neon-blue">About</Link>
            </li>
            <li>
              <Link to="/dashboard" className="transition hover:text-neon-blue">Dashboard</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-lg font-semibold text-white">Contact</h4>
          <ul className="space-y-2 text-gray-400">
            <li>support@smarthome.manager</li>
            <li>1-800-SMART-HM</li>
            <li className="flex gap-4 pt-4">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition hover:bg-neon-blue hover:text-black">X</span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition hover:bg-neon-blue hover:text-black">in</span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition hover:bg-neon-blue hover:text-black">fb</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto max-w-7xl border-t border-glass-border/50 pt-8 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} SmartHome_Manager. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
