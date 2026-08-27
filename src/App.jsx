import { lazy, Suspense, useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CustomCursor from './components/CustomCursor';
import { DotPattern } from './components/ui/DotPattern';
import { ScrollProgressBar } from './components/ui/ScrollReveal';
import { GeometricMeshBackground } from './components/ui/GeometricMeshBackground';

// Lazy-load 404 page — never part of the initial bundle
const NotFound = lazy(() => import('./components/NotFound'));

// ─── Lazy imports & Configurations ───────────────────────────────────────────

// Below-fold sections — always lazy regardless of device
const About      = lazy(() => import('./components/About'));
const Services   = lazy(() => import('./components/Services'));
const Projects   = lazy(() => import('./components/Projects'));
const Experience = lazy(() => import('./components/Experience'));
const Skills     = lazy(() => import('./components/Skills'));
const Contact    = lazy(() => import('./components/Contact'));
const Footer     = lazy(() => import('./components/Footer'));

// Blog pages
const Blogs    = lazy(() => import('./components/Blogs'));
const BlogPost = lazy(() => import('./components/BlogPost'));

// Lightweight placeholder — maintains layout height while sections load
const SectionFallback = () => (
  <div style={{ minHeight: '40vh' }} aria-hidden="true" />
);


// ─── Premium Loader Screen ───────────────────────────────────────────────────
const PremiumLoader = ({ fadeOut }) => (
  <div
    style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      background: 'var(--bg-main)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: fadeOut ? 0 : 1,
      pointerEvents: fadeOut ? 'none' : 'auto',
      transition: 'opacity 0.5s ease',
    }}
  >
    <div className="loader-ring" />
    <span className="loader-text">LOADING...</span>

    <style>{`
      .loader-ring {
        width: 40px;
        height: 40px;
        border: 3px solid var(--border-color);
        border-top-color: #FFD600;
        border-radius: 0;
        animation: spin 0.8s linear infinite;
        margin-bottom: 24px;
      }
      .loader-text {
        font-family: 'Space Grotesk', monospace;
        font-size: 11px;
        font-weight: 800;
        color: var(--text-main);
        letter-spacing: 0.3em;
      }
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

// ─── Page Transition Wrapper ──────────────────────────────────────────────────
const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -15 }}
    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
  >
    {children}
  </motion.div>
);

// ─── App ─────────────────────────────────────────────────────────────────────
function App() {
  const location = useLocation();
  const [isLoaded, setIsLoaded] = useState(false);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    // Immediately reveal the site as there is no heavy background to load
    setIsLoaded(true);
  }, []);

  return (
    <>
      <ScrollProgressBar />
      <CustomCursor />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* ── Main portfolio ── */}
          <Route
            path="/"
            element={
              <PageWrapper>
                <div className="bg-[var(--bg-main)] text-primary min-h-screen overflow-x-hidden transition-colors duration-300">


            {/* Premium Fullscreen Loader */}
            <PremiumLoader fadeOut={isLoaded} />

            {/* Geometric Low-Poly Mesh Background matching reference image */}
            <GeometricMeshBackground theme={theme} />

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
              <Navbar theme={theme} toggleTheme={toggleTheme} />

              <main>
                <Hero theme={theme} />

                <Suspense fallback={<SectionFallback />}>
                  <About theme={theme} />
                </Suspense>
                <Suspense fallback={<SectionFallback />}>
                  <Services theme={theme} />
                </Suspense>
                <Suspense fallback={<SectionFallback />}>
                  <Projects />
                </Suspense>
                <Suspense fallback={<SectionFallback />}>
                  <Experience />
                </Suspense>
                <Suspense fallback={<SectionFallback />}>
                  <Skills theme={theme} />
                </Suspense>
                <Suspense fallback={<SectionFallback />}>
                  <Contact theme={theme} />
                </Suspense>
              </main>

              <Suspense fallback={null}>
                <Footer theme={theme} />
              </Suspense>
            </div>
          </div>
              </PageWrapper>
            }
          />

          {/* ── Blog listing ── */}
          <Route
            path="/blogs"
            element={
              <PageWrapper>
                <div className="bg-[var(--bg-main)] text-primary min-h-screen overflow-x-hidden transition-colors duration-300">
                  <Navbar theme={theme} toggleTheme={toggleTheme} />
                  <Suspense fallback={<SectionFallback />}>
                    <Blogs />
                  </Suspense>
                </div>
              </PageWrapper>
            }
          />

          {/* ── Blog post ── */}
          <Route
            path="/blogs/:slug"
            element={
              <PageWrapper>
                <div className="bg-[var(--bg-main)] text-primary min-h-screen overflow-x-hidden transition-colors duration-300">
                  <Navbar theme={theme} toggleTheme={toggleTheme} />
                  <Suspense fallback={<SectionFallback />}>
                    <BlogPost />
                  </Suspense>
                </div>
              </PageWrapper>
            }
          />

          {/* ── 404 — catch all unknown routes ── */}
          <Route
            path="*"
            element={
              <PageWrapper>
                <Suspense fallback={<div className="bg-[var(--bg-main)] min-h-screen transition-colors duration-300" />}>
                  <NotFound />
                </Suspense>
              </PageWrapper>
            }
          />
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;

