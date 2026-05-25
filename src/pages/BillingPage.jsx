import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import api from '../lib/api';

const BillingPage = () => {
  const [billing, setBilling] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        const b = await api.getBilling();
        setBilling(b);
      } catch (e) {
        console.warn('failed to load billing', e);
      }
    })();
  }, []);

  return (
    <div className="min-h-screen text-white bg-[#0f172a] selection:bg-neon-blue/30 relative">
  <div className="fixed top-0 left-1/2 -translate-x-1/2 w-72 h-72 md:w-96 md:h-96 bg-neon-blue/20 rounded-full blur-[120px] pointer-events-none"></div>
      <Navbar />

      <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto relative z-10">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold">Billing <span className="neon-text-blue">Information</span></h1>
          <p className="text-gray-400 mt-3">Manage subscriptions, invoices and payment methods securely.</p>
        </div>

        <div className="glass-panel p-8 rounded-2xl">
          <h3 className="text-xl font-bold mb-4">Payment Methods</h3>
          <p className="text-gray-300">We accept major credit cards and secure direct debit. For Enterprise customers we support invoicing and purchase orders.</p>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white/5 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Payment Methods</h4>
              {billing?.methods ? (
                <ul className="text-gray-300">
                  {billing.methods.map((m, i) => (
                    <li key={i} className="py-1">{m}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400">No methods available.</p>
              )}
            </div>
            <div className="bg-white/5 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Invoices</h4>
              {billing?.invoices && billing.invoices.length > 0 ? (
                <ul className="text-gray-300">
                  {billing.invoices.map((inv) => (
                    <li key={inv.id} className="py-1">{inv.id} — {inv.amount}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-400">No invoices yet.</p>
              )}
            </div>
          </div>

          <div className="mt-6">
            <a className="btn-primary" href="/pricing">Back to Pricing</a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BillingPage;
