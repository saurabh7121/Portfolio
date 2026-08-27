import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { ArrowRight, Globe, Download } from 'lucide-react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { AnimatedShinyText } from './ui/AnimatedShinyText';

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
      <div className="text-3xl md:text-4xl font-black text-primary">
        {count}{suffix}
      </div>
      <div className="text-xs text-muted-1 uppercase tracking-widest mt-1">{label}</div>
    </div>
  );
};

export { Counter };

const githubUsername = process.env.GITHUB_USERNAME || 'saurabh7121';

const socialLinks = [
  { icon: <FaGithub size={18} />, href: `https://github.com/${githubUsername}`, label: 'GitHub' },
  { icon: <FaLinkedin size={18} />, href: 'https://www.linkedin.com/in/jadhavsau777/', label: 'LinkedIn', hoverColor: 'hover:text-[#3b82f6]' },
  { icon: <FaTwitter size={18} />, href: 'https://twitter.com/jadhavsau777', label: 'Twitter', hoverColor: 'hover:text-[#1d9bf0]' },
  { icon: <Globe size={18} />, href: 'https://saurabhxo.site', label: 'Website', hoverColor: 'hover:text-[#ef4444]' },
];

const terminalLines = [
  { txt: '> name: Saurabh Jadhav', c: 'var(--text-muted-1)' },
  { txt: '> role: Software Dev',   c: '#3b82f6' },
  { txt: '> status: available',    c: '#22c55e' },
  { txt: '> stack: React, Node',   c: 'var(--text-muted-1)' },
  { txt: '> passion: building++',  c: '#ef4444' },
];

// ─── Mobile Hero — pure CSS animations, ZERO framer-motion ───────────────────
// Framer-motion is not imported here at all → 132KB saved on mobile bundle
const MobileHero = () => (
  <section
    id="home"
    className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-32 pb-10"
  >
    <div className="container mx-auto px-5 relative z-10">
      <div className="flex flex-col items-center text-center max-w-2xl mx-auto">

        {/* Status badge */}
        <div className="hero-fade-in flex items-center mb-8 mt-4" style={{ animationDelay: '0.1s' }}>
          <div className="px-4 py-2 rounded-none border-2 border-black bg-white flex items-center gap-2 shadow-[2px_2px_0px_#0a0a0a]">
            <div className="w-2.5 h-2.5 rounded-none bg-[#22c55e] border border-black animate-pulse" />
            <AnimatedShinyText className="text-[11px] font-bold tracking-[0.25em] uppercase text-black">
              Available for Projects
            </AnimatedShinyText>
          </div>
        </div>

        {/* Name */}
        <h1
          className="hero-fade-in hero-name font-black leading-[0.88] tracking-tighter text-primary mb-4"
          style={{ fontSize: 'clamp(3.5rem, 18vw, 7rem)', animationDelay: '0.15s' }}
        >
          SAURABH<br />
          <span style={{ WebkitTextStroke: '2px var(--text-stroke)', color: 'transparent' }}>
            JADHAV.
          </span>
        </h1>

        {/* Role */}
        <div className="hero-fade-in flex items-center gap-3 mb-6"
             style={{ animationDelay: '0.25s' }}>
          <div className="section-divider" style={{ margin: 0 }} />
          <p className="text-sm font-semibold tracking-[0.2em] uppercase text-muted-1">
            Software Developer
          </p>
        </div>

        {/* Tagline */}
        <p className="hero-fade-in text-base text-muted-1 leading-relaxed max-w-lg mb-10"
           style={{ animationDelay: '0.3s' }}>
          A <span className="text-primary font-medium italic">Software Developer</span> building
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
              className={`text-muted-1 hover:text-primary transition-colors duration-200 ${s.hoverColor || ''}`}
              aria-label={s.label}
            >
              {s.icon}
            </a>
          ))}
        </div>
        <div className="hero-fade-in mb-8" style={{ animationDelay: '0.52s' }}>
          <a
            href="mailto:work.jadhavsaurabh@gmail.com"
            className="text-[11px] text-muted-1 hover:text-primary transition-colors tracking-wider font-mono"
          >
            work.jadhavsaurabh@gmail.com
          </a>
        </div>

        {/* Stats */}
        <div className="hero-fade-in flex justify-center gap-10 pt-6 border-t border-border w-full"
             style={{ animationDelay: '0.55s' }}>
          <Counter target={2}  suffix="+" label="Years Exp." />
          <Counter target={4} suffix="+" label="Projects" />
          <Counter target={10} suffix="+" label="Tech" />
        </div>

        {/* Terminal card */}
        <div className="hero-fade-in mt-8 w-full" style={{ animationDelay: '0.6s' }}>
          <div className="p-5 bg-white border-2 border-black rounded-none shadow-[4px_4px_0px_#0a0a0a] text-left">
            <div className="flex items-center gap-2 mb-4 border-b-2 border-black pb-3">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-none border border-black bg-[#ff5f56]" />
                <div className="w-2.5 h-2.5 rounded-none border border-black bg-[#ffbd2e]" />
                <div className="w-2.5 h-2.5 rounded-none border border-black bg-[#27c93f]" />
              </div>
              <span className="ml-2 text-black text-[10px] font-mono font-bold uppercase">saurabh.sh</span>
            </div>
            {terminalLines.map((line, i) => (
              <div
                key={i}
                className="hero-fade-in text-[11px] font-mono mb-1.5"
                style={{ color: '#0a0a0a', animationDelay: `${0.7 + i * 0.1}s` }}
              >
                {line.txt}
                {i === 4 && <span className="animate-blink">_</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

  </section>
);

// ─── Main Hero — routes to mobile or desktop version ─────────────────────────
const Hero = ({ theme }) => {
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
        <DesktopHero theme={theme} />
      </Suspense>
    </>
  );
};

export default Hero;
