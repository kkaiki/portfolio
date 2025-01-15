import ClipPathAnimation from "@/components/animation/ClipPathAnimation"
import ParallaxTextAnimation from "@/components/animation/ParallaxTextAnimation"

const ThankYouSection = () => {
  return (
    <>
      <ClipPathAnimation>
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8">Thank You!</h2>
          <p className="text-xl">Thank you for visiting my portfolio. I hope you enjoyed it!</p>
        </div>
      </ClipPathAnimation>
      <ParallaxTextAnimation baseVelocity={-5}>Innovate • Create • Inspire</ParallaxTextAnimation>
    </>
  )
}

export default ThankYouSection