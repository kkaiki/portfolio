'use client'

import { useEffect, useState, useRef } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Github, Linkedin, Mail } from "lucide-react"
import { motion } from "framer-motion"
import Image from 'next/image'

const CustomCursor = ({ mousePosition }: { mousePosition: { x: number; y: number } }) => (
  <motion.div
    className="pointer-events-none fixed left-0 top-0 h-48 w-48 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-20 blur-3xl"
    animate={{
      x: mousePosition.x - 96,
      y: mousePosition.y - 96,
    }}
    transition={{
      type: "spring",
      damping: 30,
      stiffness: 200,
    }}
  />
)

const SkillBadge = ({ logo, experience }: { logo: string; experience: number }) => (
  <div className="flex flex-col items-center justify-center bg-gray-800 rounded-lg p-4 min-w-[80px] h-[80px]">
    <Image src={logo} alt="Skill logo" width={32} height={32} className="mb-2" />
    <div className="w-full bg-gray-700 rounded-full h-1.5">
      <div 
        className="bg-purple-600 h-1.5 rounded-full" 
        style={{ width: `${experience}%` }}
      ></div>
    </div>
  </div>
)

export default function Page() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const aboutRef = useRef(null)
  const skillsRef = useRef(null)
  const contactRef = useRef(null)
  const projectsRef = useRef(null)
  const educationRef = useRef(null)

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', updateMousePosition)
    return () => window.removeEventListener('mousemove', updateMousePosition)
  }, [])

  const scrollToSection = (ref: React.RefObject<HTMLElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const skills = [
    { logo: "/logos/html-css.svg", experience: 80 },
    { logo: "/logos/javascript.svg", experience: 75 },
    { logo: "/logos/react.svg", experience: 70 },
    { logo: "/logos/nodejs.svg", experience: 65 },
    { logo: "/logos/python.svg", experience: 85 },
    { logo: "/logos/git.svg", experience: 75 },
    { logo: "/logos/sql.svg", experience: 60 },
    // Duplicate skills to create a seamless loop
    { logo: "/logos/html-css.svg", experience: 80 },
    { logo: "/logos/javascript.svg", experience: 75 },
    { logo: "/logos/react.svg", experience: 70 },
    { logo: "/logos/nodejs.svg", experience: 65 },
    { logo: "/logos/python.svg", experience: 85 },
    { logo: "/logos/git.svg", experience: 75 },
    { logo: "/logos/sql.svg", experience: 60 },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-gray-100">
      <CustomCursor mousePosition={mousePosition} />
      <div className="container mx-auto px-4 py-8">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 flex flex-wrap justify-center gap-4"
        >
          {[
            { name: "About", ref: aboutRef },
            { name: "Skills", ref: skillsRef },
            { name: "Contact", ref: contactRef },
            { name: "Projects", ref: projectsRef },
            { name: "Education", ref: educationRef },
          ].map((section) => (
            <Button
              key={section.name}
              variant="outline"
              onClick={() => scrollToSection(section.ref)}
              className="bg-transparent text-gray-300 hover:bg-gray-800 hover:text-white transition-all duration-300"
            >
              {section.name}
            </Button>
          ))}
        </motion.div>

        <motion.section 
          ref={aboutRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="mb-8 text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">About Me</h2>
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            <Avatar className="h-32 w-32 border-4 border-purple-500">
              <AvatarImage src="/profile.jpg?height=128&width=128" alt="Kaiki Kano" />
              <AvatarFallback>KK</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="mb-2 text-4xl font-bold text-white">Kaiki Kano</h1>
              <p className="mb-4 text-xl text-purple-400">Backend and AI Engineer</p>
              <p className="text-gray-300 leading-relaxed">
                I&apos;m a student at Seikei University in Tokyo, passionate about becoming a full stack engineer.
                I aim to grow in the world of technology and create innovative solutions.
                I&apos;m particularly interested in web development and AI, and I&apos;m constantly learning new technologies.
              </p>
            </div>
          </div>
        </motion.section>

        <motion.section 
          ref={skillsRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="mb-8 text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Skills</h2>
          <div className="overflow-hidden">
            <div className="flex space-x-4 animate-scroll">
              {skills.map((skill, index) => (
                <SkillBadge key={index} logo={skill.logo} experience={skill.experience} />
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section 
          ref={contactRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="mb-8 text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Contact</h2>
          <div className="flex space-x-4">
            {[
              { icon: Mail, label: "Email" },
              { icon: Github, label: "GitHub" },
              { icon: Linkedin, label: "LinkedIn" },
            ].map((item) => (
              <Button key={item.label} variant="outline" size="icon" className="bg-gray-800 text-gray-100 hover:bg-gray-700 hover:text-white transition-all duration-300">
                <item.icon className="h-5 w-5" />
                <span className="sr-only">{item.label}</span>
              </Button>
            ))}
          </div>
        </motion.section>

        <motion.section 
          ref={projectsRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mb-16"
        >
          <h2 className="mb-8 text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Projects</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Portfolio Website", desc: "Personal portfolio site created using React and Next.js." },
              { title: "Task Management App", desc: "Full-stack task management application using React and Node.js." },
              { title: "Weather Forecast Bot", desc: "Weather forecast bot for LINE, created using Python." },
            ].map((project, index) => (
              <motion.div key={index} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Card className="bg-gray-800 text-gray-100 overflow-hidden">
                  <CardContent className="p-6">
                    <h3 className="mb-2 text-xl font-semibold text-white">{project.title}</h3>
                    <p className="mb-4 text-sm text-gray-400">{project.desc}</p>
                    <Button variant="outline" size="sm" className="bg-purple-600 text-white hover:bg-purple-700 transition-all duration-300">
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section 
          ref={educationRef}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mb-16"
        >
          <h2 className="mb-8 text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Education</h2>
          <div className="space-y-4">
            <div className="flex">
              <div className="mr-4 flex flex-col items-center">
                <div className="h-4 w-4 rounded-full bg-purple-500"></div>
                <div className="h-full w-0.5 bg-gray-600"></div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">Seikei University</h3>
                <p className="text-sm text-gray-400">Department of Computer and Information Science | 2020 - Present</p>
                <p className="text-gray-300 mt-2">Majoring in Computer Science and Information Technology. Particularly interested in web development and AI.</p>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
      <footer className="bg-gray-900 py-6 text-center text-gray-400">
        <p>&copy; 2023 Kaiki Kano. All rights reserved.</p>
      </footer>
      <style jsx global>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
      `}</style>
    </div>
  )
}
