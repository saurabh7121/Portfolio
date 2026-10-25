import React from 'react';
import { motion } from 'framer-motion';
import { User, Cpu, Rocket, Globe, Code2, Zap, BookOpen, Star, Sparkles, MapPin, Mail } from 'lucide-react';
import { ScrollReveal, StaggerContainer, StaggerItem } from './ui/ScrollReveal';
import { SpotlightCard } from './ui/SpotlightCard';

const highlights = [
  { icon: <Rocket size={18} className="text-red-500 dark:text-red-400" />, label: 'Years Experience', val: '2+' },
  { icon: <Globe size={18} className="text-blue-600 dark:text-blue-400" />, label: 'Projects Done', val: '4+' },
  { icon: <Cpu size={18} className="text-yellow-500 dark:text-yellow-300" />,  label: 'Technologies Used', val: '10+' },
];

const traits = [
  { icon: <Code2 size={16} className="text-red-500 dark:text-red-400" />, text: 'Clean, maintainable code' },
  { icon: <Zap size={16} className="text-yellow-500 dark:text-yellow-300" />, text: 'Performance-first mindset' },
  { icon: <Globe size={16} className="text-blue-600 dark:text-blue-400" />, text: 'Full-stack & Mobile APIs' },
  { icon: <Rocket size={16} className="text-green-600 dark:text-green-400" />, text: 'AI & ML System Integration' },
];

