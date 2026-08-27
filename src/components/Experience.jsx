import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Briefcase, MapPin, Calendar } from 'lucide-react';
import { ScrollReveal, StaggerContainer, StaggerItem } from './ui/ScrollReveal';

const experiences = [
  {
    company: 'JBB Technologies Pvt. Ltd.',
    role: 'Backend Developer Intern – Backend Lead & Database',
    period: 'Jul 2026 – Jul 2026',
    location: 'Chhatrapati Sambhajinagar, Maharashtra, India',
    desc: 'Worked on a real-client B2B/B2C computer hardware e-commerce platform. Designed MySQL database schemas and relationships and developed REST APIs using PHP and CodeIgniter 4 for authentication, products, categories, brands, offers, customers, orders, inventory, admin management, and reports.',
    highlights: ['PHP & CodeIgniter 4', 'MySQL Database Design', 'REST API Development', 'E-Commerce Backend'],
    accent: '#3b82f6',
    current: false,
  },

  {
    company: 'Freelance Developer',
    role: 'Software Developer',
    period: '2026 – Present',
    location: 'Maharashtra, India',
    desc: 'Built multiple web applications using React, Node.js, and MongoDB. Delivered scalable, high-quality solutions for diverse clients spanning fintech, transport, and AI domains.',
    highlights: ['React & Node.js Apps', 'Client Delivery', 'AI Features', 'UI/UX Design'],
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
    <section id="experience" ref={containerRef} className="py-28 relative overflow-hidden">
      {/* No ambient glows */}

      <div className="container mx-auto px-5 sm:px-8">
        {/* Header */}
        <ScrollReveal variant="blur-in" className="mb-16 flex flex-col items-center text-center">
          <span className="section-label">
            <Briefcase size={12} />
            My Journey
          </span>
          <h2
            className="font-black text-primary leading-tight mb-4"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
          >
            Work{' '}
            <span className="text-gradient-blue">Experience</span>
          </h2>
          <div className="section-divider mx-auto" />
        </ScrollReveal>

        {/* Timeline */}
        <div className="max-w-3xl mx-auto relative">
          {experiences.map((exp, i) => (
            <div key={i} className="relative flex gap-6 sm:gap-10">
              {/* Timeline stem */}
              <div className="flex flex-col items-center flex-shrink-0 relative">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  className="w-10 h-10 rounded-none border-2 border-black flex items-center justify-center flex-shrink-0 z-10 bg-white shadow-[2px_2px_0px_#0a0a0a]"
                >
                  <Briefcase size={16} className="text-black" />
                </motion.div>
                
                {/* Animated scroll-driven fill line */}
                {i < experiences.length - 1 && (
                  <div className="w-0.5 flex-1 my-2 bg-black relative overflow-hidden">
                    <motion.div
                      className="absolute top-0 left-0 right-0 w-full bg-[#E53935] origin-top"
                      style={{ scaleY: lineHeight }}
                    />
                  </div>
                )}
              </div>

              {/* Content card */}
              <ScrollReveal variant="slide-right" delay={i * 0.15} className="flex-1 mb-10">
                <div className="p-6 sm:p-8 bg-white border-2 border-black rounded-none shadow-[6px_6px_0px_#0a0a0a]">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div>
                      <h3 className="text-[#0a0a0a] font-black text-xl tracking-tight uppercase">{exp.company}</h3>
                      <p className="font-bold text-sm mt-0.5 uppercase tracking-wide text-[#E53935]">{exp.role}</p>
                    </div>
                    {exp.current && (
                      <span className="px-3 py-1 rounded-none border-2 border-black text-[9px] font-mono font-bold uppercase tracking-wider bg-[#FFD600] text-black shadow-[2px_2px_0px_#0a0a0a]">
                        Current
                      </span>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-4 mb-5 text-[#666666] font-mono text-[10px] font-bold uppercase tracking-wider">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={12} /> {exp.period}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin size={12} /> {exp.location}
                    </span>
                  </div>

                  <p className="text-[#666666] text-sm leading-relaxed mb-5">{exp.desc}</p>

                  <div className="flex flex-wrap gap-2">
                    {exp.highlights.map((h) => (
                      <span
                        key={h}
                        className="text-[10px] font-mono font-bold uppercase tracking-wider px-3 py-1.5 bg-white border-2 border-black text-[#0a0a0a]"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              </ScrollReveal>
            </div>
          ))}

          {/* Start node */}
          <ScrollReveal variant="fade-up" delay={0.2} className="flex gap-6 sm:gap-10 items-center">
            <div className="flex flex-col items-center flex-shrink-0 w-10">
              <div className="w-3 h-3 rounded-none bg-black border border-black mx-auto" />
            </div>
            <p className="text-muted-2 text-xs italic font-mono uppercase font-bold tracking-wider">The journey begins…</p>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default Experience;
