import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Layout, Server, Code, Zap, Layers, Smartphone } from 'lucide-react';

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

const Services = () => {
  const [activeId, setActiveId] = useState('frontend');
  const activeTab = services.find((s) => s.id === activeId) || services[0];

  return (
    <section id="services" className="py-28 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-64 bg-[#ef4444] opacity-[0.025] blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-5 sm:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 flex flex-col items-center text-center"
        >
          <span className="section-label">
            <Code size={12} />
            What I Offer
          </span>
          <h2
            className="font-black text-white leading-tight mb-4"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
          >
            Services &{' '}
            <span className="text-gradient-blue">Expertise</span>
          </h2>
          <div className="section-divider mx-auto" />
          <p className="text-[#555] max-w-md mt-4 text-sm leading-relaxed">
            From concept to deployment — I deliver end-to-end solutions that are fast, elegant, and scalable.
          </p>
        </motion.div>

        {/* Tab Layout Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-start mt-10">
          {/* Left Column: Tab Selectors */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {services.map((s) => {
              const isActive = activeId === s.id;
              return (
                <motion.button
                  key={s.id}
                  onClick={() => setActiveId(s.id)}
                  whileHover={{ x: isActive ? 0 : 6 }}
                  className={`text-left w-full flex items-center justify-between p-4.5 rounded-2xl border transition-all duration-300 group cursor-pointer ${
                    isActive ? 'bg-[#ffffff03]' : 'bg-transparent hover:bg-[#ffffff01]'
                  }`}
                  style={{
                    borderColor: isActive ? s.accent : 'rgba(255, 255, 255, 0.04)',
                    boxShadow: isActive ? `0 0 25px -8px ${s.accent}` : 'none',
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center border transition-colors shrink-0"
                      style={{
                        borderColor: isActive ? `${s.accent}30` : 'rgba(255, 255, 255, 0.06)',
                        color: s.accent,
                        background: `${s.accent}08`,
                      }}
                    >
                      {s.icon}
                    </div>
                    <span
                      className={`font-bold text-sm tracking-wide transition-colors ${
                        isActive ? 'text-white' : 'text-[#555] group-hover:text-[#a1a1aa]'
                      }`}
                    >
                      {s.title}
                    </span>
                  </div>

                  <span
                    className={`text-[10px] font-mono tracking-widest transition-opacity ${
                      isActive ? 'opacity-50 text-white' : 'opacity-0 group-hover:opacity-30 text-[#888]'
                    }`}
                  >
                    {s.tag}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Right Column: Sliding Detail Panel */}
          <div className="lg:col-span-7 min-h-[380px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="card p-8 sm:p-10 relative overflow-hidden flex flex-col justify-between"
                style={{ borderColor: `${activeTab.accent}20` }}
              >
                {/* Large decorative watermark tag */}
                <div className="absolute right-6 top-6 text-8xl font-black text-white/[0.015] select-none pointer-events-none font-mono">
                  {activeTab.tag}
                </div>

                {/* Glow back */}
                <div
                  className="absolute -top-24 -left-24 w-48 h-48 rounded-full opacity-[0.08] blur-3xl pointer-events-none"
                  style={{ backgroundColor: activeTab.accent }}
                />

                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <span
                      className="text-xs font-mono uppercase tracking-widest font-bold"
                      style={{ color: activeTab.accent }}
                    >
                      Service Detail
                    </span>
                  </div>
                  <h3 className="text-white text-2xl sm:text-3xl font-black mb-4 tracking-tight">
                    {activeTab.title}
                  </h3>
                  <p className="text-[#a1a1aa] text-sm leading-relaxed mb-8 max-w-xl">{activeTab.desc}</p>

                  {/* Focus list */}
                  <div className="mb-8">
                    <h4 className="text-xs uppercase tracking-widest text-[#555] font-bold mb-4">
                      Core Focus & Deliverables
                    </h4>
                    <ul className="grid sm:grid-cols-2 gap-3.5">
                      {activeTab.deliverables.map((item, index) => (
                        <li key={index} className="flex items-start gap-2.5 text-xs text-[#71717a] leading-relaxed">
                          <span
                            className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                            style={{ backgroundColor: activeTab.accent }}
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Tech stack */}
                <div className="pt-6 border-t border-white/05 flex flex-wrap gap-2 items-center">
                  <span className="text-[10px] uppercase tracking-widest text-[#444] font-bold mr-2">
                    Key Stack:
                  </span>
                  {activeTab.tech.map((t) => {
                    const iconClass = getTechIconClass(t);
                    return (
                      <span
                        key={t}
                        className="text-[10px] font-mono px-3 py-1.5 rounded-md bg-white/02 border border-white/05 text-[#888] flex items-center gap-2 hover:bg-white/05 transition-colors"
                      >
                        {iconClass ? (
                          <i className={`${iconClass} text-xs`} />
                        ) : (
                          <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                        )}
                        {t}
                      </span>
                    );
                  })}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
