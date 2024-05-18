import Header from "@/widgets/Header";
import Footer from "@/widgets/Footer";
import HeroSection from "@/widgets/HeroSection";
import FeaturesSection from "@/widgets/FeaturesSection";
import GrowAudienceSection from "@/widgets/GrowAudienceSection";
import UnderstandAudienceSection from "@/widgets/UnderstandAudienceSection";
import IntegrationSection from "@/widgets/IntegrationSection";

export default function Home() {
  return (
    <main>
      <Header />
      <HeroSection />
      <FeaturesSection />
      <GrowAudienceSection />
      <UnderstandAudienceSection />
      <IntegrationSection />
      {/*      <Footer /> */}

    </main>
  );
}
