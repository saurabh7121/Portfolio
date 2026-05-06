import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { ArrowRight, Globe, Download } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

// ─── Mobile detection ─────────────────────────────────────────────────────────
// Evaluated once at module parse time — not inside React.
// On mobile: framer-motion is NEVER imported, saving ~132KB from mobile bundle.
const IS_MOBILE = typeof window !== 'undefined' && window.innerWidth < 768;

// Lazy-load the desktop framer-motion version — only desktop downloads it
const DesktopHero = !IS_MOBILE
  ? lazy(() => import('./HeroDesktop'))
  : null;

/* Animated counter — used by both mobile and desktop */
const Counter = ({ target, suffix = '', label }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        let start = 0;
        const duration = 1200;
        const step = (target / duration) * 16;
        const timer = setInterval(() => {
          start = Math.min(start + step, target);
          setCount(Math.round(start));
          if (start >= target) clearInterval(timer);
        }, 16);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-3xl md:text-4xl font-black text-white">
        {count}{suffix}
      </div>
      <div className="text-xs text-[#555] uppercase tracking-widest mt-1">{label}</div>
    </div>
  );
};

export { Counter };

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

// ─── Mobile Hero — pure CSS animations, ZERO framer-motion ───────────────────
// Framer-motion is not imported here at all → 132KB saved on mobile bundle
const MobileHero = () => (
  <section
    id="home"
    className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20"
  >
    <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

    <div className="container mx-auto px-5 relative z-10">
      <div className="flex flex-col items-center text-center max-w-2xl mx-auto">

        {/* Status badge */}
        <div className="hero-fade-in flex items-center gap-2 mb-8 glass-sm px-4 py-2 rounded-full"
             style={{ animationDelay: '0.1s' }}>
          <div className="status-dot" />
          <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#a1a1aa]">
            Available for Projects
          </span>
        </div>

        {/* Name */}
        <h1
          className="hero-fade-in hero-name font-black leading-[0.88] tracking-tighter text-white mb-4"
          style={{ fontSize: 'clamp(3.5rem, 18vw, 7rem)', animationDelay: '0.15s' }}
        >
          SAURABH<br />
          <span style={{ WebkitTextStroke: '1px rgba(255,255,255,0.15)', color: 'transparent' }}>
            JADHAV.
          </span>
        </h1>

        {/* Role */}
        <div className="hero-fade-in flex items-center gap-3 mb-6"
             style={{ animationDelay: '0.25s' }}>
          <div className="section-divider" style={{ margin: 0 }} />
          <p className="text-sm font-semibold tracking-[0.2em] uppercase text-[#71717a]">
            Software Developer
          </p>
        </div>

        {/* Tagline */}
        <p className="hero-fade-in text-base text-[#555] leading-relaxed max-w-lg mb-10"
           style={{ animationDelay: '0.3s' }}>
          A <span className="text-white font-medium italic">Software Developer</span> building
          scalable web apps &amp; intelligent systems with clean UI/UX.
        </p>

        {/* CTAs */}
        <div className="hero-fade-in flex flex-col w-full gap-3 mb-10"
             style={{ animationDelay: '0.4s' }}>
          {/* Primary — full width */}
          <a
            href="#projects"
            className="btn-primary w-full text-center"
            style={{ justifyContent: 'center' }}
          >
            View Work <ArrowRight size={15} />
          </a>

          {/* Secondary row — equal halves, compact padding on mobile */}
          <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
            <a
              href="#contact"
              className="btn-outline"
              style={{
                flex: 1,
                justifyContent: 'center',
                padding: '0.75rem 1rem',
                textAlign: 'center',
              }}
            >
              Get In Touch
            </a>
            {/* <a
              href="https://ik.imagekit.io/vwc55jjck/CV_SaurabhJadhav.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download="CV_SaurabhJadhav.pdf"
              className="btn-outline"
              aria-label="Download Resume"
              style={{
                flex: 1,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '0.75rem 1rem',
              }}
            >
              <Download size={14} /> Resume
            </a> */}
          </div>
        </div>

        {/* Socials */}
        <div className="hero-fade-in flex flex-wrap items-center justify-center gap-4 mb-10"
             style={{ animationDelay: '0.5s' }}>
          {socialLinks.map((s, i) => (
            <a
              key={i}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`text-[#444] hover:text-white transition-colors duration-200 ${s.hoverColor || ''}`}
              aria-label={s.label}
            >
              {s.icon}
            </a>
          ))}
        </div>
        <div className="hero-fade-in mb-8" style={{ animationDelay: '0.52s' }}>
          <a
            href="mailto:work.jadhavsaurabh@gmail.com"
            className="text-[11px] text-[#444] hover:text-white transition-colors tracking-wider font-mono"
          >
            work.jadhavsaurabh@gmail.com
          </a>
        </div>

        {/* Stats */}
        <div className="hero-fade-in flex justify-center gap-10 pt-6 border-t border-white/05 w-full"
             style={{ animationDelay: '0.55s' }}>
          <Counter target={2}  suffix="+" label="Years Exp." />
          <Counter target={15} suffix="+" label="Projects" />
          <Counter target={10} suffix="+" label="Tech" />
        </div>

        {/* Terminal card */}
        <div className="hero-fade-in mt-8 w-full" style={{ animationDelay: '0.6s' }}>
          <div className="css-float glass rounded-2xl p-5 border border-white/08">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#22c55e]" />
              <span className="ml-2 text-[#333] text-[10px] font-mono">saurabh.sh</span>
            </div>
            {terminalLines.map((line, i) => (
              <div
                key={i}
                className="hero-fade-in text-[11px] font-mono mb-1.5"
                style={{ color: line.c, animationDelay: `${0.7 + i * 0.1}s` }}
              >
                {line.txt}
                {i === 4 && <span className="animate-blink">_</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* Scroll hint */}
    <div
      className="hero-fade-in absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
      style={{ animationDelay: '1s' }}
    >
      <div className="scroll-line" />
    </div>
  </section>
);

// ─── Main Hero — routes to mobile or desktop version ─────────────────────────
const Hero = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    if (IS_MOBILE) return;
    const move = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform =
          `translate(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%)) translateZ(0)`;
      }
    };
    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, []);

  if (IS_MOBILE) {
    return <MobileHero />;
  }

  return (
    <>
      <div ref={cursorRef} className="cursor-blob" aria-hidden="true" />
      <Suspense fallback={<div style={{ minHeight: '100vh' }} />}>
        <DesktopHero />
      </Suspense>
    </>
  );
};

export default Hero;
