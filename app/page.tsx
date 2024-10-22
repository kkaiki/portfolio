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
  const sectionRefs = useRef([
    useRef<HTMLDivElement>(null), 
    useRef<HTMLDivElement>(null), 
    useRef<HTMLDivElement>(null), 
    useRef<HTMLDivElement>(null)
  ]).current

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
            <Image 
              src="/profile.jpg" 
              alt="Profile Picture" 
              className="rounded-full mx-auto mb-4" 
              width={250}
              height={250}
            />
            <h1 className="text-6xl font-bold mb-4">Welcome to My Portfolio</h1>
            <p className="text-xl mb-4">I&apos;m a student at Seikei University in Tokyo, passionate about becoming a full stack engineer. I aim to grow in the world of technology and create innovative solutions. I&apos;m particularly interested in web development and AI, and I&apos;m constantly learning new technologies.</p>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ChevronDown className="w-8 h-8 mx-auto" />
            </motion.div>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <div className="container mx-auto px-4 py-8">
            <div className="space-y-8">
              <h2 className="text-5xl font-extrabold mb-8 text-gradient">Experience</h2>
              {[
                { 
                  title: "Wevnal Inc.", 
                  location: "Tokyo", 
                  duration: "2024 Jun - Present", 
                  description: "Based on my backend experience, I created a Docker environment from scratch and executed a task to categorize conversation data using machine learning.",
                  logo: "/company/wevnal.png"
                },
                { 
                  title: "Chobirich Inc.", 
                  location: "Tokyo", 
                  duration: "2024 May - 2024 April", 
                  description: "Working as a backend engineer using Laravel.",
                  logo: "/company/chobirich.jpg"
                },
                { 
                  title: "Partsone Inc.", 
                  location: "Tokyo", 
                  duration: "2023 Jun - 2024 Jul", 
                  description: "Contributed to the development of a specialized website for selling used automotive parts. Primarily worked on the backend using Laravel, and engaged in frontend development with JavaScript and TypeScript using React.",
                  logo: "/company/partsone.png"
                },
              ].map((experience, index) => (
                <FadeInWhenVisible key={index}>
                  <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg p-6 shadow-lg transform transition-transform hover:scale-105">
                    <div className="flex items-center">
                      {experience.logo && (
                        <Image 
                          src={experience.logo} 
                          alt={`${experience.title} logo`} 
                          className="mr-4"
                          width={40}
                          height={40}
                        />
                      )}
                      <h3 className="text-3xl font-bold text-white">{experience.title}</h3>
                    </div>
                    <div className="mt-2">
                      <p className="text-gray-400">{experience.location}</p>
                      <p className="text-gray-500">{experience.duration}</p>
                      <p className="text-gray-300 mt-2">{experience.description}</p>
                    </div>
                  </div>
                </FadeInWhenVisible>
              ))}
            </div>

            <hr className="my-12 border-gray-700" />
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <div className="container mx-auto px-4 py-8">
            <div className="space-y-8">
              <h2 className="text-5xl font-extrabold mb-8 text-gradient">Education</h2>
              {[
                { 
                  title: "Co-op program", 
                  location: "Vancouver", 
                  duration: "2024 Oct - 2025 Sep", 
                  description: "I'm using a co-op program to explore whether I can work as an engineer abroad and to broaden my life choices."
                },
                { 
                  title: "Seikei Univ.", 
                  location: "Tokyo", 
                  duration: "2022 - 2027", 
                  description: "Pursuing a degree in Data science with a focus on AI and machine learning."
                },
              ].map((education, index) => (
                <FadeInWhenVisible key={index}>
                  <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg p-6 shadow-lg transform transition-transform hover:scale-105">
                    <h3 className="text-3xl font-bold text-white">{education.title}</h3>
                    <p className="text-gray-400">{education.location}</p>
                    <p className="text-gray-500">{education.duration}</p>
                    <p className="text-gray-300 mt-2">{education.description}</p>
                  </div>
                </FadeInWhenVisible>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection>
            <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-8">Featured Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
              { title: "DevInsight", desc: "It is something created in our circle, and it can be integrated with Discord, allowing us to track the time spent working with editors like Vecode", url: "https://github.com/kkaiki/DevInsight" },
              { title: "My Portfolio", desc: "", url: "https://github.com/kkaiki/portfolio" },
            ].map((project, index) => (
              <FadeInWhenVisible key={index}>
            <Card className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg">
            <CardContent className="p-6">
            <h3 className="text-2xl font-bold mb-2 text-white">{project.title}</h3>
            <p className="text-gray-300 mb-4">{project.desc}</p>
            <Button 
            variant="outline" 
            className="bg-gradient-to-r from-blue-500 to-black text-white bg-opacity-20 hover:bg-opacity-30 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            style={{ color: 'white' }}
            onClick={() => window.open(project.url, '_blank')}
            >
            Learn More
            </Button>
            </CardContent>
            </Card>
              </FadeInWhenVisible>
              ))}
            </div>
            </div>
        </AnimatedSection>

        <AnimatedSection>
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-8">Skills & Expertise</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[
              { name: "Backend Development", level: 80 },
              { name: "Frontend Development", level: 50 },
              { name: "Machine Learning", level: 60 },
              { name: "Laravel", level: 80, image: "/laravel.svg" },
              { name: "Python", level: 80, image: "/python.svg" },
              { name: "MySQL", level: 60, image: "/mysql.svg" },
              { name: "React", level: 50, image: "/react.svg" },
              { name: "Nextjs", level: 60, image: "/nextjs.svg" }
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

        <AnimatedSection>
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-8">Let&apos;s Connect</h2>
            <div className="flex justify-center space-x-4 mb-8">
              <Button 
          className="bg-white text-gray-800 hover:bg-gray-200 transition-all duration-300 flex items-center px-8 py-4 rounded-full shadow-lg text-lg transform hover:scale-105"
          onClick={() => window.location.href = 'mailto:kanokaiki@gmail.com'}
              >
          <Image src="/email.svg" alt="Email" width={32} height={32} className="mr-4" />
          Email
              </Button>
              <Button 
          className="bg-gradient-to-r from-gray-600 to-gray-700 text-white hover:from-gray-700 hover:to-gray-800 transition-all duration-300 flex items-center px-8 py-4 rounded-full shadow-lg text-lg transform hover:scale-105"
          onClick={() => window.open('https://github.com/kkaiki', '_blank')}
              >
          <Image src="/github.svg" alt="GitHub" width={32} height={32} className="mr-4" />
          GitHub
              </Button>
              <Button 
          className="bg-gradient-to-r from-blue-700 to-blue-900 text-white hover:from-blue-800 hover:to-blue-900 transition-all duration-300 flex items-center px-8 py-4 rounded-full shadow-lg text-lg transform hover:scale-105"
          onClick={() => window.open('https://www.linkedin.com/in/kaiki-kano-18a658238/', '_blank')}
              >
          <Image src="/linkedin.svg" alt="LinkedIn" width={32} height={32} className="mr-4" />
          LinkedIn
              </Button>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-8">Thank You!</h2>
            <p className="text-xl">Thank you for visiting my portfolio. I hope you enjoyed it!</p>
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
