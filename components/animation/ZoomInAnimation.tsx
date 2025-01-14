import React, { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

const ZoomInAnimation = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center", "end start"]
  });

  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 0.7, 1],
    [0.5, 1, 1, 0.8]
  );

  return (
    <div ref={ref} className="h-[200vh] relative">
      <div className="sticky top-0 h-screen flex items-center justify-center">
        <motion.div 
          style={{ scale }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
};

export default ZoomInAnimation;
