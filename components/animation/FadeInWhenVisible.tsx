'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const FadeInWhenVisible = ({ children }: { children: React.ReactNode }) => {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true })
  
    return (
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { 
          opacity: 1, 
          y: 0,
          transition: {
            duration: 0.8,
            y: {
              type: "spring",
              damping: 5,
              stiffness: 100,
              restDelta: 0.001
            }
          }
        } : { opacity: 0, y: 50 }}
      >
        {children}
      </motion.div>
    )
  }
  
    export default FadeInWhenVisible
