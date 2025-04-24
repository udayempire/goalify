import { Features } from "./components/landing/Features";
import { Herosection } from "./components/landing/HeroSection";
import { HowitWorks } from "./components/landing/HowItWorks";
import { Navbar } from "./components/landing/Navbar";
import { RewardsSystem } from "./components/landing/Rewards";
import { ValidationProcess } from "./components/landing/Validation";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-40"> {/* Add padding to offset the fixed navbar */}
        <section id="HeroSection"><Herosection/></section>
        <section id="HowItWorks"><HowitWorks/></section>
        <section id="Features"><Features/></section>
        <section id="Validation"><ValidationProcess/></section>
        <section id="Rewards"><RewardsSystem/></section>
      </main>
    </>
  );
}
