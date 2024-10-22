'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useSpring, useInView, useMotionValue, useVelocity, useAnimationFrame } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ChevronDown } from "lucide-react"

const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min
}

const Section = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <section className={`min-h-screen flex items-center justify-center ${className}`}>
    {children}
  </section>
)

const FadeInWhenVisible = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8 }}
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

export function AppleStylePortfolioComponent() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  const [currentSection, setCurrentSection] = useState(0)
  const sectionRefs = [useRef<HTMLElement>(null), useRef<HTMLElement>(null), useRef<HTMLElement>(null), useRef<HTMLElement>(null)]

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
  }, [])

  return (
    <div className="bg-black text-white overflow-hidden">
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-white origin-left z-50"
        style={{ scaleX }}
      />

      <Section ref={sectionRefs[0]} className="bg-gradient-to-b from-purple-900 to-black">
        <FadeInWhenVisible>
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
        </FadeInWhenVisible>
      </Section>

      <Section ref={sectionRefs[1]} className="bg-gradient-to-b from-black to-blue-900">
        <div className="container mx-auto px-4">
          <FadeInWhenVisible>
            <h2 className="text-4xl font-bold mb-8">Featured Projects</h2>
          </FadeInWhenVisible>
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
      </Section>

      <Section ref={sectionRefs[2]} className="bg-gradient-to-b from-blue-900 to-green-900">
        <div className="container mx-auto px-4">
          <FadeInWhenVisible>
            <h2 className="text-4xl font-bold mb-8">Skills & Expertise</h2>
          </FadeInWhenVisible>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[
              "React", "Node.js", "Python", "Machine Learning",
              "Cloud Computing", "DevOps", "UI/UX Design", "Data Analysis"
            ].map((skill, index) => (
              <FadeInWhenVisible key={index}>
                <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-lg p-4 text-center">
                  <h3 className="text-xl font-bold">{skill}</h3>
                </div>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </Section>

      <Section ref={sectionRefs[3]} className="bg-gradient-to-b from-green-900 to-purple-900">
        <div className="container mx-auto px-4 text-center">
          <FadeInWhenVisible>
            <h2 className="text-4xl font-bold mb-8">Let's Connect</h2>
            <p className="text-xl mb-8">Ready to start your next project? Let's create something amazing together.</p>
            <Button className="bg-white text-black hover:bg-gray-200 transition-all duration-300">
              Get In Touch
            </Button>
          </FadeInWhenVisible>
        </div>
      </Section>

      <ParallaxText baseVelocity={-5}>Innovate • Create • Inspire</ParallaxText>

      <nav className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-full px-4 py-2 z-50">
        {[0, 1, 2, 3].map((index) => (
          <Button
            key={index}
            variant="ghost"
            className={`mx-2 ${currentSection === index ? 'text-white' : 'text-gray-400'}`}
            onClick={() => sectionRefs[index].current.scrollIntoView({ behavior: 'smooth' })}
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