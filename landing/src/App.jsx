import { Nav } from "./components/Nav.jsx";
import { Hero } from "./components/Hero.jsx";
import { SocialProof } from "./components/SocialProof.jsx";
import { Problem } from "./components/Problem.jsx";
import { HowItWorks } from "./components/HowItWorks.jsx";
import { Features } from "./components/Features.jsx";
import { Showcase } from "./components/Showcase.jsx";
import { Testimonials } from "./components/Testimonials.jsx";
import { Pricing } from "./components/Pricing.jsx";
import { FinalCTA } from "./components/FinalCTA.jsx";
import { Footer } from "./components/Footer.jsx";

export default function App() {
  return (
    <>
      <Nav />
      <a id="top" />
      <Hero />
      <SocialProof />
      <Problem />
      <HowItWorks />
      <Features />
      <Showcase />
      <Testimonials />
      <Pricing />
      <FinalCTA />
      <Footer />
    </>
  );
}
