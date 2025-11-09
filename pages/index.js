import Link from 'next/link';
import {
  BoltIcon,
  CalendarDaysIcon,
  ChartBarIcon,
  HashtagIcon,
  PaperAirplaneIcon,
  SparklesIcon,
  Squares2X2Icon,
  Cog6ToothIcon, // General AI/optimization
  CircleStackIcon, // Connect accounts
  ArrowPathIcon, // Track performance
  LightBulbIcon, // AI Assistant
  AdjustmentsHorizontalIcon, // New for 'Optimize with AI'
} from '@heroicons/react/24/outline';
import myImage from '../public/assets/hero.png';
import Image from 'next/image';

const coreFeatures = [
  {
    title: 'Smart Scheduling',
    description: 'Upload media once and let our drag-and-drop calendar plan your Instagram & Facebook rollout.',
    icon: CalendarDaysIcon,
  },
  {
    title: 'AI Assistant',
    description: 'Enhance captions, brainstorm hooks and keep every post on-brand with built-in AI prompts.',
    icon: LightBulbIcon,
  },
  {
    title: 'Auto DM Replies',
    description: 'Instantly answer inquiries with saved templates and AI-personalised follow-ups.',
    icon: PaperAirplaneIcon,
  },
  {
    title: 'Hashtag Discovery',
    description: 'Generate niche hashtags that match your campaign tone and boost discovery.',
    icon: HashtagIcon,
  },
  {
    title: 'Analytics Dashboard',
    description: 'Track scheduled vs posted, DM success and credit usage from a single pane of glass.',
    icon: ChartBarIcon,
  },
  {
    title: 'Optimize with AI',
    description: 'Fine-tune your content strategy with AI-driven insights and performance predictions.',
    icon: AdjustmentsHorizontalIcon, // A more fitting icon for optimization
  },
];

const pricing = [
  {
    name: 'Starter',
    price: '$0',
    frequency: 'per month',
    description: 'Built for creators testing automation.',
    perks: ['10 launch credits', 'Manual scheduling', 'Basic analytics'],
  },
  {
    name: 'Growth',
    price: '$29',
    frequency: 'per month',
    description: 'Scale campaigns with AI boosts.',
    perks: ['Unlimited schedulers', 'AI assistant & hashtags', 'Priority email support'],
    highlight: true,
    badge: 'Most popular',
  },
  {
    name: 'Pro',
    price: '$59',
    frequency: 'per month',
    description: 'For agencies with demanding calendars.',
    perks: ['Unlimited workspaces', 'Advanced analytics', 'Dedicated success manager'],
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    frequency: 'per month',
    description: 'SOC2-ready hosting & SLA.',
    perks: ['SSO & audit logs', 'Custom credit bundles', 'White-glove onboarding'],
  },
];

