import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, FolderOpen, ChevronRight, Terminal } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

const projects = [
  {
    title: 'Financial Authorization Platform',
    desc: 'Accessible system to simplify financial consent using guided UI and verification. Focused on usability for rural and urban users.',
    tech: ['React', 'Node.js', 'MongoDB', 'JWT'],
    link: '#',
    github: 'https://github.com/saurabh7121',
    accent: '#ef4444',
    featured: true,
    icon: '💳',
    codeLines: [
      { txt: 'POST /api/consent/verify',   c: '#ef4444' },
      { txt: '  status: "authorized" ✓',   c: '#22c55e' },
      { txt: 'GET  /api/user/agreement',   c: '#3b82f6' },
      { txt: '  jwt: valid · exp: 24h',    c: '#a1a1aa' },
      { txt: 'DB  MongoDB · secure tx',    c: '#71717a' },
    ],
    pattern: 'radial-gradient(ellipse at 20% 50%, rgba(239,68,68,0.12) 0%, transparent 60%), radial-gradient(ellipse at 80% 50%, rgba(59,130,246,0.08) 0%, transparent 60%)',
  },
  {
    title: 'Smart Campus Transport App',
    desc: 'Mobile application for real-time bus tracking, route management and transport booking for campus students.',
    tech: ['React Native', 'Firebase', 'Maps API'],
    link: '#',
    github: 'https://github.com/saurabh7121',
    accent: '#3b82f6',
    featured: false,
    icon: '🚌',
    codeLines: [
      { txt: 'WS  live_bus_feed connected', c: '#3b82f6' },
      { txt: '  buses: 12 active 🟢',       c: '#22c55e' },
      { txt: 'GET /routes/campus-north',    c: '#a1a1aa' },
      { txt: '  eta: 4 min · seats: 8',    c: '#f59e0b' },
      { txt: 'Firebase Realtime DB ✓',      c: '#71717a' },
    ],
    pattern: 'radial-gradient(ellipse at 30% 40%, rgba(59,130,246,0.12) 0%, transparent 60%), radial-gradient(ellipse at 70% 60%, rgba(34,197,94,0.06) 0%, transparent 60%)',
  },
  {
    title: 'Sign Language Converter',
    desc: 'ML-powered real-time application that converts sign language gestures into text, improving accessibility.',
    tech: ['Python', 'OpenCV', 'ML', 'React'],
    link: '#',
    github: 'https://github.com/saurabh7121',
    accent: '#a855f7',
    featured: false,
    icon: '🤟',
    codeLines: [
      { txt: 'model.predict(frame)',         c: '#a855f7' },
      { txt: '  gesture: "Hello" 98.2%',    c: '#22c55e' },
      { txt: 'OpenCV · frame: 60fps',       c: '#3b82f6' },
      { txt: '  landmarks: 21 detected',    c: '#a1a1aa' },
      { txt: 'output → text stream ✓',      c: '#71717a' },
    ],
    pattern: 'radial-gradient(ellipse at 50% 30%, rgba(168,85,247,0.12) 0%, transparent 60%), radial-gradient(ellipse at 50% 80%, rgba(59,130,246,0.06) 0%, transparent 60%)',
  },
];

