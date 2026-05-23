import React, { useEffect, useState } from 'react';
import { Check, X } from 'lucide-react';
import api from '../lib/api';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Small accordion item used in FAQ
const AccordionItem = ({ title, content }) => {
	const [open, setOpen] = useState(false);
	return (
		<div className="bg-white/5 rounded-lg overflow-hidden">
			<button
				onClick={() => setOpen((o) => !o)}
				className="w-full flex items-center justify-between px-4 py-3 text-left"
				aria-expanded={open}
			>
				<span className="font-semibold">{title}</span>
				<span className={`transform transition-transform ${open ? 'rotate-180' : ''}`}>
					▾
				</span>
			</button>
			<div
				className={`px-4 transition-all duration-300 ${
					open ? 'py-3 opacity-100' : 'py-0 opacity-0'
				}`}
				style={{
					maxHeight: open ? '200px' : '0',
					overflow: 'hidden',
				}}
			>
				<p className="text-gray-300">{content}</p>
			</div>
		</div>
	);
};

const defaultPlans = [
	{
		name: 'Starter',
		price: { monthly: 'Free', yearly: 'Free' },
		desc: 'Perfect for basic home automation needs.',
		features: ['Up to 5 devices', 'Basic scheduling', 'Community support'],
		limitations: ['No advanced analytics', 'No voice control'],
		popular: false,
	},
	{
		name: 'Pro',
		price: { monthly: '$14.99', yearly: '$11.99' },
		desc: 'Ideal for fully connected smart homes.',
		features: [
			'Unlimited devices',
			'Advanced analytics',
			'Voice control',
			'Priority support',
		],
		limitations: [],
		popular: true,
	},
	{
		name: 'Enterprise',
		price: { monthly: '$49.99', yearly: '$39.99' },
		desc: 'For businesses and large homes.',
		features: ['Custom API access', 'Dedicated support', 'SLA & onboarding'],
		limitations: [],
		popular: false,
	},
];

