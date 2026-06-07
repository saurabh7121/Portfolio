import { lazy, Suspense, useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CustomCursor from './components/CustomCursor';
import GridPattern from './components/GridPattern';
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
      transition: 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
    }}
  >
    <div className="loader-ring" />
    <span className="loader-text">INITIALIZING ENGINE...</span>

    <style>{`
      .loader-ring {
        width: 44px;
        height: 44px;
        border: 2px solid var(--border-color);
        border-top-color: #ef4444;
        border-bottom-color: #3b82f6;
        border-radius: 50%;
        animation: spin 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
        margin-bottom: 24px;
      }
      .loader-text {
        font-family: monospace;
        font-size: 10px;
        color: var(--text-muted-1);
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

            {/* Dynamic Grid Pattern Background */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
              <GridPattern
                squares={[
                  [2, 4], [4, 4], [5, 1], [8, 2], [5, 3], [5, 5], [10, 10], [12, 15], [15, 10], [10, 15], [15, 10], [10, 15], [15, 10],
                  [2, 7], [3, 12], [6, 8], [7, 14], [9, 5], [11, 3], [14, 6], [16, 12], [18, 4], [20, 15], [22, 8], [24, 2],
                  [1, 1], [3, 3], [7, 7], [13, 13], [18, 18], [20, 5], [25, 10], [28, 6], [30, 14], [32, 4], [35, 12]
                ]}
                className="inset-x-0 inset-y-[-30%] h-[200%] skew-y-12 [mask-image:radial-gradient(900px_circle_at_center,white,transparent)]"
              />
            </div>

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

