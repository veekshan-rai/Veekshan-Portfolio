/* =====================================================
   App.jsx — Root app with routing and page transitions
   ParticleBackground rendered ONCE at root level so it
   persists smoothly across all page navigations.
   ===================================================== */
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import ParticleBackground from './components/ParticleBackground';
import Home from './pages/Home';
import Education from './pages/Education';
import Projects from './pages/Projects';
import Contact from './pages/Contact';

/* Smooth page transition wrapper */
const PageWrapper = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -12 }}
    transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
    style={{ position: 'relative', zIndex: 1 }}
  >
    {children}
  </motion.div>
);

/* Animated routes — useLocation must be inside Router */
const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/"          element={<PageWrapper><Home      /></PageWrapper>} />
        <Route path="/education" element={<PageWrapper><Education /></PageWrapper>} />
        <Route path="/projects"  element={<PageWrapper><Projects  /></PageWrapper>} />
        <Route path="/contact"   element={<PageWrapper><Contact   /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      {/* ── Global: custom cursor ── */}
      <CustomCursor />

      {/* ── Global: particle canvas — fixed, z-index 0, renders once ── */}
      <ParticleBackground />

      {/* ── Subtle film grain overlay ── */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* ── Navigation bar ── */}
      <Navbar />

      {/* ── Page content (z-index 1, sits above canvas) ── */}
      <main style={{ position: 'relative', zIndex: 1, minHeight: '100vh' }}>
        <AnimatedRoutes />
      </main>

      {/* ── Footer ── */}
      <Footer />
    </Router>
  );
}

export default App;