export default function PricingPage() {
	const [plans, setPlans] = useState(defaultPlans);
	const [billing, setBilling] = useState('monthly');
	const [activeSlide, setActiveSlide] = useState(0);
	const [faq, setFaq] = useState([]);
	const [testimonials, setTestimonials] = useState([]);
	const [stats, setStats] = useState([]);

	useEffect(() => {
			(async () => {
				try {
					const [plansRes, faqRes, testimonialsRes, statsRes] = await Promise.all([
						api.getPlans(),
						api.getFaq(),
						api.getTestimonials(),
						api.getStats()
					]);
					if (plansRes && Array.isArray(plansRes)) setPlans(plansRes);
					if (faqRes && Array.isArray(faqRes)) setFaq(faqRes);
					if (testimonialsRes && Array.isArray(testimonialsRes)) setTestimonials(testimonialsRes);
					if (statsRes && Array.isArray(statsRes)) setStats(statsRes);
				} catch (e) {
					console.warn('PricingPage fetch failed, using defaults', e);
				}
			})();
	}, []);

	const prevSlide = () => setActiveSlide((s) => Math.max(0, s - 1));
	const nextSlide = () => setActiveSlide((s) => Math.min(2, s + 1));

	const faqDefaults = [
		{
			q: 'What payment methods do you accept?',
			a: 'We accept major credit cards and secure direct debit.',
		},
		{ q: 'Can I change plans?', a: 'Yes — upgrade or downgrade anytime.' },
	];

	return (
		<div className="min-h-screen text-white bg-[#0f172a]">
			<Navbar />
			<main className="max-w-6xl mx-auto p-6">
				<h1 className="text-4xl font-bold text-center mb-4">Pricing</h1>

				<div className="flex justify-center gap-3 mb-6">
					{['Pricing', 'Compare', 'Billing'].map((t, i) => (
						<button
							key={t}
							onClick={() => setActiveSlide(i)}
							className={`px-4 py-2 rounded-full ${
								activeSlide === i
									? 'bg-neon-blue text-black'
									: 'bg-white/5 text-gray-300'
							}`}
						>
							{t}
						</button>
					))}
				</div>

								<div className="relative overflow-hidden rounded-lg">
									<div
						className="flex transition-transform duration-500"
						style={{ transform: `translateX(-${activeSlide * 100}%)` }}
					>
												{/* Pricing slide */}
												<section className="w-full p-4 flex-shrink-0 flex-none">
							<div className="flex justify-center gap-3 mb-6">
								<button
									onClick={() => setBilling('monthly')}
									className={`px-4 py-2 rounded-full font-medium ${
										billing === 'monthly'
											? 'bg-white/5 text-white border border-white/10'
											: 'text-gray-400'
									}`}
								>
									Monthly
								</button>
								<button
									onClick={() => setBilling('yearly')}
									className={`px-4 py-2 rounded-full font-medium ${
										billing === 'yearly'
											? 'bg-neon-blue text-black'
											: 'text-gray-400'
									}`}
								>
									Yearly{' '}
									<span className="ml-2 text-sm text-gray-300">
										(save up to 20%)
									</span>
								</button>
							</div>

							<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
								{plans.map((plan, i) => {
									const displayPrice =
										typeof plan.price === 'string'
											? plan.price
											: billing === 'monthly'
											? plan.price.monthly
											: plan.price.yearly;
									const yearlySavings =
										typeof plan.price === 'object' &&
										plan.price.monthly &&
										plan.price.yearly
											? Math.round(
													(1 -
														parseFloat(
															String(plan.price.yearly).replace(
																/[^0-9.]/g,
																''
															)
														) /
														parseFloat(
															String(plan.price.monthly).replace(
																/[^0-9.]/g,
																''
															)
														)) *
														100
											  )
											: 0;
									return (
										<div
											key={i}
											className={`glass-panel p-8 rounded-3xl relative flex flex-col ${
												plan.popular
													? 'border-neon-blue shadow-[0_0_30px_rgba(0,243,255,0.12)] transform md:-translate-y-4 scale-[1.02]'
													: 'border-white/10'
											}`}
										>
											{plan.popular && (
												<div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-neon-blue text-black px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
													Most Popular
												</div>
											)}
											<h3 className="text-2xl font-bold mb-2">
												{plan.name}
											</h3>
											<p className="text-gray-400 mb-4 h-12">
												{plan.desc}
											</p>
											<div className="flex items-baseline gap-3 mb-6">
												<div className="text-4xl font-extrabold text-white">
													{displayPrice}
												</div>
												{billing === 'yearly' && yearlySavings > 0 && (
													<div className="text-sm bg-white/5 text-gray-200 px-2 py-1 rounded">
														Save ~{yearlySavings}%
													</div>
												)}
											</div>
											<ul className="flex-1 space-y-3 mb-6">
												{plan.features.map((f, idx) => (
													<li key={idx} className="flex items-center gap-3">
														<Check className="w-5 h-5 text-neon-blue" />{' '}
														<span className="text-gray-300">{f}</span>
													</li>
												))}
												{Array.isArray(plan.limitations) &&
													plan.limitations.map((l, idx) => (
														<li
															key={idx}
															className="flex items-center gap-3 opacity-50"
														>
															<X className="w-5 h-5 text-gray-500" />{' '}
															<span className="text-gray-500 line-through">
																{l}
															</span>
														</li>
													))}
											</ul>
											<button
												className={`w-full py-4 rounded-xl font-bold transition-all ${
													plan.popular
														? 'btn-primary text-black'
														: 'bg-white/5 hover:bg-white/10 border border-white/10'
												}`}
											>
												{(plan.price &&
													(plan.price.monthly === 'Free' ||
														plan.price === 'Free')) ? (
													`Get Started — It's Free`
												) : billing === 'monthly' ? (
													'Start 14-Day Trial'
												) : (
													'Start Yearly Plan'
												)}
											</button>
										</div>
									);
								})}
							</div>
						</section>

						{/* Compare slide */}
						<section className="w-full p-4 flex-shrink-0 flex-none">
							<h2 className="text-3xl font-bold mb-4">
								Compare <span className="neon-text-blue">Plans</span>
							</h2>
							<div className="overflow-x-auto bg-transparent rounded-xl">
								<table className="w-full text-left border-collapse">
									<thead>
										<tr className="text-sm text-gray-400">
											<th className="py-4 px-6 w-1/3">Feature</th>
											<th className="py-4 px-6">Starter</th>
											<th className="py-4 px-6">Pro</th>
											<th className="py-4 px-6">Enterprise</th>
										</tr>
									</thead>
									<tbody>
										{[
											['Devices', 'Up to 5', 'Unlimited', 'Unlimited'],
											['Scheduling', 'Basic', 'Advanced', 'Advanced'],
											['Analytics', '—', 'Yes', 'Yes'],
											['Voice Control', '—', 'Yes', 'Yes'],
											['API Access', '—', '—', 'Yes'],
											['Support', 'Community', 'Priority 24/7', 'Dedicated'],
										].map((row, r) => (
											<tr key={r} className="border-t border-white/5">
												{row.map((cell, c) => (
													<td
														key={c}
														className={`py-4 px-6 ${
															c === 0
																? 'font-semibold text-gray-200'
																: 'text-gray-300'
														}`}
													>
														{cell === 'Yes' ? (
															<Check className="inline w-4 h-4 text-neon-blue mr-2" />
														) : (
															cell
														)}
													</td>
												))}
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</section>

						{/* Billing slide */}
						<section className="w-full p-4 flex-shrink-0 flex-none">
							<h2 className="text-3xl font-bold mb-4">
								Billing <span className="neon-text-blue">Information</span>
							</h2>
							<div className="glass-panel p-8 rounded-2xl">
								<h3 className="text-xl font-bold mb-4">Payment Methods</h3>
								<p className="text-gray-300">
									We accept major credit cards and secure direct debit. Enterprise
									customers can request invoicing.
								</p>
								<div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
									<div className="bg-white/5 p-4 rounded-lg">
										Add / Manage Card
									</div>
									<div className="bg-white/5 p-4 rounded-lg">
										Billing History & Invoices
									</div>
								</div>
								<div className="mt-6">
									<button
										onClick={() => setActiveSlide(0)}
										className="btn-primary"
									>
										Back to Pricing
									</button>
								</div>
							</div>
						</section>
					</div>

					{/* Prev/Next */}
					<div className="absolute left-3 top-1/2 -translate-y-1/2">
						<button onClick={prevSlide} className="bg-white/5 p-2 rounded-full">
							‹
						</button>
					</div>
					<div className="absolute right-3 top-1/2 -translate-y-1/2">
						<button onClick={nextSlide} className="bg-white/5 p-2 rounded-full">
							›
						</button>
					</div>
				</div>

				<section className="mb-12">
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
						<div className="lg:col-span-2">
							<h3 className="text-2xl font-bold mb-4">
								Frequently Asked Questions
							</h3>
							<div className="space-y-3">
								{(faq.length ? faq : faqDefaults).map((it, idx) => (
									<AccordionItem
										key={idx}
										title={it.q || it.title}
										content={it.a || it.content}
									/>
								))}
							</div>
						</div>

						<div>
							<h3 className="text-2xl font-bold mb-4">What Our Customers Say</h3>
							<div className="space-y-6">
								{testimonials.length === 0 ? (
									<p className="text-gray-400 italic">
										No testimonials available.
									</p>
								) : (
									testimonials.map((t, idx) => (
										<div key={idx} className="bg-white/5 p-6 rounded-xl">
											<p className="text-gray-300 mb-4">{t.quote}</p>
											<div className="flex items-center gap-4">
												{t.avatar && (
													<img
														src={t.avatar}
														alt={t.name}
														className="w-12 h-12 rounded-full"
													/>
												)}
												<div>
													<p className="text-white font-semibold">{t.name}</p>
													<p className="text-gray-500 text-sm">
														{t.role}, {t.company}
													</p>
												</div>
											</div>
										</div>
									))
								)}
							</div>
						</div>
					</div>

					<div className="mb-12">
						<h3 className="text-2xl font-bold mb-6 text-center">
							Join Thousands of Happy Customers
						</h3>
						<div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
							{stats.length === 0 ? (
								<p className="text-gray-400 italic">No stats available.</p>
							) : (
								stats.map((stat, idx) => (
									<div key={idx} className="flex flex-col items-center">
										<div className="text-4xl font-extrabold text-neon-blue mb-2">
											{stat.value}
										</div>
										<div className="text-gray-500 text-sm">
											{stat.label}
										</div>
									</div>
								))
							)}
						</div>
					</div>

					<div className="text-center">
						<h3 className="text-3xl font-bold mb-4">
							Ready to Start Your Smart Home Journey?
						</h3>
						<p className="text-gray-400 mb-8">
							Choose the plan that fits your needs and budget.
						</p>
						<button className="btn-primary text-lg">Get Started Now</button>
					</div>
				</section>
			</main>

			<div className="h-20" />
			<Footer />
		</div>
	);
}
