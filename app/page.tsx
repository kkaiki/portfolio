'use client'

import { motion, useScroll, useSpring } from 'framer-motion'
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import SkillsSection from '@/components/section/SkillSection'
import LoadingAnimation from '@/components/animation/LoadingAnimation';
import ExperienceSection from '@/components/section/ExperienceSection';
import ClipPathAnimation from '@/components/animation/ClipPathAnimation'
import FeatureSection from '@/components/section/FeatureSection'
import ParallaxTextAnimation from '@/components/animation/ParallaxTextAnimation'
import HeroSection from '@/components/section/HeroSection'
import EducationSection from '@/components/section/EducationSection'

export default function DynamicScrollPortfolio() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <div className="bg-black text-white">
      <LoadingAnimation />
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-white origin-left z-50"
        style={{ scaleX }}
      />

      <div className="relative">
        <HeroSection />

        <ExperienceSection />

        <EducationSection />

        <FeatureSection />

        <SkillsSection />
        
        <ClipPathAnimation>
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
        </ClipPathAnimation>

        <ClipPathAnimation>
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-8">Thank You!</h2>
            <p className="text-xl">Thank you for visiting my portfolio. I hope you enjoyed it!</p>
          </div>
        </ClipPathAnimation>
      </div>

      <ParallaxTextAnimation baseVelocity={-5}>Innovate • Create • Inspire</ParallaxTextAnimation>

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
