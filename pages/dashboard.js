import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowTrendingUpIcon,
  BoltIcon,
  CalendarDaysIcon,
  ChatBubbleLeftRightIcon,
  ShieldCheckIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import Layout from '../components/Layout';
import withAuth from '../hoc/withAuth';
import { useAuth } from '../context/AuthContext';

/**
 * Dashboard with elevated visual language: gradient hero, stat tiles
 * and insight cards that mirror the refreshed shell experience.
 */
function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({ posts: 0, templates: 0 });
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchStats() {
      try {
        const token = localStorage.getItem('token');
        const [postsRes, templatesRes] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/dms/templates`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        let postsCount = 0;
        let templatesCount = 0;
        if (postsRes.ok) {
          const postsData = await postsRes.json();
          postsCount = postsData.length;
        }
        if (templatesRes.ok) {
          const templatesData = await templatesRes.json();
          templatesCount = templatesData.length;
        }
        setStats({ posts: postsCount, templates: templatesCount });
      } catch (err) {
        setError('Failed to load dashboard metrics');
      }
    }
    fetchStats();
  }, []);

  const formatNumber = (value) => Number(value ?? 0).toLocaleString();
  const metaConnected = Boolean(
    user?.meta?.longLivedToken && (user?.meta?.instagramBusinessAccountId || user?.meta?.facebookPageId)
  );
  const aiConfigured = Boolean(user?.ai?.apiKey || user?.ai?.provider);

  const statCards = useMemo(
    () => [
      {
        title: 'Credits available',
        value: formatNumber(user?.credits ?? 0),
        subtitle: 'AI generations ready to go',
        pill: 'AI Studio',
        icon: BoltIcon,
        iconBg: 'bg-sky-500/15 text-sky-300',
      },
      {
        title: 'Scheduled posts',
        value: formatNumber(stats.posts),
        subtitle: 'Queued or recently published',
        pill: 'Content Ops',
        icon: CalendarDaysIcon,
        iconBg: 'bg-emerald-500/15 text-emerald-300',
      },
      {
        title: 'DM templates',
        value: formatNumber(stats.templates),
        subtitle: 'Personalised flows ready to send',
        pill: 'Automation',
        icon: ChatBubbleLeftRightIcon,
        iconBg: 'bg-fuchsia-500/20 text-fuchsia-200',
      },
      {
        title: 'Automation health',
        value: metaConnected && aiConfigured ? 'All green' : 'Action needed',
        subtitle: `Meta ${metaConnected ? 'connected' : 'reconnect'} - AI ${aiConfigured ? 'ready' : 'configure'}`,
        pill: 'Integrity',
        icon: ShieldCheckIcon,
        iconBg: metaConnected && aiConfigured ? 'bg-emerald-500/15 text-emerald-300' : 'bg-amber-500/20 text-amber-200',
      },
    ],
    [aiConfigured, metaConnected, stats.posts, stats.templates, user?.credits]
  );

  const insights = [
    {
      title: metaConnected ? 'Meta tokens synced' : 'Reconnect Meta',
      description: metaConnected
        ? 'Long-lived access tokens refreshed automatically. Scheduler will keep posting without pauses.'
        : 'We could not detect a live Meta connection. Re-authenticate to keep auto-publishing active.',
      positive: metaConnected,
    },
    {
      title: aiConfigured ? 'AI provider configured' : 'Add AI credentials',
      description: aiConfigured
        ? `Generating captions with ${user?.ai?.provider ?? 'OpenAI'} is ready.`
        : 'Plug in your OpenAI or Gemini key to unlock caption enhancement and hashtag discovery.',
      positive: aiConfigured,
    },
    {
      title: 'Templates library',
      description:
        stats.templates > 0
          ? `${stats.templates} DM templates are primed for outreach automations.`
          : 'Create your first DM template so Messenger automations feel on-brand.',
      positive: stats.templates > 0,
    },
  ];

  const quickActions = [
    {
      title: 'Schedule a post',
      description: 'Upload creative, set auto-publish and track credit usage.',
      href: '/post-scheduler',
    },
    {
      title: 'Discover hashtags',
      description: 'Use AI to surface hyper-relevant tags for upcoming launches.',
      href: '/hashtag-discovery',
    },
    {
      title: 'Boost credits',
      description: 'Top up instantly with secure Stripe checkout.',
      href: '/credits',
    },
  ];

  return (
    <Layout>
      <div className="space-y-8">
        {error && (
          <div className="rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">{error}</div>
        )}
        <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/80 via-slate-900/30 to-indigo-900/20 p-8 text-slate-100 shadow-2xl shadow-slate-950/30">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-slate-400">
                <SparklesIcon className="h-4 w-4 text-sky-300" />
                Welcome back
              </div>
              <h2 className="mt-4 text-4xl font-semibold text-white">
                {user?.email ? `Hey, ${user.email.split('@')[0]}` : 'Your social studio'}
              </h2>
              <p className="mt-3 max-w-2xl text-sm text-slate-300">
                Monitor credits, track automation health and jump straight into your next campaign with quick actions.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-center">
                <p className="text-[0.65rem] uppercase tracking-[0.35em] text-slate-400">Credits</p>
                <p className="mt-2 text-3xl font-semibold text-white">{formatNumber(user?.credits ?? 0)}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-center">
                <p className="text-[0.65rem] uppercase tracking-[0.35em] text-slate-400">Subscription</p>
                <p className="mt-2 text-base font-semibold text-white">{user?.subscriptionStatus || 'inactive'}</p>
              </div>
            </div>
          </div>
          <div className="mt-8 grid gap-4 text-xs text-slate-300 sm:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              <p className="text-slate-400">Next publish</p>
              <p className="mt-1 text-sm text-white">
                {stats.posts > 0 ? 'Scheduled in queue' : 'No posts scheduled'}
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              <p className="text-slate-400">Templates live</p>
              <p className="mt-1 text-sm text-white">
                {stats.templates > 0 ? `${formatNumber(stats.templates)} ready` : 'None yet'}
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
              <p className="text-slate-400">Workspace health</p>
              <p className="mt-1 text-sm text-white">
                {metaConnected && aiConfigured ? 'All systems operational' : 'Check connections'}
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-5 lg:grid-cols-2 xl:grid-cols-4">
          {statCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 text-slate-100 shadow-lg shadow-slate-950/20"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[0.55rem] uppercase tracking-[0.35em] text-slate-400">{card.pill}</p>
                    <h3 className="mt-2 text-lg font-semibold text-white">{card.title}</h3>
                  </div>
                  <span className={`rounded-2xl p-3 ${card.iconBg}`}>
                    <Icon className="h-5 w-5" />
                  </span>
                </div>
                <p className="mt-6 text-3xl font-semibold text-white">{card.value}</p>
                <p className="mt-2 text-sm text-slate-400">{card.subtitle}</p>
              </div>
            );
          })}
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-slate-100 shadow-lg shadow-slate-950/20">
            <div className="flex items-center gap-3">
              <ArrowTrendingUpIcon className="h-5 w-5 text-sky-300" />
              <h3 className="text-lg font-semibold text-white">Automation pulse</h3>
            </div>
            <ul className="mt-5 space-y-4">
              {insights.map((insight) => (
                <li
                  key={insight.title}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-white">{insight.title}</p>
                    <span
                      className={`rounded-full px-3 py-1 text-xs ${
                        insight.positive ? 'bg-emerald-500/15 text-emerald-200' : 'bg-amber-500/15 text-amber-200'
                      }`}
                    >
                      {insight.positive ? 'Healthy' : 'Action'}
                    </span>
                  </div>
                  <p className="mt-1 text-slate-400">{insight.description}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-slate-100 shadow-lg shadow-slate-950/20">
            <div className="flex items-center gap-3">
              <BoltIcon className="h-5 w-5 text-amber-200" />
              <h3 className="text-lg font-semibold text-white">Quick actions</h3>
            </div>
            <div className="mt-5 space-y-4">
              {quickActions.map((action) => (
                <Link key={action.title} href={action.href} legacyBehavior>
                  <a className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 transition hover:border-white/30 hover:bg-white/10">
                    <div>
                      <p className="font-semibold text-white">{action.title}</p>
                      <p className="text-slate-400">{action.description}</p>
                    </div>
                    <ArrowTrendingUpIcon className="h-5 w-5 text-sky-300" />
                  </a>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}

export default withAuth(Dashboard);
