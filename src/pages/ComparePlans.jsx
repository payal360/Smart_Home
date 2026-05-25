import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Check } from 'lucide-react';
z
const ComparePlans = () => {
  // plans are available via static rows for now; API fetch removed to avoid unused state
  const rows = [
    ['Feature', 'Starter', 'Pro', 'Enterprise'],
    ['Devices', 'Up to 5', 'Unlimited', 'Unlimited'],
    ['Scheduling', 'Basic', 'Advanced', 'Advanced'],
    ['Analytics', '—', 'Yes', 'Yes'],
    ['Voice Control', '—', 'Yes', 'Yes'],
    ['API Access', '—', '—', 'Yes'],
    ['Support', 'Community', 'Priority 24/7', 'Dedicated']
  ];

  // keep API available in lib/api for other pages

  return (
    <div className="min-h-screen text-white bg-[#0f172a] selection:bg-neon-blue/30 relative">
  <div className="fixed top-0 left-1/2 -translate-x-1/2 w-72 h-72 md:w-96 md:h-96 bg-neon-blue/20 rounded-full blur-[120px] pointer-events-none"></div>
      <Navbar />

      <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold">Compare <span className="neon-text-blue">Plans</span></h1>
          <p className="text-gray-400 mt-3">Side-by-side feature comparison to pick exactly what you need.</p>
        </div>

        <div className="overflow-x-auto bg-transparent rounded-xl">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-sm text-gray-400">
                {rows[0].map((h, i) => (
                  <th key={i} className={`py-4 px-6 ${i === 0 ? 'w-1/3' : 'w-1/6'}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.slice(1).map((r, idx) => (
                <tr key={idx} className="border-t border-white/5">
                  {r.map((cell, c) => (
                    <td key={c} className={`py-4 px-6 ${c === 0 ? 'font-semibold text-gray-200' : 'text-gray-300'}`}>
                      {cell === 'Yes' ? <Check className="inline w-4 h-4 text-neon-blue mr-2" /> : cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 text-center">
          <a href="/pricing" className="btn-primary inline-block">Back to Pricing</a>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ComparePlans;
