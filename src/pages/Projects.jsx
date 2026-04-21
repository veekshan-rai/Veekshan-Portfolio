/* =====================================================
   Projects Page — Interactive Tree Structure Layout
   ===================================================== */
import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { FiExternalLink, FiCode, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { projects } from '../data/portfolio';
import { useMousePosition } from '../hooks/useMousePosition';

const TechBadge = ({ tech, color }) => (
  <span
    className="px-2.5 py-1 rounded-md text-xs font-mono font-medium"
    style={{ background: `${color}18`, border: `1px solid ${color}30`, color }}
  >
    {tech}
  </span>
);

const ProjectNode = ({ project, index, isLeft, isExpanded, onToggle }) => {
  const cardRef = useRef(null);
  const inView = useInView(cardRef, { once: true, margin: '-60px' });
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const mouse = useMousePosition();

  const parallaxX = (mouse.x / window.innerWidth - 0.5) * 8;
  const parallaxY = (mouse.y / window.innerHeight - 0.5) * 6;

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setTilt({
      x: ((e.clientY - rect.top - rect.height / 2) / rect.height) * -8,
      y: ((e.clientX - rect.left - rect.width / 2) / rect.width) * 8,
    });
  };

  const glow = project.glowColor;

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -50 : 50, scale: 0.85 }}
      animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      style={{ x: parallaxX, y: parallaxY }}
      ref={cardRef}
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setHovered(false); setTilt({ x: 0, y: 0 }); }}
        onClick={onToggle}
        style={{
          rotateX: tilt.x,
          rotateY: tilt.y,
          transformStyle: 'preserve-3d',
          boxShadow: hovered ? `0 20px 60px ${glow}, 0 0 0 1px ${glow}` : '0 4px 24px rgba(0,0,0,0.5)',
          transition: 'box-shadow 0.3s ease',
        }}
        className="glass-card p-6 relative overflow-hidden cursor-pointer select-none"
      >
        <div className={`absolute top-0 left-0 right-0 h-1 rounded-t-2xl bg-gradient-to-r ${project.gradient}`} />
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{ background: `radial-gradient(circle at 50% 0%, ${glow}10, transparent 60%)`, opacity: hovered ? 1 : 0, transition: 'opacity 0.3s' }}
        />

        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl`}
              style={{
                background: `linear-gradient(135deg, ${glow.replace('0.5)', '0.2)')}`,
                boxShadow: hovered ? `0 0 20px ${glow}` : 'none',
                transition: 'box-shadow 0.3s',
              }}
            >
              {project.emoji}
            </div>
            <div>
              <h3 className="font-bold text-white text-base leading-tight">{project.title}</h3>
              <p className="text-xs text-slate-500 font-mono">{project.subtitle}</p>
            </div>
          </div>
          <div className="text-slate-500 mt-1">
            {isExpanded ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tech.map((t) => (
            <TechBadge key={t} tech={t} color={glow.replace(/,\s*[\d.]+\)$/, ', 1)')} />
          ))}
        </div>

        <p className="text-slate-400 text-sm leading-relaxed line-clamp-2">{project.description}</p>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              key="exp"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="mt-4 pt-4" style={{ borderTop: '1px solid rgba(168,85,247,0.15)' }}>
                <p className="text-slate-300 text-sm leading-relaxed mb-4">{project.description}</p>
                <motion.a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-white bg-gradient-to-r ${project.gradient}`}
                  style={{ boxShadow: `0 0 20px ${glow}` }}
                >
                  <FiExternalLink size={13} />
                  View Project
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

const VerticalLine = ({ delay = 0 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="flex justify-center">
      <motion.div
        initial={{ scaleY: 0 }}
        animate={inView ? { scaleY: 1 } : {}}
        transition={{ duration: 0.5, delay }}
        className="w-px h-10 origin-top"
        style={{ background: 'linear-gradient(180deg, #a855f7, #22d3ee)', boxShadow: '0 0 8px rgba(168,85,247,0.5)' }}
      />
    </div>
  );
};

