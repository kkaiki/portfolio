import React, { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

const ZoomOutAnimation = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.9, 1], [1, 0, 0]);

  return (
    <div ref={ref} className="h-[200vh] relative">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <motion.div style={{ scale }}>
          {children}
        </motion.div>
      </div>
    </div>
  );
};

export default ZoomOutAnimation;