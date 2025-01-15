import ZoomInAnimation from "@/components/animation/ZoomInAnimation"
import FadeInWhenVisibleAnimation from "@/components/animation/FadeInWhenVisibleAnimation"

export const educationData = [
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
  ]

const EducationSection = () => {
  return (
    <ZoomInAnimation>
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-8">
          <h2 className="text-5xl font-extrabold mb-8 text-gradient">Education</h2>
          {educationData.map((education, index) => (
            <FadeInWhenVisibleAnimation key={index}>
              <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg p-6 shadow-lg transform transition-transform hover:scale-105">
                <h3 className="text-3xl font-bold text-white">{education.title}</h3>
                <p className="text-gray-400">{education.location}</p>
                <p className="text-gray-500">{education.duration}</p>
                <p className="text-gray-300 mt-2">{education.description}</p>
              </div>
            </FadeInWhenVisibleAnimation>
          ))}
        </div>
      </div>
    </ZoomInAnimation>
  )
}

export default EducationSection
