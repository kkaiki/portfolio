'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring, useInView, useMotionValue, useVelocity, useAnimationFrame } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown } from "lucide-react"
import Image from 'next/image'

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min
}

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

const ParallaxText = ({ children, baseVelocity = 100 }: { children: React.ReactNode; baseVelocity?: number }) => {
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 400
  })
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false
  })

  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`)

  const directionFactor = useRef(1)
  useAnimationFrame((t, delta) => {
    let moveBy = directionFactor.current * baseVelocity * (delta / 1000)
    if (velocityFactor.get() < 0) {
      directionFactor.current = -1
    } else if (velocityFactor.get() > 0) {
      directionFactor.current = 1
    }
    moveBy += directionFactor.current * moveBy * velocityFactor.get()
    baseX.set(baseX.get() + moveBy)
  })

  return (
    <div className="parallax">
      <motion.div className="scroller" style={{ x }}>
        <span>{children} </span>
        <span>{children} </span>
        <span>{children} </span>
        <span>{children} </span>
      </motion.div>
    </div>
  )
}

export default function DynamicScrollPortfolio() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  const [currentSection, setCurrentSection] = useState(0)
  const sectionRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentSection(sectionRefs.findIndex((ref) => ref.current === entry.target))
          }
        })
      },
      { threshold: 0.5 }
    )

    sectionRefs.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current)
      }
    })

    return () => observer.disconnect()
  }, [sectionRefs])

  return (
    <div className="bg-black text-white">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-white origin-left z-50"
        style={{ scaleX }}
      />

      <div className="relative">
        <AnimatedSection>
          <div className="text-center">
            <h1 className="text-6xl font-bold mb-4">Welcome to My Portfolio</h1>
            <p className="text-xl mb-8">Scroll down for a journey through my work</p>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ChevronDown className="w-8 h-8 mx-auto" />
            </motion.div>
          </div>
        </AnimatedSection>

        <AnimatedSection index={1}>
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-8">Featured Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: "AI-Powered App", desc: "Revolutionizing user experiences with artificial intelligence" },
                { title: "Blockchain Solution", desc: "Secure and transparent transactions for the future" },
                { title: "IoT Platform", desc: "Connecting devices for smarter living" },
              ].map((project, index) => (
                <FadeInWhenVisible key={index}>
                  <Card className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg">
                    <CardContent className="p-6">
                      <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                      <p className="text-gray-300 mb-4">{project.desc}</p>
                      <Button variant="outline" className="bg-white bg-opacity-20 hover:bg-opacity-30 transition-all duration-300">
                        Learn More
                      </Button>
                    </CardContent>
                  </Card>
                </FadeInWhenVisible>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection index={2}>
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-8">Skills & Expertise</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[
              { name: "Backend Development", level: 80 },
              { name: "Frontend Development", level: 50 },
              { name: "Machine Learning", level: 60 },
              { name: "Laravel", level: 80, image: "/images/laravel.svg" },
              { name: "Python", level: 80, image: "/images/python.svg" },
              { name: "MySQL", level: 60, image: "/images/mysql.svg" },
              { name: "React", level: 50, image: "/images/react.svg" },
              { name: "Nextjs", level: 60, image: "/images/nextjs.svg" }
            ].map((skill, index) => (
              <FadeInWhenVisible key={index}>
              <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-4 h-full flex flex-col justify-between">
                <div className="flex items-center">
                {skill.image && (
                  <Image 
                  src={skill.image} 
                  alt={`${skill.name} logo`} 
                  className="h-16 w-16 mr-4" 
                  width={64}
                  height={64}
                  />
                )}
                <h3 className={`text-xl font-bold ${!skill.image ? 'ml-0' : ''}`}>{skill.name}</h3>
                </div>
                <div className="w-full bg-gray-300 rounded-full h-2.5 mt-2">
                <div 
                  className="h-2.5 rounded-full" 
                  style={{ 
                  width: `${skill.level}%`, 
                  backgroundImage: 'linear-gradient(to right, #0110FC, #000439)' 
                  }}
                ></div>
                </div>
              </div>
              </FadeInWhenVisible>
            ))}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection index={3}>
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-8">Let&apos;s Connect</h2>
            <p className="text-xl mb-8">Ready to start your next project? Let&apos;s create something amazing together.</p>
            <Button className="bg-white text-black hover:bg-gray-200 transition-all duration-300">
              Get In Touch
            </Button>
          </div>
        </AnimatedSection>
      </div>

      <ParallaxText baseVelocity={-5}>Innovate • Create • Inspire</ParallaxText>

      <nav className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-full px-4 py-2 z-50">
        {[0, 1, 2, 3].map((index) => (
          <Button
            key={index}
            variant="ghost"
            className={`mx-2 ${currentSection === index ? 'text-white' : 'text-gray-400'}`}
            onClick={() => sectionRefs[index].current?.scrollIntoView({ behavior: 'smooth' })}
          >
            •
          </Button>
        ))}
      </nav>

      <style jsx global>{`
        html {
          scroll-behavior: smooth;
        }
        .parallax {
          overflow: hidden;
          letter-spacing: -2px;
          line-height: 0.8;
          margin: 0;
          white-space: nowrap;
          display: flex;
          flex-wrap: nowrap;
        }
        .scroller {
          font-weight: 600;
          text-transform: uppercase;
          font-size: 64px;
          display: flex;
          white-space: nowrap;
          display: flex;
          flex-wrap: nowrap;
        }
        .scroller span {
          display: block;
          margin-right: 30px;
        }
      `}</style>
    </div>
  )
}
