import { lazy, Suspense, useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';

// Lazy-load 404 page — never part of the initial bundle
const NotFound = lazy(() => import('./components/NotFound'));

// ─── Lazy imports & Configurations ───────────────────────────────────────────
const ThreeCanvas = lazy(() => import('./components/ThreeCanvas'));

// Below-fold sections — always lazy regardless of device
const About      = lazy(() => import('./components/About'));
const Services   = lazy(() => import('./components/Services'));
const Projects   = lazy(() => import('./components/Projects'));
const Experience = lazy(() => import('./components/Experience'));
const Skills     = lazy(() => import('./components/Skills'));
const Contact    = lazy(() => import('./components/Contact'));
const Footer     = lazy(() => import('./components/Footer'));

// Lightweight placeholder — maintains layout height while sections load
const SectionFallback = () => (
  <div style={{ minHeight: '40vh' }} aria-hidden="true" />
);

// ─── Pure CSS animated background (used as fallback/loading phase) ───────────
const MobileBackground = () => (
  <div
    aria-hidden="true"
    style={{
      position: 'fixed',
      inset: 0,
      zIndex: 0,
      background: '#080808',
      overflow: 'hidden',
    }}
  >
    {/* Gradient orbs — CSS only, GPU composited */}
    <div style={{
      position: 'absolute',
      top: '15%', left: '10%',
      width: 320, height: 320,
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(59,130,246,0.12) 0%, transparent 70%)',
      filter: 'blur(40px)',
      animation: 'orb-float-1 8s ease-in-out infinite',
      willChange: 'transform',
    }} />
    <div style={{
      position: 'absolute',
      top: '55%', right: '8%',
      width: 260, height: 260,
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(239,68,68,0.10) 0%, transparent 70%)',
      filter: 'blur(40px)',
      animation: 'orb-float-2 10s ease-in-out infinite',
      willChange: 'transform',
    }} />
    <div style={{
      position: 'absolute',
      bottom: '20%', left: '40%',
      width: 200, height: 200,
      borderRadius: '50%',
      background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 70%)',
      filter: 'blur(30px)',
      animation: 'orb-float-1 12s ease-in-out infinite reverse',
      willChange: 'transform',
    }} />
    <style>{`
      @keyframes orb-float-1 {
        0%, 100% { transform: translateY(0px) translateZ(0); }
        50% { transform: translateY(-30px) translateZ(0); }
      }
      @keyframes orb-float-2 {
        0%, 100% { transform: translateY(0px) translateX(0px) translateZ(0); }
        50% { transform: translateY(25px) translateX(-15px) translateZ(0); }
      }
    `}</style>
  </div>
);

// ─── Premium Loader Screen ───────────────────────────────────────────────────
const PremiumLoader = ({ fadeOut }) => (
  <div
    style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      background: '#080808',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: fadeOut ? 0 : 1,
      pointerEvents: fadeOut ? 'none' : 'auto',
      transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
    }}
  >
    <div className="loader-ring" />
    <span className="loader-text">INITIALIZING ENGINE...</span>

    <style>{`
      .loader-ring {
        width: 44px;
        height: 44px;
        border: 2px solid rgba(255, 255, 255, 0.03);
        border-top-color: #ef4444;
        border-bottom-color: #3b82f6;
        border-radius: 50%;
        animation: spin 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        margin-bottom: 24px;
      }
      .loader-text {
        font-family: monospace;
        font-size: 10px;
        color: #444;
        letter-spacing: 0.3em;
        animation: pulse 1.8s ease-in-out infinite;
      }
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      @keyframes pulse {
        0%, 100% { opacity: 0.4; }
        50% { opacity: 1; }
      }
    `}</style>
  </div>
);

// ─── App ─────────────────────────────────────────────────────────────────────
function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Safety timeout: automatically reveal site after 4.5 seconds if Canvas load hangs
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 4500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Routes>
      {/* ── Main portfolio ── */}
      <Route
        path="/"
        element={
          <div className="bg-[#080808] text-white min-h-screen overflow-x-hidden">
            {/* Film grain — CSS only */}
            <div className="noise" aria-hidden="true" />

            {/* Premium Fullscreen Loader */}
            <PremiumLoader fadeOut={isLoaded} />

            {/* Background layer */}
            <Suspense fallback={<MobileBackground />}>
              <ThreeCanvas onReady={() => setIsLoaded(true)} />
            </Suspense>

            {/* UI layer */}
            <div
              className="relative"
              style={{
                zIndex: 10,
                opacity: isLoaded ? 1 : 0,
                transform: isLoaded ? 'translateY(0px)' : 'translateY(15px)',
                transition: 'opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), transform 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              <Navbar />

              <main>
                <Hero />

                <Suspense fallback={<SectionFallback />}>
                  <About />
                </Suspense>
                <Suspense fallback={<SectionFallback />}>
                  <Services />
                </Suspense>
                <Suspense fallback={<SectionFallback />}>
                  <Projects />
                </Suspense>
                <Suspense fallback={<SectionFallback />}>
                  <Experience />
                </Suspense>
                <Suspense fallback={<SectionFallback />}>
                  <Skills />
                </Suspense>
                <Suspense fallback={<SectionFallback />}>
                  <Contact />
                </Suspense>
              </main>

              <Suspense fallback={null}>
                <Footer />
              </Suspense>
            </div>
          </div>
        }
      />

      {/* ── 404 — catch all unknown routes ── */}
      <Route
        path="*"
        element={
          <Suspense fallback={<div className="bg-[#080808] min-h-screen" />}>
            <NotFound />
          </Suspense>
        }
      />
    </Routes>
  );
}

export default App;

