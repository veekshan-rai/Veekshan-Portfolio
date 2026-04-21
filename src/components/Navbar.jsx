/* =====================================================
   Navbar — Fixed glassmorphism nav with animated underline
   ===================================================== */
import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt3, HiX } from 'react-icons/hi';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Education', to: '/education' },
  { label: 'Projects', to: '/projects' },
  { label: 'Contact', to: '/contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Track scroll for background blur intensification
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false); }, [location]);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-50"
        style={{
          background: scrolled
            ? 'rgba(3,7,18,0.85)'
            : 'rgba(3,7,18,0.4)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          borderBottom: scrolled ? '1px solid rgba(168,85,247,0.15)' : '1px solid transparent',
          transition: 'all 0.3s ease',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-2 group">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center font-black text-lg"
              style={{
                background: 'linear-gradient(135deg, #a855f7, #22d3ee)',
                boxShadow: '0 0 20px rgba(168,85,247,0.4)',
              }}
            >
              V
            </div>
            <span className="font-bold text-white text-sm tracking-wide hidden sm:block">
              Veekshan<span className="gradient-text ml-1">Rai</span>
            </span>
          </NavLink>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map(({ label, to }) => (
              <li key={to}>
                <NavLink to={to} className="relative group">
                  {({ isActive }) => (
                    <span
                      className="text-sm font-medium transition-colors duration-200"
                      style={{ color: isActive ? '#a855f7' : '#94a3b8' }}
                      onMouseEnter={e => { if (!isActive) e.target.style.color = '#e2e8f0'; }}
                      onMouseLeave={e => { if (!isActive) e.target.style.color = '#94a3b8'; }}
                    >
                      {label}
                      {/* Animated underline */}
                      {isActive && (
                        <motion.span
                          layoutId="nav-underline"
                          className="absolute -bottom-1 left-0 right-0 h-0.5"
                          style={{ background: 'linear-gradient(90deg, #a855f7, #22d3ee)' }}
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                      )}
                    </span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <a
              href="/veekshan-rai-FullStack.pdf"
              download
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white btn-gradient"
            >
              <span>Resume</span>
            </a>
            {/* Hamburger */}
            <button
              className="md:hidden text-slate-300 hover:text-white transition-colors p-2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <HiX size={22} /> : <HiMenuAlt3 size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', stiffness: 260, damping: 30 }}
            className="fixed inset-y-0 right-0 z-40 w-72 glass flex flex-col pt-20 px-8 pb-8 gap-6"
            style={{ borderLeft: '1px solid rgba(168,85,247,0.2)' }}
          >
            {navLinks.map(({ label, to }, i) => (
              <motion.div
                key={to}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
              >
                <NavLink
                  to={to}
                  className="block text-lg font-semibold text-slate-300 hover:text-white transition-colors py-2 border-b border-slate-800"
                >
                  {label}
                </NavLink>
              </motion.div>
            ))}
            <motion.a
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              href="/veekshan-rai-FullStack.pdf"
              download
              className="mt-4 btn-gradient px-5 py-3 rounded-lg text-center text-sm font-semibold text-white"
            >
              Download Resume
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay when mobile menu is open */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-black/50 md:hidden"
            onClick={() => setMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
