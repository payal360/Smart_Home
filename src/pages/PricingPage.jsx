import React from 'react';
import { Check, X } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const PricingPage = () => {
  const plans = [
    {
      name: "Starter",
      price: "Free",
      desc: "Perfect for basic home automation needs.",
      features: ["Up to 5 devices", "Basic scheduling", "Community support", "1 user account"],
      limitations: ["No advanced analytics", "No voice control", "No automated routines"],
      popular: false
    },
    {
      name: "Pro",
      price: "$14.99/mo",
      desc: "Ideal for fully connected smart homes.",
      features: ["Unlimited devices", "Advanced analytics & insights", "Voice command integration", "Unlimited routines", "Priority 24/7 support", "Up to 5 user accounts"],
      limitations: [],
      popular: true
    },
    {
      name: "Enterprise",
      price: "$49.99/mo",
      desc: "For complex ecosystems and businesses.",
      features: ["Everything in Pro", "Custom API access", "White-glove onboarding", "Dedicated account manager", "Advanced security protocols"],
      limitations: [],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen text-white bg-[#0f172a] selection:bg-neon-blue/30 relative">
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-neon-blue/20 rounded-full blur-[120px] pointer-events-none"></div>
      
      <Navbar />

      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <h1 className="text-5xl font-bold mb-6">Simple, Transparent <span className="neon-text-blue">Pricing</span></h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-xl">Choose the perfect plan to orchestrate your smart living environment.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, i) => (
            <div key={i} className={`glass-panel p-8 rounded-3xl relative flex flex-col ${plan.popular ? 'border-neon-blue shadow-[0_0_30px_rgba(0,243,255,0.2)] transform md:-translate-y-4' : 'border-white/10'}`}>
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-neon-blue text-black px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-gray-400 mb-6 h-12">{plan.desc}</p>
              <div className="text-4xl font-bold text-white mb-8">{plan.price}</div>
              
              <div className="flex-1 space-y-6 mb-8">
                <div>
                  <ul className="space-y-4">
                    {plan.features.map((f, idx) => (
                      <li key={idx} className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-neon-blue flex-shrink-0" />
                        <span className="text-gray-300">{f}</span>
                      </li>
                    ))}
                    {plan.limitations.map((l, idx) => (
                      <li key={idx} className="flex items-center gap-3 opacity-50">
                        <X className="w-5 h-5 text-gray-500 flex-shrink-0" />
                        <span className="text-gray-500 line-through">{l}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <button className={`w-full py-4 rounded-xl font-bold transition-all ${plan.popular ? 'btn-primary text-black' : 'bg-white/5 hover:bg-white/10 border border-white/10'}`}>
                {plan.price === 'Free' ? 'Get Started' : 'Start 14-Day Trial'}
              </button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PricingPage;
