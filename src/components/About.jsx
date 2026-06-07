import React from 'react';
import { motion } from 'framer-motion';
import { User, Cpu, Rocket, Globe, Code2, Zap, BookOpen, Star } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  }),
};

const highlights = [
  { icon: <Rocket size={18} className="text-[#ef4444]" />, label: 'Years Experience', val: '2+' },
  { icon: <Globe size={18} className="text-[#3b82f6]" />, label: 'Projects Done', val: '15+' },
  { icon: <Cpu size={18} className="text-primary" />,        label: 'Technologies', val: '10+' },
];

const traits = [
  { icon: <Code2 size={16} />, text: 'Clean, maintainable code' },
  { icon: <Zap size={16} />, text: 'Performance-first mindset' },
  { icon: <Globe size={16} />, text: 'Full-stack expertise' },
  { icon: <Rocket size={16} />, text: 'AI & ML integration' },
];

const About = ({ theme }) => (
  <section id="about" className="py-28 relative overflow-hidden">
    {/* Subtle ambient */}
    <div className="absolute -top-40 right-0 w-96 h-96 bg-[#3b82f6] opacity-[0.03] blur-[160px] rounded-full pointer-events-none" />

    <div className="container mx-auto px-5 sm:px-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16 flex flex-col items-center text-center"
      >
        <span className="section-label">
          <User size={12} />
          About Me
        </span>
        <h2
          className="section-heading font-black text-primary leading-tight mb-4"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
        >
          Passionate about<br />
          <span className="text-gradient-red">building things</span> that matter.
        </h2>
        <div className="section-divider mx-auto" />
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* ── Left: Bio ── */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="space-y-6"
        >
          <p className="text-muted-1 text-base sm:text-lg leading-relaxed">
            I'm a developer who enjoys solving real-world problems through technology.
            With a strong foundation in web development and backend systems, I focus on
            building{' '}
            <span className="text-primary font-medium">efficient, scalable,</span> and{' '}
            <span className="text-primary font-medium">user-friendly applications</span>.
          </p>
          <p className="text-muted-1 leading-relaxed">
            I've worked on multiple projects including AI-powered systems, financial platforms,
            and productivity tools. I continuously explore new technologies and aim to create
            meaningful digital experiences that solve real user problems.
          </p>

          {/* Trait pills */}
          <div className="flex flex-wrap gap-3 pt-2">
            {traits.map((t, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex items-center gap-2 px-4 py-2 glass-sm rounded-full border border-border text-muted-1 text-xs font-medium"
              >
                {t.icon}
                {t.text}
              </motion.div>
            ))}
          </div>

          {/* Currently Learning */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="pt-4"
          >
            <div className="flex items-center gap-2 mb-3">
              <BookOpen size={13} className="text-[#3b82f6]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#3b82f6]">Currently Learning</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {[
                { label: 'Blockchain',      color: '#f59e0b' },
                { label: 'AI / LLMs',       color: '#ef4444' },
                { label: 'RAG Systems',     color: '#ef4444' },
                { label: 'Machine Learning',color: '#3b82f6' },
                { label: 'Deployment',      color: 'var(--text-muted-1)' },
                { label: 'IoT',             color: '#22c55e' },
                { label: 'Linux',           color: 'var(--text-muted-1)' },
              ].map((item, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.06 }}
                  whileHover={{ scale: 1.07 }}
                  className="px-3 py-1.5 rounded-lg text-[11px] font-mono font-medium cursor-default transition-all"
                  style={{
                    background: `${item.color}10`,
                    color: item.color,
                    border: `1px solid ${item.color}25`,
                  }}
                >
                  {item.label}
                </motion.span>
              ))}
            </div>

            {/* Open Source interest */}
            <div className="flex items-center gap-2 mt-4">
              <Star size={12} className="text-[#f59e0b] fill-[#f59e0b]" />
              <span className="text-[11px] text-muted-1">
                Interested in{' '}
                <span className="text-primary font-medium">Open Source</span>{' '}
                contributions
              </span>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.a
            href="mailto:work.jadhavsaurabh@gmail.com"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="btn-outline inline-flex mt-2 w-fit"
          >
            Say Hello →
          </motion.a>
        </motion.div>

        {/* ── Right: Visual + Stats ── */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="flex flex-col gap-6"
        >
          {/* Profile visual */}
          <div className="relative max-w-sm mx-auto w-full">
            <div className="aspect-square w-full rounded-3xl overflow-hidden card p-px">
              <div className="w-full h-full rounded-3xl relative overflow-hidden">
                {/* Subtle grid overlay */}
                <div className="absolute inset-0 bg-grid-pattern opacity-20 z-10 pointer-events-none" />
                {/* Accent glows */}
                <div className="absolute top-1/3 left-1/3 w-24 h-24 bg-[#ef4444] opacity-10 blur-3xl rounded-full z-10 pointer-events-none" />
                <div className="absolute bottom-1/3 right-1/4 w-32 h-32 bg-[#3b82f6] opacity-10 blur-3xl rounded-full z-10 pointer-events-none" />
                {/* Photo */}
                <img
                  src="/photo.png"
                  alt="Saurabh Jadhav"
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                  decoding="async"
                />
                {/* Bottom gradient overlay for name */}
                <div
                  className="absolute bottom-0 left-0 right-0 z-20"
                  style={{
                    background: 'linear-gradient(to top, var(--bg-main) 0%, transparent 100%)',
                    padding: '1.5rem 1rem 1rem',
                  }}
                >
                  <p className="text-primary font-bold text-base text-center">Saurabh Jadhav</p>
                  <p className="text-muted-1 text-[10px] tracking-widest uppercase text-center">Software Developer</p>
                  <div className="flex gap-1 justify-center mt-2">
                    <div className="w-8 h-0.5 bg-[#ef4444] rounded-full" />
                    <div className="w-8 h-0.5 bg-[#3b82f6] rounded-full" />
                  </div>
                </div>
              </div>
            </div>
            {/* Floating tag */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -bottom-4 right-2 md:-right-4 glass-sm px-4 py-2 rounded-xl border border-border text-xs font-bold text-primary z-30 whitespace-nowrap"
            >
              Maharashtra, India 🇮🇳
            </motion.div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-4">
            {highlights.map((h, i) => (
              <motion.div
                key={i}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="card p-4 text-center"
              >
                <div className="flex justify-center mb-2">{h.icon}</div>
                <div className="text-2xl font-black text-primary">{h.val}</div>
                <div className="text-[10px] text-muted-1 uppercase tracking-widest mt-0.5">{h.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>


    </div>
  </section>
);

export default About;
