import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  Bars3Icon,
  CalendarDaysIcon,
  ChatBubbleLeftRightIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  CreditCardIcon,
  CurrencyDollarIcon,
  HashtagIcon,
  ShieldCheckIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { useAuth } from '../context/AuthContext';

/**
 * Layout component that wraps authenticated pages. It provides a sidebar
 * navigation, a header with user information and a logout button, and a
 * content area. The navigation highlights the active route and adapts to
 * whether the user is an admin.
 */
export default function Layout({ children }) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      router.push('/');
    }
  };

  // Navigation definition with descriptions used for hero copy & sidebar
  const nav = [
    {
      href: '/dashboard',
      label: 'Dashboard',
      description: 'Performance overview & quick KPIs',
      icon: ChartBarIcon,
    },
    {
      href: '/hashtag-discovery',
      label: 'Hashtag Discovery',
      description: 'AI-powered trending topics',
      icon: HashtagIcon,
    },
    {
      href: '/post-scheduler',
      label: 'Post Scheduler',
      description: 'Plan & publish cross-network',
      icon: CalendarDaysIcon,
    },
    {
      href: '/dm-templates',
      label: 'DM Automation',
      description: 'Personalised outreach flows',
      icon: ChatBubbleLeftRightIcon,
    },
    {
      href: '/subscription',
      label: 'Subscription',
      description: 'Billing status & plan',
      icon: CreditCardIcon,
    },
    {
      href: '/credits',
      label: 'Credits',
      description: 'Usage history & boosts',
      icon: CurrencyDollarIcon,
    },
    {
      href: '/account',
      label: 'Account Settings',
      description: 'Profile & security',
      icon: Cog6ToothIcon,
    },
  ];

  if (user && user.role === 'admin') {
    nav.push({
      href: '/admin/users',
      label: 'Admin Users',
      description: 'Manage customer access',
      icon: ShieldCheckIcon,
    });
  }

  const current = nav.find((n) => n.href === router.pathname);

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 -top-40 h-[28rem] bg-gradient-to-br from-sky-500/30 via-indigo-600/40 to-transparent blur-[160px]" />
        <div className="absolute -bottom-32 -right-12 h-96 w-96 rounded-full bg-gradient-to-br from-fuchsia-500/40 via-purple-500/30 to-transparent blur-[180px]" />
      </div>
      <div className="relative flex min-h-screen">
        <aside
          className={`fixed inset-y-0 left-0 z-30 w-72 border-r border-white/10 bg-white/10 px-6 py-8 backdrop-blur-2xl transition-transform duration-300 sm:static sm:translate-x-0 ${
            mobileNavOpen ? 'translate-x-0' : '-translate-x-full sm:translate-x-0'
          }`}
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-md uppercase tracking-[0.35em] text-slate-300">Lead Surge</p>
              <h2 className="mt-2 text-2xl font-semibold text-white">Social Pilot</h2>
              <p className="mt-1 text-xs text-slate-400">Craft, automate and convert</p>
            </div>
            <button
              type="button"
              className="rounded-full border border-white/20 p-2 text-slate-200 transition hover:text-white sm:hidden"
              onClick={() => setMobileNavOpen(false)}
              aria-label="Close menu"
            >
              <XMarkIcon className="h-5 w-5" />
            </button>
          </div>
          <nav className="mt-8 space-y-2 overflow-y-auto pb-4">
            {nav.map((item) => {
              const active = router.pathname === item.href;
              const Icon = item.icon;
              return (
                <Link key={item.href} href={item.href} legacyBehavior>
                  <a
                    onClick={() => setMobileNavOpen(false)}
                    className={`group flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm transition ${
                      active
                        ? 'border-white/30 bg-white/15 text-white shadow-lg shadow-slate-900/40'
                        : 'border-transparent text-slate-300 hover:border-white/20 hover:bg-white/5'
                    }`}
                  >
                    <span
                      className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                        active ? 'bg-white/20 text-white' : 'bg-white/5 text-slate-400 group-hover:text-white'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="flex flex-col">
                      <span className="font-semibold">{item.label}</span>
                      <span className="text-xs text-slate-400">{item.description}</span>
                    </div>
                  </a>
                </Link>
              );
            })}
          </nav>
          {user && (
            <div className="mt-8 rounded-2xl border border-white/10 bg-gradient-to-br from-slate-900/70 to-slate-800/40 px-5 py-6 text-sm shadow-2xl shadow-slate-950/40">
              <p className="text-xs uppercase tracking-wide text-slate-400">Logged in as</p>
              <p className="mt-1 truncate text-base font-semibold text-white">{user.email}</p>
              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-white/5 p-3 text-center">
                  <p className="text-[0.6rem] uppercase tracking-widest text-slate-400">Credits</p>
                  <p className="mt-1 text-lg font-semibold text-white">{user.credits ?? 0}</p>
                </div>
                <div className="rounded-xl bg-white/5 p-3 text-center">
                  <p className="text-[0.6rem] uppercase tracking-widest text-slate-400">Status</p>
                  <p className="mt-1 text-sm font-semibold text-white">{user.subscriptionStatus || 'Inactive'}</p>
                </div>
              </div>
              <Link href="/credits" legacyBehavior>
                <a className="mt-5 inline-flex w-full items-center justify-center rounded-xl bg-white/90 px-4 py-2 text-sm font-semibold text-slate-900 transition hover:bg-white">
                  Boost credits
                </a>
              </Link>
            </div>
          )}
        </aside>
        {mobileNavOpen && (
          <button
            type="button"
            className="fixed inset-0 z-20 bg-slate-950/60 backdrop-blur-sm sm:hidden"
            onClick={() => setMobileNavOpen(false)}
            aria-label="Close navigation overlay"
          />
        )}
        <div className="flex flex-1 flex-col">
          <header className="border-b border-white/10 bg-white/5 backdrop-blur-xl">
            <div className="flex flex-col gap-6 px-4 py-5 sm:px-10">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      className="rounded-full border border-white/20 p-2 text-slate-200 hover:text-white sm:hidden"
                      onClick={() => setMobileNavOpen(true)}
                      aria-label="Open menu"
                    >
                      <Bars3Icon className="h-5 w-5" />
                    </button>
                    <div>
                      <p className="text-xs uppercase tracking-[0.35em] text-slate-400">Workspace</p>
                      <h1 className="text-2xl font-semibold text-white">
                        {current?.label || 'LeadGen Workspace'}
                      </h1>
                    </div>
                  </div>
                  <p className="mt-2 max-w-2xl text-sm text-slate-300">
                    {current?.description ||
                      'Craft content, automate messaging, and stay ahead of every social trend.'}
                  </p>
                </div>
                {user && (
                  <button
                    onClick={handleLogout}
                    className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
                  >
                    Logout
                  </button>
                )}
              </div>
              {user && (
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-slate-200">
                    <CurrencyDollarIcon className="h-4 w-4 text-sky-300" />
                    <span className="text-slate-400">Credits</span>
                    <span className="font-semibold text-white">{user.credits ?? 0}</span>
                  </div>
                  <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-slate-200">
                    <CreditCardIcon className="h-4 w-4 text-emerald-300" />
                    <span className="text-slate-400">Subscription</span>
                    <span className="font-semibold text-white">
                      {user.subscriptionStatus || 'inactive'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-slate-200">
                    <ShieldCheckIcon className="h-4 w-4 text-purple-300" />
                    <span className="text-slate-400">Role</span>
                    <span className="font-semibold text-white">{user.role || 'customer'}</span>
                  </div>
                </div>
              )}
            </div>
          </header>
          <main className="flex-1 overflow-y-auto px-4 py-8 sm:px-10">{children}</main>
        </div>
      </div>
    </div>
  );
}
