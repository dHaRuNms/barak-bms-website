import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Hero3DCanvas } from './Hero3DCanvas';
import { ChevronRight, Terminal, Video } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const HeroSection: React.FC = () => {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const canvasWrapperRef = useRef<HTMLDivElement | null>(null);
  const videoPlaceholderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cinematic scrubbed opening sequence on scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        }
      });

      // Text scales down, blurs and fades out
      tl.to(contentRef.current, {
        scale: 0.88,
        opacity: 0,
        filter: 'blur(10px)',
        y: -100,
        ease: 'power1.out',
      }, 0);

      // 3D Canvas translates upwards smoothly
      tl.to(canvasWrapperRef.current, {
        y: -180,
        scale: 1.1,
        opacity: 0.2,
        ease: 'power1.out',
      }, 0);

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      id="hero" 
      ref={heroRef}
      className="relative min-h-screen w-full bg-[#050505] flex flex-col justify-between items-center px-4 sm:px-6 lg:px-8 pt-28 pb-10 overflow-hidden"
    >
      {/* 3D Silicon / Particle Mesh Background */}
      <div ref={canvasWrapperRef} className="absolute inset-0 w-full h-full pointer-events-none">
        <Hero3DCanvas />
      </div>

      {/* Video Background Layer Hook for Macro Silicon Cinematics */}
      <div 
        ref={videoPlaceholderRef}
        className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-1000"
      >
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover"
        >
          {/* Drop src/assets/hero-silicon-chip.mp4 here */}
          <source src="/assets/hero-silicon-chip.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Top Telemetry Beacon */}
      <div className="z-10 flex items-center gap-3 px-4 py-1 rounded-full bg-[#0a0a0a]/90 border border-white/10 text-[10px] font-mono text-slate-300 tracking-[0.2em] uppercase backdrop-blur-md">
        <span className="flex h-1.5 w-1.5 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-400"></span>
        </span>
        <span>BARAK ARCHITECTURE // ZERO COMPROMISE SAFETY</span>
        <span className="text-white/20">|</span>
        <span className="text-emerald-400 font-semibold">ASIL-D READY</span>
      </div>

      {/* Center Cinematic Hero Content */}
      <div 
        ref={contentRef}
        className="max-w-5xl mx-auto text-center my-auto py-8 z-10 will-change-transform"
      >
        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-sans font-bold tracking-[-0.03em] text-white leading-[1.08] mb-6">
          Powering Next-Generation Mobility &{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">
            Intelligent Hardware Systems
          </span>
        </h1>

        {/* Sub-headline */}
        <p className="max-w-3xl mx-auto text-sm sm:text-base md:text-lg text-slate-300 font-normal leading-relaxed mb-10 text-balance font-body">
          At <strong className="text-white font-semibold">Barak Microelectronics</strong>, we pioneer high-reliability Battery Management Systems (BMS) and intelligent software platforms—bridging cutting-edge hardware safety with cloud & edge software innovation.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <a
            href="#exploded-stack"
            className="w-full sm:w-auto px-7 py-3.5 rounded-lg bg-white text-black hover:bg-slate-200 font-sans font-bold text-xs tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2 group"
          >
            <span>Explore Solutions</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </a>

          <a
            href="#contact"
            className="w-full sm:w-auto px-7 py-3.5 rounded-lg bg-[#0a0a0a] hover:bg-[#141414] border border-white/10 hover:border-white/30 text-slate-200 font-mono text-xs tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>Partner With Us</span>
          </a>
        </div>

        {/* Asset Context Indicator (Subtle Dev/Video Hook) */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#0a0a0a]/60 border border-white/5 text-[9px] font-mono text-slate-500">
          <Video className="w-3 h-3 text-slate-600" />
          <span>CINEMATIC SILICON VOID READY // MP4 OVERLAY COMPATIBLE</span>
        </div>
      </div>

      {/* Bottom Highlights Banner */}
      <div className="w-full max-w-5xl mx-auto z-10 pt-4 border-t border-white/[0.06]">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <span className="text-cyan-400">🔋</span>
            <span>Automotive-Grade Energy Intelligence</span>
          </div>
          <div className="hidden md:block text-white/10">•</div>
          <div className="flex items-center gap-2">
            <span className="text-emerald-400">⚡</span>
            <span>Predictive Safety & Longevity</span>
          </div>
          <div className="hidden md:block text-white/10">•</div>
          <div className="flex items-center gap-2">
            <span className="text-cyan-400">💻</span>
            <span>Open & Enterprise Software Ecosystems</span>
          </div>
        </div>
      </div>

    </section>
  );
};
