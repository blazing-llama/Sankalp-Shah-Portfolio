/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MarqueeStrip from './components/MarqueeStrip';
import BuiltSection from './components/BuiltSection';
import HowIWorkSection from './components/HowIWorkSection';
import AnalyzedSection from './components/AnalyzedSection';
import MoreWorkSection from './components/MoreWorkSection';
import AboutSection from './components/AboutSection';
import OutsideBacklogSection from './components/OutsideBacklogSection';
import Footer from './components/Footer';
import ProjectDetailModal from './components/ProjectDetailModal';
import ScrollReveal from './components/ScrollReveal';
import { BuiltProject } from './data/portfolioData';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<BuiltProject | null>(null);

  return (
    <div className="relative min-h-screen bg-[#0D0D0D] text-[#F2F2F2] selection:bg-[#6C47FF]/30 selection:text-white overflow-x-hidden">
      {/* Subtle Noise Texture Overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* Interactive Custom Cursor */}
      <CustomCursor />

      {/* 1. Fixed Navigation */}
      <Navbar />

      <main className="relative z-10">
        {/* 2. Hero Section */}
        <Hero />

        {/* 3. Marquee Strip */}
        <MarqueeStrip />

        {/* 4. Built Section with Scroll Reveal */}
        <ScrollReveal delay={50}>
          <BuiltSection onOpenProjectDetail={(project) => setSelectedProject(project)} />
        </ScrollReveal>

        {/* 5. How I Work Section with Scroll Reveal */}
        <ScrollReveal delay={60}>
          <HowIWorkSection />
        </ScrollReveal>

        {/* 6. Analyzed Section with Scroll Reveal */}
        <ScrollReveal delay={80}>
          <AnalyzedSection />
        </ScrollReveal>

        {/* 7. More Work Section with Scroll Reveal */}
        <ScrollReveal delay={80}>
          <MoreWorkSection />
        </ScrollReveal>

        {/* 8. About Section with Scroll Reveal */}
        <ScrollReveal delay={80}>
          <AboutSection />
        </ScrollReveal>

        {/* 9. Outside the Backlog (Interests) with Scroll Reveal */}
        <ScrollReveal delay={80}>
          <OutsideBacklogSection />
        </ScrollReveal>
      </main>

      {/* 10. Footer */}
      <Footer />

      {/* Deep-dive Project Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
