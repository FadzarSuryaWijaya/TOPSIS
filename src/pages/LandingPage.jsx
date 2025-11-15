import { motion } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { HeroSection } from '../components/sections/HeroSection';
import { WhyTOPSISSection } from '../components/sections/WhyTOPSISSection';
import { HowItWorksSection } from '../components/sections/HowItWorksSection';
import { ExampleSection } from '../components/sections/ExampleSection';
import { WhoSection } from '../components/sections/WhoSection';
import { CTASection } from '../components/sections/CTASection';

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <WhyTOPSISSection />
      <HowItWorksSection />
      <ExampleSection />
      <WhoSection />
      <CTASection />
      <Footer />
    </div>
  );
}