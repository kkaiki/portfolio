import Image from 'next/image'
import { ChevronDown } from "lucide-react"
import { motion } from "framer-motion"
import ClipPathAnimation from "@/components/animation/ClipPathAnimation"

const HeroSection = () => {
  return (
    <ClipPathAnimation>
      <div className="text-center">
        <Image 
          src="/profile.jpg" 
          alt="Profile Picture" 
          className="rounded-full mx-auto mb-4" 
          width={250}
          height={250}
        />
        <h1 className="text-6xl font-bold mb-4">Welcome to My Portfolio</h1>
        <p className="text-xl mb-4">
            I aim to grow in the world of technology and create innovative solutions. 
            I&apos;m particularly interested in web development and AI, and I&apos;m constantly learning new technologies.
        </p>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown className="w-8 h-8 mx-auto" />
        </motion.div>
      </div>
    </ClipPathAnimation>
  )
}

export default HeroSection
