import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import ClipPathAnimation from "@/components/animation/ClipPathAnimation"
import FadeInWhenVisibleAnimation from "@/components/animation/FadeInWhenVisibleAnimation"

const FeatureSection = () => {
  return (
    <ClipPathAnimation>
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold mb-8">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { 
              title: "DevInsight", 
              desc: "It is something created in our circle, and it can be integrated with Discord, allowing us to track the time spent working with editors like Vecode", 
              url: "https://github.com/kkaiki/DevInsight" 
            },
            { 
              title: "My Portfolio", 
              desc: "", 
              url: "https://github.com/kkaiki/portfolio" 
            },
          ].map((project, index) => (
            <FadeInWhenVisibleAnimation key={index}>
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
            </FadeInWhenVisibleAnimation>
          ))}
        </div>
      </div>
    </ClipPathAnimation>
  );
};

export default FeatureSection;
