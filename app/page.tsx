'use client'

import { motion, useScroll, useSpring } from 'framer-motion'
import SkillsSection from '@/components/section/SkillSection'
import LoadingAnimation from '@/components/animation/LoadingAnimation';
import ExperienceSection from '@/components/section/ExperienceSection';
import ClipPathAnimation from '@/components/animation/ClipPathAnimation'
import FeatureSection from '@/components/section/FeatureSection'
import ParallaxTextAnimation from '@/components/animation/ParallaxTextAnimation'
import HeroSection from '@/components/section/HeroSection'
import EducationSection from '@/components/section/EducationSection'
import ConnectSection from '@/components/section/ConnectSection'


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
        
        <ConnectSection />

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
