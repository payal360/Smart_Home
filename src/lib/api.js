const API = import.meta.env.VITE_API_BASE || 'http://localhost:4000';

async function fetchJSON(path, opts = {}) {
  const res = await fetch(`${API}${path}`, opts);
  if (!res.ok) {
    const txt = await res.text().catch(() => '');
    const err = new Error(`API error ${res.status} ${res.statusText}`);
    err.status = res.status;
    err.body = txt;
    throw err;
  }
  return res.json();
}

export function getPlans() {
  return fetchJSON('/api/plans');
}

export function getFaq() {
  return fetchJSON('/api/faq');
}

export function getTestimonials() {
  return fetchJSON('/api/testimonials');
}

export function getStats() {
  return fetchJSON('/api/stats');
}

export function getBilling() {
  return fetchJSON('/api/billing');
}

export async function register({ email, password }) {
  if (!email) throw new Error('email required');
  return fetchJSON('/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
}

export async function contact(payload) {
  return fetchJSON('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
}

export default {
  API,
  getPlans,
  getFaq,
  getTestimonials,
  getStats,
  getBilling,
  register
};
