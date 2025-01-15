import Image from 'next/image'
import { Button } from "@/components/ui/button"
import ClipPathAnimation from "@/components/animation/ClipPathAnimation"

export const socialLinks = [
    {
      name: 'Email',
      icon: '/email.svg',
      url: 'mailto:kanokaiki@gmail.com',
      className: 'bg-white text-gray-800 hover:bg-gray-200'
    },
    {
      name: 'GitHub',
      icon: '/github.svg',
      url: 'https://github.com/kkaiki',
      className: 'bg-gradient-to-r from-gray-600 to-gray-700 text-white hover:from-gray-700 hover:to-gray-800'
    },
    {
      name: 'LinkedIn',
      icon: '/linkedin.svg',
      url: 'https://www.linkedin.com/in/kaiki-kano-18a658238/',
      className: 'bg-gradient-to-r from-blue-700 to-blue-900 text-white hover:from-blue-800 hover:to-blue-900'
    }
  ]

const ConnectSection = () => {
  const handleClick = (url: string) => {
    if (url.startsWith('mailto')) {
      window.location.href = url
    } else {
      window.open(url, '_blank')
    }
  }

  return (
    <ClipPathAnimation>
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-8">Let&apos;s Connect</h2>
        <div className="flex justify-center space-x-4 mb-8">
          {socialLinks.map((link, index) => (
            <Button 
              key={index}
              className={`${link.className} transition-all duration-300 flex items-center px-8 py-4 rounded-full shadow-lg text-lg transform hover:scale-105`}
              onClick={() => handleClick(link.url)}
            >
              <Image src={link.icon} alt={link.name} width={32} height={32} className="mr-4" />
              {link.name}
            </Button>
          ))}
        </div>
      </div>
    </ClipPathAnimation>
  )
}

export default ConnectSection
