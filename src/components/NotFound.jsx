import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Terminal } from 'lucide-react';

/* ─── Glitch text effect ────────────────────────────────────────────────── */
const GlitchText = ({ text }) => {
  const [glitch, setGlitch] = useState(false);

  useEffect(() => {
    // Random glitch bursts
    const trigger = () => {
      setGlitch(true);
      setTimeout(() => setGlitch(false), 200 + Math.random() * 100);
    };
    const id = setInterval(trigger, 2000 + Math.random() * 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="not-found-glitch-wrap" aria-label={text}>
      <span className={`not-found-glitch${glitch ? ' is-glitching' : ''}`} data-text={text}>
        {text}
      </span>
    </div>
  );
};

/* ─── Typewriter terminal lines ─────────────────────────────────────────── */
const LINES = [
  { txt: '$ cd /requested-page',  delay: 0,    color: 'var(--text-muted-1)' },
  { txt: '> ERROR: path not found', delay: 600, color: '#ef4444' },
  { txt: '> status: 404',          delay: 1100, color: '#f59e0b' },
  { txt: '> suggestion: go home',  delay: 1600, color: '#22c55e' },
  { txt: '> awaiting input..._',   delay: 2200, color: '#3b82f6' },
];

const TerminalLines = () => {
  const [visible, setVisible] = useState(0);

  useEffect(() => {
    LINES.forEach((line, i) => {
      const t = setTimeout(() => setVisible(i + 1), line.delay);
      return () => clearTimeout(t);
    });
  }, []);

  return (
    <div className="not-found-terminal">
      {/* Terminal chrome */}
      <div className="not-found-terminal-bar">
        <span className="not-found-dot" style={{ background: '#ef4444' }} />
        <span className="not-found-dot" style={{ background: '#f59e0b' }} />
        <span className="not-found-dot" style={{ background: '#22c55e' }} />
        <span className="not-found-terminal-title">
          <Terminal size={10} style={{ display: 'inline', marginRight: 4 }} />
          error.sh
        </span>
      </div>
      {/* Lines */}
      <div className="not-found-terminal-body">
        {LINES.map((line, i) =>
          i < visible ? (
            <div
              key={i}
              className="not-found-terminal-line"
              style={{ color: line.color, animationDelay: `${line.delay}ms` }}
            >
              {line.txt}
              {i === visible - 1 && i < LINES.length - 1 && (
                <span className="animate-blink">▋</span>
              )}
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};

const IS_MOBILE = typeof window !== 'undefined' && window.innerWidth < 768;

/* ─── Main 404 page ─────────────────────────────────────────────────────── */
const NotFound = () => {
  const navigate = useNavigate();
  const blobRef  = useRef(null);

  // Subtle cursor glow — desktop only
  useEffect(() => {
    if (IS_MOBILE) return;
    const move = (e) => {
      if (!blobRef.current) return;
      blobRef.current.style.transform =
        `translate(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%)) translateZ(0)`;
    };
    window.addEventListener('mousemove', move, { passive: true });
    return () => window.removeEventListener('mousemove', move);
  }, []);

  return (
    <>
      {/* Cursor blob */}
      {!IS_MOBILE && <div ref={blobRef} className="cursor-blob" aria-hidden="true" />}

      {/* Film grain */}
      <div className="noise" aria-hidden="true" />

      <div className="not-found-page">
        {/* Ambient glows */}
        <div className="not-found-glow not-found-glow-red"  aria-hidden="true" />
        <div className="not-found-glow not-found-glow-blue" aria-hidden="true" />

        {/* Grid */}
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" aria-hidden="true" />

        {/* Content */}
        <div className="not-found-content">

          {/* Big 404 */}
          <GlitchText text="404" />

          {/* Divider */}
          <div className="section-divider" style={{ margin: '1.5rem auto' }} />

          {/* Heading */}
          <h1 className="not-found-heading">Page Not Found</h1>
          <p className="not-found-sub">
            The route you're looking for doesn't exist — or has been moved.<br />
            Let's get you back on track.
          </p>

          {/* Terminal */}
          <TerminalLines />

          {/* CTA buttons */}
          <div className="not-found-actions">
            <button
              onClick={() => navigate('/')}
              className="btn-primary"
              aria-label="Go back to home"
            >
              <ArrowLeft size={15} />
              Back to Home
            </button>
            <button
              onClick={() => navigate(-1)}
              className="btn-outline"
              aria-label="Go to previous page"
            >
              Previous Page
            </button>
          </div>

          {/* Footer hint */}
          <p className="not-found-footer-hint">
            <span className="text-muted-2">saurabhxo.site</span>
            <span className="text-muted-2"> / </span>
            <span className="text-[#ef4444]">404</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default NotFound;
