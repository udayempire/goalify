import { Features } from "../components/ui/landing/Features";
import { Footer } from "../components/ui/landing/Footer";
import { Herosection } from "../components/ui/landing/HeroSection";
import { HowitWorks } from "../components/ui/landing/HowItWorks";
import { Navbar } from "../components/ui/landing/Navbar";
import { RewardsSystem } from "../components/ui/landing/Rewards";
import { ValidationProcess } from "../components/ui/landing/Validation";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-28 md:pt-40 bg-blue-950"> {/* Add padding to offset the fixed navbar */}
        <section id="HeroSection"><Herosection/></section>
        <section id="HowItWorks"><HowitWorks/></section>
        <section id="Features"><Features/></section>
        <section id="Validation"><ValidationProcess/></section>
        <section id="Rewards"><RewardsSystem/></section>
        <section id="Footer"><Footer/></section>
      </main>
    </>
  );
}