const HorizontalBranch = ({ delay = 0 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="hidden lg:flex items-center justify-center">
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.5, delay }}
        className="flex-1 h-px origin-right"
        style={{ background: 'linear-gradient(90deg, transparent, #a855f7)' }}
      />
      <motion.div
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ duration: 0.3, delay: delay + 0.2 }}
        className="w-2 h-2 rounded-full bg-purple-400 mx-1 flex-shrink-0"
        style={{ boxShadow: '0 0 8px rgba(168,85,247,0.8)' }}
      />
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.5, delay }}
        className="flex-1 h-px origin-left"
        style={{ background: 'linear-gradient(90deg, #22d3ee, transparent)' }}
      />
    </div>
  );
};

const DropLines = ({ delay = 0 }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="hidden lg:flex justify-around w-full">
      {[0, 1].map((i) => (
        <motion.div
          key={i}
          initial={{ scaleY: 0 }}
          animate={inView ? { scaleY: 1 } : {}}
          transition={{ duration: 0.4, delay: delay + i * 0.05 }}
          className="w-px h-8 origin-top"
          style={{ background: i === 0 ? 'linear-gradient(180deg, #a855f7, #22d3ee)' : 'linear-gradient(180deg, #22d3ee, #3b82f6)' }}
        />
      ))}
    </div>
  );
};

const RootNode = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center"
    >
      <div
        className="relative w-20 h-20 rounded-2xl flex items-center justify-center"
        style={{ background: 'linear-gradient(135deg, #a855f7, #22d3ee)', boxShadow: '0 0 40px rgba(168,85,247,0.6)' }}
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-0 rounded-2xl"
          style={{ border: '2px dashed rgba(168,85,247,0.4)' }}
        />
        <FiCode size={28} className="text-white" />
      </div>
      <div className="mt-3 text-center">
        <p className="text-white font-bold text-sm">My Projects</p>
        <p className="text-slate-500 text-xs font-mono">Click cards to expand</p>
      </div>
    </motion.div>
  );
};

const Projects = () => {
  const [expandedId, setExpandedId] = useState(null);
  const headerRef = useRef(null);
  const inView = useInView(headerRef, { once: true });

  const topProjects = projects.slice(0, 2);
  const bottomProjects = projects.slice(2, 4);

  return (
    <div
      className="min-h-screen relative"
    >
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="absolute rounded-full blur-3xl opacity-5"
            style={{
              width: '400px', height: '400px',
              background: `radial-gradient(circle, ${i % 2 === 0 ? '#a855f7' : '#22d3ee'}, transparent)`,
              top: `${20 + i * 28}%`,
              left: i % 2 === 0 ? `${5 + i * 10}%` : 'auto',
              right: i % 2 !== 0 ? `${5 + i * 5}%` : 'auto',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 section-padding">
        <div className="max-w-5xl mx-auto">
          <div ref={headerRef} className="text-center mb-16">
            <motion.p
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              className="text-xs font-mono text-cyan-400 tracking-widest uppercase mb-3"
            >
              — Built with Passion —
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="section-heading gradient-text"
            >
              Projects
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 }}
              className="text-slate-400 max-w-xl mx-auto mt-3 text-sm leading-relaxed"
            >
              A collection of web applications I've built. Click any card to explore details.
            </motion.p>
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="shimmer-line h-px max-w-48 mx-auto mt-6"
            />
          </div>

          {/* Tree Layout */}
          <div className="flex flex-col items-center">
            <RootNode />
            <VerticalLine delay={0.3} />

            <div className="w-full max-w-3xl">
              <HorizontalBranch delay={0.4} />
              <DropLines delay={0.55} />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {topProjects.map((p, i) => (
                  <ProjectNode
                    key={p.id}
                    project={p}
                    index={i}
                    isLeft={i === 0}
                    isExpanded={expandedId === p.id}
                    onToggle={() => setExpandedId((prev) => (prev === p.id ? null : p.id))}
                  />
                ))}
              </div>
            </div>

            <VerticalLine delay={0.6} />

            <div className="w-full max-w-3xl">
              <HorizontalBranch delay={0.7} />
              <DropLines delay={0.85} />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {bottomProjects.map((p, i) => (
                  <ProjectNode
                    key={p.id}
                    project={p}
                    index={i + 2}
                    isLeft={i === 0}
                    isExpanded={expandedId === p.id}
                    onToggle={() => setExpandedId((prev) => (prev === p.id ? null : p.id))}
                  />
                ))}
              </div>
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-center text-slate-600 text-xs font-mono mt-14"
          >
            More projects coming soon... 🚀
          </motion.p>
        </div>
      </div>
    </div>
  );
};

export default Projects;
