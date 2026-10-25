import React, { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Briefcase, MapPin, Calendar } from 'lucide-react';
import {
  ScrollReveal,
  StaggerContainer,
  StaggerItem,
} from './ui/ScrollReveal';

const experiences = [
  {
    company: 'JBB Technologies Pvt. Ltd.',
    role: 'Backend Developer Intern – Backend Lead & Database',
    period: 'Jul 2026 – Jul 2026',
    location: 'Chhatrapati Sambhajinagar, Maharashtra, India',
    desc: 'Worked on a real-client B2B/B2C computer hardware e-commerce platform. Designed MySQL database schemas and relationships and developed REST APIs using PHP and CodeIgniter 4 for authentication, products, categories, brands, offers, customers, orders, inventory, admin management, and reports.',
    highlights: [
      'PHP & CodeIgniter 4',
      'MySQL Database Design',
      'REST API Development',
      'E-Commerce Backend',
    ],
    accent: '#3b82f6',
    current: false,
  },
  {
    company: 'Developer',
    role: 'Software Developer',
    period: '2026 – Present',
    location: 'Maharashtra, India',
    desc: 'Built multiple web applications using React, Node.js, and MongoDB. Delivered scalable, high-quality solutions for diverse clients spanning fintech, transport, and AI domains.',
    highlights: [
      'React & Node.js Apps',
      'Client Delivery',
      'AI Features',
      'UI/UX Design',
    ],
    accent: '#3b82f6',
    current: true,
  },
];

const Experience = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end center'],
  });

  const lineHeight = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative overflow-hidden bg-white py-28 text-black transition-colors duration-300 dark:bg-black dark:text-white"
    >
      <div className="container mx-auto px-5 sm:px-8">
        {/* Header */}
        <ScrollReveal
          variant="blur-in"
          className="mb-16 flex flex-col items-center text-center"
        >
          <span className="section-label">
            <Briefcase size={12} />
            My Journey
          </span>

          <h2
            className="mb-4 font-black leading-tight text-black dark:text-white"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
          >
            Work{' '}
            <span className="text-gradient-blue">Experience</span>
          </h2>

          <div className="section-divider mx-auto" />
        </ScrollReveal>

        {/* Timeline */}
        <div className="relative mx-auto max-w-3xl">
          {experiences.map((exp, i) => (
            <div key={exp.company} className="relative flex gap-6 sm:gap-10">
              {/* Timeline Node and Progress Line */}
              <div className="relative flex flex-shrink-0 flex-col items-center">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{
                    type: 'spring',
                    stiffness: 200,
                    damping: 15,
                  }}
                  className="z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center border-2 border-black bg-white text-black shadow-[2px_2px_0px_#0a0a0a] transition-colors duration-300 dark:border-zinc-700 dark:bg-zinc-950 dark:text-white dark:shadow-[2px_2px_0px_#52525b]"
                >
                  <Briefcase size={16} />
                </motion.div>

                {i < experiences.length - 1 && (
                  <div className="relative my-2 w-0.5 flex-1 overflow-hidden bg-gray-200 dark:bg-zinc-800">
                    <motion.div
                      className="absolute inset-x-0 top-0 h-full w-full origin-top bg-red-600 dark:bg-red-500"
                      style={{ scaleY: lineHeight }}
                    />
                  </div>
                )}
              </div>

              {/* Experience Card */}
              <ScrollReveal
                variant="slide-right"
                delay={i * 0.15}
                className="mb-10 min-w-0 flex-1"
              >
                <div className="border-2 border-black bg-white p-6 text-black shadow-[6px_6px_0px_#0a0a0a] transition-colors duration-300 dark:border-zinc-800 dark:bg-[#090909] dark:text-white dark:shadow-[6px_6px_0px_#27272a] sm:p-8">
                  {/* Company and Current Badge */}
                  <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="break-words text-xl font-black uppercase tracking-tight text-black dark:text-white">
                        {exp.company}
                      </h3>

                      <p className="mt-0.5 text-sm font-bold uppercase tracking-wide text-red-600 dark:text-red-400">
                        {exp.role}
                      </p>
                    </div>

                    {exp.current && (
                      <span className="border-2 border-black bg-[#FFD600] px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-wider text-black shadow-[2px_2px_0px_#0a0a0a] dark:border-zinc-700 dark:shadow-[2px_2px_0px_#52525b]">
                        Current
                      </span>
                    )}
                  </div>

                  {/* Period and Location */}
                  <div className="mb-5 flex flex-wrap gap-x-4 gap-y-2 font-mono text-[10px] font-bold uppercase tracking-wider text-gray-600 dark:text-zinc-400">
                    <span className="flex items-center gap-1.5">
                      <Calendar
                        size={12}
                        className="flex-shrink-0 text-blue-600 dark:text-blue-400"
                      />
                      {exp.period}
                    </span>

                    <span className="flex items-center gap-1.5">
                      <MapPin
                        size={12}
                        className="flex-shrink-0 text-blue-600 dark:text-blue-400"
                      />
                      {exp.location}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="mb-5 text-sm leading-relaxed text-gray-700 dark:text-zinc-300">
                    {exp.desc}
                  </p>

                  {/* Technology Tags */}
                  <div className="flex flex-wrap gap-2">
                    {exp.highlights.map((highlight) => (
                      <span
                        key={highlight}
                        className="border-2 border-black bg-gray-50 px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-black transition-colors duration-200 hover:bg-[#FFD600] dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-[#FFD600] dark:hover:bg-[#FFD600] dark:hover:text-black"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>
          ))}

          {/* Timeline End Node */}
          <ScrollReveal
            variant="fade-up"
            delay={0.2}
            className="flex items-center gap-6 sm:gap-10"
          >
            <div className="flex w-10 flex-shrink-0 flex-col items-center">
              <div className="mx-auto h-3 w-3 border border-black bg-black dark:border-zinc-500 dark:bg-zinc-700" />
            </div>

            <p className="font-mono text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-zinc-500">
              The journey begins…
            </p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Experience;