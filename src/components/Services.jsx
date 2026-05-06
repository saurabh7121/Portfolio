import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Layout, Server, Code, Cpu, Zap, Layers } from 'lucide-react';

const services = [
  {
    title: 'Web Development',
    desc: 'Responsive, scalable web apps using modern stacks and best practices.',
    icon: <Globe size={28} />,
    accent: '#3b82f6',
    tag: '01',
  },
  {
    title: 'Frontend Development',
    desc: 'Clean, interactive UIs with React, Next.js, animations and pixel-perfect design.',
    icon: <Layout size={28} />,
    accent: '#ffffff',
    tag: '02',
  },
  {
    title: 'Backend Development',
    desc: 'Secure APIs, authentication, databases, and server-side architecture with Node.js.',
    icon: <Server size={28} />,
    accent: '#a1a1aa',
    tag: '03',
  },
  {
    title: 'Full Stack Solutions',
    desc: 'End-to-end application development — from database to deployment.',
    icon: <Layers size={28} />,
    accent: '#ffffff',
    tag: '04',
  },
  {
    title: 'AI Integration',
    desc: 'Integrating AI features like chatbots, recommendations, and intelligent workflows.',
    icon: <Cpu size={28} />,
    accent: '#ef4444',
    tag: '05',
  },
  {
    title: 'Performance Optimization',
    desc: 'Speed, efficiency, and Core Web Vitals tuning for production applications.',
    icon: <Zap size={28} />,
    accent: '#3b82f6',
    tag: '06',
  },
];

const Services = () => (
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

      {/* Services grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -6 }}
            className="card p-7 group relative"
          >
            {/* Tag number */}
            <span className="absolute top-5 right-5 text-[10px] font-black text-[#222] tracking-widest font-mono">
              {s.tag}
            </span>

            {/* Icon */}
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
              style={{ background: `${s.accent}10`, color: s.accent, border: `1px solid ${s.accent}20` }}
            >
              {s.icon}
            </div>

            {/* Content */}
            <h3 className="text-white font-bold text-lg mb-3 tracking-tight">{s.title}</h3>
            <p className="text-[#555] text-sm leading-relaxed">{s.desc}</p>

            {/* Hover line */}
            <div
              className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full transition-all duration-500 rounded-full"
              style={{ background: `linear-gradient(to right, ${s.accent}, transparent)` }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Services;
