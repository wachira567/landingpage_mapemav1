import Header from './components/Header';
import HeroSection from './sections/HeroSection';
import BrandTicker from './sections/BrandTicker';
import EnterpriseSection from './sections/EnterpriseSection';
import CoverageSection from './sections/CoverageSection';
import StatsBand from './sections/StatsBand';
import RewardsSection from './sections/RewardsSection';
import CTABanner from './sections/CTABanner';
import Footer from './sections/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-mapema-bg">
      <Header />
      <HeroSection />
      <BrandTicker />
      <EnterpriseSection />
      <CoverageSection />
      <StatsBand />
      <RewardsSection />
      <CTABanner />
      <Footer />
    </div>
  );
}
