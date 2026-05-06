import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Code2 } from 'lucide-react';

const primarySkills = [
  { name: 'React',       level: 90, color: '#61dafb' },
  { name: 'JavaScript', level: 90, color: '#f7df1e' },
  { name: 'Node.js',    level: 85, color: '#68a063' },
  { name: 'Git',        level: 85, color: '#f05032' },
  { name: 'MongoDB',    level: 80, color: '#47a248' },
  { name: 'Python',     level: 75, color: '#3776ab' },
];

const techCloud = [
  { name: 'Docker',          accent: null },
  { name: 'Firebase',        accent: '#ef4444' },
  { name: 'Express.js',      accent: null },
  { name: 'REST APIs',       accent: '#3b82f6' },
  { name: 'Tailwind CSS',    accent: '#38bdf8' },
  { name: 'Linux',           accent: null },
  { name: 'TypeScript',      accent: '#3b82f6' },
  { name: 'MySQL',           accent: null },
  { name: 'Next.js',         accent: null },
  { name: 'Figma',           accent: '#ef4444' },
  { name: 'Blockchain ↗',    accent: '#f59e0b' },
  { name: 'AI / LLMs ↗',    accent: '#ef4444' },
  { name: 'RAG Systems ↗',  accent: '#ef4444' },
  { name: 'ML ↗',           accent: '#3b82f6' },
  { name: 'Deployment ↗',   accent: '#a1a1aa' },
  { name: 'IoT ↗',          accent: '#22c55e' },
  { name: 'Open Source ↗',  accent: '#f59e0b' },
];

/* Animated skill bar */
const SkillBar = ({ skill, i }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay: i * 0.08, duration: 0.5 }}
    className="group"
  >
    <div className="flex justify-between items-center mb-2">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full" style={{ background: skill.color }} />
        <span className="text-sm font-medium text-[#a1a1aa] group-hover:text-white transition-colors">{skill.name}</span>
      </div>
      <span className="text-xs font-bold font-mono" style={{ color: skill.color }}>{skill.level}%</span>
    </div>
    <div className="skill-bar">
      <motion.div
        className="skill-bar-fill"
        initial={{ width: 0 }}
        whileInView={{ width: `${skill.level}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
        style={{ background: `linear-gradient(to right, ${skill.color}80, ${skill.color})` }}
      />
    </div>
  </motion.div>
);

/* Hexagon-style skill chip */
const TechChip = ({ tech, i }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay: i * 0.05, duration: 0.4 }}
    whileHover={{ scale: 1.08, y: -2 }}
    className="px-4 py-2 rounded-xl border text-xs font-medium cursor-default transition-all"
    style={{
      borderColor: tech.accent ? `${tech.accent}30` : 'rgba(255,255,255,0.06)',
      color: tech.accent || '#555',
      background: tech.accent ? `${tech.accent}08` : 'rgba(255,255,255,0.02)',
    }}
  >
    {tech.name}
  </motion.div>
);

/* Circular progress – decorative */
const CircleProgress = ({ value, color }) => {
  const r = 28;
  const circ = 2 * Math.PI * r;
  return (
    <svg width="72" height="72" className="rotate-[-90deg]">
      <circle cx="36" cy="36" r={r} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="4" />
      <motion.circle
        cx="36" cy="36" r={r} fill="none"
        stroke={color} strokeWidth="4" strokeLinecap="round"
        strokeDasharray={circ}
        initial={{ strokeDashoffset: circ }}
        whileInView={{ strokeDashoffset: circ - (value / 100) * circ }}
        viewport={{ once: true }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
      />
    </svg>
  );
};

const Skills = () => (
  <section id="skills" className="py-28 relative overflow-hidden">
    <div className="absolute right-0 bottom-0 w-80 h-80 bg-[#3b82f6] opacity-[0.03] blur-[120px] rounded-full pointer-events-none" />

    <div className="container mx-auto px-5 sm:px-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16 flex flex-col items-center text-center"
      >
        <span className="section-label">
          <Code2 size={12} />
          My Stack
        </span>
        <h2
          className="font-black text-white leading-tight mb-4"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
        >
          Technical{' '}
          <span className="text-gradient-white">Skills</span>
        </h2>
        <div className="section-divider mx-auto" />
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
        {/* ── Left: Skill Bars ── */}
        <div className="space-y-6">
          <p className="text-[#555] text-sm mb-8 leading-relaxed">
            Core proficiencies built through real-world projects and continuous learning.
          </p>
          {primarySkills.map((skill, i) => (
            <SkillBar key={skill.name} skill={skill} i={i} />
          ))}
        </div>

        {/* ── Right: Visual + Tech Cloud ── */}
        <div className="flex flex-col gap-10">
          {/* Three mini circles */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Frontend', val: 90, color: '#3b82f6' },
              { label: 'Backend', val: 85, color: '#ef4444' },
              { label: 'DevOps', val: 65, color: '#a1a1aa' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12 }}
                className="card p-5 flex flex-col items-center gap-2"
              >
                <div className="relative">
                  <CircleProgress value={item.val} color={item.color} />
                  <span className="absolute inset-0 flex items-center justify-center text-xs font-black text-white">
                    {item.val}%
                  </span>
                </div>
                <span className="text-[11px] text-[#555] uppercase tracking-widest font-medium">{item.label}</span>
              </motion.div>
            ))}
          </div>

          {/* Tech Cloud */}
          <div>
            <p className="text-[#333] text-xs uppercase tracking-widest mb-4 font-bold">Also familiar with</p>
            <div className="flex flex-wrap gap-2">
              {techCloud.map((t, i) => (
                <TechChip key={t.name} tech={t} i={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Skills;
