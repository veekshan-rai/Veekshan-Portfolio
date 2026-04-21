/* =====================================================
   ScrollIndicator — Animated bouncing scroll cue
   ===================================================== */
import { motion } from 'framer-motion';
import { HiChevronDown } from 'react-icons/hi';

const ScrollIndicator = () => (
  <motion.div
    className="flex flex-col items-center gap-2"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1.8, duration: 0.6 }}
  >
    <span className="text-xs text-slate-500 tracking-widest uppercase font-mono">Scroll</span>
    <motion.div
      animate={{ y: [0, 8, 0] }}
      transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
      className="text-slate-500"
    >
      <HiChevronDown size={22} style={{ filter: 'drop-shadow(0 0 6px rgba(168,85,247,0.6))' }} />
    </motion.div>
  </motion.div>
);

export default ScrollIndicator;