/* Code preview card replacing the image */
const CodePreview = ({ project }) => (
  <div
    className="h-48 sm:h-52 relative overflow-hidden flex flex-col justify-between"
    style={{ background: project.pattern, backgroundColor: '#0d0d0d' }}
  >
    {/* Subtle grid */}
    <div className="absolute inset-0 bg-grid-pattern opacity-20" />

    {/* Header bar */}
    <div className="relative z-10 flex items-center gap-2 px-4 pt-4 pb-2">
      <div className="flex gap-1.5">
        <div className="w-2 h-2 rounded-full bg-[#ef4444]" />
        <div className="w-2 h-2 rounded-full bg-[#f59e0b]" />
        <div className="w-2 h-2 rounded-full bg-[#22c55e]" />
      </div>
      <div className="flex-1 text-center">
        <span className="text-[9px] font-mono text-[#333] tracking-wider">
          {project.title.toLowerCase().replace(/ /g, '_')}.sh
        </span>
      </div>
      <Terminal size={12} style={{ color: project.accent }} />
    </div>

    {/* Code lines */}
    <div className="relative z-10 px-4 pb-4 space-y-1 flex-1">
      {project.codeLines.map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -6 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 + i * 0.08 }}
          className="text-[10px] font-mono"
          style={{ color: line.c }}
        >
          {line.txt}
        </motion.div>
      ))}
    </div>

    {/* Big emoji watermark */}
    <div
      className="absolute right-4 top-1/2 -translate-y-1/2 text-5xl opacity-10 select-none pointer-events-none"
      aria-hidden="true"
    >
      {project.icon}
    </div>

    {/* Accent glow bottom */}
    <div
      className="absolute bottom-0 left-0 right-0 h-12 pointer-events-none"
      style={{ background: `linear-gradient(to top, ${project.accent}18, transparent)` }}
    />

    {/* Hover accent overlay */}
    <div
      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
      style={{ background: `linear-gradient(135deg, ${project.accent}08, transparent 60%)` }}
    />
  </div>
);

const ProjectCard = ({ project, i }) => (
  <motion.article
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ delay: i * 0.1, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    className="card group relative overflow-hidden flex flex-col"
  >
    {/* Featured tag */}
    {project.featured && (
      <div
        className="absolute top-4 left-4 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest"
        style={{ background: `${project.accent}20`, color: project.accent, border: `1px solid ${project.accent}30` }}
      >
        ★ Featured
      </div>
    )}

    {/* Code preview (replaces photo) */}
    <CodePreview project={project} />

    {/* Body */}
    <div className="p-6 relative z-10 flex flex-col flex-1">
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="text-white font-bold text-lg leading-tight tracking-tight">{project.title}</h3>
        <FolderOpen size={18} style={{ color: project.accent }} className="flex-shrink-0 mt-0.5" />
      </div>
      <p className="text-[#555] text-sm leading-relaxed mb-5">{project.desc}</p>

      {/* Tech stack */}
      <div className="flex flex-wrap gap-2 mb-6">
        {project.tech.map((t) => (
          <span
            key={t}
            className="text-[10px] font-mono px-2.5 py-1 rounded-md border border-white/06 text-[#555]"
            style={{ background: `${project.accent}08` }}
          >
            {t}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="flex items-center justify-between pt-4 border-t border-white/05 mt-auto">
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-xs text-[#555] hover:text-white transition-colors font-medium"
        >
          <FaGithub size={14} /> Source Code
        </a>
        <a
          href={project.link}
          className="flex items-center gap-1.5 text-xs font-bold transition-all hover:gap-2"
          style={{ color: project.accent }}
        >
          Live Demo <ExternalLink size={12} />
        </a>
      </div>
    </div>
  </motion.article>
);

const Projects = () => (
  <section id="projects" className="py-28 relative overflow-hidden">
    <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#ef4444] opacity-[0.03] blur-[120px] rounded-full pointer-events-none" />

    <div className="container mx-auto px-5 sm:px-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16 flex flex-col items-center text-center"
      >
        <span className="section-label">
          <FolderOpen size={12} />
          My Work
        </span>
        <h2
          className="font-black text-white leading-tight mb-4"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
        >
          Featured{' '}
          <span className="text-gradient-red">Projects</span>
        </h2>
        <div className="section-divider mx-auto" />
        <p className="text-[#555] max-w-md mt-4 text-sm leading-relaxed">
          A selection of real-world projects built with modern technologies.
        </p>
      </motion.div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((p, i) => (
          <ProjectCard key={i} project={p} i={i} />
        ))}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mt-12 text-center"
      >
        <a
          href="https://github.com/saurabh7121"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-outline inline-flex"
        >
          View All on GitHub <ChevronRight size={16} />
        </a>
      </motion.div>
    </div>
  </section>
);

export default Projects;
