/* =====================================================
   CustomCursor — Dual-layer glowing cursor with trail
   ===================================================== */
import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Outer ring springs — slower, laggy feel
  const springConfig = { damping: 25, stiffness: 200 };
  const outerX = useSpring(cursorX, { damping: 20, stiffness: 150 });
  const outerY = useSpring(cursorY, { damping: 20, stiffness: 150 });

  // Inner dot springs — snappy
  const innerX = useSpring(cursorX, { damping: 30, stiffness: 400 });
  const innerY = useSpring(cursorY, { damping: 30, stiffness: 400 });

  const isHoveringRef = useRef(false);
  const outerRef = useRef(null);
  const innerRef = useRef(null);

  useEffect(() => {
    const move = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleEnter = () => {
      isHoveringRef.current = true;
      if (outerRef.current) outerRef.current.style.transform += ' scale(2)';
    };
    const handleLeave = () => {
      isHoveringRef.current = false;
      if (outerRef.current) outerRef.current.style.transform = outerRef.current.style.transform.replace(' scale(2)', '');
    };

    window.addEventListener('mousemove', move);

    // Add hover detection for interactive elements
    const interactives = document.querySelectorAll('a, button, input, textarea, [data-cursor="hover"]');
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', handleEnter);
      el.addEventListener('mouseleave', handleLeave);
    });

    return () => {
      window.removeEventListener('mousemove', move);
      interactives.forEach((el) => {
        el.removeEventListener('mouseenter', handleEnter);
        el.removeEventListener('mouseleave', handleLeave);
      });
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Outer glowing ring */}
      <motion.div
        ref={outerRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: outerX,
          y: outerY,
          translateX: '-50%',
          translateY: '-50%',
          width: 36,
          height: 36,
          borderRadius: '50%',
          border: '1.5px solid rgba(168,85,247,0.7)',
          boxShadow: '0 0 12px rgba(168,85,247,0.4), inset 0 0 8px rgba(168,85,247,0.1)',
          transition: 'width 0.2s, height 0.2s, border-color 0.2s',
        }}
      />
      {/* Inner solid dot */}
      <motion.div
        ref={innerRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: innerX,
          y: innerY,
          translateX: '-50%',
          translateY: '-50%',
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #a855f7, #22d3ee)',
          boxShadow: '0 0 10px rgba(168,85,247,0.8)',
        }}
      />
    </>
  );
};

export default CustomCursor;
