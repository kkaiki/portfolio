'use client'

import React, { useState, useRef, useEffect } from 'react'
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface ProjectCardAnimationProps {
  title: string
  desc: string
  url: string
  icon: string
}

const ProjectCardAnimation: React.FC<ProjectCardAnimationProps> = ({ title, desc, url, icon }) => {
  const [hovered, setHovered] = useState(false)
  const [height, setHeight] = useState('auto')
  const contentRef = useRef<HTMLDivElement>(null)
  const ref = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useTransform(y, [-300, 300], [15, -15])
  const rotateY = useTransform(x, [-300, 300], [-15, 15])

  const springConfig = { damping: 30, stiffness: 300, mass: 0.5 }
  const rotateXSpring = useSpring(rotateX, springConfig)
  const rotateYSpring = useSpring(rotateY, springConfig)
  const scaleSpring = useSpring(1, springConfig)

  useEffect(() => {
    if (contentRef.current) {
      setHeight(`${contentRef.current.scrollHeight}px`)
    }
  }, [desc])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (rect) {
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      x.set(e.clientX - centerX)
      y.set(e.clientY - centerY)
    }
    scaleSpring.set(1.05)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    scaleSpring.set(1)
  }

  return (
    <motion.div
      ref={ref}
      className="relative w-full perspective-1000"
      style={{ height }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      <Card className="w-full h-full bg-black/60 backdrop-blur-xl border border-white/20 overflow-hidden rounded-xl shadow-2xl">
        <motion.div
          className="w-full h-full relative z-10"
          style={{
            rotateX: rotateXSpring,
            rotateY: rotateYSpring,
            scale: scaleSpring,
          }}
        >
          <CardContent 
            ref={contentRef}
            className="p-8 flex flex-col justify-between h-full relative z-10"
          >
            <div>
              <motion.div 
                className="text-5xl mb-4"
                initial={false}
                animate={{ scale: hovered ? 1.2 : 1, rotate: hovered ? 360 : 0 }}
                transition={{ duration: 0.5 }}
              >
                {icon}
              </motion.div>
              <motion.h3 
                className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
                initial={false}
                animate={{ scale: hovered ? 1.05 : 1 }}
              >
                {title}
              </motion.h3>
              <motion.p 
                className="text-gray-300 text-lg leading-relaxed"
                initial={false}
                animate={{ opacity: hovered ? 1 : 0.8 }}
              >
                {desc}
              </motion.p>
            </div>
            <motion.div
              className="mt-6"
              initial={false}
              animate={{ y: hovered ? 0 : 5, opacity: hovered ? 1 : 0.8 }}
            >
              <Button 
                variant="outline" 
                className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-[length:200%_100%] text-white text-lg font-semibold py-6 border-0 shadow-lg hover:shadow-blue-500/25 rounded-xl"
                style={{ 
                  backgroundPosition: hovered ? '100% 0' : '0 0',
                  transition: 'all 0.5s ease'
                }}
                onClick={() => window.open(url, '_blank')}
              >
                Explore Project
              </Button>
            </motion.div>
          </CardContent>
        </motion.div>
        <AnimatePresence>
          {hovered && (
            <>
              <GlowEffect />
              <ParticleEffect />
            </>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  )
}

const GlowEffect: React.FC = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="absolute inset-0 z-0"
  >
    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-pink-500/30 blur-3xl" />
    <div className="absolute -inset-[1px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-50 rounded-xl" />
  </motion.div>
)

const ParticleEffect: React.FC = () => {
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    initialX: Math.random() * 100,
    initialY: Math.random() * 100,
    size: Math.random() * 4 + 1,
  }))

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          initial={{ 
            opacity: 0,
            x: `${particle.initialX}%`,
            y: `${particle.initialY}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            x: [
              `${particle.initialX}%`,
              `${(particle.initialX + (Math.random() * 30 - 15))}%`
            ],
            y: [
              `${particle.initialY}%`,
              `${(particle.initialY + (Math.random() * 30 - 15))}%`
            ],
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut',
          }}
          className="absolute rounded-full bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500"
          style={{
            width: particle.size,
            height: particle.size,
          }}
        />
      ))}
    </div>
  )
}

export default ProjectCardAnimation

