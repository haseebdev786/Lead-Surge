import { useState } from 'react';
import Layout from '../components/Layout';
import withAuth from '../hoc/withAuth';
import { useAuth } from '../context/AuthContext';
import {
  heroPanelClass,
  panelClass,
  primaryButtonClass,
  infoTextClass,
  pillClass,
} from '../utils/ui';

/**
 * Subscription page. Displays the current subscription status and exposes
 * a button to start or manage a Stripe subscription checkout session. The
 * price ID for the subscription must be defined as an environment
 * variable. Upon successful session creation the user is redirected to
 * Stripe Checkout.
 */
function Subscription() {
  const { user } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const priceId = process.env.NEXT_PUBLIC_STRIPE_SUB_PRICE_ID || 'price_XXX';
  const plans = [
    {
      name: 'Starter',
      price: '$0 / mo',
      description: 'Great for testing the platform with manual credit boosts.',
      includes: ['10 starter credits', 'Manual Meta posting', 'Email support within 48h'],
      highlighted: false,
    },
    {
      name: 'Growth',
      price: '$49 / mo',
      description: 'Unlock automation, boosted AI throughput and priority support.',
      includes: [
        'Unlimited schedulers & DM automations',
        'Higher AI rate limits + credit bundles',
        'Priority support & onboarding call',
      ],
      highlighted: true,
    },
  ];

  async function subscribe() {
    setError('');
    setLoading(true);
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payments/subscription-session`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ priceId }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Could not create checkout session');
      // Redirect user to Stripe hosted checkout page
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
            <p className={pillClass}>Billing</p>
            <h2 className="text-4xl font-semibold text-white">Subscription</h2>
            <p className="text-sm text-slate-300">
              Activate a subscription to unlock higher posting limits, DM automations and priority AI throughput.
            </p>
          </div>
        </section>
        {error && (
          <p className="rounded-2xl border border-rose-400/30 bg-rose-500/10 px-4 py-2 text-sm text-rose-100">{error}</p>
        )}
        <section className={`${panelClass} space-y-4`}>
          <p className="text-lg text-white">
            Current plan:{' '}
            <span className="font-semibold capitalize text-white">{user?.subscriptionStatus || 'none'}</span>
          </p>
          <p className={infoTextClass}>
            Subscribe to unlock higher usage limits and additional features. Billing is handled securely via Stripe.
          </p>
          <button type="button" onClick={subscribe} disabled={loading} className={primaryButtonClass}>
            {loading ? 'Redirecting...' : 'Manage subscription'}
          </button>
          {!process.env.NEXT_PUBLIC_STRIPE_SUB_PRICE_ID && (
            <p className="text-xs text-amber-200">
              Warning: The Stripe price ID is not configured (NEXT_PUBLIC_STRIPE_SUB_PRICE_ID).
            </p>
          )}
        </section>
        <section className="grid gap-6 lg:grid-cols-2">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`${panelClass} space-y-4 ${plan.highlighted ? 'border-sky-400/40 shadow-sky-500/30' : ''}`}
            >
              <div>
                <p className="text-sm uppercase tracking-[0.35em] text-slate-400">{plan.name}</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-semibold text-white">{plan.price}</p>
                  {plan.highlighted && (
                    <span className="rounded-full border border-sky-400/40 bg-sky-500/10 px-3 py-1 text-xs text-sky-100">
                      Recommended
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-300">{plan.description}</p>
              </div>
              <ul className="space-y-2 text-sm text-slate-200">
                {plan.includes.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-sky-300" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      </div>
    </Layout>
  );
}

export default withAuth(Subscription);
