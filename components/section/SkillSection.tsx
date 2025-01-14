'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import Image from 'next/image'

const SkillsAnimatedSection = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  // 複数のアニメーション効果を定義
  const scale = useTransform(scrollYProgress, [0, 0.2, 1], [0.8, 1, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const translateY = useTransform(scrollYProgress, [0, 0.2, 1], [100, 0, 0]);
  const rotate = useTransform(scrollYProgress, [0, 0.2, 1], [-10, 0, 0]);

  // スプリングアニメーションの設定
  const springConfig = {
    damping: 20,
    stiffness: 100,
    mass: 1
  };

  const animatedScale = useSpring(scale, springConfig);
  const animatedTranslateY = useSpring(translateY, springConfig);
  const animatedRotate = useSpring(rotate, springConfig);

  return (
    <div ref={ref} className="h-[200vh] relative">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          style={{
            scale: animatedScale,
            opacity,
            y: animatedTranslateY,
            rotateX: animatedRotate,
            perspective: "1000px"
          }}
          className="w-full"
        >
          <div className="relative">
            <motion.div
              className="absolute inset-0 bg-blue-500 opacity-10 blur-3xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            {children}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const SkillsSection = () => {
  const skills = [
    { name: "Backend Development", level: 80 },
    { name: "Frontend Development", level: 50 },
    { name: "Machine Learning", level: 60 },
    { name: "Laravel", level: 80, image: "/laravel.svg" },
    { name: "Python", level: 80, image: "/python.svg" },
    { name: "MySQL", level: 60, image: "/mysql.svg" },
    { name: "React", level: 50, image: "/react.svg" },
    { name: "Nextjs", level: 60, image: "/nextjs.svg" }
  ];

  return (
    <SkillsAnimatedSection>
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-5xl font-extrabold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Skills & Expertise
        </motion.h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: [0.43, 0.13, 0.23, 0.96]
              }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 0 20px rgba(1, 16, 252, 0.3)"
              }}
              className="bg-gradient-to-br from-gray-900 to-black backdrop-blur-lg rounded-lg p-6 border border-gray-800 hover:border-blue-500 transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                {skill.image && (
                  <motion.div
                    initial={{ rotate: -180, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Image 
                      src={skill.image} 
                      alt={`${skill.name} logo`} 
                      className="h-16 w-16 mr-4 filter drop-shadow-lg" 
                      width={64}
                      height={64}
                    />
                  </motion.div>
                )}
                <h3 className={`text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 ${!skill.image ? 'ml-0' : ''}`}>
                  {skill.name}
                </h3>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-3 mt-2 overflow-hidden">
                <motion.div 
                  className="h-full rounded-full relative"
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ 
                    duration: 1.5, 
                    delay: index * 0.2,
                    ease: "easeOut"
                  }}
                  style={{ 
                    backgroundImage: 'linear-gradient(to right, #0110FC, #000439)'
                  }}
                >
                  <motion.div 
                    className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-r from-transparent to-white opacity-30"
                    animate={{ 
                      x: ["0%", "100%"],
                    }}
                    transition={{ 
                      repeat: Infinity,
                      duration: 1,
                      ease: "linear"
                    }}
                  />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SkillsAnimatedSection>
  );
};

export default SkillsSection;
