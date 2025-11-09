import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  ArrowUpRightIcon,
  CheckCircleIcon,
  LockClosedIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext';

/**
 * Login page with a premium marketing panel and glass form card to align
 * with the refreshed authenticated workspace aesthetic.
 */
export default function Login() {
  const { login, user, loading: authLoading } = useAuth();
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
      await login(email, password);
      router.push('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const sellingPoints = [
    'Publish to Instagram & Facebook simultaneously.',
    'Enhance every caption with AI in seconds.',
    'Track credits, billing and team seats effortlessly.',
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 -top-40 h-[28rem] bg-gradient-to-br from-sky-500/30 via-indigo-600/40 to-transparent blur-[160px]" />
        <div className="absolute inset-y-0 right-0 h-full w-1/2 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.12),_transparent_60%)]" />
      </div>
      <div className="relative mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-10 px-6 py-20 lg:flex-row lg:items-center">
        <header className="absolute  left-6 right-6 top-6 flex items-center justify-between text-sm text-slate-200">
          <Link href="/" legacyBehavior>
            <a className="text-2xl font-bold tracking-wide text-white hover:text-sky-300">Lead Surge</a>
          </Link>
        </header>
        <div className="hidden rounded-3xl border border-white/10 bg-white/5 px-10 py-12 text-slate-100 shadow-2xl shadow-slate-900/40 backdrop-blur-2xl lg:flex lg:flex-1 lg:flex-col">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-slate-300">
            <SparklesIcon className="h-4 w-4 text-sky-300" />
            Social Launchpad
          </div>
          <h1 className="mt-6 text-4xl font-semibold leading-tight text-white">
            Automate growth with a design-first control center.
          </h1>
          <p className="mt-4 text-sm text-slate-300">
            Plan campaigns, boost captions with AI and see every credit, subscription and automation health metric in a single
            canvas.
          </p>
          <ul className="mt-8 space-y-5">
            {sellingPoints.map((point) => (
              <li key={point} className="flex items-start gap-3 text-sm leading-relaxed text-slate-200">
                <CheckCircleIcon className="mt-0.5 h-5 w-5 text-emerald-300" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
          <div className="mt-12 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-xs font-semibold uppercase tracking-[0.35em] text-slate-300">
            <LockClosedIcon className="h-4 w-4 text-sky-200" />
            SOC2 ready infra
          </div>
        </div>
        <div className="relative w-full max-w-md rounded-3xl border border-white/10 bg-white/10 p-8 shadow-2xl shadow-slate-900/40 backdrop-blur-2xl">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Welcome back</p>
              <h2 className="mt-2 text-3xl font-semibold text-white">Sign in</h2>
            </div>
            <Link href="/signup" legacyBehavior>
              <a className="inline-flex items-center gap-1 text-sm font-medium text-sky-300 hover:text-white">
                Create account
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
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@brand.com"
                className="mt-2 w-full rounded-2xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
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
                placeholder="********"
                className="mt-2 w-full rounded-2xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-500/30"
              />
            </div>
            <button
              type="submit"
              disabled={loading || authLoading}
              className="mt-2 w-full rounded-2xl bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/30 transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Signing in...' : authLoading ? 'Checking session...' : 'Sign in'}
            </button>
          </form>
          <p className="mt-6 text-xs text-slate-400">
            Protected by 256-bit encryption. Need help?{' '}
            <a href="mailto:support@leadsuite.ai" className="text-sky-300 hover:text-white">
              Contact support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
