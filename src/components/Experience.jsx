import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, Calendar, ArrowUpRight } from 'lucide-react';

const experiences = [
  {
    company: 'Freelance Developer',
    role: 'Software Developer',
    period: '2023 – Present',
    location: 'Maharashtra, India',
    desc: 'Built multiple web applications using React, Node.js, and MongoDB. Delivered scalable, high-quality solutions for diverse clients spanning fintech, transport, and AI domains.',
    highlights: ['React & Node.js Apps', 'Client Delivery', 'AI Features', 'UI/UX Design'],
    accent: '#3b82f6',
    current: true,
  },
];

const Experience = () => (
  <section id="experience" className="py-28 relative overflow-hidden">
    <div className="absolute left-0 top-1/2 w-72 h-72 bg-[#3b82f6] opacity-[0.03] blur-[120px] rounded-full pointer-events-none" />

    <div className="container mx-auto px-5 sm:px-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16 flex flex-col items-center text-center"
      >
        <span className="section-label">
          <Briefcase size={12} />
          My Journey
        </span>
        <h2
          className="font-black text-white leading-tight mb-4"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
        >
          Work{' '}
          <span className="text-gradient-blue">Experience</span>
        </h2>
        <div className="section-divider mx-auto" />
      </motion.div>

      {/* Timeline */}
      <div className="max-w-3xl mx-auto">
        {experiences.map((exp, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.7 }}
            className="relative flex gap-6 sm:gap-10"
          >
            {/* Timeline stem */}
            <div className="flex flex-col items-center flex-shrink-0">
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, type: 'spring' }}
                className="w-10 h-10 rounded-full border-2 flex items-center justify-center flex-shrink-0 z-10"
                style={{ borderColor: exp.accent, background: `${exp.accent}15` }}
              >
                <Briefcase size={16} style={{ color: exp.accent }} />
              </motion.div>
              {i < experiences.length - 1 && (
                <div className="w-px flex-1 mt-2"
                  style={{ background: `linear-gradient(to bottom, ${exp.accent}40, transparent)` }} />
              )}
            </div>

            {/* Content card */}
            <div className="card p-6 sm:p-8 mb-10 flex-1">
              <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                <div>
                  <h3 className="text-white font-bold text-xl tracking-tight">{exp.company}</h3>
                  <p className="font-semibold text-sm mt-0.5" style={{ color: exp.accent }}>{exp.role}</p>
                </div>
                {exp.current && (
                  <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest"
                    style={{ background: `${exp.accent}15`, color: exp.accent, border: `1px solid ${exp.accent}30` }}>
                    Current
                  </span>
                )}
              </div>

              <div className="flex flex-wrap gap-4 mb-5 text-[#555] text-xs">
                <span className="flex items-center gap-1.5">
                  <Calendar size={12} /> {exp.period}
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin size={12} /> {exp.location}
                </span>
              </div>

              <p className="text-[#71717a] text-sm leading-relaxed mb-5">{exp.desc}</p>

              <div className="flex flex-wrap gap-2">
                {exp.highlights.map((h) => (
                  <span key={h} className="text-[10px] font-mono px-3 py-1.5 rounded-lg border border-white/06 text-[#555]"
                    style={{ background: `${exp.accent}08` }}>
                    {h}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}

        {/* Start node */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex gap-6 sm:gap-10 items-center"
        >
          <div className="flex flex-col items-center flex-shrink-0 w-10">
            <div className="w-3 h-3 rounded-full bg-white/10 border border-white/20 mx-auto" />
          </div>
          <p className="text-[#333] text-xs italic">The journey begins…</p>
        </motion.div>
      </div>
    </div>
  </section>
);

export default Experience;