const About = ({ theme }) => (
  <section id="about" className="py-28 relative overflow-hidden">
    <div className="container mx-auto px-5 sm:px-8">
      {/* Header */}
      <ScrollReveal variant="blur-in" className="mb-16 flex flex-col items-center text-center">
        <span className="section-label">
          <User size={12} />
          About Me
        </span>
        <h2
          className="section-heading font-black text-primary leading-tight mb-4"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
        >
          Passionate about<br />
          <span className="text-gradient-red">building software</span> that scales.
        </h2>
        <div className="section-divider mx-auto" />
      </ScrollReveal>

      {/* Modern Bento Grid Layout */}
      <div className="grid lg:grid-cols-12 gap-6 items-stretch">
        
        {/* ── Tile 1: Main Bio Spotlight Card (Span 7) ── */}
        <ScrollReveal variant="slide-right" className="lg:col-span-7 h-full">
          <SpotlightCard
            spotlightColor="rgba(239, 68, 68, 0.12)"
            borderColor="rgba(239, 68, 68, 0.3)"
            className="p-8 sm:p-10 flex flex-col justify-between h-full bg-white dark:bg-zinc-900 border-2 border-black dark:border-white text-[#0a0a0a] dark:text-white"
          >
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Sparkles size={16} className="text-red-500 dark:text-red-400" />
                <span className="text-xs font-mono uppercase tracking-widest text-red-500 dark:text-red-400 font-bold">
                  Engineering Philosophy
                </span>
              </div>
              <p className="text-gray-700 dark:text-gray-300 text-base sm:text-lg leading-relaxed mb-6">
                I'm a builder at heart — someone who turns ideas into working products, not just code.
                With a strong foundation in modern web frameworks, backend architecture, and API-driven systems, I focus on building{' '}
                <span className="text-black dark:text-white font-bold">efficient, scalable,</span> and{' '}
                <span className="text-black dark:text-white font-bold">user-centric applications</span>.
              </p>

              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-8">
                My work spans full-stack marketplaces, backend systems for e-commerce platforms, and integrations involving authentication, real-time data, and third-party APIs.
                I continuously explore new tools and technologies to transform ideas into clean, production-ready systems.
              </p>

              {/* Trait Pills */}
              <StaggerContainer staggerDelay={0.07} className="grid sm:grid-cols-2 gap-3 mb-8">
                {traits.map((t, i) => (
                  <StaggerItem key={i} variant="zoom-in">
                    <div className="flex items-center gap-2.5 px-4 py-3 border-2 border-black dark:border-white bg-white dark:bg-zinc-800 text-[#0a0a0a] dark:text-white text-xs font-bold uppercase tracking-wide hover:bg-[#FFD600] dark:hover:bg-[#FFD600] dark:hover:text-[#0a0a0a] transition-all">
                      {t.icon}
                      <span>{t.text}</span>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>

            <div className="pt-6 border-t border-gray-200 dark:border-zinc-800 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 bg-[#22c55e] animate-pulse" />
                <span className="text-xs text-gray-600 dark:text-gray-400">Open to global remote opportunities</span>
              </div>

              <motion.a
                href="mailto:work.jadhavsaurabh@gmail.com"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="btn-primary py-2.5 px-5 text-white text-xs"
              >
                <Mail size={13} /> Let's Connect
              </motion.a>
            </div>
          </SpotlightCard>
        </ScrollReveal>

        {/* ── Tile 2: Profile Visual & Radar Badge (Span 5) ── */}
        <ScrollReveal variant="slide-left" className="lg:col-span-5 h-full flex flex-col gap-6">
          <SpotlightCard
            className="p-6 relative overflow-hidden flex flex-col justify-between bg-white dark:bg-zinc-900 border-2 border-black dark:border-white text-[#0a0a0a] dark:text-white"
          >
            {/* Background image & grid overlay */}
            <div className="relative aspect-4/3 w-full border-2 border-black dark:border-white overflow-hidden mb-5 group">
              <div className="absolute inset-0 bg-grid-pattern opacity-20 z-10 pointer-events-none" />
              <img
                src="/saurabh_photo.png"
                alt="Saurabh Jadhav"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />

              {/* Floating location tag */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between bg-white dark:bg-zinc-900 px-4 py-2.5 border-2 border-black dark:border-white">
                <div>
                  <p className="text-[#0a0a0a] dark:text-white font-bold text-sm">Saurabh Jadhav</p>
                  <p className="text-[9px] text-[#666666] dark:text-zinc-400 uppercase tracking-widest font-mono font-bold mt-0.5">Full-Stack Engineer</p>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#FFD600] border-2 border-black text-[9px] font-bold text-[#0a0a0a] uppercase tracking-wider font-mono">
                  <MapPin size={10} /> India 🇮🇳
                </div>
              </div>
            </div>

            {/* Currently Learning Matrix */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <BookOpen size={13} className="text-red-500 dark:text-red-400" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-700 dark:text-gray-300">Current Tech Focus</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: 'Blockchain' },
                  { label: 'AI / LLMs' },
                  { label: 'RAG Systems' },
                  { label: 'Machine Learning' },
                  { label: 'TypeScript' },
                  { label: 'Docker & K8s' },
                ].map((item, i) => (
                  <motion.span
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    className="px-3 py-1.5 text-[9px] font-mono font-bold uppercase tracking-wider bg-white dark:bg-zinc-800 border-2 border-black dark:border-white text-[#0a0a0a] dark:text-white shadow-[2px_2px_0px_#0a0a0a] dark:shadow-[2px_2px_0px_#ffffff] hover:bg-[#FFD600] dark:hover:bg-[#FFD600] dark:hover:text-[#0a0a0a] cursor-default transition-all"
                  >
                    {item.label}
                  </motion.span>
                ))}
              </div>
            </div>
          </SpotlightCard>

          {/* Stats Row */}
          <StaggerContainer staggerDelay={0.08} className="grid grid-cols-3 gap-4">
            {highlights.map((h, i) => (
              <StaggerItem key={i} variant="zoom-in">
                <SpotlightCard
                  spotlightColor="rgba(255, 255, 255, 0.05)"
                  className="p-4 text-center flex flex-col items-center justify-center bg-white dark:bg-zinc-900 border-2 border-black dark:border-white"
                >
                  <div className="mb-1.5">{h.icon}</div>
                  <div className="text-2xl font-black text-black dark:text-white tracking-tight">{h.val}</div>
                  <div className="text-[9px] text-gray-600 dark:text-gray-400 uppercase tracking-widest font-semibold mt-0.5">{h.label}</div>
                </SpotlightCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </ScrollReveal>

      </div>
    </div>
  </section>
);

export default About;