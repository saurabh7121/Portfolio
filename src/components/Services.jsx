import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Layout, Server, Code, Zap, Layers, Smartphone } from 'lucide-react';
import { MagicCard } from './ui/MagicCard';
import { ScrollReveal, StaggerContainer, StaggerItem } from './ui/ScrollReveal';

const services = [
  {
    id: 'frontend',
    title: 'React & Frontend',
    tag: '01',
    icon: <Layout size={18} />,
    accent: '#61dafb',
    desc: 'Building responsive, component-driven user interfaces. Specializing in single-page applications (SPAs) with modern state management systems and fluid micro-interactions.',
    deliverables: [
      'Reusable Component Systems',
      'Global State (Redux/Zustand)',
      'Mobile-First Layouts',
      'Smooth Framer Motion Elements',
    ],
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
  },
  {
    id: 'nextjs',
    title: 'Next.js & Web Apps',
    tag: '02',
    icon: <Globe size={18} />,
    accent: '#ffffff',
    desc: 'Creating search engine optimized, server-rendered React applications. Focused on blazing performance, fast load times, headless architectures, and hosting configurations.',
    deliverables: [
      'Server-Side Rendering (SSR)',
      'Static Site Generation (SSG)',
      'SEO Audits & Configurations',
      'Server Actions & API Routing',
    ],
    tech: ['Next.js', 'React', 'Vercel', 'Tailwind CSS'],
  },
  {
    id: 'backend',
    title: 'Backend & REST APIs',
    tag: '03',
    icon: <Server size={18} />,
    accent: '#3b82f6',
    desc: 'Developing secure, fast, and scalable backend services. Implementing robust APIs, relational & non-relational database schemas, and session authentication mechanisms.',
    deliverables: [
      'REST & GraphQL API design',
      'Secure User Auth (JWT/OAuth)',
      'Structured Database Modeling',
      'Realtime WebSocket connections',
    ],
    tech: ['Node.js', 'Express.js', 'MongoDB', 'PostgreSQL'],
  },
  {
    id: 'mobile',
    title: 'React Native Mobile',
    tag: '04',
    icon: <Smartphone size={18} />,
    accent: '#38bdf8',
    desc: 'Developing native cross-platform mobile applications for iOS and Android using React Native. Utilizing Expo ecosystem for rapid deployment and updates.',
    deliverables: [
      'Cross-Platform iOS & Android apps',
      'Offline-First Data Storage',
      'Native Module Integrations',
      'Push Notification Setups',
    ],
    tech: ['React Native', 'Expo', 'TypeScript', 'Firebase'],
  },
  {
    id: 'fullstack',
    title: 'Full Stack Integration',
    tag: '05',
    icon: <Layers size={18} />,
    accent: '#a1a1aa',
    desc: 'Connecting frontends and backends seamlessly to deliver production-ready web platforms. Handling file storage, third-party payment gates, and automated deployment pipelines.',
    deliverables: [
      'End-to-End User Authentication',
      'Payment Gates (Stripe)',
      'Media Hosting (AWS S3)',
      'GitHub Actions CI/CD Setup',
    ],
    tech: ['React', 'Node.js', 'MongoDB', 'GitHub Actions'],
  },
  {
    id: 'performance',
    title: 'Speed & Optimization',
    tag: '06',
    icon: <Zap size={18} />,
    accent: '#ef4444',
    desc: 'Analyzing, auditing, and restructuring codebases to optimize for maximum speed, reducing bounce rates and aiming for perfect Lighthouse audit benchmarks.',
    deliverables: [
      'Core Web Vitals tuning',
      'Bundle size reduction & lazy loading',
      'Database query optimization',
      '95%+ Lighthouse performance scores',
    ],
    tech: ['Lighthouse', 'Vite', 'Webpack', 'Performance API'],
  },
];

const getTechIconClass = (techName) => {
  const mapping = {
    'React': 'devicon-react-original colored',
    'TypeScript': 'devicon-typescript-plain colored',
    'Tailwind CSS': 'devicon-tailwindcss-original colored',
    'Next.js': 'devicon-nextjs-original colored',
    'Vercel': 'devicon-vercel-original colored',
    'Node.js': 'devicon-nodejs-plain colored',
    'Express.js': 'devicon-express-original colored',
    'MongoDB': 'devicon-mongodb-plain colored',
    'PostgreSQL': 'devicon-postgresql-plain colored',
    'React Native': 'devicon-reactnative-original colored',
    'Firebase': 'devicon-firebase-plain colored',
    'Git': 'devicon-git-plain colored',
    'GitHub Actions': 'devicon-github-original colored',
    'Vite': 'devicon-vitejs-plain colored',
    'Webpack': 'devicon-webpack-plain colored',
  };
  return mapping[techName] || null;
};

