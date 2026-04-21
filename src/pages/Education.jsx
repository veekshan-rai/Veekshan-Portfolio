/* =====================================================
   Education Page — Two animated glassmorphism cards
   with 3D tilt, glow hover, and animated SVG timeline
   ===================================================== */
import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FiAward, FiCalendar, FiBookOpen, FiStar } from 'react-icons/fi';
import { education } from '../data/portfolio';

/* ── 3D Tilt Card Component ── */
const TiltCard = ({ edu, index }) => {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const inView = useInView(cardRef, { once: true, margin: '-80px' });

  const isPurple = edu.color === 'purple';
  const accentColor = isPurple ? '#a855f7' : '#22d3ee';
  const glowColor = isPurple
    ? 'rgba(168,85,247,0.4)'
    : 'rgba(34,211,238,0.4)';

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    setTilt({
      x: ((y - centerY) / centerY) * -12,
      y: ((x - centerX) / centerX) * 12,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay: index * 0.2, ease: [0.22, 1, 0.36, 1] }}
      style={{
        perspective: '1000px',
      }}
      className="flex-1 min-w-[300px] max-w-[480px]"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: tilt.x,
          rotateY: tilt.y,
          transformStyle: 'preserve-3d',
          transition: 'box-shadow 0.3s ease',
          boxShadow: isHovered
            ? `0 25px 60px ${glowColor}, 0 0 0 1px ${accentColor}40`
            : '0 8px 32px rgba(0,0,0,0.4)',
        }}
        className="glass-card p-8 h-full relative overflow-hidden"
      >
        {/* Gradient top accent */}
        <div
          className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
          style={{ background: `linear-gradient(90deg, ${accentColor}, transparent)` }}
        />

        {/* Corner glow */}
        <div
          className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-10 blur-2xl pointer-events-none"
          style={{ background: `radial-gradient(circle, ${accentColor}, transparent)` }}
        />

        {/* Icon */}
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-6"
          style={{
            background: `rgba(${isPurple ? '168,85,247' : '34,211,238'}, 0.1)`,
            border: `1px solid ${accentColor}30`,
            boxShadow: isHovered ? `0 0 20px ${glowColor}` : 'none',
            transition: 'box-shadow 0.3s ease',
          }}
        >
          {edu.icon}
        </div>

        {/* Content */}
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-bold text-white leading-tight">{edu.institution}</h3>
            <div className="flex items-center gap-2 mt-2">
              <FiBookOpen size={13} style={{ color: accentColor }} />
              <p className="text-sm font-semibold" style={{ color: accentColor }}>{edu.course}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-1.5 text-slate-400 text-xs">
              <FiCalendar size={12} />
              <span>{edu.duration}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: accentColor }}>
              <FiStar size={12} />
              <span>{edu.grade}</span>
            </div>
          </div>

          <p className="text-slate-400 text-sm leading-relaxed">{edu.description}</p>

          {/* Bottom accent line */}
          <div
            className="h-0.5 rounded-full mt-4"
            style={{
              background: isHovered
                ? `linear-gradient(90deg, ${accentColor}, transparent)`
                : `linear-gradient(90deg, ${accentColor}40, transparent)`,
              transition: 'background 0.3s ease',
            }}
          />
        </div>

        {/* Hover reflection overlay */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 50% 0%, ${accentColor}08 0%, transparent 60%)`,
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}
        />
      </motion.div>
    </motion.div>
  );
};

/* ── Animated SVG Timeline Connector ── */
const TimelineConnector = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="hidden lg:flex items-center justify-center w-24 relative">
      {/* Vertical divider with center node */}
      <div className="relative flex flex-col items-center gap-3">
        {/* Top line */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={inView ? { scaleY: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="w-px h-16 origin-top"
          style={{ background: 'linear-gradient(180deg, transparent, #a855f7)' }}
        />
        {/* Center node */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.8 }}
          className="w-10 h-10 rounded-full flex items-center justify-center relative"
          style={{
            background: 'linear-gradient(135deg, #a855f7, #22d3ee)',
            boxShadow: '0 0 20px rgba(168,85,247,0.6)',
          }}
        >
          <motion.div
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-0 rounded-full"
            style={{ border: '2px solid rgba(168,85,247,0.4)' }}
          />
          <FiAward size={18} className="text-white" />
        </motion.div>
        {/* Bottom line */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={inView ? { scaleY: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="w-px h-16 origin-bottom"
          style={{ background: 'linear-gradient(180deg, #22d3ee, transparent)' }}
        />
      </div>
    </div>
  );
};

/* ── Main Education Page ── */
const Education = () => {
  const headerRef = useRef(null);
  const inView = useInView(headerRef, { once: true });

  return (
    <div
      className="min-h-screen relative"
    >
      {/* Ambient blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-96 h-96 rounded-full blur-3xl opacity-5"
          style={{ background: 'radial-gradient(circle, #a855f7, transparent)', top: '20%', left: '5%' }}
        />
        <div
          className="absolute w-96 h-96 rounded-full blur-3xl opacity-5"
          style={{ background: 'radial-gradient(circle, #22d3ee, transparent)', bottom: '10%', right: '5%' }}
        />
      </div>

      <div className="relative z-10 section-padding">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div ref={headerRef} className="text-center mb-16">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="text-xs font-mono text-purple-400 tracking-widest uppercase mb-3"
            >
              — Academic Journey —
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="section-heading gradient-text"
            >
              Education
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-slate-400 max-w-xl mx-auto mt-3 text-sm leading-relaxed"
            >
              My academic foundation in Computer Science and technology that shapes my journey as a developer.
            </motion.p>
            {/* Shimmer line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="shimmer-line h-px max-w-48 mx-auto mt-6"
            />
          </div>

          {/* Cards + Connector */}
          <div className="flex flex-col lg:flex-row items-stretch justify-center gap-0 lg:gap-0">
            {education.map((edu, index) => (
              <div key={edu.id} className="flex items-stretch gap-0 flex-col lg:flex-row">
                <TiltCard edu={edu} index={index} />
                {index < education.length - 1 && <TimelineConnector />}
              </div>
            ))}
          </div>

          {/* Bottom quote */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <p className="text-slate-500 italic text-sm font-mono">
              "Education is the passport to the future." — Malcolm X
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Education;
