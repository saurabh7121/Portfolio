
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Globe,
  Layout,
  Server,
  Code,
  Zap,
  Layers,
  Smartphone,
} from 'lucide-react';
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
    React: 'devicon-react-original colored',
    TypeScript: 'devicon-typescript-plain colored',
    'Tailwind CSS': 'devicon-tailwindcss-original colored',
    'Next.js': 'devicon-nextjs-original',
    Vercel: 'devicon-vercel-original',
    'Node.js': 'devicon-nodejs-plain colored',
    'Express.js': 'devicon-express-original',
    MongoDB: 'devicon-mongodb-plain colored',
    PostgreSQL: 'devicon-postgresql-plain colored',
    'React Native': 'devicon-reactnative-original colored',
    Firebase: 'devicon-firebase-plain colored',
    Git: 'devicon-git-plain colored',
    'GitHub Actions': 'devicon-github-original colored',
    Vite: 'devicon-vitejs-plain colored',
    Webpack: 'devicon-webpack-plain colored',
  };

  return mapping[techName] || null;
};

const Services = () => {
  const [activeId, setActiveId] = useState('frontend');

  const activeTab =
    services.find((service) => service.id === activeId) || services[0];

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-white py-28 text-black transition-colors duration-300 dark:bg-black dark:text-white"
    >
      <div className="container mx-auto px-5 sm:px-8">
        {/* Header */}
        <ScrollReveal
          variant="blur-in"
          className="mb-16 flex flex-col items-center text-center"
        >
          <span className="section-label">
            <Code size={12} />
            What I Offer
          </span>

          <h2
            className="mb-4 font-black leading-tight text-primary"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
          >
            Services &{' '}
            <span className="text-gradient-blue">Expertise</span>
          </h2>

          <div className="section-divider mx-auto" />

          <p className="mt-4 max-w-md text-sm leading-relaxed text-gray-600 dark:text-gray-400">
            From concept to deployment — I deliver end-to-end solutions that
            are fast, elegant, and scalable.
          </p>
        </ScrollReveal>

        {/* Services layout */}
        <div className="mt-10 grid items-start gap-8 lg:grid-cols-12">
          {/* Left: Service selectors */}
          <StaggerContainer
            staggerDelay={0.08}
            className="flex flex-col gap-3 lg:col-span-5"
          >
            {services.map((service) => {
              const isActive = activeId === service.id;

              return (
                <StaggerItem key={service.id} variant="slide-right">
                  <motion.button
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setActiveId(service.id)}
                    whileHover={{ x: isActive ? 0 : 4 }}
                    className={`group flex w-full cursor-pointer items-center justify-between rounded-none border-2 border-black p-4 text-left transition-all duration-150 dark:border-white ${
                      isActive
                        ? 'translate-x-[-2px] translate-y-[-2px] bg-[#FFD600] text-black shadow-[4px_4px_0px_#0a0a0a] dark:shadow-[4px_4px_0px_#ffffff]'
                        : 'bg-white text-black hover:bg-neutral-100 dark:bg-[#090909] dark:text-white dark:hover:bg-[#171717]'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-none border-2 border-black transition-colors dark:border-white ${
                          isActive
                            ? 'border-black bg-black text-white'
                            : 'bg-gray-100 text-black dark:bg-[#171717] dark:text-white'
                        }`}
                      >
                        {service.icon}
                      </div>

                      <span className="text-sm font-bold uppercase tracking-wide">
                        {service.title}
                      </span>
                    </div>

                    <span className="font-mono text-[10px] font-bold tracking-widest">
                      {service.tag}
                    </span>
                  </motion.button>
                </StaggerItem>
              );
            })}
          </StaggerContainer>

          {/* Right: Animated service details */}
          <ScrollReveal
            variant="slide-left"
            className="min-h-[380px] lg:col-span-7"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{
                  duration: 0.35,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="h-full"
              >
                <div className="relative flex h-full flex-col justify-between overflow-hidden border-2 border-black bg-white p-6 shadow-[6px_6px_0px_#0a0a0a] transition-colors duration-300 sm:p-10 dark:border-white dark:bg-[#090909] dark:shadow-[6px_6px_0px_#ffffff]">
                  {/* Decorative watermark */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute right-6 top-6 select-none font-mono text-8xl font-black text-black/[0.04] dark:text-white/[0.05]"
                  >
                    {activeTab.tag}
                  </div>

                  <div>
                    <div className="mb-6 flex items-center gap-3">
                      <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#E53935]">
                        Service Detail
                      </span>
                    </div>

                    <h3 className="mb-4 text-2xl font-black uppercase tracking-tight text-black sm:text-3xl dark:text-white">
                      {activeTab.title}
                    </h3>

                    <p className="mb-8 max-w-xl text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                      {activeTab.desc}
                    </p>

                    {/* Deliverables */}
                    <div className="mb-8">
                      <h4 className="mb-4 text-xs font-black uppercase tracking-widest text-black dark:text-white">
                        Core Focus & Deliverables
                      </h4>

                      <ul className="grid gap-3.5 sm:grid-cols-2">
                        {activeTab.deliverables.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2.5 text-xs font-semibold uppercase leading-relaxed tracking-wide text-gray-600 dark:text-gray-400"
                          >
                            <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-none border border-black bg-[#E53935] dark:border-white" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Technology stack */}
                  <div className="flex flex-wrap items-center gap-2 border-t border-black pt-6 dark:border-white">
                    <span className="mr-2 text-[10px] font-black uppercase tracking-widest text-black dark:text-white">
                      Key Stack:
                    </span>

                    {activeTab.tech.map((tech) => {
                      const iconClass = getTechIconClass(tech);

                      return (
                        <span
                          key={tech}
                          className="flex items-center gap-2 border-2 border-black bg-white px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-black transition-colors hover:bg-[#FFD600] dark:border-white dark:bg-[#111111] dark:text-white dark:hover:border-black dark:hover:bg-[#FFD600] dark:hover:text-black"
                        >
                          {iconClass ? (
                            <i
                              className={`${iconClass} text-xs ${
                                ['Next.js', 'Vercel', 'Express.js'].includes(
                                  tech
                                )
                                  ? 'text-black dark:text-white'
                                  : ''
                              }`}
                            />
                          ) : (
                            <span className="h-1.5 w-1.5 rounded-none bg-black dark:bg-white" />
                          )}

                          {tech}
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
