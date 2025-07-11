import React from "react";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import LogoSection from "@/components/home/LogoSection";
import ValueProposition from "@/components/home/ValueProposition";
import IntroSection from "@/components/home/IntroSection";
import ProblemSolvingSection from "@/components/home/ProblemSolvingSection";
import TeamSection from "@/components/home/TeamSection";
import MPCSection from "@/components/home/MPCSection";
import JoinOurTeam from "@/components/home/JoinOurTeam";

export default function Home(): React.ReactNode {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <HeroSection />
        <IntroSection />
        <LogoSection />
        <ValueProposition />
        <ProblemSolvingSection />
        <TeamSection />
        <MPCSection />
        <JoinOurTeam />
      </main>
      <Footer />
    </div>
  );
}
