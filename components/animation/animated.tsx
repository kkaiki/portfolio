'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const AnimatedSection = ({ children }: { children: React.ReactNode }) => {
    const ref = useRef<HTMLDivElement>(null)
    const { scrollYProgress } = useScroll({
      target: ref,
      offset: ["start start", "end start"]
    })
  
    const clipProgress = useTransform(scrollYProgress, [0, 0.4, 0.6], [100, 100, 0])
    const clip = useTransform(clipProgress, (v) => `inset(0 0 ${100 - v}% 0)`)
  
    return (
      <div ref={ref} className="h-[200vh] relative">
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          <motion.div style={{ clipPath: clip }}>
            {children}
          </motion.div>
        </div>
      </div>
    )
  }
  
    export default AnimatedSection