const stats = [
  { label: 'Creators Onboarded', value: '2.4k+' },
  { label: 'Automated Posts', value: '58k+' },
  { label: 'Avg. Hours Saved Weekly', value: '11' },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#121212] text-white font-sans overflow-x-hidden px-12">
      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-20 px-6 pb-20 pt-8">
        {/* Header (The Command Center) */}
        <header className="flex flex-wrap items-center justify-between gap-6 text-white">
          <Link href="/" legacyBehavior>
            <a className="flex items-center gap-2 text-3xl font-bold text-white relative">
              {/* Simple geometric icon, replace with your logo SVG if available */}
              <svg className="h-7 w-7 text-[#6A0DAD]" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5V7l-10 5-10-5v10z"></path>
              </svg>
              <span className="relative z-10">Lead surge</span>
              {/* Subtle glow effect for logo - requires custom animation in tailwind.config.js */}
              {/* <span className="absolute inset-0 bg-[#6A0DAD] opacity-0 blur-sm animate-pulse-slow"></span> */}
            </a>
          </Link>
          <nav className="flex items-center gap-8 text-sm text-gray-300">
            <a href="#features" className="hover:text-[#6A0DAD] transition-colors duration-200">
              Features
            </a>
            <a href="#pricing" className="hover:text-[#6A0DAD] transition-colors duration-200">
              Pricing
            </a>
            <a href="#cta" className="hover:text-[#6A0DAD] transition-colors duration-200">
              About
            </a>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login" legacyBehavior>
              <a className="rounded-full border border-[#6A0DAD] px-5 py-2 text-sm font-semibold text-white hover:bg-[#6A0DAD]/20 transition-all duration-200">
                Login
              </a>
            </Link>
            <Link href="/signup" legacyBehavior>
              <a className="rounded-full bg-gradient-to-r from-[#6A0DAD] to-[#40E0D0] px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-[#6A0DAD]/30 hover:shadow-[#40E0D0]/40 transition-all duration-200">
                Start free trial
              </a>
            </Link>
          </div>
        </header>

        {/* Hero Section (The Nexus Core) */}
        <section className="grid gap-16 lg:grid-cols-2 items-center relative z-10 py-5">
          <div className="space-y-5">
            <h2 className="text-5xl font-extrabold leading-tight text-white font-montserrat">
              Connect, Automate, Convert: The <span className="text-[#6A0DAD]">Future</span> of Social <span className="text-[#40E0D0]">AI</span>.
            </h2>
            <p className="text-lg text-gray-300 max-w-xl">
              Seamlessly integrate your social media, harness intelligent automation, and transform followers into loyal customers with our advanced AI platform.
            </p>
            <div className="flex flex-wrap gap-5 mt-8">
              <Link href="/signup" legacyBehavior>
                <a className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#6A0DAD] to-[#40E0D0] px-8 py-4 text-lg font-semibold text-white shadow-xl shadow-[#6A0DAD]/40 hover:shadow-[#40E0D0]/50 transition-all duration-300 transform hover:-translate-y-1">
                  Start 7-day free trial
                  <BoltIcon className="h-5 w-5" />
                </a>
              </Link>
              <Link href="/login" legacyBehavior>
                <a className="inline-flex items-center gap-2 rounded-full border border-[#6A0DAD] px-8 py-4 text-lg font-semibold text-white hover:bg-[#6A0DAD]/10 transition-all duration-300">
                  See how it works
                </a>
              </Link>
            </div>
            <div className="flex flex-wrap gap-8 text-sm text-gray-400 mt-6">
              <span>No credit card required</span>
              <span>•</span>
              <span>Cancel anytime</span>
            </div>
          </div>
          {/* Isometric illustration placeholder */}
          <div className="relative h-full w-full flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-br from-[#6A0DAD]/20 to-[#40E0D0]/20 opacity-30 blur-2xl rounded-3xl"></div>
            <div className="absolute inset-4 border border-[#6A0DAD]/50 rounded-3xl flex items-center justify-center ">
              {/* Replace this placeholder image with your actual sophisticated isometric illustration */}
              <Image src={myImage} alt="Integrated System Illustration" className="w-full h-full object-contain rounded-2xl" />
            </div>
            {/* Subtle blob animations - requires custom animation in tailwind.config.js */}
            {/* <div className="absolute -bottom-4 -right-4 w-48 h-48 bg-[#40E0D0] opacity-10 rounded-full blur-3xl animate-blob-slow"></div>
            <div className="absolute -top-4 -left-4 w-48 h-48 bg-[#6A0DAD] opacity-10 rounded-full blur-3xl animate-blob-slow animation-delay-2000"></div> */}
          </div>
        </section>

        {/* Features Section (Intelligent Modules) */}
        <section id="features" className="space-y-16 pt-20">
          <div className="text-center">
            <p className="text-sm uppercase tracking-widest text-[#40E0D0] font-semibold">Core Intelligence</p>
            <h3 className="mt-4 text-5xl font-extrabold text-white font-montserrat">
              Modules Designed for Peak Performance
            </h3>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {coreFeatures.map((feature) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="flex flex-col gap-6 p-8 rounded-3xl border border-[#6A0DAD]/30 bg-[#1A1A2A] shadow-lg shadow-[#6A0DAD]/10 relative overflow-hidden group hover:scale-105 transition-transform duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#6A0DAD]/10 to-[#40E0D0]/10 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  <span className="inline-flex w-fit rounded-full p-4 bg-[#6A0DAD]/20 text-[#40E0D0] relative z-10">
                    <Icon className="h-7 w-7 transition-colors duration-300 group-hover:text-white" />
                  </span>
                  <h4 className="text-2xl font-semibold text-white font-montserrat relative z-10">{feature.title}</h4>
                  <p className="text-base text-gray-400 relative z-10">{feature.description}</p>
                  {/* Mini-visualization placeholder */}
                  <div className="mt-4 h-16 w-full bg-[#0D0D1A] rounded-lg flex items-center justify-center text-gray-500 text-xs relative z-10 border border-gray-700">
                    {/* Replace with actual dynamic visual for each feature */}
                    Data Insight Visual
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* How It Works / Data Flow Section */}
        <section className="space-y-16 pt-20">
          <div className="text-center">
            <p className="text-sm uppercase tracking-widest text-[#40E0D0] font-semibold">Data Flow</p>
            <h3 className="mt-4 text-5xl font-extrabold text-white font-montserrat">
              The Lead Suite Pipeline: Seamless Data, Superior Results
            </h3>
          </div>
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative flex justify-center items-center h-[400px]">
              {/* SVG-based data pipeline visual */}
              <svg className="w-full h-full" viewBox="0 0 500 400" preserveAspectRatio="xMidYMid meet">
                <defs>
                  <filter id="glow">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                {/* Connecting lines */}
                <path d="M50 50 C150 20, 120 110, 230 125 C480 70, 430 230, 450 200 C480 250, 180 250, 250 320 0 0 " fill="none" stroke="#6A0DAD" strokeWidth="4" filter="url(#glow)" strokeDasharray="4 2" className="animate-dash-flow"/>
                {/* <path d="M50 50 C150 20, 120 110, 230 125 C480 70, 430 230, 250 110 C10 50, 80 250, 50 50 50 50, " fill="none" stroke="#6A0DAD" strokeWidth="4" filter="url(#glow)" strokeDasharray="4 2" className="animate-dash-flow"/> */}
                  "M50 50 C150 20, 120 110, 230 125 C480 70, 430 230, 450 200 C480 250, 180 250, 250 320 0 0 "
                {/* Nodes with numbers and icons */}
                {[
                  { x: 50, y: 50, num: 1, icon: CircleStackIcon, label: 'Connect' },
                  { x: 250, y: 120, num: 2, icon: Squares2X2Icon, label: 'Upload' },
                  { x: 450, y: 200, num: 3, icon: LightBulbIcon, label: 'Optimize' },
                  { x: 250, y: 280, num: 4, icon: ChartBarIcon, label: 'Track' },
                ].map((node, i) => (
                  <g key={i}>
                    <circle cx={node.x} cy={node.y} r="25" fill="#121212" stroke="#6A0DAD" strokeWidth="2" filter="url(#glow)"/>
                    <text x={node.x} y={node.y + 7} textAnchor="middle" fill="white" fontSize="20" fontWeight="bold">{node.num}</text>
                    <foreignObject x={node.x - 12} y={node.y - 12} width="24" height="24">
                       {node.icon && <node.icon className="h-full w-full text-[#40E0D0]" />}
                    </foreignObject>
                    <text x={node.x} y={node.y + 40} textAnchor="middle" fill="#B0B0B0" fontSize="14">{node.label}</text>
                  </g>
                ))}
              </svg>
            </div>

            <div className="space-y-8">
              <ul className="space-y-6 text-base text-gray-300">
                <li className="flex gap-4 items-start">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#6A0DAD]/30 text-[#40E0D0] font-bold flex-shrink-0 relative z-10">1</span>
                  <div>
                    <h4 className="font-semibold text-xl text-white">Connect Meta & Stripe accounts securely in minutes.</h4>
                    <p className="text-gray-400">Our secure integration ensures your data flows seamlessly for analytics and automated actions.</p>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#6A0DAD]/30 text-[#40E0D0] font-bold flex-shrink-0 relative z-10">2</span>
                  <div>
                    <h4 className="font-semibold text-xl text-white">Upload media and schedule once for every platform.</h4>
                    <p className="text-gray-400">Centralize your content creation and distribution with smart, cross-platform scheduling.</p>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#6A0DAD]/30 text-[#40E0D0] font-bold flex-shrink-0 relative z-10">3</span>
                  <div>
                    <h4 className="font-semibold text-xl text-white">Use AI to optimize captions, hashtags and follow-ups.</h4>
                    <p className="text-gray-400">Leverage AI intelligence to craft engaging content and personalized interactions effortlessly.</p>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#6A0DAD]/30 text-[#40E0D0] font-bold flex-shrink-0 relative z-10">4</span>
                  <div>
                    <h4 className="font-semibold text-xl text-white">Track credits, subscriptions and DM performance live.</h4>
                    <p className="text-gray-400">Gain real-time insights into your resource usage and direct message success rates.</p>
                  </div>
                </li>
              </ul>
             
            </div>
            
          </div>
           {/* Data Insights Card */}
              <div className="rounded-3xl border border-[#40E0D0]/50 bg-[#1A1A2A] p-8 shadow-xl shadow-[#40E0D0]/10 mt-10">
                <h4 className="text-2xl font-semibold text-white font-montserrat mb-6">Performance Metrics: Real-time Impact</h4>
                <div className="grid gap-6 md:grid-cols-3">
                  {stats.map((stat) => (
                    <div key={stat.label} className="rounded-2xl bg-[#0D0D1A] p-6 text-center shadow-inner relative overflow-hidden group">
                      <p className="text-5xl font-extrabold text-[#6A0DAD] relative z-10">{stat.value}</p>
                      <p className="text-sm uppercase tracking-widest text-gray-400 mt-2 relative z-10">{stat.label}</p>
                      {/* Subtle background glow/animation */}
                      {/* <span className="absolute inset-0 bg-[#40E0D0] opacity-0 group-hover:opacity-5 transition-opacity duration-300 blur-sm"></span> */}
                    </div>
                  ))}
                </div>
                <p className="mt-6 text-base text-gray-400">
                  Join a growing community of agencies and creators who are dramatically reducing manual effort and boosting their lead conversion rates.
                </p>
              </div>
        </section>

        {/* Pricing Section (Tiered Intelligence) */}
        <section id="pricing" className="space-y-16 pt-20">
          <div className="text-center">
            <p className="text-sm uppercase tracking-widest text-[#40E0D0] font-semibold">Flexible Intelligence Tiers</p>
            <h3 className="mt-4 text-5xl font-extrabold text-white font-montserrat">
              Scale Your Ambition. Choose Your Plan.
            </h3>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {pricing.map((plan) => (
              <div
                key={plan.name}
                className={`flex h-full flex-col rounded-3xl border ${
                  plan.highlight
                    ? 'border-[#6A0DAD] bg-[#1A1A2A] shadow-2xl shadow-[#6A0DAD]/30'
                    : 'border-gray-700 bg-[#1A1A2A] shadow-md shadow-gray-900/10'
                } p-8 relative overflow-hidden group hover:scale-105 transition-transform duration-300`}
              >
                {plan.highlight && (
                  <div className="absolute inset-0 bg-gradient-to-br from-[#6A0DAD]/20 to-[#40E0D0]/20 opacity-40 blur-lg"></div>
                )}
                <div className="flex items-center justify-between relative z-10">
                  <h4 className="text-2xl font-semibold text-white font-montserrat">{plan.name}</h4>
                  {plan.badge && (
                    <span className="rounded-full bg-[#40E0D0]/20 px-4 py-1 text-xs font-semibold text-[#40E0D0] relative">
                      {plan.badge}
                    </span>
                  )}
                </div>
                <p className="mt-3 text-base text-gray-400 relative z-10">{plan.description}</p>
                <div className="mt-6 flex items-baseline gap-2 text-white relative z-10">
                  <span className="text-5xl font-extrabold text-[#6A0DAD]">{plan.price}</span>
                  <span className="text-lg text-gray-400">{plan.frequency}</span>
                </div>
                <ul className="mt-6 flex flex-1 flex-col gap-4 text-base text-gray-300 relative z-10">
                  {plan.perks.map((perk) => (
                    <li key={perk} className="flex gap-3 items-center">
                      <svg className="h-5 w-5 text-[#40E0D0] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/signup" legacyBehavior>
                  <a
                    className={`mt-10 rounded-full px-6 py-3 text-center text-lg font-semibold relative z-10 ${
                      plan.highlight
                        ? 'bg-gradient-to-r from-[#6A0DAD] to-[#40E0D0] text-white shadow-lg shadow-[#6A0DAD]/40 hover:shadow-[#40E0D0]/50'
                        : 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-700 hover:border-[#6A0DAD]'
                    } transition-all duration-300`}
                  >
                    Start free trial
                  </a>
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action (The Launchpad) */}
        <section
          id="cta"
          className="rounded-3xl relative overflow-hidden p-16 text-center text-white shadow-2xl shadow-[#6A0DAD]/20 mt-20"
        >
          {/* Radial gradient background - requires custom animation in tailwind.config.js */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#6A0DAD]/30 via-[#40E0D0]/30 to-transparent opacity-70 blur-3xl z-0"></div> {/* animate-pulse-light removed for now */}
          <div className="relative z-10 space-y-6">
            <p className="text-lg uppercase tracking-[0.35em] text-[#40E0D0] font-semibold">Activate Your Advantage</p>
            <h3 className="mt-3 text-6xl font-extrabold text-white font-montserrat">
              Activate Your <span className="text-[#6A0DAD]">AI Advantage</span>. Transform Your Leads.
            </h3>
            <p className="mt-2 text-xl text-gray-300 max-w-3xl mx-auto">
              Unlock the full potential of your social media strategy with Lead Suite AI. Experience unprecedented efficiency and lead conversion.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-5">
              <Link href="/signup" legacyBehavior>
                <a className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#6A0DAD] to-[#40E0D0] px-10 py-5 text-xl font-semibold text-white shadow-xl shadow-[#6A0DAD]/40 hover:shadow-[#40E0D0]/50 transition-all duration-300 transform hover:-translate-y-1">
                  Start your free trial
                </a>
              </Link>
              <a
                href="mailto:support@leadsuite.ai"
                className="inline-flex items-center gap-2 rounded-full border border-[#6A0DAD] px-10 py-5 text-xl font-semibold text-white hover:bg-[#6A0DAD]/10 transition-all duration-300"
              >
                Talk to sales
              </a>
            </div>
          </div>
        </section>

        {/* Footer (System Integrity) */}
        <footer className="py-12 text-center text-sm text-gray-500 border-t border-gray-800 mt-20">
          © {new Date().getFullYear()} Lead Suite. All rights reserved. · Social Media SaaS Platform
        </footer>
      </div>
    </div>
  );
}
