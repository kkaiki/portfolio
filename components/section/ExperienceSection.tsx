'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import FadeInWhenVisible from '@/components/animation/FadeInWhenVisibleAnimation'
import ZoomOutAnimation from '@/components/animation/ZoomOutAnimation'

const ExperienceSection = () => {
    const [showFullContent, setShowFullContent] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
  
    useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 768);
      };
  
      handleResize(); // 初期チェック
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  
    useEffect(() => {
      const handleScroll = () => {
        if (window.scrollY > 100) {
          setShowFullContent(true);
        }
      };
  
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);
  
    return (
      <ZoomOutAnimation>
        <div className={`container mx-auto px-4 py-8 ${isMobile ? 'h-screen overflow-auto' : ''}`}>
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
          >
            <h2 className="text-5xl font-extrabold mb-8 text-gradient">Experience</h2>
          </motion.div>
  
          {showFullContent && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="space-y-4">
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
                  }
                ].map((experience, index) => (
                  <FadeInWhenVisible key={index}>
                    <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg p-4 shadow-lg transform transition-transform hover:scale-105">
                      <div className="flex items-center">
                        {experience.logo && (
                          <Image
                            src={experience.logo}
                            alt={`${experience.title} logo`}
                            className="mr-4"
                            width={30}
                            height={30}
                          />
                        )}
                        <h3 className="text-2xl font-bold text-white">{experience.title}</h3>
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
            </motion.div>
          )}
        </div>
      </ZoomOutAnimation>
    );
  };

export default ExperienceSection;