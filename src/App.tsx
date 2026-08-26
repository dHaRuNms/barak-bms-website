import React from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutMission } from './components/AboutMission';
import { ExplodedStack } from './components/ExplodedStack';
import { ProductShowcase } from './components/ProductShowcase';
import { LiveBmsSimulator } from './components/LiveBmsSimulator';
import { TechnicalMatrix } from './components/TechnicalMatrix';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  return (
    <div className="relative min-h-screen bg-[#050505] text-slate-100 overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Prime Intellect Fixed Navigation Header */}
      <Navbar />

      {/* 1. Hero Section (Opening Sequence with 3D Silicon Point Cloud & Scrubbed Entrance) */}
      <HeroSection />

      {/* 2. About / Brand Philosophy (Blur-to-Focus Reveal) */}
      <AboutMission />

      {/* 3. The Exploded Stack (Core 300vh Lightship-Style Scrubbed Section with Video Placeholders) */}
      <ExplodedStack />

      {/* 4. Unified Digital Intelligence & Interactive Clara AI Explorer */}
      <ProductShowcase />

      {/* 5. Interactive BMS Hardware & Cell Telemetry HUD */}
      <LiveBmsSimulator />

      {/* 6. Why Choose Us (2x2 Bento-Box Grid with Cursor Tracking Spotlight) */}
      <TechnicalMatrix />

      {/* 7. Stark Minimal Terminal Footer */}
      <Footer />

    </div>
  );
};

export default App;
