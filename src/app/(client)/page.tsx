import { About } from "@/components/home-ui/about";
import Hero from "@/components/home-ui/hero";
import { Programs } from "@/components/home-ui/programs";
import { Stats } from "@/components/home-ui/stats";
import { FaqSection } from "@/components/home-ui/faq-section";
import { Testimonials } from "@/components/home-ui/testimonials";
import { EligibilityCheck } from "@/components/home-ui/eligibility-check";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Programs />
      <Stats />
      <EligibilityCheck />
      <Testimonials />
      <FaqSection />
    </main>
  );
}
