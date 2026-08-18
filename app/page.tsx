// Home — thin server composition. All interactivity lives in the
// "use client" section components under components/home/*.
// SpineContainer wraps the sections in a relative div and draws the
// scroll-linked connector spine behind them (decorative, lg+ only).

import HomeHero from "@/components/home/hero";
import DividerBand from "@/components/home/divider-band";
import IntroSection from "@/components/home/intro";
import ServicesGrid from "@/components/home/services";
import SkillsRows from "@/components/home/skills";
import CaseStudiesSection from "@/components/home/case-studies";
import ProjectsIndex from "@/components/home/projects";
import TechStack from "@/components/home/tech-stack";
import SpineContainer from "@/components/home/path-spine";

export default function Home() {
  return (
    <SpineContainer>
      <HomeHero />
      <DividerBand />
      <IntroSection />
      <ServicesGrid />
      <SkillsRows />
      <CaseStudiesSection />
      <ProjectsIndex />
      <TechStack />
    </SpineContainer>
  );
}
