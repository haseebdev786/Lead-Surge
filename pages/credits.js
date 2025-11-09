import { useState } from 'react';
import Layout from '../components/Layout';
import withAuth from '../hoc/withAuth';
import { useAuth } from '../context/AuthContext';
import {
  heroPanelClass,
  panelClass,
  inputClass,
  primaryButtonClass,
  infoTextClass,
  pillClass,
  mutedLabelClass,
} from '../utils/ui';

/**
 * Credits page. Displays the user's current credit balance and provides
 * a form to purchase additional credits via Stripe. The quantity and
 * price ID are configurable via environment variables. When the user
 * initiates a purchase they are redirected to Stripe Checkout.
 */
function Credits() {
  const { user } = useAuth();
  const [creditsToBuy, setCreditsToBuy] = useState(10);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const priceId = process.env.NEXT_PUBLIC_STRIPE_CREDIT_PRICE_ID || 'price_YYY';

  async function purchaseCredits() {
    setError('');
    setLoading(true);
    const qty = parseInt(creditsToBuy, 10);
    if (!qty || qty <= 0) {
      setError('Please enter a valid number of credits');
      setLoading(false);
      return;
    }
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payments/credits-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ credits: qty, priceId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create checkout session');
      window.location.href = data.url;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout>
      <div className="space-y-8">
        <section className={heroPanelClass}>
          <div className="flex flex-col gap-4">
            <p className={pillClass}>Usage wallet</p>
            <h2 className="text-4xl font-semibold text-white">Credits</h2>
            <p className="text-sm text-slate-300">
              Purchase more AI credits instantly. Every generation and scheduled publish keeps you in the loop.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-center">
                <p className="text-[0.65rem] uppercase tracking-[0.35em] text-slate-400">Current balance</p>
                <p className="mt-2 text-3xl font-semibold text-white">{user?.credits ?? 0}</p>
              </div>
            </div>
          </div>
        </section>
        {error && (
          <p className="rounded-2xl border border-rose-400/30 bg-rose-500/10 px-4 py-2 text-sm text-rose-100">{error}</p>
        )}
        <section className={`${panelClass} space-y-5`}>
          <div>
            <label htmlFor="credits" className={mutedLabelClass}>
              Credits to purchase
            </label>
            <input
              id="credits"
              type="number"
              min="1"
              value={creditsToBuy}
              onChange={(e) => setCreditsToBuy(e.target.value)}
              className={inputClass}
            />
          </div>
          <button type="button" onClick={purchaseCredits} disabled={loading} className={primaryButtonClass}>
            {loading ? 'Redirecting...' : 'Purchase credits'}
          </button>
          <p className={infoTextClass}>
            You will be redirected to a secure Stripe Checkout to complete the purchase.
          </p>
          {!process.env.NEXT_PUBLIC_STRIPE_CREDIT_PRICE_ID && (
            <p className="text-xs text-amber-200">
              Warning: The Stripe credit price ID is not configured (NEXT_PUBLIC_STRIPE_CREDIT_PRICE_ID).
            </p>
          )}
        </section>
      </div>
    </Layout>
  );
}

export default withAuth(Credits);
