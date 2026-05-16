// HeroDesktop.jsx — loaded only on desktop (>= 768px)
// Contains framer-motion animations. This file is lazy-imported so mobile
// devices never download the framer-motion chunk.
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Globe, Download } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { Counter } from './Hero';
import ParticleText from './ParticleText';

const socialLinks = [
  { icon: <FaGithub size={18} />, href: 'https://github.com/saurabh7121', label: 'GitHub' },
  { icon: <FaLinkedin size={18} />, href: 'https://www.linkedin.com/in/jadhavsau777/', label: 'LinkedIn', hoverColor: 'hover:text-[#3b82f6]' },
  { icon: <FaTwitter size={18} />, href: 'https://twitter.com/jadhavsau777', label: 'Twitter', hoverColor: 'hover:text-[#1d9bf0]' },
  { icon: <Globe size={18} />, href: 'https://saurabhxo.site', label: 'Website', hoverColor: 'hover:text-[#ef4444]' },
];

const terminalLines = [
  { txt: '> name: Saurabh Jadhav', c: '#a1a1aa' },
  { txt: '> role: Software Dev',   c: '#3b82f6' },
  { txt: '> status: available',    c: '#22c55e' },
  { txt: '> stack: React, Node',   c: '#a1a1aa' },
  { txt: '> passion: building++',  c: '#ef4444' },
];

const HeroDesktop = () => (
  <section
    id="home"
    className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20"
  >
    <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />
    <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-[#ef4444] opacity-[0.04] blur-[120px] rounded-full pointer-events-none" />
    <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-[#3b82f6] opacity-[0.04] blur-[140px] rounded-full pointer-events-none" />

    <div className="container mx-auto px-8 relative z-10">
      <div className="flex flex-row items-center justify-between gap-20 min-h-[80vh]">

        {/* ── LEFT CONTENT ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1 flex flex-col items-start text-left max-w-2xl"
        >
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-2 mb-8 glass-sm px-4 py-2 rounded-full"
          >
            <div className="status-dot" />
            <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#a1a1aa]">
              Available for Projects
            </span>
          </motion.div>

          <div
            className="relative mb-4 w-full"
            style={{ height: 'clamp(200px, 40vh, 400px)', marginLeft: '-10px' }}
          >
            <ParticleText
              text={"SAURABH\nJADHAV."}
              particleColor="#FFFFFF"
              particleSize={1.8}
              particleDensity={3}
              mouseRadius={120}
              returnSpeed={0.06}
              font={{
                fontSize: "120px",
                fontWeight: "900",
                fontFamily: "Inter, sans-serif",
              }}
              horizontalAlign="left"
              verticalAlign="center"
            />
          </div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="section-divider" style={{ margin: 0 }} />
            <p className="text-sm font-semibold tracking-[0.2em] uppercase text-[#71717a]">
              Software Developer
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-base sm:text-lg text-[#555] leading-relaxed max-w-lg mb-10"
          >
            A <span className="text-white font-medium italic">Software Developer</span> building
            scalable web apps &amp; intelligent systems with clean UI/UX.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75 }}
            className="flex flex-wrap items-center gap-4 mb-12"
          >
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="btn-primary"
            >
              View Work <ArrowRight size={15} />
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="btn-outline"
            >
              Get In Touch
            </motion.a>
            {/* <motion.a
              href="https://ik.imagekit.io/vwc55jjck/CV_SaurabhJadhav.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download="CV_SaurabhJadhav.pdf"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="btn-outline flex items-center gap-2"
              aria-label="Download Resume"
            >
              <Download size={14} /> Resume
            </motion.a> */}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="flex items-center gap-4"
          >
            {socialLinks.map((s, i) => (
              <motion.a
                key={i}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -2 }}
                className={`text-[#444] hover:text-white transition-all duration-200 ${s.hoverColor || ''}`}
                aria-label={s.label}
              >
                {s.icon}
              </motion.a>
            ))}
            <div className="ml-2 w-px h-5 bg-white/10" />
            <a
              href="mailto:work.jadhavsaurabh@gmail.com"
              className="text-[11px] text-[#444] hover:text-white transition-colors tracking-wider font-mono"
            >
              work.jadhavsaurabh@gmail.com
            </a>
          </motion.div>
        </motion.div>

        {/* ── RIGHT VISUAL ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center justify-center gap-10 flex-shrink-0 h-[520px]"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="grid grid-cols-3 gap-8 w-full"
          >
            <Counter target={2}  suffix="+" label="Years Exp." />
            <Counter target={15} suffix="+" label="Projects" />
            <Counter target={10} suffix="+" label="Technologies" />
          </motion.div>

          <div className="relative w-[380px] h-[380px] flex items-center justify-center">
            <div className="orbit-ring w-[380px] h-[380px] animate-spin-slow opacity-20" />
            <div
              className="orbit-ring w-[300px] h-[300px] animate-counter-spin opacity-10"
              style={{ borderColor: 'rgba(239,68,68,0.4)' }}
            />
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 glass rounded-3xl p-6 w-64 border border-white/08 glow-white"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#22c55e]" />
                <span className="ml-2 text-[#333] text-[10px] font-mono">saurabh.sh</span>
              </div>
              {terminalLines.map((line, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1 + i * 0.15 }}
                  className="text-[10px] font-mono mb-1.5"
                  style={{ color: line.c }}
                >
                  {line.txt}
                  {i === 4 && <span className="animate-blink">_</span>}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
    >
      <div className="scroll-line" />
    </motion.div>
  </section>
);

export default HeroDesktop;
