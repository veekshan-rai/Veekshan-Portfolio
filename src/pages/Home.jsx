/* =====================================================
   Home Page — Hero section
   Smooth mouse parallax via Framer Motion springs
   Typewriter, floating avatar, stats, Download Resume
   ===================================================== */
import { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { FiDownload, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import ScrollIndicator from '../components/ScrollIndicator';
import { personalInfo } from '../data/portfolio';

/* Reusable fade-up variant */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 36 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
});

const Home = () => {
  const containerRef = useRef(null);

  /* ── Scroll-based parallax on hero content ── */
  const { scrollYProgress } = useScroll({ target: containerRef });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);

  /* ── Smooth mouse parallax for avatar via spring ── */
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const imgX = useSpring(rawX, { stiffness: 60, damping: 18, mass: 0.8 });
  const imgY = useSpring(rawY, { stiffness: 60, damping: 18, mass: 0.8 });

  const handleMouseMove = (e) => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    rawX.set((e.clientX / w - 0.5) * 24);
    rawY.set((e.clientY / h - 0.5) * 18);
  };

  const stats = [
    { label: 'Projects Built', value: '4+' },
    { label: 'Tech Stack', value: '8+' },
    { label: 'CGPA', value: '7.5' },
  ];

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ willChange: 'transform' }}
    >


      {/* ── Ambient gradient blobs ── */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-[650px] h-[650px] rounded-full opacity-[0.08] blur-3xl"
          style={{
            background: 'radial-gradient(circle, #a855f7 0%, transparent 70%)',
            top: '-15%', left: '-15%',
            willChange: 'transform',
          }}
        />
        <div
          className="absolute w-[550px] h-[550px] rounded-full opacity-[0.06] blur-3xl"
          style={{
            background: 'radial-gradient(circle, #22d3ee 0%, transparent 70%)',
            bottom: '5%', right: '-10%',
            willChange: 'transform',
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full opacity-[0.04] blur-3xl"
          style={{
            background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)',
            top: '60%', left: '30%',
          }}
        />
      </div>

      {/* ── Hero Content ── */}
      <motion.div
        style={{ y: heroY, willChange: 'transform' }}
        className="relative z-10 flex-1 flex items-center"
      >
        <div className="max-w-7xl mx-auto w-full px-6 pt-24 pb-16 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          {/* ── Left: Text Content ── */}
          <div className="flex flex-col gap-6">

            {/* Available badge */}
            <motion.div {...fadeUp(0.1)}>
              <span
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-medium text-purple-300"
                style={{ background: 'rgba(168,85,247,0.1)', border: '1px solid rgba(168,85,247,0.3)' }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full bg-purple-400"
                  style={{ animation: 'pulse 2s cubic-bezier(0.4,0,0.6,1) infinite' }}
                />
                Available for opportunities
              </span>
            </motion.div>

            {/* Name heading */}
            <motion.div {...fadeUp(0.2)}>
              <h1
                className="font-black leading-[1.1]"
                style={{ fontSize: 'clamp(2.4rem, 5.5vw, 4.2rem)' }}
              >
                Hi, I'm{' '}
                <span className="gradient-text">
                  {personalInfo.name}
                </span>
              </h1>
            </motion.div>

            {/* Typewriter role */}
            <motion.div {...fadeUp(0.32)} className="flex items-center gap-3 text-slate-300" style={{ fontSize: 'clamp(1rem, 2.2vw, 1.25rem)' }}>
              <span className="text-purple-500 font-mono select-none">&gt;</span>
              <TypeAnimation
                sequence={[
                  'Aspiring Full Stack Developer', 2200,
                  'Python & Django Enthusiast', 2000,
                  'React UI Craftsman', 2000,
                  'Problem Solver', 2000,
                ]}
                wrapper="span"
                speed={55}
                deletionSpeed={70}
                repeat={Infinity}
                className="font-semibold text-slate-100"
              />
            </motion.div>

            {/* About paragraph */}
            <motion.p
              {...fadeUp(0.44)}
              className="text-slate-400 leading-relaxed max-w-[520px]"
              style={{ fontSize: '0.97rem' }}
            >
              {personalInfo.about}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div {...fadeUp(0.54)} className="flex flex-wrap gap-4">
              <motion.a
                href={personalInfo.resumeUrl}
                download
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className="btn-gradient flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white"
                style={{ willChange: 'transform' }}
              >
                <FiDownload size={16} />
                <span>Download Resume</span>
              </motion.a>

              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                style={{ willChange: 'transform' }}
              >
                <Link
                  to="/projects"
                  className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-slate-200 transition-all duration-200"
                  style={{ border: '1px solid rgba(168,85,247,0.3)', background: 'rgba(168,85,247,0.06)' }}
                  onMouseEnter={e => {
                    e.currentTarget.style.borderColor = 'rgba(168,85,247,0.65)';
                    e.currentTarget.style.boxShadow = '0 0 22px rgba(168,85,247,0.2)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.borderColor = 'rgba(168,85,247,0.3)';
                    e.currentTarget.style.boxShadow = '';
                  }}
                >
                  View Projects <FiArrowRight size={15} />
                </Link>
              </motion.div>
            </motion.div>

            {/* Stats row */}
            <motion.div {...fadeUp(0.68)} className="flex gap-8 pt-2">
              {stats.map(({ label, value }) => (
                <div key={label} className="flex flex-col">
                  <span className="text-2xl font-black gradient-text">{value}</span>
                  <span className="text-xs text-slate-500 mt-0.5 leading-tight">{label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right: Floating Avatar ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center justify-center mt-8 lg:mt-0"
          >
            {/* Mouse-spring parallax wrapper */}
            <motion.div
              style={{ x: imgX, y: imgY, willChange: 'transform' }}
              className="relative"
            >
              {/* Spinning conic-gradient glow ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
                className="absolute -inset-5 rounded-full opacity-30"
                style={{
                  background: 'conic-gradient(from 0deg, #a855f7, #22d3ee, #3b82f6, #a855f7)',
                  filter: 'blur(20px)',
                  willChange: 'transform',
                }}
              />

              {/* Floating avatar bubble */}
              <motion.div
                animate={{ y: [0, -14, 0] }}
                transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut' }}
                className="relative w-56 h-56 sm:w-64 sm:h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden"
                style={{
                  border: '2px solid rgba(168,85,247,0.5)',
                  boxShadow: '0 0 50px rgba(168,85,247,0.35), 0 0 100px rgba(34,211,238,0.1)',
                  willChange: 'transform',
                }}
              >
                <div
                  className="w-full h-full flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #1a0a2e 0%, #0f172a 40%, #0a1628 100%)' }}
                >
                  <div className="w-full h-full flex items-center justify-center select-none">
                    <motion.div
                      animate={{
                        scale: [1, 1.05, 1],
                        filter: [
                          'drop-shadow(0 0 20px rgba(168,85,247,0.4))',
                          'drop-shadow(0 0 40px rgba(34,211,238,0.6))',
                          'drop-shadow(0 0 20px rgba(168,85,247,0.4))',
                        ]
                      }}
                      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                      className="font-black text-[6.5rem] sm:text-[8rem] lg:text-[10rem] leading-none"
                      style={{
                        background: 'linear-gradient(135deg, #a855f7 0%, #22d3ee 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      V
                    </motion.div>
                  </div>
                </div>
              </motion.div>

              {/* Floating badge: React */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
                className="absolute -bottom-2 -right-2 sm:-bottom-3 sm:-right-3 glass px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl text-[10px] sm:text-xs font-mono font-semibold text-purple-300"
                style={{ border: '1px solid rgba(168,85,247,0.35)', backdropFilter: 'blur(12px)', willChange: 'transform' }}
              >
                ⚛️ React Dev
              </motion.div>

              {/* Floating badge: Python */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                className="absolute -top-2 -left-2 sm:-top-3 sm:-left-3 glass px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl text-[10px] sm:text-xs font-mono font-semibold text-cyan-300"
                style={{ border: '1px solid rgba(34,211,238,0.35)', backdropFilter: 'blur(12px)', willChange: 'transform' }}
              >
                🐍 Python
              </motion.div>

              {/* Floating badge: Django — bottom left */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                className="absolute -bottom-2 -left-4 sm:-bottom-3 sm:-left-8 glass px-2.5 py-1.5 sm:px-3 sm:py-2 rounded-xl text-[10px] sm:text-xs font-mono font-semibold text-green-300"
                style={{ border: '1px solid rgba(34,197,94,0.35)', backdropFilter: 'blur(12px)', willChange: 'transform' }}
              >
                🌿 Django
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* ── Scroll Indicator ── */}
      <div className="relative z-10 pb-10 flex justify-center">
        <ScrollIndicator />
      </div>
    </div>
  );
};

export default Home;
