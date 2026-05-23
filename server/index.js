import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Sample data
const plans = [
  {
    name: 'Starter',
    price: { monthly: 'Free', yearly: 'Free' },
    desc: 'Perfect for basic home automation needs.',
    features: ['Up to 5 devices', 'Basic scheduling', 'Community support', '1 user account'],
    limitations: ['No advanced analytics', 'No voice control', 'No automated routines'],
    popular: false
  },
  {
    name: 'Pro',
    price: { monthly: '$14.99', yearly: '$11.99' },
    desc: 'Ideal for fully connected smart homes.',
    features: ['Unlimited devices', 'Advanced analytics & insights', 'Voice command integration', 'Unlimited routines', 'Priority 24/7 support', 'Up to 5 user accounts'],
    limitations: [],
    popular: true
  },
  {
    name: 'Enterprise',
    price: { monthly: '$49.99', yearly: '$39.99' },
    desc: 'For complex ecosystems and businesses.',
    features: ['Everything in Pro', 'Custom API access', 'White-glove onboarding', 'Dedicated account manager', 'Advanced security protocols'],
    limitations: [],
    popular: false
  }
];

const faq = [
  { q: 'What payment methods do you accept?', a: 'We accept major credit cards and secure direct debit. Enterprise customers can request invoicing and PO support.' },
  { q: 'Can I change plans later?', a: 'Yes — you can upgrade or downgrade anytime. We apply prorated credits when switching billing cycles.' },
  { q: 'Do you offer an SLA for enterprise?', a: 'Enterprise customers receive a tailored SLA and priority support; contact sales for details.' },
  { q: 'Is my data private and secure?', a: 'Yes. Data is encrypted in transit and at rest. We follow industry best practices for security and privacy.' }
];

const testimonials = [
  { quote: 'SmartHome transformed how I manage lights and climate — huge energy savings.', name: 'Aisha R.', role: 'Homeowner' },
  { quote: "We deployed SmartHome across our office locations with zero downtime.", name: 'Carlos M.', role: 'IT Manager' },
  { quote: 'The automation and analytics are top-notch — love the mobile app.', name: 'Priya S.', role: 'Product Manager' }
];

const stats = [
  { label: 'Connected Devices', value: '12,842' },
  { label: 'Automations Run /mo', value: '1.2M' },
  { label: 'kWh Saved', value: '34,500' },
  { label: 'Avg. Response', value: '220ms' }
];

app.get('/api/plans', (req, res) => res.json(plans));
app.get('/api/faq', (req, res) => res.json(faq));
app.get('/api/testimonials', (req, res) => res.json(testimonials));
app.get('/api/stats', (req, res) => res.json(stats));

// Simple billing info endpoint
app.get('/api/billing', (req, res) => {
  res.json({ methods: ['Visa', 'MasterCard', 'AMEX'], invoices: [] });
});

// Simple register/auth stub
app.post('/api/register', (req, res) => {
  const { email, password } = req.body || {};
  if (!email) return res.status(400).json({ error: 'email required' });
  // In a real app we'd validate + store user; here we return a fake success
  return res.json({ success: true, user: { email, id: Date.now() } });
});

// Simple contact form endpoint for front-end contact submissions
app.post('/api/contact', (req, res) => {
  const { firstName, lastName, email, message } = req.body || {};
  if (!email || !message) {
    return res.status(400).json({ error: 'email and message required' });
  }

  // In a production app you'd persist this to a database or send an email.
  console.log('Contact submission received:', { firstName, lastName, email, message });

  return res.json({ success: true, received: { firstName, lastName, email } });
});

app.listen(PORT, () => {
  console.log(`Backend API listening on http://localhost:${PORT}`);
});