const Services = ({ theme }) => {
  const [activeId, setActiveId] = useState('frontend');

  const resolvedServices = services.map(s => {
    if (s.id === 'nextjs') {
      return { ...s, accent: theme === 'dark' ? '#ffffff' : '#0f172a' };
    }
    return s;
  });

  const activeTab = resolvedServices.find((s) => s.id === activeId) || resolvedServices[0];

  return (
    <section id="services" className="py-28 relative overflow-hidden">
      {/* Ambient glow */}
      {/* No ambient glows in editorial theme */}

      <div className="container mx-auto px-5 sm:px-8">
        {/* Header */}
        <ScrollReveal variant="blur-in" className="mb-16 flex flex-col items-center text-center">
          <span className="section-label">
            <Code size={12} />
            What I Offer
          </span>
          <h2
            className="font-black text-primary leading-tight mb-4"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
          >
            Services &{' '}
            <span className="text-gradient-blue">Expertise</span>
          </h2>
          <div className="section-divider mx-auto" />
          <p className="text-muted-1 max-w-md mt-4 text-sm leading-relaxed">
            From concept to deployment — I deliver end-to-end solutions that are fast, elegant, and scalable.
          </p>
        </ScrollReveal>

        {/* Tab Layout Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-start mt-10">
          {/* Left Column: Tab Selectors */}
          <StaggerContainer staggerDelay={0.08} className="lg:col-span-5 flex flex-col gap-3">
            {resolvedServices.map((s) => {
              const isActive = activeId === s.id;
              return (
                <StaggerItem key={s.id} variant="slide-right">
                  <motion.button
                    onClick={() => setActiveId(s.id)}
                    whileHover={{ x: isActive ? 0 : 4 }}
                    className={`text-left w-full flex items-center justify-between p-4.5 rounded-none border-2 border-black transition-all duration-150 group cursor-pointer ${
                      isActive
                        ? 'bg-[#FFD600] text-black shadow-[4px_4px_0px_#0a0a0a] translate-x-[-2px] translate-y-[-2px]'
                        : 'bg-white text-[#0a0a0a] hover:bg-neutral-50'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-9 h-9 rounded-none flex items-center justify-center border-2 border-black transition-colors shrink-0 ${
                          isActive ? 'bg-black text-white' : 'bg-[#f5f5f0] text-black'
                        }`}
                      >
                        {s.icon}
                      </div>
                      <span className="font-bold text-sm tracking-wide uppercase">
                        {s.title}
                      </span>
                    </div>

                    <span className="text-[10px] font-mono font-bold tracking-widest uppercase">
                      {s.tag}
                    </span>
                  </motion.button>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          {/* Right Column: Sliding Detail Panel */}
          <ScrollReveal variant="slide-left" className="lg:col-span-7 min-h-[380px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="h-full"
              >
                <div className="p-8 sm:p-10 relative overflow-hidden flex flex-col justify-between h-full bg-white border-2 border-black shadow-[6px_6px_0px_#0a0a0a]">
                  {/* Large decorative watermark tag */}
                  <div className="absolute right-6 top-6 text-8xl font-black text-black/[0.03] select-none pointer-events-none font-mono">
                    {activeTab.tag}
                  </div>

                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-xs font-mono uppercase tracking-widest font-bold text-[#E53935]">
                        Service Detail
                      </span>
                    </div>
                    <h3 className="text-[#0a0a0a] text-2xl sm:text-3xl font-black mb-4 tracking-tight uppercase">
                      {activeTab.title}
                    </h3>
                    <p className="text-[#666666] text-sm leading-relaxed mb-8 max-w-xl">{activeTab.desc}</p>

                    {/* Focus list */}
                    <div className="mb-8">
                      <h4 className="text-xs uppercase tracking-widest text-[#0a0a0a] font-black mb-4">
                        Core Focus & Deliverables
                      </h4>
                      <ul className="grid sm:grid-cols-2 gap-3.5">
                        {activeTab.deliverables.map((item, index) => (
                          <li key={index} className="flex items-start gap-2.5 text-xs text-[#666666] leading-relaxed font-semibold uppercase tracking-wide">
                            <span className="w-2.5 h-2.5 rounded-none border border-black bg-[#E53935] mt-1 shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Tech stack */}
                  <div className="pt-6 border-t border-black flex flex-wrap gap-2 items-center">
                    <span className="text-[10px] uppercase tracking-widest text-[#0a0a0a] font-black mr-2">
                      Key Stack:
                    </span>
                    {activeTab.tech.map((t) => {
                      const iconClass = getTechIconClass(t);
                      return (
                        <span
                          key={t}
                          className="text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1.5 bg-white border-2 border-black text-[#0a0a0a] flex items-center gap-2 hover:bg-[#FFD600] transition-colors"
                        >
                          {iconClass ? (
                            <i className={`${iconClass} text-xs`} />
                          ) : (
                            <span className="w-1.5 h-1.5 rounded-none bg-black" />
                          )}
                          {t}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Services;
