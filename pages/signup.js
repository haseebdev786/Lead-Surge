import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  ArrowUpRightIcon,
  ShieldCheckIcon,
  SparklesIcon,
  UserPlusIcon,
} from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext';

/**
 * Signup page with a storytelling hero section and glass panel form to
 * keep parity with the refreshed login + dashboard experience.
 */
export default function Signup() {
  const { signup, user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && user) {
      router.replace('/dashboard');
    }
  }, [authLoading, user, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signup(email, password);
      router.push('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 -top-40 h-[28rem] bg-gradient-to-br from-indigo-500/30 via-fuchsia-500/30 to-transparent blur-[160px]" />
        <div className="absolute inset-y-0 left-0 h-full w-1/2 bg-[radial-gradient(circle_at_bottom,_rgba(147,51,234,0.16),_transparent_55%)]" />
      </div>
      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-10 px-6 py-12 lg:flex-row lg:items-center">
        <div className="rounded-3xl border border-white/10 bg-white/5 px-10 py-12 text-slate-100 shadow-2xl shadow-slate-900/40 backdrop-blur-2xl">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-slate-300">
            <SparklesIcon className="h-4 w-4 text-fuchsia-300" />
            Launch in minutes
          </div>
          <h1 className="mt-6 text-4xl font-semibold leading-tight text-white">
            Spin up a social command center for your brand.
          </h1>
          <p className="mt-4 text-sm text-slate-300">
            From caption co-pilots to DM automations, Lead Suite keeps your Meta ecosystem humming with live insights and
            billing clarity.
          </p>
          <div className="mt-8 grid gap-4 text-sm sm:grid-cols-2">
            {[
              'Connect Meta in under 90 seconds.',
              'Pay-as-you-go AI credits with instant provisioning.',
              'Workspace-grade access controls.',
              'In-app credit boosts via Stripe.',
            ].map((value) => (
              <div
                key={value}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 shadow-inner shadow-slate-900/20"
              >
                {value}
              </div>
            ))}
          </div>
          <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-slate-300">
            <ShieldCheckIcon className="h-4 w-4 text-emerald-300" />
            GDPR ready
          </div>
        </div>
        <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-white/10 p-8 shadow-2xl shadow-slate-900/40 backdrop-blur-2xl">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Create account</p>
              <h2 className="mt-2 text-3xl font-semibold text-white">Join Lead Suite</h2>
            </div>
            <Link href="/login" legacyBehavior>
              <a className="inline-flex items-center gap-1 text-sm font-medium text-sky-300 hover:text-white">
                Back to login
                <ArrowUpRightIcon className="h-4 w-4" />
              </a>
            </Link>
          </div>
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <p className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-sm text-red-100">{error}</p>
            )}
            <div>
              <label htmlFor="email" className="text-sm text-slate-300">
                Work email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="team@brand.com"
                className="mt-2 w-full rounded-2xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-fuchsia-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/30"
              />
            </div>
            <div>
              <label htmlFor="password" className="text-sm text-slate-300">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Create a secure passphrase"
                className="mt-2 w-full rounded-2xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-fuchsia-400 focus:outline-none focus:ring-2 focus:ring-fuchsia-500/30"
              />
            </div>
            <button
              type="submit"
              disabled={loading || authLoading}
              className="mt-2 w-full rounded-2xl bg-gradient-to-r from-fuchsia-400 via-purple-500 to-indigo-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/30 transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Creating account...' : authLoading ? 'Checking session...' : 'Start building'}
            </button>
          </form>
          <p className="mt-6 flex items-center gap-2 text-xs text-slate-400">
            <UserPlusIcon className="h-4 w-4 text-fuchsia-200" />
            Unlimited team members can be invited after setup.
          </p>
        </div>
      </div>
    </div>
  );
}

